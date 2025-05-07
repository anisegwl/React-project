import React from 'react'
import { useNavigate } from 'react-router-dom'

const Userlist = () => {
    const navigate = useNavigate()

    const users = [
        { _id: 1, name: 'John', address: "Kathmandu" },
        { _id: 2, name: 'Doe', address: "Pokhara"},
        { _id: 3, name: 'Jane', address: "Lalitpur"},
        { _id: 4, name: 'Alom', address: "Bhutan"},
        { _id: 5, name: 'Payal', address: "Bhaktapur"},
        { _id: 6, name: 'Rajesh', address: "Nuwakot"},
        
    ]

    const handleUser = (userId, userName)=>{
        console.log("User clicked",userName);
        navigate(`/${userId}/${userName}`);
    }
  return (
    <div>
      <h4>USer List</h4>
      <ul>
     {users.map((user)=>{
        return(
        <li key={user._id} onClick={()=> handleUser(user._id,user.name)}>
            {user.name}
        </li>
        )
     })}
      </ul>
    </div>
  )
}

export default Userlist
