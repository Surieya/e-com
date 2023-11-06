import axios from "../api/api";
import useAuth from "./useAuth";
import useCart from "./useCart";

const useLogout = () => {
  const { setAuth } = useAuth();
  const { setCart } = useCart();
  const logout = async () => {
    setAuth({});
    setCart({});
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
