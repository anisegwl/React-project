import React, { useEffect, useContext, useState } from "react";
import "../styles/profile.css";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";

const Profile = () => {
  const userContext = useContext(UserContext);
  const { user, getUser, editUser } = userContext || {};

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user) {
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      setUserData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(userData); // Add this function in context if not present
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <button type="submit" className="btn-update">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
