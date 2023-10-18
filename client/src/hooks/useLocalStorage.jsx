import { useEffect } from "react";
import useAuth from "./useAuth";

const useLocalStorage = () => {
  const { auth } = useAuth();
  const setLocalStorage = () => {
    // console.log("useLocalStorage",auth);
    localStorage.setItem("auth", JSON.stringify(auth));
  };

  return setLocalStorage;
};

export default useLocalStorage;
