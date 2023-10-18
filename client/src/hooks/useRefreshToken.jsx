import axios from "axios";
import useAuth from "./useAuth";

const REFRESH_URL = "http://localhost:5000/api/user/refresh";
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(REFRESH_URL, {
      withCredentials: true,
    });
    setAuth((prev) => {
      // console.log(prev);
      // console.log(response?.data?.token);
      return { ...prev, accessToken: response.data.token };
    });
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
