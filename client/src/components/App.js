import React, {useState, useEffect} from"react"
import '../assets/App.css';
import LoginOrSignup from './LoginOrSignup';
import Home from './Home';
import NavBar from './NavBar';
import { Route, Routes, Navigate} from "react-router-dom";
import { useRecoilState } from 'recoil'
import { userState } from "../recoil/atoms"

function App() {
const [ user, setUser ] = useRecoilState(userState);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    if(user){
      <Navigate to="/home" />
    }
  }, []);


  if (!user) return <LoginOrSignup/>

  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<> <NavBar/> <Home/> </>} />
        {/* <Route path="/profile" element={<> <NavBar/> <Profile/> </>} />
        <Route path="/messages" element={<> <NavBar/> <Messages/> </>} />
        <Route path="/favorites" element={<> <NavBar/> <Favorites/> </>} />
        <Route path="/checkout" element={<> <NavBar/> <Checkout/> </>} /> */}
      </Routes>
    </div>
  );
}

export default App;
