import React, { useState, useEffect } from "react";
import { userState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import ProfileForm from "./ProfileForm";

function Profile() {
    const user = useRecoilValue(userState);
    const [isEditingProfile, setIsEditingProfile] = useState(false);


    const handleEditProfile = () => {
        setIsEditingProfile(!isEditingProfile);
    };

    // console.log(user)


        // setName(name)
        // setEmail(email)
        // setPhoneNumber(phoneNumber)
        // setAddress(address)
        // setCity(city)
        // setState(state)
        // setZipCode(zipCode)

    
        // <div>
        // <Container
        //     className="d-flex justify-content-center align-items-center"
        //     style={{ height: "100vh", marginTop: "50px" }}
        // >
        //     <Card
        //     style={{ width: "40rem", height: "800px" }}
        //     className="mx-auto position-relative"
        //     >
        //     <Button
        //         className="position-absolute top-0 end-0 m-3"
        //         onClick={handleEditProfile}
        //     >
        //         {isEditingProfile ? "Cancel" : "Edit Profile"}
        //     </Button>
        //     <Card.Img
        //         variant="top"
        //         src={user.user_image}
        //         style={{ width: "400px", height: "400px" }}
        //         className="mx-auto d-block"
        //     />
        //     <Card.Body>
        //         <Card.Title>
        //         {isEditingProfile ? (
        //             <>
        //             <label htmlFor="name"><b>Name:</b></label>
        //             <Form.Control
        //                 id="name"
        //                 type="text"
        //                 value={name}
        //                 onChange={(e) => setName(e.target.value)}
        //             />
        //             </>
        //         ) : (
        //             // <h1 style={{ marginBottom: 0 }}>{user.user_name}</h1>
        //             <h1 style={{ marginBottom: 0 }}>{name}</h1>
        //         )}
        //         </Card.Title>
        //     </Card.Body>
        //     <ListGroup className="list-group-flush">
        //         <ListGroup.Item>
        //         <b>Email:</b>{" "}
        //         {isEditingProfile ? (
        //             <Form.Control
        //             type="text"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             />
        //         ) : (
        //             <div>{email}</div>
        //         )}
        //         </ListGroup.Item>
        //         <ListGroup.Item>
        //         <b>Phone Number: </b>
        //         {isEditingProfile ? (
        //             <Form.Control
        //             type="text"
        //             value={phoneNumber}
        //             onChange={(e) => setPhoneNumber(e.target.value)}
        //             />
        //         ) : (
        //             <Card.Link href="#">{phoneNumber}</Card.Link>
        //         )}
        //         </ListGroup.Item>
        //         <ListGroup.Item>
        //         <b>Address:</b>{" "}
        //         {isEditingProfile ? (
        //             <Form.Control
        //             type="text"
        //             value={address}
        //             onChange={(e) => setAddress(e.target.value)}
        //             />
        //         ) : (
        //             <div>{address}</div>
        //         )}
        //         </ListGroup.Item>
        //         <ListGroup.Item>
        //         <b>City: </b>
        //         {isEditingProfile ? (
        //             <Form.Control
        //             type="text"
        //             value={city}
        //             onChange={(e) => setCity(e.target.value)}
        //             />
        //         ) : (
        //             <div>{city}</div>
        //         )}
        //         </ListGroup.Item>
        //         <ListGroup.Item>
        //         <b>State: </b>
        //         {isEditingProfile ? (
        //             <Form.Control
        //             type="text"
        //             value={state}
        //             onChange={(e) => setState(e.target.value)}
        //             />
        //         ) : (
        //             <div>{state}</div>
        //         )}
        //         </ListGroup.Item>
        //         <ListGroup.Item>
        //         <b>Zip Code: </b>
        //         {isEditingProfile ? (
        //             <Form.Control
        //             type="text"
        //             value={zipCode}
        //             onChange={(e) => setZipCode(e.target.value)}
        //             />
        //         ) : (
        //             <div>{zipCode}</div>
        //         )}
        //         </ListGroup.Item>
        //     </ListGroup>
        //     <Card.Body>
        //         {isEditingProfile && (
        //         <Button variant="primary" onClick={handleSubmit}>
        //             Submit
        //         </Button>
        //         )}
        //     </Card.Body>
        //     </Card>
        // </Container>
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {isEditingProfile ? (
                <ProfileForm user={user} isEditingProfile={isEditingProfile} setIsEditingProfile={setIsEditingProfile}/>
                ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img className="ui medium rounded image" src="https://img.freepik.com/premium-vector/simple-minimalist-cute-dog-cartoon-illustration-drawing_68410-138.jpg?w=2000" alt="Profile" />
                    <button className="ui button" onClick={handleEditProfile} style={{ marginBottom: "10px", marginTop: "20px"}}>
                    {isEditingProfile ? "Cancel" : "Edit Profile"}
                    </button>
                    <table className="ui celled striped table" style={{
                    padding: "10px",
                    width: "300px",
                    marginLeft: "20px",
                    textAlign: "center",
                    }}>
                    <thead>
                        <tr><th colSpan="3">
                        {user.user_name}
                        </th></tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="collapsing">
                            Email
                        </td>
                        <td>{user.user_email}</td>
                        </tr>
                        <tr>
                        <td>
                            Phone Number
                        </td>
                        <td>{user.user_phone_number}</td>
                        </tr>
                        <tr>
                        <td>
                            Address
                        </td>
                        <td>{user.user_address}</td>
                        </tr>
                        <tr>
                        <td>
                            City
                        </td>
                        <td>{user.user_city}</td>
                        </tr>
                        <tr>
                        <td>
                            State
                        </td>
                        <td>{user.user_state}</td>
                        </tr>
                        <tr>
                        <td>
                            Zip Code
                        </td>
                        <td>{user.user_zip_code}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                )}
            </div>
            );
            
            }




export default Profile;
