/**
 * App.js
 *
 * This is the main application component that sets up the routing logic using React Router.
 * It conditionally renders components based on the login state (fetched from the server).
 * If the user is not logged in, it displays the login/signup form.
 * If logged in, it renders the appropriate page (Home, Profile, DogPage, etc.)
 * using <Routes> and <Route> components. The user's state is managed with Recoil.
 */

import React, { useState, useEffect } from "react";
import '../assets/App.css';
import LoginOrSignup from './LoginOrSignup';
import Home from './Home';
import NavBar from './NavBar';
import DogPage from './DogPage';
import Profile from "./Profile";
import Messages from "./Messages";
import Chats from "./Chats";
// import ProfileForm from "./ProfileForm"
import FavoritesCollection from "./FavoritesCollection";
import { Route, Routes, Navigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { userState } from "../recoil/atoms";

function App() {
  // Global state for tracking logged-in user
  const [ user, setUser ] = useRecoilState(userState);

  useEffect(() => {
    // On app load, attempt auto-login via session check
    fetch("https://doggio.onrender.com/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });

    // Attempt redirect if user exists (this doesn't work as written—needs manual navigation logic)
    if (user) {
      <Navigate to="/home" />
    }
  }, []);

  // If no user is logged in, show login/signup page
  if (!user) return <LoginOrSignup />;

  // If user is logged in, render the main app interface with routes
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<> <LoginOrSignup/> </>} />
        <Route path="/home" element={<> <NavBar/> <Home/> </>} />
        <Route path="/dog-page/:id" element={<> <NavBar/> <DogPage/> </>} />
        <Route path="/profile" element={<> <NavBar/> <Profile/> </>} />
        <Route path="/messages" element={<> <NavBar/> <Messages/> </>} />
        <Route path="/chats/:receiver_user_id" element={<> <NavBar/> <Chats/> </>} />
        <Route path="/favorites" element={<> <NavBar/> <FavoritesCollection/> </>} />
      </Routes>
    </div>
  );
}

export default App;
