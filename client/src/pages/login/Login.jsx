import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
import axios from "../../api/api";
import { useState, useEffect, useRef } from "react";
import loginImage from "../../images/login-register-img-3.jpg";
// import AuthContext from "../../context/AuthProvider";
import "./login.css";
import useAuth from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const LOGIN_URL = "http://localhost:5000/api/user/login";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // console.log(from);
  // const { setAuth } = useContext(AuthContext);
  const { setAuth } = useAuth();
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
    if (from !== "/") {
      toast.warn("Session Expired Login Again");
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "api/user/login",
        JSON.stringify({ email: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const accessTokenDb = response?.data?.token;
      const userNameDb = response?.data?.userName;
      const emailDb = response?.data?.email;
      // const roles = response?.data?.roles;
      setAuth({
        email: emailDb,
        userName: userNameDb,
        accessToken: accessTokenDb,
      });
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <main className="login bg-slate-900 h-[100vh] w-full flex justify-center items-center">
      <div className="card flex w-[60%] h-auto shadow-lg shadow-indigo-500/50">
        <section className="hidden md:flex md:flex-1">
          <img
            src={loginImage}
            className="h-full w-full object-fill object-center"
            alt="vase-image"
          />
        </section>
        <section className="form-section h-auto bg-slate-800 text-white flex-1">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p
            ref={errRef}
            className={errMsg ? "relative bottom-2" : "absolute left-[-999px]"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="email"
                placeholder="Email"
                className="p-2 bg-slate-800 shadow-sm shadow-indigo-500/50"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </label>
            <label>
              <input
                type="password"
                placeholder="Password"
                className="p-2 bg-slate-800 shadow-sm shadow-indigo-500/50"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </label>
            <p>
              Did'nt have an account{" "}
              <Link to="/register">
                <span className="font-semibold">register</span>
              </Link>
            </p>
            <button className="bg-indigo-500">Login</button>
          </form>
        </section>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Login;
