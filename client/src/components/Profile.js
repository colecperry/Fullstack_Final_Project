import React, { useState, useEffect } from "react";
import { Card, Container, ListGroup, Button, Form } from "react-bootstrap";
import { userState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [name, setName] = useState(user.user_name);
    const [email, setEmail] = useState(user.user_email);
    const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
    const [address, setAddress] = useState(user.user_address);
    const [city, setCity] = useState(user.user_city);
    const [state, setState] = useState(user.user_state);
    const [zipCode, setZipCode] = useState(user.user_zip_code);

    const handleEditProfile = () => {
        setIsEditingProfile(!isEditingProfile);
    };

    const handleSubmit = () => {
        const userData = {
        user_name: name,
        user_email: email,
        user_phone_number: phoneNumber,
        user_address: address,
        user_city: city,
        user_state: state,
        user_zip_code: zipCode
        };

        // setName(name)
        // setEmail(email)
        // setPhoneNumber(phoneNumber)
        // setAddress(address)
        // setCity(city)
        // setState(state)
        // setZipCode(zipCode)

        console.log(name)
        console.log(email)
        console.log(phoneNumber)
        console.log(address)
        console.log(city)
        console.log(state)
        console.log(zipCode)


        fetch(`/users/${user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        })
        .then((response) => {
            if (response.ok) {
            console.log('User updated successfully');
            // navigate("/profile");
            } else {
            console.log('Failed to update user');
            }
            setIsEditingProfile(!isEditingProfile)
        })
        .catch((error) => {
            console.log('Error updating user:', error);
        });
    };

    return (
        <div>
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh", marginTop: "50px" }}
        >
            <Card
            style={{ width: "40rem", height: "800px" }}
            className="mx-auto position-relative"
            >
            <Button
                className="position-absolute top-0 end-0 m-3"
                onClick={handleEditProfile}
            >
                {isEditingProfile ? "Cancel" : "Edit Profile"}
            </Button>
            <Card.Img
                variant="top"
                src={user.user_image}
                style={{ width: "400px", height: "400px" }}
                className="mx-auto d-block"
            />
            <Card.Body>
                <Card.Title>
                {isEditingProfile ? (
                    <>
                    <label htmlFor="name"><b>Name:</b></label>
                    <Form.Control
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </>
                ) : (
                    // <h1 style={{ marginBottom: 0 }}>{user.user_name}</h1>
                    <h1 style={{ marginBottom: 0 }}>{name}</h1>
                )}
                </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                <b>Email:</b>{" "}
                {isEditingProfile ? (
                    <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                ) : (
                    <div>{email}</div>
                )}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Phone Number: </b>
                {isEditingProfile ? (
                    <Form.Control
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                ) : (
                    <Card.Link href="#">{phoneNumber}</Card.Link>
                )}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Address:</b>{" "}
                {isEditingProfile ? (
                    <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                ) : (
                    <div>{address}</div>
                )}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>City: </b>
                {isEditingProfile ? (
                    <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                ) : (
                    <div>{city}</div>
                )}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>State: </b>
                {isEditingProfile ? (
                    <Form.Control
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    />
                ) : (
                    <div>{state}</div>
                )}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Zip Code: </b>
                {isEditingProfile ? (
                    <Form.Control
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    />
                ) : (
                    <div>{zipCode}</div>
                )}
                </ListGroup.Item>
            </ListGroup>
            <Card.Body>
                {isEditingProfile && (
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                )}
            </Card.Body>
            </Card>
        </Container>
        </div>
    );
    }

export default Profile;
