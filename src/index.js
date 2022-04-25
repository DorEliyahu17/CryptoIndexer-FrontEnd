import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { /*BrowserRouter, */ Route } from "react-router";
import { BrowserRouter, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./pages/Navbar";
import HomePage from "./HomePage/HomePage";
import CreateNewIndex from "./CreateNewIndex/CreateNewIndex";
import App from "./App";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Navbar
      pages={[
        { name: "Create New Index", href: "/create-new-index" },
        { name: "Create New Index1", href: "/create-new-index1" },
        { name: "Create New Index2", href: "/create-new-index2" },
      ]}
      settings={[]}
    />
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/create-new-index' element={<CreateNewIndex />} />
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode> //),
  // document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
