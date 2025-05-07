import React from 'react'

const Userdetail = () => {
    const params = useParams();
    const {userId,userName} = params;
    console.log("this is userId", userId);
  return (
    <div>
      <h4>
        This is user details
      </h4>
      <h5>user id : {userId}</h5>
      <h6>user name : {userName}</h6>
    </div>
  )
}

export default Userdetail
