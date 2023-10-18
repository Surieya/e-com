import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "./Card";

const Users = () => {
  const [products, setProducts] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    // console.log("user effect");
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/api/products/test", {});
        // console.log(response.data);
        isMounted && setProducts(response.data);
      } catch (err) {
        // navigate("/login", { state: { from: location }, replace: true });
        console.log(err);
        setAuth({});
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      // console.log("user return");
      isMounted = false;
    };
  }, []);
  // console.log("user");
  return (
    <>
      {products &&
        products.products.map((product, index) => {
          return <Card key={index} product={product} />;
        })}
    </>
  );
};

export default Users;
