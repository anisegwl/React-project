import React from "react";
import { useNavigate } from "react-router-dom";

const Userlist = () => {
  const navigate = useNavigate();
  const users = [
    { _id: 1, name: "John", address: "kathmandu", courseTaken: "mern" },
    { _id: 2, name: "Dipak", address: "Pokhara", courseTaken: "python" },
    { _id: 3, name: "Raj", address: "Biratnagar", courseTaken: "Django" },
    {
      _id: 4,
      name: "Rajesh",
      address: "Dharan",
      courseTaken: "Graphics",
    },
    {
      _id: 5,
      name: "Sanjaya",
      address: "Butwal",
      courseTaken: "marketing",
    },
  ];
  const handleUser = (userId, userName, course) => {
    console.log("User clicked", course);
    navigate(`/${userId}/${userName}/${course}`);
  };
  return (
    <div className="container">
      <h4>user list </h4>
      <ul>
        {users.map((user) => {
          return (
            <li
              key={user._id}
              onClick={() => handleUser(user._id, user.name, user.courseTaken)}
            >
              {user.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Userlist;