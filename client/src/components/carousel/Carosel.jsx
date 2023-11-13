import React from "react";
import { useNavigate } from "react-router-dom";
import "./carosel.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useState, useEffect } from "react";
const sliderItems = [
  {
    id: 1,
    img: "https://res.cloudinary.com/e-compractice/image/upload/v1691941839/e-com-images/womens-img-1_prev_ui_vfnqkj.png",
    title: "UNIQUE COLLECTION FOR WOMEN",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "f5fafd",
    url: "/products/women",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/e-compractice/image/upload/v1691941839/e-com-images/unisex-img-4_prev_ui_pbl2lu.png",
    title: "KIDS FASHION COLLECTION",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "fcf1ed",
    url: "/products/kids",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/e-compractice/image/upload/v1691941838/e-com-images/mens-img-4_prev_ui_kag9ix.png",
    title: "FORMAL AND CAUSAL DRESSES FOR MEN",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "fbf0f4",
    url: "/products/men",
  },
];

const Carosel = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const inter = setTimeout(() => {
      //   console.log("interval");
      setIndex((prev) => (prev < 2 ? prev + 1 : 0));
    }, 5000);
    return () => clearTimeout(inter);
  }, [index]);

  function handleClick(dir) {
    console.log(dir);
    if (dir === "right") {
      setIndex((prev) => (prev < 2 ? prev + 1 : 0));
    } else {
      setIndex((prev) => (prev > 0 ? prev - 1 : 2));
    }
  }
  return (
    <main className="carosel h-auto min-h-[400px] md:h-[90vh] bg-slate-900">
      <div
        className="arrow"
        style={{ left: "10px" }}
        onClick={() => handleClick("left")}
      >
        <BsChevronLeft className="w-6 text-white md:w-auto" />
      </div>
      <div
        className="wrapper"
        style={{ transform: `translateX(${index * -100}vw)` }}
      >
        {sliderItems.map((item) => (
          <div className="slide" key={item.id}>
            <section className="img-section relative">
              <img
                src={item.img}
                className=" h-[400px] w-full object-scale-down object-center md:h-[500px]"
                alt="image"
              />
            </section>
            <section className="content-section flex flex-col items-start justify-center">
              <h1 className="text-2xl text-white font-bold">{item.title}</h1>
              <p className="text-start text-slate-400 p-3">{item.desc}</p>
              <button
                onClick={() => navigate(item.url)}
                className="bg-indigo-500 p-4 rounded text-white"
              >
                SHOW MORE
              </button>
            </section>
          </div>
        ))}
      </div>
      <div
        className="arrow"
        style={{ right: "10px" }}
        onClick={() => handleClick("right")}
      >
        <BsChevronRight className="w-6 text-white md:w-auto" />
      </div>
    </main>
  );
};

export default Carosel;
