import React from "react";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import { useState, useEffect } from "react";

function LoginOrSignup({setUser}){
const [loginNotSignup, setLoginNotSignup] = useState(true);

    return(
        <div>
            {loginNotSignup ? <Login setLoginNotSignup={setLoginNotSignup} setUser={setUser} /> : <CreateAccount setLoginNotSignup={setLoginNotSignup} setUser={setUser} />}
        </div>
    )
}

export default LoginOrSignup;