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

import WorkshopPage from './pages/workshopPage';
import WorkshopThreadPage from './pages/workshopThreadPage';
import CritiquePage from './pages/critiquePage';

//submit forms
import GroupPostForm from './pages/groupPostForm';
import ChannelPostForm from './pages/channelPostForm';
import ThreadPostForm from './pages/threadPostForm';
import CritiquePostForm from './pages/critiquePostForm';
import WorkshopPostForm from './pages/workshopPostForm';
import WorkshopThreadPostForm from './pages/workshopThreadPostForm';


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
              element={isAuthenticated ? <Groups setAuth={setAuth}/> : <Navigate to="/login" />}
            />
            <Route
              path="groups/new_group"
              element={isAuthenticated? <NewGroup setAuth={setAuth} /> : <Navigate to="/login" />}
            />  
            <Route 
              path="/group/:group_id" 
              element={isAuthenticated ? <GroupPageTemp setAuth={setAuth} /> : <Navigate to="/login" />}
            />
            
            <Route 
              path="/channel/:channel_id" 
              element={isAuthenticated ? <ChannelPage/> : <Navigate to="/login" />}
            />
            <Route 
              path="/thread/:thread_id" 
              element={isAuthenticated ? <ThreadPage setAuth={setAuth}/> : <Navigate to="/login" />}
            />
            <Route 
              path="/group/submit" 
              element={<GroupPostForm/>}
            />
            <Route 
              path="/group/:group_id/channel-submit" 
              element={<ChannelPostForm/>}
            />
            <Route 
            path="/group/:group_id/workshop-submit" 
            element={<WorkshopPostForm/>}
            />
            <Route 
              path="/channel/:channel_id/submit" 
              element={isAuthenticated ? <ThreadPostForm/> : <Navigate to="/login" />}
            />
            <Route 
              path="/profile/:userName" 
              element={isAuthenticated ? <ProfilePage setAuth = {setAuth}/> : <Navigate to="/login" />} 
            />
            <Route
              path="/new_group"
              element={isAuthenticated? <NewGroup /> : <Navigate to="/login" />}
            />  
            <Route 
              path="/workshop/:workshop_id/" 
              element={isAuthenticated ? <WorkshopPage/> : <Navigate to="/login" />}
            />
            <Route 
              path="/workshop-thread/:workshop_thread_id/" 
              element={isAuthenticated ? <WorkshopThreadPage/> : <Navigate to="/login" />}
            />
            <Route 
              path="/critique/:critique_id/" 
              element={isAuthenticated ? <CritiquePage/> : <Navigate to="/login" />}
            />
            <Route 
              path="/workshop/:workshop_id/submit" 
              element={isAuthenticated ? <WorkshopThreadPostForm/> : <Navigate to="/login" />}
            />
            <Route 
              path="/workshop-thread/:workshop_thread_id/submit" 
              element={isAuthenticated ? <CritiquePostForm/> : <Navigate to="/login" />}
            />
            
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
