import "./App.css";
import { useEffect } from "react";
import Login from "./pages/login/Login";
import useLogout from "./hooks/useLogout";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Cart from "./pages/Cart";
// import Card from "./components/Card";
import Product from "./pages/Product";
import Payment from "./pages/Payment";
import { Navigate, useNavigate, Routes, Route } from "react-router-dom";
import AllProducts from "./pages/allproducts/AllProducts";
import Navbar from "./components/navbar/Navbar";
import CartItem from "./components/CartItem";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import useAuth from "./hooks/useAuth";
function App() {
  // const user = false;
  const { auth } = useAuth();
  const logout = useLogout();
  const NavLayout = () => {};

  console.log({ auth });
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={auth?.userName ? <Navigate to="/" replace /> : <Login />}
          // element={<Login />}
        />
        <Route
          path="/register"
          element={auth?.userName ? <Navigate to="/" replace /> : <Register />}
          // element={<Register />}
        />

        <Route path="/products/*" element={<AllProducts />}></Route>
        <Route path="/product/:tag/:id" element={<Product />}></Route>
        {/* <Route element={<PersistLogin />}> */}
        <Route element={<RequireAuth />}>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
        </Route>
        {/* </Route> */}
      </Routes>
    </>
    // <CartItem />
    // <Cart />
  );
}

export default App;
