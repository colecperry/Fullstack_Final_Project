import React, { useState, useEffect } from "react";
import { Card, Container, ListGroup, Button } from "react-bootstrap";
import { userState } from "../recoil/atoms";
import { useRecoilValue } from "recoil"
import {Link, useNavigate} from "react-router-dom"

function Profile() {
    const user = useRecoilValue(userState)
    const navigate = useNavigate();
    console.log(user)

    const handleProfileClick = () => {
        navigate(`/profile-page/${user.id}`);
    }

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
            <Button className="position-absolute top-0 end-0 m-3" onClick={handleProfileClick}>
                Edit Profile
            </Button>
            <Card.Img
                variant="top"
                src={user.user_image}
                style={{ width: "400px", height: "400px" }}
                className="mx-auto d-block"
            />
            <Card.Body>
                <Card.Title>
                <h1 style={{ marginBottom: 0 }}>{user.user_name}</h1>
                </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                <b>Email:</b> {user.user_email}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Phone Number: </b>
                <Card.Link href="#">{user.phone_number}</Card.Link>
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Address:</b> {user.user_address}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>City: </b>
                {user.user_city}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>State: </b>
                {user.user_state}
                </ListGroup.Item>
                <ListGroup.Item>
                <b>Zip Code: </b>
                {user.user_zip_code}
                </ListGroup.Item>
            </ListGroup>
            <Card.Body></Card.Body>
            </Card>
        </Container>
        </div>
    )
}

export default Profile;
