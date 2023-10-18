import React from "react";
import womenImage from "../images/women_image-removebg.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Product = () => {
  const { id, tag } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // console.log(id, tag);
  // console.log("run");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (price) => {
      const res = await axiosPrivate.post(
        `api/cart/${data.product._id}`,
        price
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
    },
    onError: () => {
      setAuth({});
      navigate("/login", { state: { from: location }, replace: true });
    },
    retry: 0,
  });

  function handleClick() {
    mutation.mutate({ price: data.product.price });
  }

  return (
    <>
      {/* <Navbar /> */}
      {data?.product && (
        <main className="product h-auto  bg-slate-900 text-white p-5 flex flex-col gap-10 md:h-[90vh] md:flex-row md:items-center md:gap-5">
          <section className="img-section basis-[50%] rounded shadow-lg  shadow-indigo-400/40 flex items-center">
            <img
              src={data.product.imgUrl}
              className="w-full h-[450px] md:h-full object-scale-down"
              alt="product-image"
            />
          </section>
          <section className="content basis-[50%] flex flex-col justify-start gap-3">
            <h1 className="title text-[2.5rem] p-0 font-bold">
              {/* Lorem ipsum dolor sit amet. */}
              {data.product.title}
            </h1>
            <p className="desc text-[1.25rem]">{data.product.desc}</p>
            <p className="price text-5xl py-5">Rs {data.product.price}</p>
            <div className="input-div flex justify-between gap-3">
              <div className="quantity flex items-center justify-center gap-3">
                <button className="border-2 border-slate h-10 w-10 rounded-full">
                  -
                </button>
                <input
                  type="text"
                  readOnly
                  value={1}
                  className="text-black text-center h-10 w-10  rounded-full"
                />
                <button className="border-2 border-slate w-10 h-10 rounded-full text-center">
                  +
                </button>
              </div>
              <button
                className="bg-indigo-400 text-white px-5 py-2 rounded"
                onClick={handleClick}
              >
                ADD TO CART
              </button>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Product;
