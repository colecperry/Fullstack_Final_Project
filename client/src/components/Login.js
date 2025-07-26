/**
 * Login.js
 *
 * This component renders the login form for the Doggio app.
 * It allows users to input email and password to log in.
 * Upon successful login, the user state is updated and navigation redirects to /home.
 * Users can also toggle to the Create Account view using the secondary button.
 */

import React, { useState, useEffect } from "react";
import { Button, Form } from 'semantic-ui-react';
import '../assets/App.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginNotSignupState, userState } from "../recoil/atoms";
import { FaDog } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const setUser = useSetRecoilState(userState);
    const setLoginNotSignup = useSetRecoilState(loginNotSignupState);
    const navigate = useNavigate();

    // Handle form submission for login
    function handleSubmit() {
        setErrors(null);
        fetch("https://doggio.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_email: email, password: password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user);
                    navigate("/home");
                    console.log(user);
                });
            } else {
                r.json().then((err) => setErrors(err.error));
            }
        });
    }

    return ( 
        <div>
            {/* Display any login errors */}
            {errors && <h2>{errors}</h2>}

            <h1 style={{
                paddingTop: "50px",
                paddingBottom: "50px",
                fontSize: "3.5rem",
                textAlign: "center",
                fontFamily: 'Verdana, sans-serif'
            }}>
                Doggio <FaDog />
            </h1>

            <div className='loginContainer'>
                <Form>
                    <Form.Field className="mb-3" controlid="formBasicEmail">
                        <label>Email address</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field className="mb-3" controlid="formBasicPassword">
                        <label>Password</label>
                        <input
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Field>

                    <div className='Login_btn_container'>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Login
                        </Button>
                        &nbsp;
                        <Button
                            onClick={() => setLoginNotSignup(prev => !prev)}
                            variant="secondary"
                            type="button"
                        >
                            Create Account
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
