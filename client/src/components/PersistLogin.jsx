import React from "react";
import { Outlet } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLocalStorage from "../hooks/useLocalStorage";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const setLocalStorage = useLocalStorage();
  useEffect(() => {
    let isMounted = true;
    console.log({ auth });
    const verifyRefreshToken = async () => {
      console.log("persist refresh effect");
      try {
        await refresh();
        const response = await axiosPrivate.get("/api/user/profile", {});
        const { userName, email } = response.data;
        setAuth((prev) => {
          console.log({ userName, email });
          return { ...prev, userName, email };
        });
        setLocalStorage();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  console.log("persist");
  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
