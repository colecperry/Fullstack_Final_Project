import React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { userState } from "../recoil/atoms"
import { useSetRecoilState } from "recoil"
import { FaUser, FaEnvelope, FaCartPlus, FaDog, FaHeart } from 'react-icons/fa';

function NavBar () {
    const setUser = useSetRecoilState(userState)

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }



    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        {/* <img src="https://i.postimg.cc/k5q6BfbH/4096325394.gif" alt="logo" style={{marginLeft: "20px", width:"30px", height:"30px"}}/> */}
    
            <Navbar.Brand>
                Doggio
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            < Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/home">
                        <FaDog /> Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/profile">
                        <FaUser /> Profile
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/messages">
                        <FaEnvelope /> Messages
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/favorites">
                        <FaHeart /> Favorites
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/checkout">
                        <FaCartPlus /> Checkout
                    </Nav.Link>
                    {/* <NavDropdown title={<><FaBell /> Notifications</>} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#notification"><FaBell /> Notification</NavDropdown.Item>
                        <NavDropdown.Item href="#finances"><FaDollarSign /> Finances</NavDropdown.Item>
                    </NavDropdown> */}
                    <button onClick={() => handleLogoutClick()}>Logout</button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;