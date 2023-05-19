import React from "react";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import { useState, useEffect } from "react";
import { useRecoilState } from 'recoil'
import { loginNotSignupState } from "../recoil/atoms"

function LoginOrSignup(){
const [ loginNotSignup, setLoginNotSignup ] = useRecoilState(loginNotSignupState);

    return(
        <div>
            {loginNotSignup ? <Login/> : <CreateAccount/>}
        </div>
    )
}

export default LoginOrSignup;