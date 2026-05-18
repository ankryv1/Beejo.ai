"use client";

import CartItem from "@/components/cart/CartItem";
import { useCart } from "../context/CartContext";

export default function CartPage() {

  const { cart } = useCart();
  const cartItems = cart;
   

  const subtotal = cartItems?.reduce(
    (acc, item) =>
      acc + item.discountedPrice * item.quantity,
    0
  );

  const originalSubtotal = cartItems?.reduce(
    (acc, item) =>
      acc + item.originalPrice * item.quantity,
    0
  );

  const totalSavings =
    originalSubtotal - subtotal;

  const shipping =
    subtotal > 999 ? 0 : 99;

  const tax = Math.floor(subtotal * 0.05);

  const total =
    subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-[#f5f7f2] px-4 py-8 md:px-8 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Your Cart
            </h1>

            <p className="mt-2 text-gray-500">
              Review your selected plants before checkout.
            </p>
          </div>

          <div className="w-fit rounded-2xl bg-white px-5 py-3 shadow-sm">

            <p className="text-sm text-gray-500">
              Total Items
            </p>

            <h2 className="text-2xl font-bold text-green-700">
              {cartItems.length}
            </h2>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

          {/* LEFT SIDE */}
          <div className="space-y-5">

            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
              />
            ))}

            {/* COUPON */}
            {/* <div className="rounded-3xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-semibold text-gray-800">
                Apply Coupon
              </h2>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">

                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 rounded-2xl border border-gray-200 px-5 py-3 outline-none transition focus:border-green-500"
                />

                <button className="rounded-2xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800">
                  Apply
                </button>
              </div>
            </div> */}
          </div>

          {/* RIGHT SIDE */}
          <div>

            <div className="sticky top-10 rounded-3xl bg-white p-6 shadow-sm lg:p-7">

              <h2 className="text-2xl font-bold text-gray-800">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5">

                <div className="flex items-center justify-between text-gray-600">
                  <span>Original Price</span>

                  <span className="font-semibold">
                    ₹{originalSubtotal}
                  </span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Discounted Price</span>

                  <span className="font-semibold">
                    ₹{subtotal}
                  </span>
                </div>

                {/* SAVINGS */}
                <div className="flex items-center justify-between rounded-2xl bg-green-50 px-4 py-3">

                  <span className="font-medium text-green-700">
                    🎉 You Saved
                  </span>

                  <span className="text-lg font-bold text-green-700">
                    ₹{totalSavings}
                  </span>
                </div>

                <div className="flex items-center justify-between text-gray-600">

                  <span>Shipping</span>

                  <span className="font-semibold">
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping}`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-gray-600">

                  <span>Tax (GST)</span>

                  <span className="font-semibold">
                    ₹{tax}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-5">

                  <div className="flex items-center justify-between">

                    <span className="text-xl font-semibold text-gray-800">
                      Total
                    </span>

                    <span className="text-3xl font-bold text-green-700">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </div>

              {/* DELIVERY */}
              <div className="mt-8 rounded-2xl bg-green-50 p-4">

                <p className="font-semibold text-green-700">
                  🚚 Estimated Delivery
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Delivered within 3-5 business days.
                </p>
              </div>

              {/* BUTTONS */}
              <div className="mt-8 space-y-4">

                <button className="w-full rounded-2xl bg-green-700 py-4 text-lg font-semibold text-white transition hover:bg-green-800">
                  Proceed to Checkout
                </button>

                <button className="w-full rounded-2xl border border-gray-300 py-4 text-lg font-semibold text-gray-700 transition hover:bg-gray-50">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}