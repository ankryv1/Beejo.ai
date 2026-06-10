import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import { getUserFromToken } from "@/lib/getUserFromToken";

import Plant from "@/models/plant.model";
import Order from "@/models/order.model";
import userModel from "@/models/user.model";

export default async function AdminDashboard() {
  await connectDB();

const userId = await getUserFromToken();

if (!userId) {
  redirect("/login");
}

const isAdmin = await userModel.findById(userId);

if (!isAdmin) {
  redirect("/login");
}

if (isAdmin.role !== "ADMIN") {
  redirect("/");
}

  const [
    totalProducts,
    totalOrders,
    pendingOrders,
    orders,
  ] = await Promise.all([
    Plant.countDocuments(),
    Order.countDocuments(),
    Order.countDocuments({
      orderStatus: {
        $in: [
          "PLACED",
          "CONFIRMED",
          "PROCESSING",
          "SHIPPED",
          "OUT_FOR_DELIVERY",
        ],
      },
    }),
    Order.find({}, { totalPrice: 1 }),
  ]);

  const revenue = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of products, orders and revenue
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Total Products"
          value={totalProducts}
          icon="🌱"
        />

        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon="📦"
        />

        <StatCard
          title="Pending Orders"
          value={pendingOrders}
          icon="🚚"
        />

        <StatCard
          title="Revenue"
          value={`₹${revenue.toLocaleString("en-IN")}`}
          icon="💰"
        />

      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-5">

        <a
          href="/admin/products"
          className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition"
        >
          <div className="text-3xl mb-3">🌿</div>

          <h2 className="text-lg font-semibold text-gray-800">
            Manage Products
          </h2> 

          <p className="text-sm text-gray-500 mt-1">
            View, edit and manage all plants
          </p>
        </a>

        <a
          href="/admin/orders"
          className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition"
        >
          <div className="text-3xl mb-3">📦</div>

          <h2 className="text-lg font-semibold text-gray-800">
            Manage Orders
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Track and update customer orders
          </p>
        </a>

      </div>

    </main>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-1">
            {value}
          </h3>
        </div>

        <div className="text-3xl">
          {icon}
        </div>
      </div>

    </div>
  );
}