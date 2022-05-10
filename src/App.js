import Navbar from "./Components/Navbar";
import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import CreateNewIndex from "./CreateNewIndex/CreateNewIndex";
import ExplorerIndexes from "./ExplorerIndexes/ExplorerIndexes"
import Login from "./Login/Login"
import Register from "./Register/Register"

import "./App.css";

function App() {


  return (
    <div className='App'>
      <Navbar
        pages={[
          { name: "Create New Index", href: "/create-new-index" },
          { name: "Explorer Indexes", href: "/explorer-indexes" },
          { name: "Login", href: "/login" },
          { name: "Register", href: "/register" },
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
    </div>


  );
}

export default App;
