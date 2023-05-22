import React, {useState, useEffect} from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Navigate, useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { userState } from "../recoil/atoms"

function CreateAccount() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const setUser = useSetRecoilState(userState)
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        let newUser = {
            user_name: userName,
            user_image: '',
            user_email: email,
            _password_hash: password,
            user_phone_number: phoneNumber,
            user_address: address,
            user_city: city,
            user_state: state,
            user_zip_code: zipCode
        };
    
        try {
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
    
            if (response.ok) {
                const user = await response.json();
                setUser(user);
                // Redirect to the desired location using the `Navigate` component
                navigate("/home");
            } else {
                throw new Error('Failed to create user');
            }
        } catch (error) {
            console.log(error);
            // Handle the error condition
        }
    };


    return (
        <div className="container">
            <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control value={userName} onChange={e => setUserName(e.target.value)} type="name" placeholder="Enter full name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Enter Phone Number</Form.Label>
                <Form.Control type="phonenumber" placeholder="Phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Enter Address</Form.Label>
                <Form.Control type="text" placeholder="Enter Address" value={address} onChange={e => setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>Enter City</Form.Label>
                <Form.Control type="text" placeholder="Enter City" value={city} onChange={e => setCity(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicState">
                <Form.Label>Enter State</Form.Label>
                <Form.Control type="text" placeholder="Enter State" value={state} onChange={e => setState(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicZipCode">
                <Form.Label>Enter Zip Code</Form.Label>
                <Form.Control type="text" placeholder="Enter Zip Code" value={zipCode} onChange={e => setZipCode(e.target.value)} />
            </Form.Group>
            <div style={{ marginTop: '20px' }}>
                <Button variant="secondary" type="submit">
                SignUp
                </Button>
            </div>
            </Form>
        </div>
        );
}

export default CreateAccount;