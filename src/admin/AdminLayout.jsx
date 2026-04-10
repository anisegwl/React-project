import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import "./styles/admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
