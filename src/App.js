import Navbar from "./Components/Navbar";
import React, { useState, useEffect } from "react";
import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import HomePage from "./HomePage/HomePage";
import CreateNewIndex from "./CreateNewIndex/CreateNewIndex";
import ExplorerIndexes from "./ExplorerIndexes/ExplorerIndexes";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";
import Register from "./Register/Register";
// import NewAccount from "./NewAccount/NewAccount";
import IndexPopUp from "./IndexPopUp/IndexPopUp";

import "./App.css";

function App() {
  const [loggedUserToken, setLoggedUserToken] = useState("");

  const setLoggedUserTokenToLocalStorage = (token) => {
    window.localStorage.setItem('accessToken', token);
  }; 

  useEffect(() => {
    // debugger
    console.log(window.localStorage.getItem('accessToken'));
    // debugger
    setLoggedUserToken(window.localStorage.getItem('accessToken'));
  }, []);

  return (
    <div className='App'>
      <Navbar
        userToken={loggedUserToken}
        pages={[
          { name: "Create New Index", href: "/create-new-index" },
          { name: "Explorer Indexes", href: "/explorer-indexes" },
        ]}
        settings={[
          { name: "Login", href: "/login" },
          { name: "Register", href: "/register" },
        ]}
      />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage propsUserToken={loggedUserToken} />} />
          <Route path='/create-new-index' element={<CreateNewIndex userToken={loggedUserToken} />} />
          <Route path='/explorer-indexes' element={<ExplorerIndexes userToken={loggedUserToken} />} />
          <Route path='/login' element={<Login setUserToken={setLoggedUserTokenToLocalStorage} />} />
          <Route path='/register' element={<Register setUserToken={setLoggedUserTokenToLocalStorage} />} />
          <Route path='/logout' element={<Logout setUserToken={setLoggedUserTokenToLocalStorage} />} />
          {/* <Route path='/NewAccount' element={<NewAccount />} /> */}
          <Route path='/IndexPopUp' element={<IndexPopUp userToken={loggedUserToken} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>


  );
}

export default App;
