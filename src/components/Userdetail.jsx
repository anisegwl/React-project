import React from "react";
import { useParams } from "react-router-dom";

const Userdetail = () => {
  const params = useParams();
  const { userId, userName, course } = params;
  console.log("this is userid", userId);

  return (
    <div className="container">
      <h4>this is user details</h4>
      <h5>user id: {userId}</h5>
      <h6>user name: {userName}</h6>
      <p>course: {course}</p>
    </div>
  );
};

export default Userdetail;