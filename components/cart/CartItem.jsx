import toast from "react-hot-toast";
import {useCart} from "@/app/context/CartContext";

export default function CartItem({ item }) {
  const {fetchCart} = useCart();
           
  const removeItemCartFn = async (id) => {


    const data = await fetch("/api/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const res = await data.json();
    if(res.success){
      toast.success(res.message);
     await fetchCart();
    } else {
      toast.error("Failed to remove item from cart");
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:shadow-lg">

      <div className="flex flex-col md:flex-row">

        {/* IMAGE */}
        <div className="h-56 sm:h-64 md:h-52 md:w-56 lg:h-auto lg:w-72">

          <img
            src={item.plantSnapshot.image}
            alt={item.plantName}
            className="h-full w-full object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-1 flex-col justify-between p-5 md:p-6">

          <div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div>

                <h2 className="text-2xl font-semibold text-gray-800">
                  {item.plantName}
                </h2>

                <div className="mt-3 flex flex-wrap gap-3">

                  <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                    Size: {item.size}
                  </span>

                  <span className="rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
                    Pot: {item.color}
                  </span>
                </div>
              </div>

              <button className="w-fit text-sm font-medium text-red-500 transition hover:text-red-600 hover:cursor-pointer" onClick={() => removeItemCartFn(item._id)}>
                Remove
              </button>
            </div>

            {/* PRICE */}
            <div className="mt-6">

              <div className="flex items-center gap-3">

                <span className="text-3xl font-bold text-gray-800">
                  ₹{item.discountedPrice}
                </span>

                <span className="text-lg text-gray-400 line-through">
                  ₹{item.originalPrice}
                </span>
              </div>

              <p className="mt-2 text-sm font-medium text-green-600">

                You save ₹
                {(item.originalPrice -
                  item.discountedPrice) *
                  item.quantity}
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* QUANTITY */}
            <div className="flex w-fit items-center rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2">

              <button className="px-3 text-lg font-bold text-gray-700 transition hover:text-black">
                -
              </button>

              <span className="min-w-10 text-center text-lg font-semibold text-gray-800">
                {item.quantity}
              </span>

              <button className="px-3 text-lg font-bold text-gray-700 transition hover:text-black">
                +
              </button>
            </div>

            {/* SUBTOTAL */}
            <div className="text-left sm:text-right">

              <p className="text-sm text-gray-500">
                Item Total
              </p>

              <h3 className="text-2xl font-bold text-green-700">

                ₹
                {item.discountedPrice *
                  item.quantity}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}