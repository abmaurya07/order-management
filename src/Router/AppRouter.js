import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Components/Header";
import Dashboard from "../Components/Dashboard";
import LoginCard from "../Components/LoginCard";
import RegisterCard from "../Components/Register";
import ErrorPage from "../Components/ErrorPage";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(( ) => {
  
  if (JSON.parse(localStorage.getItem('isLoggedIn'))){
    setIsLoggedIn(JSON.parse(localStorage.getItem('isLoggedIn')))
  }


}, [JSON.parse(localStorage.getItem('isLoggedIn'))])
  return ( isLoggedIn ?
    <BrowserRouter>
      <div>
        <div className="main-content">
          <Header setIsLoggedIn={setIsLoggedIn}/>
          <Routes>
            <Route element={<Dashboard />} path="/home" />
    <Route path="*" element={<Dashboard />} />


            
          </Routes>
        </div>
      </div>
    </BrowserRouter> : <BrowserRouter> 
    
    <Routes>
    <Route element={<LoginCard setIsLoggedIn={setIsLoggedIn}/>} path="/login" />
    <Route element={<RegisterCard />} path="/register" />

    <Route path="*" element={<ErrorPage/>} />

    </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
