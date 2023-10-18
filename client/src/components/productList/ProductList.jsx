import React from "react";
// import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";
import menImage from "../../images/men_image-removebg.png";
import womenImage from "../../images/women_image-removebg.png";
import kidsImage from "../../images/kids_image-removebg.png";
import uniImage from "../../images/unisex_image-removebg.png";
const ProductList = () => {
  return (
    <>
      <h1 className="text-2xl/[17px] font-semibold p-5 bg-slate-900 text-white">
        OUR CATEGORIES
      </h1>
      <section className="productList grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-3 p-7 bg-slate-900 ">
        <div className="card h-[400px] bg-slate-800/40 shadow-xl overflow-hidden group">
          <div className="flex flex-col h-full">
            <h1 className="text-2xl/[17px] font-semibold text-white">Mens</h1>
            <img
              src={menImage}
              alt=""
              className="h-full scale-75 object-scale-down"
            />
          </div>
          <div className="overlay w-full h-full bg-black bg-opacity-20 translate-y-[100%] group-hover:-translate-y-[100%] ease-in-out duration-700">
            <Link to="/products/men">
              <button className="bg-indigo-500 p-4 rounded text-white">
                EXPLORE MORE
              </button>
            </Link>
          </div>
        </div>

        <div className="card h-[400px] bg-slate-800/40 rounded-md  shadow-xl overflow-hidden group">
          <div className="flex flex-col h-full">
            <h1 className="text-2xl/[17px] font-semibold text-white">Womens</h1>
            <img
              src={womenImage}
              alt=""
              className="h-full scale-75 object-contain"
            />
          </div>
          <div className="overlay w-full h-full bg-black bg-opacity-20 translate-y-[100%] group-hover:-translate-y-[100%] ease-in-out duration-700">
            <Link to="/products/women">
              <button className="bg-indigo-500 p-4 rounded text-white">
                EXPLORE MORE
              </button>
            </Link>
          </div>
        </div>
        <div className="card h-[400px] bg-slate-800/40 rounded-md  shadow-xl overflow-hidden group">
          <div className="flex flex-col h-full">
            <h1 className="text-2xl/[17px] font-semibold text-white">Kids</h1>
            <img
              src={kidsImage}
              alt=""
              className="h-full scale-75 object-scale-down"
            />
          </div>
          <div className="overlay w-full h-full bg-black bg-opacity-20 translate-y-[100%] group-hover:-translate-y-[100%] ease-in-out duration-700">
            <Link to="/products/kids">
              <button className="bg-indigo-500 p-4 rounded text-white">
                EXPLORE MORE
              </button>
            </Link>
          </div>
        </div>
        <div className="card h-[400px] bg-slate-800/40 rounded-md shadow-xl overflow-hidden group">
          <div className="flex flex-col h-full">
            <h1 className="text-2xl/[17px] font-semibold text-white">Unisex</h1>
            <img
              src={uniImage}
              alt=""
              className="h-full scale-75 object-scale-down"
            />
          </div>
          <div className="overlay w-full h-full bg-black bg-opacity-20 translate-y-[100%] group-hover:-translate-y-[100%] ease-in-out duration-700">
            <Link to="products/unisex">
              <button className="bg-indigo-500 p-4 rounded text-white">
                EXPLORE MORE
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductList;
