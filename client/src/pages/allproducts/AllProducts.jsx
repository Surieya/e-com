import React from "react";
import { useQuery } from "react-query";
import axios from "../../api/api";
import Card from "../../components/Card";
import { useLocation } from "react-router-dom";

const AllProducts = () => {
  const location = useLocation();
  const type = location.pathname.split("/")[2];

  async function fetchProducts() {
    const res = await axios.get(`api/products?tag=${type}`);
    return res.data;
  }

  const { isLoading, isError, data, error } = useQuery(
    "products",
    fetchProducts
  );
  // console.count("render allProducts");
  console.log(data);
  return (
    <main className="w-full h-auto text-white flex flex-col justify-center items-center bg-slate-900">
      <h1 className="text-2xl">DRESSES FOR {type.toUpperCase()}</h1>
      <section className="py-8 grid gap-5 md:gap-12 grid-col-1 md:grid-cols-2 lg:grid-cols-3">
        {data &&
          data.products.map((product, index) => {
            return <Card key={index} product={product} />;
          })}
      </section>
    </main>
    // <></>
  );
};

export default AllProducts;
