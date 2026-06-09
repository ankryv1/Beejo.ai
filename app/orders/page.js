// app/orders/page.jsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Order from "@/models/order.model";
import connectDB from "@/lib/mongodb";
import { getUserFromToken } from "@/lib/getUserFromToken";

export default async function OrdersPage() {
  await connectDB();
  const userId = await getUserFromToken();

  if (!userId) notFound();

  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .lean();

  const deliveredOrders = orders.filter(
    (o) => o.orderStatus === "DELIVERED"
  ).length;

  const activeOrders = orders.filter(
    (o) =>
      !["DELIVERED", "CANCELLED"].includes(o.orderStatus)
  ).length;

  return (
    <main className="max-h-screen bg-green-50">
      <div className="max-w-4xl mx-auto px-4 py-8 ">
{/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Orders
        </h1>
        <p className="text-gray-500 mt-1">
          Track your plant orders and delivery updates
        </p>
      </div>

      {/* Stats */}
      {orders.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Total Orders
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {orders.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Delivered
            </p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {deliveredOrders}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Active
            </p>
            <p className="text-2xl font-bold text-amber-600 mt-1">
              {activeOrders}
            </p>
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl py-20 px-6 text-center">
          <div className="text-6xl mb-4">🌱</div>

          <h2 className="text-xl font-semibold text-gray-800">
            No orders yet
          </h2>

          <p className="text-gray-500 mt-2">
            Start exploring our plant collection and
            your orders will appear here.
          </p>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mt-6 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-3 rounded-xl transition"
          >
            Browse Plants →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.map((order) => (
            <OrderCard
              key={order._id.toString()}
              order={order}
            />
          ))}
        </div>
      )}
    
      </div>
</main>
      
  );
}

function OrderCard({ order }) {
  const firstItem = order.orderItems[0];
  const extraCount = order.orderItems.length - 1;

  return (
    <Link href={`/orders/${order._id}`} className="block">
      <div className="
        bg-white
        border
        border-gray-100
        rounded-3xl
        p-5
        shadow-sm
        hover:shadow-xl
        hover:border-green-200
        hover:-translate-y-1
        transition-all
        duration-300
      ">

        {/* Top Row */}
        <div className="flex items-start justify-between gap-4 mb-4 bg">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Order
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-1">
              #{order._id.toString().slice(-8).toUpperCase()}
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <StatusBadge status={order.orderStatus} />
            <PaymentBadge status={order.paymentStatus} />
          </div>
        </div>

        {/* Images + Product */}
        <div className="flex items-center justify-between gap-4 mb-4">

          <div className="flex items-center gap-4 min-w-0">

            <div className="flex -space-x-3">
              {order.orderItems.slice(0, 3).map((item, i) => (
                <img
                  key={i}
                  src={item.plantSnapshot.image}
                  alt={item.plantSnapshot.plantName}
                  className="
                    w-14 h-14
                    rounded-xl
                    object-cover
                    border-2
                    border-white
                    bg-green-50
                    shadow-sm
                  "
                />
              ))}
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-gray-800 truncate">
                {firstItem.plantSnapshot.plantName}
              </p>

              <p className="text-sm text-gray-500">
                {order.orderItems.length} item
                {order.orderItems.length > 1 ? "s" : ""}
              </p>

              {extraCount > 0 && (
                <p className="text-xs text-gray-400">
                  +{extraCount} more item
                  {extraCount > 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">
              ₹{order.totalPrice.toLocaleString("en-IN")}
            </p>

            <p className="text-xs text-gray-400">
              View Details →
            </p>
          </div>
        </div>



        {/* Shipping */}
        {order.awbCode && (
          <div className="
            flex items-center gap-2
            border-t border-gray-100
            pt-3
            text-sm
          ">
            <span>🚚</span>

            <span className="text-gray-500">
              {order.courierName} · AWB {order.awbCode}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

function StatusBadge({ status }) {
  const map = {
    PLACED: "bg-blue-50 text-blue-700",
    CONFIRMED: "bg-blue-50 text-blue-700",
    PROCESSING: "bg-amber-50 text-amber-700",
    SHIPPED: "bg-amber-50 text-amber-700",
    OUT_FOR_DELIVERY: "bg-green-50 text-green-700",
    DELIVERED: "bg-green-50 text-green-700",
    CANCELLED: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`
        px-3 py-1
        rounded-full
        text-xs
        font-semibold
        ${map[status] || "bg-gray-100 text-gray-600"}
      `}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

function PaymentBadge({ status }) {
  const map = {
    PAID: "bg-green-50 text-green-700",
    PENDING: "bg-amber-50 text-amber-700",
    FAILED: "bg-red-50 text-red-600",
    REFUNDED: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`
        px-3 py-1
        rounded-full
        text-xs
        font-semibold
        ${map[status] || "bg-gray-100 text-gray-600"}
      `}
    >
      {status}
    </span>
  );
}