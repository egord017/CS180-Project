import React,{Fragment, useState, useEffect} from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";

//components
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import GroupPage from './pages/groupTemp';
import ChannelPage from './pages/channelPage';
import ThreadPage from './pages/threadPage';
import ThreadPostForm from './pages/threadPostForm';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth(){
    try {
      
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseResponse = await response.json();

      //console.log(parseResponse);

      if(parseResponse === true){
        setIsAuthenticated(true);
      } else{
        setIsAuthenticated(false);
      }

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  })

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route 
              path="/"
              element={<Navigate to="/login"/>}
              />
            <Route 
              path="/login"
              element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/dashboard" />}
            />
            <Route 
              path="/register" 
              element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/dashboard" />}
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to="/login" />}
            />
            <Route 
              path="/group/:group_id" 
              element={<GroupPage/>}
            />
            <Route 
              path="/channel/:channel_id" 
              element={<ChannelPage/>}
            />
            <Route 
              path="/thread/:thread_id" 
              element={<ThreadPage/>}
            />
            <Route 
              path="/channel/:channel_id/submit" 
              element={<ThreadPostForm/>}
            />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
