import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  // const user = true;
  //

  return auth?.userName ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace={true} />
    // <Outlet />
  );
};

export default RequireAuth;
