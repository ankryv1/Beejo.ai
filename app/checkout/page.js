"use client";
 
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const GST_RATE = 0.18;
const SHIPPING_CHARGE = 50;

export default function CheckoutPage() {
  const { cart } = useCart();

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
    (acc, item) =>
      acc + item.discountedPrice * item.quantity,
    0
  );

  const gst = subtotal * GST_RATE;

  const total =
    subtotal + gst + SHIPPING_CHARGE;

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // VALIDATION
  const validate = () => {
    const e = {};

    if (!form.name.trim())
      e.name = "Name is required";

    if (
      !/^[6-9]\d{9}$/.test(
        form.phone
      )
    ) {
      e.phone =
        "Enter valid phone number";
    }

    if (!form.address.trim())
      e.address =
        "Address is required";

    if (!form.city.trim())
      e.city = "City is required";

    if (!form.state.trim())
      e.state =
        "State is required";

    if (
      !/^\d{6}$/.test(
        form.pincode
      )
    ) {
      e.pincode =
        "Enter valid pincode";
    }

    return e;
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (
      Object.keys(newErrors)
        .length > 0
    ) {
      setErrors(newErrors);
      return;
    }

    try {
      const addressRes =
        await fetch(
          "/api/address/add",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              fullName:
                form.name,

              phone:
                form.phone,

              address:
                form.address,

              city:
                form.city,

              state:
                form.state,

              pincode:
                form.pincode,
            }),
          }
        );

      const addressData =
        await addressRes.json();

      if (
        !addressData.success
      ) {
        toast.error(
          "Failed to save address"
        );

        return;
      }

      toast.success(
        "Address saved successfully"
      );

      // NEXT:
      // CREATE ORDER API

      console.log({ form,total, });
    } catch (error) {
      console.log(error);

      toast.error(
        "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7f2] via-[#eef4ec] to-[#f8faf7] py-12 px-4">

      {/* HEADER */}
      <div className="text-center mb-12">

        <p className="text-sm uppercase tracking-[0.3em] text-green-700 font-semibold">
          Secure Checkout
        </p>

        <h1 className="mt-3 text-5xl font-serif text-[#17331F]">
          Complete Your Order
        </h1>

        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          Healthy plants delivered
          fresh to your doorstep
          with secure checkout and
          fast shipping.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">

            {/* SAVED ADDRESSES */}
            {savedAddresses.length >
              0 && (
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

                  {savedAddresses?.map(
                    (addr) => (
                      <div
                        key={addr._id}
                        onClick={() => {
                          setSelectedAddress( addr);

                          setForm({
                            name: addr.fullName,

                            phone: addr.phone,

                            address:
                              addr.address,

                            city:
                              addr.city,

                            state:
                              addr.state,

                            pincode:
                              addr.pincode,
                          });
                        }}

                        className={`
                        rounded-2xl border p-5 cursor-pointer transition-all duration-300

                        ${
                          selectedAddress?._id ===
                          addr._id
                            ? "border-green-600 bg-green-50 shadow-md scale-[1.02]"
                            : "border-gray-200 bg-white hover:border-green-300 hover:shadow-md"
                        }
                      `}
                      >

                        <p className="font-semibold text-[#17331F]">
                          {
                            addr.fullName
                          }
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                          {
                            addr.address
                          }
                          , {addr.city}
                        </p>

                        <p className="text-sm text-gray-500">
                          {addr.state} -{" "}
                          {
                            addr.pincode
                          }
                        </p>
                      </div>
                    )
                  )}
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
                  onChange={
                    handleChange
                  }
                  error={errors.name}
                />

                <Field
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={
                    handleChange
                  }
                  error={
                    errors.phone
                  }
                />

                <div className="md:col-span-2">

                  <Field
                    label="Address"
                    name="address"
                    value={
                      form.address
                    }
                    onChange={
                      handleChange
                    }
                    error={
                      errors.address
                    }
                  />
                </div>

                <Field
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={
                    handleChange
                  }
                  error={errors.city}
                />

                {/* STATE */}
                <div>

                  <label className="block text-sm font-medium text-[#17331F] mb-2">
                    State
                  </label>

                  <select
                    name="state"
                    value={form.state}
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >

                    <option value="">
                      Select State
                    </option>

                    {INDIAN_STATES.map(
                      (state) => (
                        <option
                          key={
                            state
                          }
                          value={
                            state
                          }
                        >
                          {state}
                        </option>
                      )
                    )}
                  </select>

                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">
                      {
                        errors.state
                      }
                    </p>
                  )}
                </div>

                <Field
                  label="Pincode"
                  name="pincode"
                  value={
                    form.pincode
                  }
                  onChange={
                    handleChange
                  }
                  error={
                    errors.pincode
                  }
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

                {cartItems?.map(
                  (item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between gap-4"
                    >

                      <div className="flex items-center gap-4">

                        <img
                          src={
                            item.plantSnapshot?.image ||
                              item.plantSnapshot
                              ?.image
                          }
                          alt=""
                          className="w-16 h-16 rounded-2xl object-cover shadow-md"
                        />

                        <div>

                          <p className="font-semibold text-[#17331F]">
                            {
                              item.plantSnapshot?.plantName
                            }
                          </p>

                          <p className="text-sm text-gray-500">
                            Qty:{" "}
                            {
                              item.quantity
                            }
                          </p>
                        </div>
                      </div>

                      <p className="font-semibold text-[#17331F]">
                        ₹
                        {item.discountedPrice *
                          item.quantity}
                      </p>
                    </div>
                  )
                )}
              </div>

              <div className="mt-8 rounded-2xl bg-[#F4F8F3] p-5 space-y-4">

                <Row
                  label="Subtotal"
                  value={`₹${subtotal?.toFixed(
                    2
                  )}`}
                />

                <Row
                  label="GST"
                  value={`₹${gst?.toFixed(
                    2
                  )}`}
                />

                <Row
                  label="Shipping"
                  value={`₹${SHIPPING_CHARGE}`}
                />

                <hr />

                <Row
                  label="Total"
                  value={`₹${total?.toFixed(
                    2
                  )}`}
                  bold
                />
              </div>

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

              <div className="mt-5 flex items-center justify-center gap-6 text-xs text-gray-500">

                <span>
                  🚚 Fast Delivery
                </span>

                <span>
                  🔒 Secure Payment
                </span>

                <span>
                  🌿 Fresh Plants
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// FIELD COMPONENT
function Field({
  label,
  name,
  value,
  onChange,
  error,
}) {
  return (
    <div>

      <label className="block text-sm font-medium text-[#17331F] mb-2">
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

          ${
            error
              ? "border-red-400"
              : "border-gray-200 hover:border-green-300"
          }
        `}
      />

      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

// ROW COMPONENT
function Row({
  label,
  value,
  bold,
}) {
  return (
    <div
      className={`flex justify-between ${
        bold
          ? "font-bold text-lg text-[#17331F]"
          : "text-gray-600"
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