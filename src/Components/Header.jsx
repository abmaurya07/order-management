import React from "react";
import { useState, useEffect } from "react";
import Avatar from "../assets/images/avatar.png"
import { useNavigate } from "react-router-dom";


const Header = ({setIsLoggedIn}) => {
  const [userData, setUserData] = useState()
  const [isHidden, setIsHidden] = useState(true)
console.log("userData", userData)
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userData')))
  }, [])


console.log("userData", userData)

 const navigate = useNavigate()
  const handleLogout= () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userData")
    setIsLoggedIn(false)
    navigate("/login")
  }
  return (
    <>
    <header className="container-fluid bg-light pt-2">
      <div className=" d-flex justify-content-between">
        <div>
      <h1 className="dark-mode fw-bold text-uppercase ">Order Management</h1></div>
      <div className="d-flex">
        <p className="fw-bold text-muted pt-3 ">{userData && userData[0].fullName}</p>
        <img src={Avatar}  className="rounded-circle cursor-pointer avatar"  onClick={() => {setIsHidden(!isHidden)}}/> 
        
     
        
        </div>
      
      </div>
    </header>
{isHidden ? null : (
    <div className="d-flex justify-content-end ">
      <div className=" p-1 m-2 cardProp">
      <h6>{userData && userData[0].email}</h6>
      <h6 className="cursor-pointer" onClick={()=> {handleLogout()}}>Logout</h6>
      </div>
    </div> ) }
    </>
  );
};

export default Header;
