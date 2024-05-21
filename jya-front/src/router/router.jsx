import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './../pages/login.jsx';
const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            {/* <Route path="/Login" element={}></Route> */}
        </Routes>
    )
}

export default Router;