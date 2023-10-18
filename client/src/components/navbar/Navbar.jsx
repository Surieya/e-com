import React from "react";
import "./navbar.css";
import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

const Navbar = () => {
  // const user = false;

  const { auth } = useAuth();
  const logout = useLogout();
  // useEffect(() => {
  //   console.log("effect");

  //   return () => {
  //     console.log("return");
  //   };
  // }, []);
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
            <li>
              <Link to="/cart">
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
            <li className="text-2xl">
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
