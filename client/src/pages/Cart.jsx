import CartItem from "../components/CartItem";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

const Cart = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth, auth } = useAuth();
  const { setCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  async function fetchCart() {
    const response = await axiosPrivate.get("/api/cart", {});
    return response.data;
  }
  const { isLoading, isError, data, error, isFetching } = useQuery("cart", {
    queryFn: fetchCart,
    onError: () => {
      setAuth({});
      console.log("onError Cart");
      navigate("/login", { state: { from: location }, replace: true });
    },
    onSuccess: () => {
      // let cartItemsCount = 0;
      // if (data && data.cart) {
      //   cartItemsCount = data?.cart?.products?.length;
      // }
      // console.log(cartItemsCount);
      // setCart({
      //   count: Number(cartItemsCount),
      // });
    },
    retry: 0,
  });
  console.log("CART", data);

  return (
    <section className="bg-slate-900 text-white flex flex-col items-center gap-2 py-5">
      {!isError &&
        data?.cart &&
        data.cart.products.map((product) => {
          return (
            <CartItem
              productId={product.productId}
              quantity={product.quantity}
              key={product.productId}
            />
          );
        })}
      {data?.msg && <h1>{data.msg}</h1>}

      <div className="w-[80%] flex justify-between">
        <label className="flex text-center items-center">
          Total:
          <input
            type="text"
            className="text-black w-14 text-center"
            value={data ? data.totalPrice : 0}
            readOnly
          />
        </label>
        <button
          className="p-2 rounded-md text-white bg-indigo-500"
          onClick={() => navigate("/payment")}
        >
          Check Out
        </button>
      </div>
    </section>
  );
};

export default Cart;
