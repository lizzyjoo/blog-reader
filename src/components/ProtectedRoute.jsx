// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children }) {
  // children is createpost component
  // token has header.payload.signature
  const token = localStorage.getItem("token"); // jwt token saved in local storage

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // check if token has expired
    const payload = jwtDecode(token);
    const now = Date.now() / 1000;
    if (payload.exp < now) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return children; // render the protected component
}
