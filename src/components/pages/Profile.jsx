import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user/UserContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Profile = () => {
  const userContext = useContext(UserContext);
  const { user, getUser, editUser, loading } = userContext || {};

  const [saving, setSaving] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user && getUser) {
      getUser();
    }
  
  }, [token]);


  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setUserData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("❌ Please login first.");
      return;
    }

    if (!userData.name.trim()) {
      toast.error("❌ Name is required");
      return;
    }

    if (!userData.email.trim()) {
      toast.error("❌ Email is required");
      return;
    }

    try {
      setSaving(true);
      await editUser(userData);
      toast.success("✅ Profile updated");
    } catch (err) {
      toast.error(err?.message || "❌ Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
          <p className="text-gray-600 mt-2">Please login to view your profile.</p>
          <Link
            to="/login"
            className="inline-block mt-6 px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-black transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <p className="text-gray-600 mt-1">
            Update your account details.
          </p>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-gray-900 text-white py-3 font-semibold hover:bg-black transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
