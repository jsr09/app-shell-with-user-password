import React from 'react';
import {Routes, Route } from'react-router-dom';
import Login from './Login';
import Profile from './Profile';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
};

export default App;