import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Components/Header";
import Dashboard from "../Components/Dashboard";
import LoginCard from "../Components/LoginCard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <div className="main-content">
          <Routes>
            <Route element={<Dashboard />} path="/home" />
            <Route element={<LoginCard />} path="/login" />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
