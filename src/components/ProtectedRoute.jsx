import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { logout } = useAuth();
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = jwtDecode(token);
    const now = Date.now() / 1000;

    if (payload.exp < now) {
      logout();
      return <Navigate to="/login" replace />;
    }
  } catch {
    logout();
    return <Navigate to="/login" replace />;
  }

  return children;
}
