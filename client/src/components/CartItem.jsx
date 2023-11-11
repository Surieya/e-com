import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "../api/api";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
// import img from "../assets/women_image.jpg";
// import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const CartItem = ({ productId, quantity }) => {
  const queryClient = useQueryClient();
  const { setAuth, auth } = useAuth();
  // const [q, setQ] = useState(1);
  const axiosPrivate = useAxiosPrivate();
  // const refresh = useRefreshToken();

  const { isLoading, isError, data, error, isFetching } = useQuery(
    ["cartItem", productId],
    {
      queryFn: async () => {
        const response = await axios.get(`/api/products/${productId}`, {});
        return response.data;
      },
      onError: () => {
        console.log("delete onError");
        navigate("/login", { state: { from: location }, replace: true });
        setAuth({});
      },
    }
  );
  // console.log({ data, isFetching });
  const updateMutation = useMutation({
    mutationFn: async (newQuantity) => {
      const res = await axiosPrivate.put(
        `api/cart/${productId}/?q=${newQuantity}`
      );
      return res;
    },
    onSuccess: () => {
      console.log("onsuccess update");
      queryClient.invalidateQueries("cart");
    },
    onError: () => {
      console.log("onerror update");
      setAuth({});
      navigate("/login", { state: { from: location }, replace: true });
    },
    retry: 0,
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      return axiosPrivate.put(`api/cart/${productId}/?del=${true}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
    },
    onError: () => {
      navigate("/login", { state: { from: location }, replace: true });
      setAuth({});
    },
    retry: 0,
  });

  function handleDelete() {
    deleteMutation.mutate();
  }
  function handleClick(btnType) {
    if (btnType === "dec") {
      if (quantity >= 2) {
        // setQ((prev) => prev - 1);
        updateMutation.mutate(quantity - 1);
      }
    } else {
      // setQ((prev) => prev + 1);
      updateMutation.mutate(quantity + 1);
    }
  }
  //problem
  // useEffect(() => {
  //   updateMutation.mutate();
  // }, [q]);

  // useEffect(() => {
  //   setQ(quantity);
  // }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <section
          className={
            updateMutation.isLoading
              ? "main flex bg-slate-900 py-2 w-[80%] h-[200px] shadow-md shadow-indigo-500 opacity-20"
              : "main flex bg-slate-900 py-2 w-[80%] h-[200px] shadow-md shadow-indigo-500"
          }
        >
          <div className="left flex flex-col flex-1 items-center justify-center h-full gap-1">
            <section className="img-sec h-[80%] w-[80%]">
              <img
                src={data.product.imgUrl}
                className="w-[100%] h-[100%] object-contain object-center"
                alt=""
              />
            </section>

            <section className="btns-sec text-white">
              <div className="btns flex gap-1">
                <button
                  className="bg-red-600 p-1 rounded-md"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <div
                  className={
                    updateMutation.isLoading
                      ? "inc-dec flex justify-center w-[120px] rounded-md overflow-hidden disabled:opacity-75"
                      : "inc-dec flex justify-center w-[120px] rounded-md overflow-hidden"
                  }
                >
                  <button
                    className="bg-indigo-500 px-3"
                    onClick={() => handleClick("dec")}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="px-4 text-center text-black"
                    readOnly
                    value={quantity}
                  />
                  <button
                    className="bg-indigo-500 px-3"
                    onClick={() => handleClick("inc")}
                  >
                    +
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div className="right text-white flex flex-col justify-around flex-1">
            <h1 className="heading font-bold">{data.product.title}</h1>
            <p className="desc text-sm">{data.product.desc}</p>
            <p className="price">{data.product.price} Rs</p>
          </div>
        </section>
      )}
    </>
  );
};

export default CartItem;
