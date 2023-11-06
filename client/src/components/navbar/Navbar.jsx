import React from "react";
import "./navbar.css";
import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  // const user = false;
  const { auth, setAuth } = useAuth();
  const { cart } = useCart();
  const logout = useLogout();

  async function handleLogout() {
    await logout();
  }

  return (
    <nav className="navbar p-4 bg-slate-900 h-[10vh]">
      <div className="logo">
        {/* <h1 className="text-2xl font-semibold">BRUTE</h1> */}
      </div>
      <ul className="nav-links">
        {auth?.userName ? (
          <>
            <p>Hello {auth.userName}</p>
            <li className="text-2xl relative">
              <Link to="/cart">
                <span className="text-[12px] w-[20px] h-[20px] flex justify-center items-center absolute rounded-full bg-red-500 top-[-5px] left-5">
                  {cart.count}
                </span>
                <FaShoppingCart />
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li className="text-2xl relative">
              <Link to="/cart">
                <FaShoppingCart />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
