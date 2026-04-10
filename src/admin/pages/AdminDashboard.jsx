import { useEffect, useState } from "react";
import axios from "axios";
import AdminStatsCard from "../components/AdminStatsCard";
import '../styles/AdminDashboard.css';

// Simple icon components (or you can use react-icons)
const PackageIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const GridIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const DollarIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "auth-token": token };

        const [productsRes, ordersRes, usersRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/admin/orders", { headers }),
          axios.get("http://localhost:5000/api/admin/users", { headers })
        ]);

        setProducts(productsRes.data);
        setOrders(ordersRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + Number(p.instock || 0), 0);
  
  // Calculate real revenue from delivered/completed orders
  // Assuming 'total' is order sum and status should be checked
  const totalSales = orders.reduce((sum, o) => {
    // Optional: only count if status !== 'cancelled'
    if (o.status === 'cancelled') return sum;
    return sum + Number(o.total || 0);
  }, 0);

  const totalUsers = users.length;

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border spinner-border-custom" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's your store overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <AdminStatsCard
            title="Total Revenue"
            value={`Rs ${totalSales.toLocaleString()}`}
            icon={DollarIcon}
            colorClass="green"
          />
          <AdminStatsCard
            title="Total Orders"
            value={orders.length}
            icon={PackageIcon}
            colorClass="purple"
          />
          <AdminStatsCard
            title="Active Products"
            value={totalProducts}
            icon={GridIcon}
            colorClass="blue"
          />
          <AdminStatsCard
            title="Registered Users"
            value={totalUsers}
            icon={GridIcon}
            colorClass="orange"
          />
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2 className="quick-actions-title">Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/admin/products" className="btn btn-primary-gradient" style={{textDecoration: 'none'}}>
              Manage Products
            </Link>
            <Link to="/admin/orders" className="btn btn-outline-custom" style={{textDecoration: 'none'}}>
              View Pending Orders
            </Link>
            <Link to="/admin/users" className="btn btn-outline-custom" style={{textDecoration: 'none'}}>
              View Users List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;