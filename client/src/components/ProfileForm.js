// import React, {useState, useEffect} from "react";
// import { Dropdown, Button, Form } from 'react-bootstrap'
// import {Link, useNavigate} from "react-router-dom"
// import { userState } from "../recoil/atoms";
// import { useRecoilValue } from "recoil";


// function ProfileForm() {
//     const navigate = useNavigate();
//     const user = useRecoilValue(userState)
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [phoneNumber, setPhoneNumber] = useState('')
//     const [address, setAddress] = useState('')
//     const [city, setCity] = useState('')
//     const [state, setState] = useState('')
//     const [zipCode, setZipCode] = useState('')
//     console.log(user)
//     const user_id = user.id
//     const userData = { name, email, phoneNumber, address, city, state, zipCode}

//     fetch(`/users/${user_id}`, {
//         method: 'PATCH',
//         headers: {
//         'Content-Type': 'application/json',
//     },
//         body: JSON.stringify(userData),
//     })
//         .then((response) => {
//         if (response.ok) {
//             console.log('User updated successfully');
//             navigate(`/profile-page/${user.id}`);
//         } else {
//             console.log('Failed to update user');
//         }
//         })
//         .catch((error) => {
//         console.log('Error updating user:', error);
//         });



//     return (
//         <div className="container">
//             <Form onSubmit={(event) => handleSubmit(event)}>
//                 <Form.Group className="mb-3" controlId="formBasicName">
//                     <Form.Label>Full Name</Form.Label>
//                     <Form.Control value={name} onChange={e => setName(e.target.value)} type="name" placeholder="Enter full name" />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
//                     <Form.Text className="text-muted">
//                     We'll never share your email with anyone else.
//                     </Form.Text>
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
//                     <Form.Label>Phone Number</Form.Label>
//                     <Form.Control type="phoneNumber" placeholder="Enter Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicAddress">
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control type="address" placeholder="Enter Adress" value={address} onChange={e => setAddress(e.target.value)} />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicCity">
//                     <Form.Label>City</Form.Label>
//                     <Form.Control type="text" placeholder="Enter City" value={city} onChange={e => setCity(e.target.value)} />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicState">
//                     <Form.Label>State</Form.Label>
//                     <Form.Control type="text" placeholder="Enter State" value={state} onChange={e => setState(e.target.value)} />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicZipCode">
//                     <Form.Label>Zip Code</Form.Label>
//                     <Form.Control type="text" placeholder="Enter Zip Code" value={zipCode} onChange={e => setZipCode(e.target.value)} />
//                 </Form.Group>
//             </Form>
//         </div>
//     )
// }

// export default ProfileForm;