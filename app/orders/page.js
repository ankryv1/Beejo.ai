
"use client";

import Link from "next/link";

const orders = [
  {
    _id: "ORD-10231",
    createdAt: "2026-05-28",
    totalPrice: 2499,
    paymentStatus: "PAID",
    orderStatus: "PROCESSING",
    isDelivered: false,
    orderItems: [
      {
        plantSnapshot: {
          plantName: "Monstera Deliciosa",
          image:
            "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
        },
        quantity: 2,
        price: 899,
      },
      {
        plantSnapshot: {
          plantName: "Snake Plant",
          image:
            "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop",
        },
        quantity: 1,
        price: 699,
      },
    ],
  },
  {
    _id: "ORD-10232",
    createdAt: "2026-05-25",
    totalPrice: 1499,
    paymentStatus: "PENDING",
    orderStatus: "PLACED",
    isDelivered: false,
    orderItems: [
      {
        plantSnapshot: {
          plantName: "Peace Lily",
          image:
            "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1200&auto=format&fit=crop",
        },
        quantity: 1,
        price: 1499,
      },
    ],
  },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8f3] via-[#eef4ec] to-[#f7faf7] px-4 py-5">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mt-2 text-3xl sm:text-5xl font-serif text-[#17331F]">
              My Orders
            </h1>

            <p className="mt-2 max-w-2xl text-gray-500">
              Track your plant deliveries, payment status, and order progress.
            </p>
          </div>

          <div className="rounded-3xl border border-white/40 bg-white/80 p-5 shadow-lg backdrop-blur-xl">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="mt-1  text:xl sm:text-3xl font-bold text-[#17331F]">
              {orders.length}
            </h2>
          </div>
        </div>

        {/* ORDERS LIST */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-[2rem] border border-white/40 bg-white/80 shadow-xl backdrop-blur-xl"
            >
              {/* TOP */}
              <div className="flex flex-col gap-5 border-b border-gray-100 p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <h2 className="mt-1 text:xlsm:text-2xl font-bold text-[#17331F]">
                    {order._id}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Ordered on {order.createdAt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <StatusBadge
                    label={order.paymentStatus}
                    type={
                      order.paymentStatus === "PAID"
                        ? "green"
                        : "yellow"
                    }
                  />

                  <StatusBadge
                    label={order.orderStatus}
                    type="blue"
                  />

                  {order.isDelivered ? (
                    <StatusBadge
                      label="DELIVERED"
                      type="green"
                    />
                  ) : (
                    <StatusBadge
                      label="NOT DELIVERED"
                      type="red"
                    />
                  )}
                </div>
              </div>

              {/* ITEMS */}
              <div className="space-y-5 p-6">
                {order.orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-5 rounded-3xl bg-[#F4F8F3] p-5 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-5">
                      <img
                        src={item.plantSnapshot.image}
                        alt={item.plantSnapshot.plantName}
                        className="h-24 w-24 rounded-3xl object-cover shadow-md"
                      />

                      <div>
                        <h3 className="text-xl font-semibold text-[#17331F]">
                          {item.plantSnapshot.plantName}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Price: ₹{item.price}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500">Item Total</p>

                      <h2 className="mt-1 text:xl md:text-2xl font-bold text-[#17331F]">
                        ₹{item.price * item.quantity}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex flex-col gap-5 border-t border-gray-100 px-6 pb-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-gray-500">Grand Total</p>

                  <h2 className="mt-1 text:2xl md:text-4xl font-bold text-[#17331F]">
                    ₹{order.totalPrice}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className="rounded-2xl border border-[#17331F] px-6 py-3 font-medium text-[#17331F] transition-all duration-300 hover:bg-[#17331F] hover:text-white">
                    Track Order
                  </button>

                  <Link
                    href={`/orders/${order._id}`}
                    className="rounded-2xl bg-[#17331F] px-6 py-3 font-medium text-white shadow-lg shadow-green-900/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#20492C]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ label, type }) {
  const styles = {
    green:
      "bg-green-100 text-green-700 border border-green-200",

    yellow:
      "bg-yellow-100 text-yellow-700 border border-yellow-200",

    red:
      "bg-red-100 text-red-700 border border-red-200",

    blue:
      "bg-blue-100 text-blue-700 border border-blue-200",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide ${styles[type]}`}
    >
      {label}
    </span>
  );
}




