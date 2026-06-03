"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const GST_RATE = 0;
const SHIPPING_CHARGE = 50;

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();

  const cartItems = cart?.items || [];
  console.log(cartItems);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");

  // FETCH SAVED ADDRESSES
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch("/api/address/get");
        const data = await res.json();

        if (data.success) {
          setSavedAddresses(data.addresses);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddresses();
  }, []);

  // PRICE CALCULATIONS

  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0,
  );

  const gst = subtotal * GST_RATE;
  const shipping = subtotal > 500 ? 0 : SHIPPING_CHARGE;

  const total = subtotal + gst + shipping;

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

const handlePayment = async (e) => {
  e.preventDefault();

  if (!selectedAddress) {
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  }

  try {
    let finalAddress = selectedAddress;

    // SAVE NEW ADDRESS ONLY IF NOT SELECTED
    if (!selectedAddress) {
      const addressRes = await fetch("/api/address/add", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ form }),
      });

      const addressData = await addressRes.json();

      if (addressData.success) {
        finalAddress = addressData.address;

        setSelectedAddress(addressData.address);

        toast.success("Address saved");
      } else {
        toast.error("Failed to save address");
        return;
      }
    }

    // ==========================
    // COD FLOW
    // ==========================
    if (paymentMethod === "COD") {
      const res = await fetch("/api/orders/place", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          form: {
            name: finalAddress?.fullName || form.name,

            phone: finalAddress?.phone || form.phone,

            address: finalAddress?.address || form.address,

            city: finalAddress?.city || form.city,

            state: finalAddress?.state || form.state,

            pincode: finalAddress?.pincode || form.pincode,
          },

          paymentMethod: "COD",
        }),
      });
      console.log("status:", res.status);
      const data = await res.json();
 
      console.log(data);

      if (data.success) {
        toast.success("Order placed successfully");

        router.push("/orders");
      } else {
        toast.error(
          data.message || "Failed to place order"
        );
      }

      return;
    }

    // ==========================
    // RAZORPAY FLOW
    // ==========================

    const paymentRes = await fetch(
      "/api/payment/create-order",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: total,
        }),
      }
    );

    if (!paymentRes.ok) {
      toast.error("Failed to create payment order");
      return;
    }

    const order = await paymentRes.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: "PlantX",

      description: "Plant Purchase",

      order_id: order.id,

      modal: {
        ondismiss: function () {
          toast.error("Payment cancelled");
        },
      },

      handler: async function (response) {
        const verifyRes = await fetch(
          "/api/payment/verify",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,
            }),
          }
        );

        const verifyData =
          await verifyRes.json();

        if (!verifyData.success) {
          toast.error(
            "Payment verification failed"
          );
          return;
        }

        const orderRes = await fetch(
          "/api/orders/place",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              form: {
                name:
                  finalAddress?.fullName ||
                  form.name,

                phone:
                  finalAddress?.phone ||
                  form.phone,

                address:
                  finalAddress?.address ||
                  form.address,

                city:
                  finalAddress?.city ||
                  form.city,

                state:
                  finalAddress?.state ||
                  form.state,

                pincode:
                  finalAddress?.pincode ||
                  form.pincode,
              },

              paymentMethod:
                "RAZORPAY",

              paymentResult: {
                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_status:
                  "PAID",
              },
            }),
          }
        );

        const finalData =
          await orderRes.json();

        if (finalData.success) {
          toast.success(
            "Payment successful"
          );

          router.push("/orders");
        } else {
          toast.error(
            finalData.message ||
              "Order creation failed"
          );
        }
      },

      prefill: {
        name:
          finalAddress?.fullName ||
          form.name,

        contact:
          finalAddress?.phone ||
          form.phone,
      },

      theme: {
        color: "#17331F",
      },
    };

    const razorpay =
      new window.Razorpay(options);

    razorpay.open();

  } catch (error) {
    console.log(error);

    toast.error("Payment failed");
  }
};
  

  // VALIDATION
  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Name is required";

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      e.phone = "Enter valid phone number";
    }

    if (!form.address.trim()) e.address = "Address is required";

    if (!form.city.trim()) e.city = "City is required";

    if (!form.state.trim()) e.state = "State is required";

    if (!/^\d{6}$/.test(form.pincode)) {
      e.pincode = "Enter valid pincode";
    }

    return e;
  };

  // SUBMIT

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7f2] via-[#eef4ec] to-[#f8faf7] py-12 px-4">
      {/* HEADER */}
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-green-700 font-semibold">
          Secure Checkout
        </p>

        <h1 className=" sm:mt-2 mt-3 text-5xl font-serif text-[#17331F]">
          Complete Your Order
        </h1>

        <p className="mt-2 text-gray-500 max-w-2xl mx-auto">
          Healthy plants delivered fresh to your doorstep with secure checkout
          and fast shipping.
        </p>
      </div>

      <form onSubmit={handlePayment} className="max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">
            {/* SAVED ADDRESSES */}
            {savedAddresses.length > 0 && (
              <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-[#17331F]">
                    Saved Addresses
                  </h2>

                  <span className="text-sm text-gray-500">
                    Choose delivery address
                  </span>
                </div>

                <div className="grid gap-4">
                  {savedAddresses?.map((addr) => (
                    <div
                      key={addr._id}
                      onClick={() => {
                        setSelectedAddress(addr);

                        setForm({
                          name: addr.fullName,

                          phone: addr.phone,

                          address: addr.address,

                          city: addr.city,

                          state: addr.state,

                          pincode: addr.pincode,
                        });
                      }}
                      className={`
                        rounded-2xl border p-5 cursor-pointer transition-all duration-300

                        ${
                          selectedAddress?._id === addr._id
                            ? "border-green-600 bg-green-50 shadow-md scale-[1.02]"
                            : "border-gray-200 bg-white hover:border-green-300 hover:shadow-md"
                        }
                      `}
                    >
                      <p className="font-semibold text-[#17331F]">
                        {addr.fullName}
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        {addr.address}, {addr.city}
                      </p>

                      <p className="text-sm text-gray-500">
                        {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-sm text-gray-500">📞 {addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SHIPPING FORM */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-[#17331F]">
                  Shipping Details
                </h2>

                <span className="text-sm text-gray-500">
                  Enter delivery info
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                />

                <Field
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />

                <div className="md:col-span-2">
                  <Field
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    error={errors.address}
                  />
                </div>

                <Field
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  error={errors.city}
                />

                {/* STATE */}
                <div>
                  <label className="block text-sm font-medium text-[#09130c] mb-2">
                    State
                  </label>

                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select State</option>

                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>

                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                  )}
                </div>

                <Field
                  label="Pincode"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  error={errors.pincode}
                />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div>
            <div className="sticky top-24 bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-[#17331F] mb-6">
                Order Summary
              </h2>

              <div className="space-y-5">
                {cartItems?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          item.plantSnapshot?.image || item.plantSnapshot?.image
                        }
                        alt=""
                        className="w-16 h-16 rounded-2xl object-cover shadow-md"
                      />

                      <div>
                        <p className="font-semibold text-[#17331F]">
                          {item.plantSnapshot?.plantName}
                        </p>

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-[#17331F]">
                      ₹{item.discountedPrice * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-[#F4F8F3] p-5 space-y-4">
                <Row label="Subtotal" value={`₹${subtotal?.toFixed(2)}`} />

                <Row label="GST" value={`₹${gst?.toFixed(2)}`} />

                <Row label="Shipping" value={`₹${shipping?.toFixed(2)}`} />

                <hr />

                <Row label="Total" value={`₹${total?.toFixed(2)}`} bold />
              </div>

              <h2 className="text-2xl font-semibold text-[#17331F] mt-8 mb-6">
                Payment Method
              </h2>

              <div className="mt-8 flex items-center gap-6 text-sm text-[#17331F] font-medium">
                <label>
                  <input
                    type="radio"
                    value="RAZORPAY"
                    checked={paymentMethod === "RAZORPAY"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Razorpay
                </label>

                <label>
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash On Delivery
                </label>
              </div>
              {
                paymentMethod === "RAZORPAY" && 
                <button
                type="submit"
                className="
                  mt-8 w-full rounded-2xl
                  bg-[#17331F]
                  py-4 text-white font-semibold
                  shadow-lg shadow-green-900/20
                  transition-all duration-300
                  hover:scale-[1.02]
                  hover:bg-[#20492C]
                "
              >
                Proceed to Payment
              </button>
              }
              {
                paymentMethod === "COD" &&
                <button
                type="submit"
                className="
                  mt-8 w-full rounded-2xl
                  bg-[#17331F]
                  py-4 text-white font-semibold
                  shadow-lg shadow-green-900/20
                  transition-all duration-300
                  hover:scale-[1.02]
                  hover:bg-[#20492C]
                "              >
                Place Order (COD)
              </button>
              }

              <div className="mt-5 flex items-center justify-center gap-6 text-xs text-gray-500">
                <span>🚚 Fast Delivery</span>

                <span>🔒 Secure Payment</span>

                <span>🌿 Fresh Plants</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// FIELD COMPONENT
function Field({ label, name, value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0d1c11] mb-2">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={`
          w-full rounded-2xl border bg-white/80 px-4 py-3
          text-sm transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-green-500

          ${error ? "border-red-400" : "border-gray-200 hover:border-green-300"}
        `}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ROW COMPONENT
function Row({ label, value, bold }) {
  return (
    <div
      className={`flex justify-between ${
        bold ? "font-bold text-lg text-[#17331F]" : "text-gray-700"
      }`}
    >
      <span>{label}</span>

      <span>{value}</span>
    </div>
  );
}

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];
