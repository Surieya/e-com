import React from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useReducer, useEffect, useState, useRef } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import loginImage from "../../images/login-register-img-1.jpg";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const REGISTER_URL = "http://localhost:5000/api/user";

const Register = () => {
  // const initialState = {
  //   username: "",
  //   email: "",
  //   password: "",
  // };
  // function reducer(state, action) {
  //   switch (action.type) {
  //     case "username":
  //       return {
  //         ...state,
  //         username: action.username,
  //       };
  //     case "email": {
  //       return {
  //         ...state,
  //         email: action.email,
  //       };
  //     }
  //     case "password": {
  //       return {
  //         ...state,
  //         password: action.password,
  //       };
  //     }
  //   }
  // }
  // const [state, dispatch] = useReducer(reducer, initialState);
  // function handleClick(e) {
  //   e.preventDefault();

  //   dispatch({ type: "username", username: "" });
  //   dispatch({ type: "email", email: "" });
  //   dispatch({ type: "password", password: "" });

  //   console.log(state);
  // }
  // useEffect(() => {
  //   console.log("register useEffect");
  //   return () => console.log("register return");
  // }, []);
  // console.log("register render");
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ userName: user, email: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      // console.log(response?.accessToken);
      // console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
      setEmail("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <main className="register h-[100vh] bg-slate-900 w-full flex justify-center items-center">
      <div className="card flex w-[60%] h-auto shadow-lg shadow-indigo-500/50 rounded ">
        {success ? (
          <section className="text-white h-auto bg-slate-800 flex-1">
            <h1>Success!</h1>
            <p>
              <Link to={"/login"}>Login</Link>
            </p>
          </section>
        ) : (
          <section className="form-section h-auto bg-slate-800 text-white flex-1">
            <h1 className="text-2xl font-semibold">Register</h1>
            <p
              ref={errRef}
              className={
                errMsg ? "relative bottom-2" : "absolute left-[-999px]"
              }
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form className="h-full" onSubmit={handleSubmit}>
              <label>
                <input
                  type="text"
                  placeholder="Username"
                  className="p-2 bg-slate-800 shadow-sm shadow-indigo-500/50"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
              </label>
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? "relative bottom-2"
                    : "absolute left-[-900px]"
                }
              >
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              <label>
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 bg-slate-800 shadow-sm shadow-indigo-500/50"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
              </label>
              <p
                id="uidnote"
                className={
                  emailFocus && email && !validEmail
                    ? "relative bottom-2"
                    : "absolute left-[-900px]"
                }
              >
                Letters, numbers, underscores are only allowed.
              </p>
              <label>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="p-2 bg-slate-800 shadow-sm shadow-indigo-500/50"
                />
              </label>
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd
                    ? "relative bottom-2"
                    : "absolute left-[-999px]"
                }
              >
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>

              <label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="p-2 bg-slate-800 shadow-sm shadow-indigo-500/50"
                />
              </label>
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch
                    ? "relative bottom-2"
                    : "absolute left-[-999px]"
                }
              >
                {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                Must match the first password input field.
              </p>

              <p>
                Have an account{" "}
                <Link to="/login">
                  <span className="font-semibold">login</span>
                </Link>
              </p>

              <button
                className={
                  !validName || !validPwd || !validMatch
                    ? "cursor-not-allowed bg-indigo-500/70"
                    : "cursor-pointer bg-indigo-500/70"
                }
                type="submit"
                disabled={!validName || !validPwd || !validMatch ? true : false}
              >
                Register
              </button>
            </form>
          </section>
        )}
        <section className="hidden md:flex md:flex-1">
          <img
            src={loginImage}
            className="h-full w-full object-fill object-center"
            alt="vase-image"
          />
        </section>
      </div>
    </main>
  );
};

export default Register;
