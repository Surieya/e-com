import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const REFRESH_URL = "http://localhost:5000/api/user/refresh";
const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    // try {
    const response = await axios.get(REFRESH_URL, {
      withCredentials: true,
    });
    setAuth((prev) => {
      // console.log(prev);
      // console.log(response?.data?.token);
      return { ...prev, accessToken: response.data.token };
    });
    return response.data.token;
    // } catch (error) {
    //   setAuth({});
    //   navigate("/login");
    // }
  };
  return refresh;
};

export default useRefreshToken;
