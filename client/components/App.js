import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
