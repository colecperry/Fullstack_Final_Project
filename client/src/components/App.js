import React, {useState, useEffect} from"react"
import '../assets/App.css';
import LoginOrSignup from './LoginOrSignup';
import Home from './Home';
import { Route, Routes, Navigate} from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    if(user){
      <Navigate to="/" />
    }
  }, []);


  if (!user) return <LoginOrSignup setUser={setUser}/>

  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<> <Home user={user}/> </>} />
      </Routes>
    </div>
  );
}

export default App;
