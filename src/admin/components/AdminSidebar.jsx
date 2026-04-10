import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import "../styles/adminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();                 // clears token + user
   navigate("/admin/login", { replace: true });

  };

  return (
    <aside className="admin-sidebar">
      <h2>Admin Panel</h2>

      <nav>
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/products">Products Management</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
      </nav>

      {/* LOGOUT */}
      <button className="admin-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
