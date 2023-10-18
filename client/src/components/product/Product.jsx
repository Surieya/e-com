import React from "react";

const Product = ({ img, id }) => {
  return (
    <section className="product" key={id}>
      <div className="img-section">
        <img src={img} alt="" />
      </div>
      <div className="overlay"></div>
    </section>
  );
};

export default Product;
