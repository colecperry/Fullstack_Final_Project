/**
 * LoginOrSignup.js
 *
 * This component conditionally renders the Login or CreateAccount component
 * based on the `loginNotSignupState` from Recoil.
 * If `loginNotSignup` is true, it shows the Login form.
 * If false, it shows the Create Account form.
 */

import React from "react";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import { useRecoilState } from 'recoil';
import { loginNotSignupState } from "../recoil/atoms";

function LoginOrSignup() {
    const [loginNotSignup, setLoginNotSignup] = useRecoilState(loginNotSignupState);

    return (
        <div>
            {/* Toggle between Login and Create Account views */}
            {loginNotSignup ? <Login /> : <CreateAccount />}
        </div>
    );
}

export default LoginOrSignup;
