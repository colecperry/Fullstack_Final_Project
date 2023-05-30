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
        // <Navbar bg="primary" variant="dark" expand="lg" sticky="top" style={{margin: "10px"}}>
        // {/* <img src="https://i.postimg.cc/k5q6BfbH/4096325394.gif" alt="logo" style={{marginLeft: "20px", width:"30px", height:"30px"}}/> */}
    
        //     <Navbar.Brand style={{margin: "10px"}}>
        //         Doggio
        //     </Navbar.Brand>
        //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //     < Navbar.Collapse id="basic-navbar-nav">
        //         <Nav className="mr-auto">
        //             <Nav.Link as={NavLink} to="/home">
        //                 <FaDog /> Home
        //             </Nav.Link>
        //             <Nav.Link as={NavLink} to="/profile">
        //                 <FaUser /> Profile
        //             </Nav.Link>
        //             <Nav.Link as={NavLink} to="/messages">
        //                 <FaEnvelope /> Messages
        //             </Nav.Link>
        //             <Nav.Link as={NavLink} to="/favorites">
        //                 <FaHeart /> Favorites
        //             </Nav.Link>
        //             <Nav.Link as={NavLink} to="/checkout">
        //                 <FaCartPlus /> Checkout
        //             </Nav.Link>
        //             {/* <NavDropdown title={<><FaBell /> Notifications</>} id="basic-nav-dropdown">
        //                 <NavDropdown.Item href="#notification"><FaBell /> Notification</NavDropdown.Item>
        //                 <NavDropdown.Item href="#finances"><FaDollarSign /> Finances</NavDropdown.Item>
        //             </NavDropdown> */}
        //             <button onClick={() => handleLogoutClick()}>Logout</button>
        //         </Nav>
        //     </Navbar.Collapse>
        // </Navbar>
        <div>
            <h1 style={{
            paddingTop:"5px",
            paddingBottom:"5px",
            fontSize:"3.5rem",
            textAlign: "center",
            fontFamily: 'Verdana, sans-serif'
            }}>Doggio
            <FaDog/>
            </h1> 
            <div class="ui secondary pointing menu"
            style={{
                marginBottom: "10px",
                fontSize: "1.4rem"
            }}>
            <a class="active item">
                <Nav.Link as={NavLink} to="/home">
                    <FaDog /> Home
                </Nav.Link>
            </a>
            <a class="item">
                <Nav.Link as={NavLink} to="/profile">
                    <FaUser /> Profile
                </Nav.Link>
            </a>
            <a class="item">
                <Nav.Link as={NavLink} to="/messages">
                    <FaEnvelope /> Messages
                </Nav.Link>
            </a>
                    <a class="item">
                <Nav.Link as={NavLink} to="/favorites">
                    <FaHeart /> Favorites
                </Nav.Link>
            </a>
                <div class="right menu">
                <a class="ui item" onClick={() => handleLogoutClick()}>
                    <b>Logout</b>
            </a>
            </div>
            </div>
        </div>
    )
}

export default NavBar;