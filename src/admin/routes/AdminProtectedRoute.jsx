import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("token");

  if (loading) return <div>Loading...</div>;

  
  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }


  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
