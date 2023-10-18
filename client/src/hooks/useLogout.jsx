import axios from "../api/api";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.get("api/user/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("auth");
    } catch (err) {}
  };
  return logout;
};

export default useLogout;
