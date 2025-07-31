import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
