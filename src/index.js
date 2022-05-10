import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { /*BrowserRouter, */ Route } from "react-router";
import { BrowserRouter, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./Components/Navbar";
import HomePage from "./HomePage/HomePage";
import CreateNewIndex from "./CreateNewIndex/CreateNewIndex";
import ExplorerIndexes from "./ExplorerIndexes/ExplorerIndexes"
import Login from "./Login/Login"
import Register from "./Register/Register"
import ForgotPassword from "./ForgotPassword/ForgotPassword"
import App from "./App";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Navbar
      pages={[
        { name: "Create New Index", href: "/create-new-index" },
        { name: "Explorer Indexes", href: "/explorer-indexes" },
        { name: "Login", href: "/login" },
      ]}
      settings={[
        { name: "Login", href: "/login" },
        { name: "Register", href: "/register" },
      ]}
    />
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/create-new-index' element={<CreateNewIndex />} />
        <Route path='/explorer-indexes' element={<ExplorerIndexes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
