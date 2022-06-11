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
import IndexPopUp from "./IndexPopUp/IndexPopUp";

import "./App.css";

function App() {
  const [loggedUserToken, setLoggedUserToken] = useState("");
  const [loggedUserName, setLoggedUserName] = useState("");
  const [loggedUserAdmin, setLoggedUserAdmin] = useState(false);

  const setLoggedUserTokenToLocalStorage = (token) => {
    // window.localStorage.setItem('accessToken', token);
    window.localStorage.setItem('authorization', token);
    setLoggedUserToken(token);
  };

  const setLoggedUserNameToLocalStorage = (name) => {
    window.localStorage.setItem('userName', name);
    setLoggedUserName(name);
  };

  const setLoggedUserAdminToLocalStorage = (isAdmin) => {
    if(isAdmin==="true") {
      window.localStorage.setItem('admin', true);
      setLoggedUserAdmin(true);
    } else {
      window.localStorage.setItem('admin', false);
      setLoggedUserAdmin(false);
    }
  };


  useEffect(() => {
    setLoggedUserToken(window.localStorage.getItem('authorization'));
    setLoggedUserName(window.localStorage.getItem('userName'));
    let isAdmin = window.localStorage.getItem('admin')
    if(isAdmin==="true") {
      window.localStorage.setItem('admin', true);
      setLoggedUserAdmin(true);
    } else {
      window.localStorage.setItem('admin', false);
      setLoggedUserAdmin(false);
    }
  }, []);

  return (
    <div className='App'>
      <Navbar
        userToken={loggedUserToken}
        setUserToken={setLoggedUserToken}
        userName={loggedUserName}
        setUserName={setLoggedUserName}
        userAdmin={loggedUserAdmin}
        setUserAdmin={setLoggedUserAdmin}
        pages={[
          { name: "Create New Index", href: "/create-new-index" },
          { name: "Explorer Indexes", href: "/explorer-indexes" },
          { name: "Report A Bug", href: "/report-bug" },
        ]}
        adminPages={[
          { name: "Statistics", href: "/statistics" },
          { name: "Bugs List", href: "/bugs-list" },
        ]}
        settings={[
          { name: "Login", href: "/login" },
          { name: "Register", href: "/register" },
        ]}
      />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage userToken={loggedUserToken} />} />
          <Route path='/create-new-index' element={<CreateNewIndex userToken={loggedUserToken} />} />
          <Route path='/explorer-indexes' element={<ExplorerIndexes userToken={loggedUserToken} />} />
          <Route path='/login' element={<Login setUserToken={setLoggedUserTokenToLocalStorage} setUserName={setLoggedUserNameToLocalStorage} setUserAdmin={setLoggedUserAdminToLocalStorage} /> } />
          <Route path='/register' element={<Register setUserToken={setLoggedUserTokenToLocalStorage} setUserName={setLoggedUserNameToLocalStorage} setUserAdmin={setLoggedUserAdminToLocalStorage} /> } />
          <Route path='/logout' element={<Logout setUserToken={setLoggedUserTokenToLocalStorage} setUserName={setLoggedUserNameToLocalStorage} setUserAdmin={setLoggedUserAdminToLocalStorage} />} />
          <Route path='/IndexPopUp' element={<IndexPopUp userToken={loggedUserToken} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
