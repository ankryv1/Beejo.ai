export async function getShiprocketToken() {
  const response = await fetch(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }),
    },
  );
  
  console.log("EMAIL", JSON.stringify(process.env.SHIPROCKET_EMAIL));
  console.log("PASSWORD", JSON.stringify(process.env.SHIPROCKET_PASSWORD));
  console.log("STATUS", response.status);
  const data = await response.json();
  console.log("Shiprocket auth response:", data);
  if (!data.token) {
    console.error("Shiprocket authentication failed:", data);
    throw new Error(`Shiprocket authentication failed: ${data.message }`);
  }

  return data.token;
}

export async function createShiprocketOrder(order) {

    const totalWeight = order.orderItems.reduce(
        (total, item) =>
            total + item.shipping.weight * item.quantity,
  0
);

const largestItem = order.orderItems.reduce(
  (largest, item) =>
    item.shipping.weight >
    largest.shipping.weight
      ? item
      : largest, order.orderItems[0]
);



  const payload = {
    order_id: order._id.toString(),

    order_date: new Date().toISOString().split("T")[0],

    pickup_location: "work",

    billing_customer_name: order?.shippingAddress?.fullName,

    billing_last_name: "",

    billing_address: order?.shippingAddress?.address,

    billing_city: order?.shippingAddress?.city,

    billing_pincode: order?.shippingAddress?.pincode,

    billing_state: order?.shippingAddress?.state,

    billing_country: "India",

    billing_phone: order?.shippingAddress?.phone,

    shipping_is_billing: true,

    order_items: order?.orderItems?.map((item) => ({
      name: item.plantSnapshot?.plantName,

      sku: `${item.plant.toString()}-${item.size}-${item.color || "default"}`,

      units: item.quantity,

      selling_price: item.price,
    })),

    

    payment_method: order.paymentMethod === "COD" ? "COD" : "Prepaid",

    sub_total: order.totalPrice,

    length: largestItem.shipping.length ,

    breadth: largestItem.shipping.breadth ,

    height: largestItem.shipping.height ,

    weight: totalWeight,
  };
  console.log(
  JSON.stringify(payload, null, 2)
);
  const token = await getShiprocketToken();
  const response = await fetch(
    "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    },
  );

  const data = await response.json();
  console.log("Shiprocket order creation status in file shiprocket.js:", response.status);
  console.log("Shiprocket response:", data);
  if (!data.shipment_id) {
    console.error("Shiprocket order creation failed:", data);
    throw new Error(`Shiprocket order creation failed: ${data.message}`);
  }

  return data;
}
