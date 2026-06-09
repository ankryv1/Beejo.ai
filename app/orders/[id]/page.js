// app/orders/[id]/page.jsx
import { notFound } from "next/navigation";
import Order from "@/models/order.model";
import connectDB from "@/lib/mongodb";
import { getUserFromToken } from "@/lib/getUserFromToken";

const STATUS_STEPS = [
  { key: "PLACED",           label: "Order placed",      icon: "📋" },
  { key: "CONFIRMED",        label: "Confirmed",         icon: "✅" },
  { key: "PROCESSING",       label: "Processing",        icon: "⚙️" },
  { key: "SHIPPED",          label: "Shipped",           icon: "🚚" },
  { key: "OUT_FOR_DELIVERY", label: "Out for delivery",  icon: "📍" },
  { key: "DELIVERED",        label: "Delivered",         icon: "🏠" },
];

export default async function OrderDetailPage({ params }) {
  await connectDB();
  const userId = await getUserFromToken();

  const order = await Order.findOne({
    _id: params.id,
    user: userId,         // ensures users can only see their own orders
  }).lean();

  if (!order) notFound();

  const currentStepIndex = STATUS_STEPS.findIndex(
    (s) => s.key === order.orderStatus
  );

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-2">
        <div>
          <p className="text-sm text-gray-500">Order</p>
          <h1 className="text-xl font-semibold">#{order._id.toString().slice(-8).toUpperCase()}</h1>
          <p className="text-xs text-gray-400 mt-1">
            Placed on {new Date(order.createdAt).toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <StatusBadge status={order.orderStatus} />
          <PaymentBadge status={order.paymentStatus} />
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 mb-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Order status</p>
        <ol>
          {STATUS_STEPS.map((step, i) => {
            const isDone   = i < currentStepIndex;
            const isActive = i === currentStepIndex;
            const isCancelled = order.orderStatus === "CANCELLED";

            return (
              <li key={step.key} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm
                    ${isCancelled && isActive ? "bg-red-100 text-red-600"
                      : isDone    ? "bg-green-100 text-green-700"
                      : isActive  ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-400"}`}>
                    {isDone ? "✓" : step.icon}
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div className={`w-px flex-1 my-1 min-h-[16px] ${isDone ? "bg-green-200" : "bg-gray-100"}`} />
                  )}
                </div>
                <div className="pb-4 pt-0.5">
                  <p className={`text-sm font-medium ${!isDone && !isActive ? "text-gray-400" : "text-gray-800"}`}>
                    {step.label}
                  </p>
                  {isActive && order.courierName && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order.courierName} · AWB {order.awbCode}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {order.trackingUrl && (
          <a
            href={order.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 px-3 py-2 rounded-lg mt-1"
          >
            🔗 Track on Shiprocket
          </a>
        )}
      </div>

      {/* Items */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 mb-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Items ordered</p>
        {order.orderItems.map((item, i) => (
          <div key={i} className="flex gap-3 items-start py-2.5 border-b border-gray-50 last:border-0">
            <img
              src={item.plantSnapshot.image}
              alt={item.plantSnapshot.plantName}
              className="w-14 h-14 rounded-lg object-cover bg-green-50"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800">{item.plantSnapshot.plantName}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {item.size && `Size: ${item.size}`}
                {item.color && ` · Color: ${item.color}`}
                {` · Qty: ${item.quantity}`}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </p>
          </div>
        ))}

        <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5">
          <PriceLine label="Items total"  value={`₹${order.itemsPrice.toLocaleString("en-IN")}`} />
          <PriceLine label="Shipping"     value={order.shippingPrice === 0 ? "Free" : `₹${order.shippingPrice}`} green={order.shippingPrice === 0} />
          <PriceLine label="Tax"          value={`₹${order.taxPrice}`} />
          <PriceLine label="Total paid"   value={`₹${order.totalPrice.toLocaleString("en-IN")}`} bold />
        </div>
      </div>

      {/* Address + Payment grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Shipping address</p>
          <p className="text-sm font-medium text-gray-800">{order.shippingAddress.fullName}</p>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            {order.shippingAddress.address}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
            {order.shippingAddress.phone}
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Payment</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Method</span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <PaymentBadge status={order.paymentStatus} />
            </div>
            {order.paidAt && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Paid on</span>
                <span className="text-gray-800">{new Date(order.paidAt).toLocaleDateString("en-IN")}</span>
              </div>
            )}
          </div>
        </div>
      </div>

    </main>
  );
}

function StatusBadge({ status }) {
  const map = {
    PLACED:           "bg-blue-50 text-blue-700",
    CONFIRMED:        "bg-blue-50 text-blue-700",
    PROCESSING:       "bg-amber-50 text-amber-700",
    SHIPPED:          "bg-amber-50 text-amber-700",
    OUT_FOR_DELIVERY: "bg-green-50 text-green-700",
    DELIVERED:        "bg-green-50 text-green-700",
    CANCELLED:        "bg-red-50 text-red-600",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function PaymentBadge({ status }) {
  const map = {
    PAID:     "bg-green-50 text-green-700",
    PENDING:  "bg-amber-50 text-amber-700",
    FAILED:   "bg-red-50 text-red-600",
    REFUNDED: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

function PriceLine({ label, value, bold, green }) {
  return (
    <div className={`flex justify-between text-sm ${bold ? "font-semibold border-t border-gray-100 pt-2 mt-1" : ""}`}>
      <span className="text-gray-500">{label}</span>
      <span className={green ? "text-green-600" : ""}>{value}</span>
    </div>
  );
}