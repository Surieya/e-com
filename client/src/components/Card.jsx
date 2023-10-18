import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../api/api";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Card = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  // useEffect(() => {
  //   console.log("Use effect run");

  //   return () => {
  //     console.log("return statement");
  //   };
  // }, []);
  async function addMut(price) {
    console.log("cardMutationFunction");
    const res = await axiosPrivate.post(`api/cart/${product._id}`, price);
    // console.log(res);
    return res.data;
  }
  const Addmutation = useMutation({
    // mutationFn: async (price) => {
    //   console.log("cardMutationFunction");
    //   const res = await axiosPrivate.post(`api/cart/${product._id}`, price);
    //   // console.log(res);
    //   return res.data;
    // },
    mutationFn: addMut,
    onSuccess: () => {
      console.log("cardMutationonSuccess");
      queryClient.invalidateQueries("cart");
    },
    onError: () => {
      console.log("onerror card");
      setAuth({});
      // console.log(auth);
      navigate("/login", { state: { from: location }, replace: true });
    },
    retry: false,
  });

  function handleClick() {
    Addmutation.mutate({ price: product.price });
  }

  return (
    <section className="card flex flex-col w-[300px] h-[300px] bg-slate-900/90 relative rounded overflow-hidden z-20 group/card shadow-lg shadow-indigo-500/40 ">
      <div
        className="img-section w-full h-5/6 flex items-center justify-around z-10
       group-hover/card:-translate-y-3 group-hover/card:scale-[80%] duration-500
       md:scale-100"
      >
        <img
          src={product.imgUrl}
          className="w-full h-full object-scale-down"
          alt=""
        />
      </div>
      <p className="h-1/6 text-white duration-500 py-3 px-2 flex items-center justify-center group-hover/card:-translate-y-[2.5rem]">
        {product.title}&nbsp;&nbsp;{product.price} Rs
      </p>
      <div className="hover-section py-3 flex justify-around items-center duration-500 group-hover/card:-translate-y-[3.5rem]">
        <button
          className="bg-indigo-400 text-white px-5 py-2 rounded duration-700 scale-0 group-hover/card:scale-100"
          onClick={handleClick}
        >
          Add To Cart
        </button>
        <Link to={`/product/${product.tag}/${product._id}`}>
          <button className="bg-indigo-400 text-white px-5 py-2 rounded duration-700 scale-0 group-hover/card:scale-100">
            Product Page
          </button>
        </Link>
      </div>
      <div className="blob absolute rounded-full w-[200px] h-[200px] top-[1rem] right-[3rem] bg-indigo-500 -z-10 scale-0 translate-x-[125%] duration-700 group-hover/card:-translate-x-[0%] group-hover/card:scale-75  md:group-hover/card:scale-100 "></div>
    </section>
  );
};

export default Card;
