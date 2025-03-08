import React,{Fragment, useState, useEffect} from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";

//components
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Groups from './pages/groups';
import GroupPage from './pages/groupPage';
import GroupPageTemp from './pages/groupTemp';
import ChannelPage from './pages/channelPage';
import ThreadPage from './pages/threadPage';

import GroupPostForm from './pages/groupPostForm';
import ChannelPostForm from './pages/channelPostForm';
import ThreadPostForm from './pages/threadPostForm';

import ProfilePage from './pages/profilePage';

import NewGroup from './pages/newGroup';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    isAuth();
  });

  if (loading) {
    return <div>Loading...</div>; // Prevents incorrect redirects
  }

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
              path="/groups" 
              element={isAuthenticated ? <Groups/> : <Navigate to="/login" />}
            />
            <Route
              path="groups/new_group"
              element={isAuthenticated? <NewGroup /> : <Navigate to="/login" />}
            />  
            <Route 
              path="/group/:group_id" 
              element={isAuthenticated ? <GroupPageTemp/> : <Navigate to="/login" />}
            />
            
            <Route 
              path="/channel/:channel_id" 
              element={isAuthenticated ? <ChannelPage/> : <Navigate to="/login" />}
            />
            <Route 
              path="/thread/:thread_id" 
              element={isAuthenticated ? <ThreadPage/> : <Navigate to="/login" />}
            />
            <Route 
              path="/group/submit" 
              element={<GroupPostForm/>}
            />
            <Route 
              path="/group/:group_id/submit" 
              element={<ChannelPostForm/>}
            />
            <Route 
              path="/channel/:channel_id/submit" 
              element={isAuthenticated ? <ThreadPostForm/> : <Navigate to="/login" />}
            />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route
              path="/new_group"
              element={isAuthenticated? <NewGroup /> : <Navigate to="/login" />}
            />  
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
