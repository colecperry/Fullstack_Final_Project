/**
 * NavBar.js
 *
 * This component renders the top navigation bar for the Doggio app.
 * It includes:
 * - A brand header/logo with the Doggio name and dog icon.
 * - Navigation links to Home, Profile, Messages, and Favorites pages.
 * - A Logout button that clears the current user session via a DELETE request.
 * 
 * Navigation is handled using `react-router-dom` and icons from `react-icons/fa`.
 * The logout updates the global user state using Recoil.
 */

import React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { userState } from "../recoil/atoms"
import { useSetRecoilState } from "recoil"
import { FaUser, FaEnvelope, FaCartPlus, FaDog, FaHeart } from 'react-icons/fa';

function NavBar () {
    const setUser = useSetRecoilState(userState);

    // Logs out the current user and clears user state in Recoil
    function handleLogoutClick() {
        fetch("https://doggio.onrender.com/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }

    return (
        <div>
            {/* Site title with logo */}
            <h1 style={{
                paddingTop: "5px",
                paddingBottom: "5px",
                fontSize: "3.5rem",
                textAlign: "center",
                fontFamily: 'Verdana, sans-serif'
            }}>
                Doggio <FaDog/>
            </h1> 

            {/* Navigation menu */}
            <div class="ui secondary pointing menu"
                style={{
                    marginBottom: "10px",
                    fontSize: "1.4rem"
                }}>
                {/* Home link */}
                <a class="active item">
                    <Nav.Link as={NavLink} to="/home">
                        <FaDog /> Home
                    </Nav.Link>
                </a>

                {/* Profile link */}
                <a class="item">
                    <Nav.Link as={NavLink} to="/profile">
                        <FaUser /> Profile
                    </Nav.Link>
                </a>

                {/* Messages link */}
                <a class="item">
                    <Nav.Link as={NavLink} to="/messages">
                        <FaEnvelope /> Messages
                    </Nav.Link>
                </a>

                {/* Favorites link */}
                <a class="item">
                    <Nav.Link as={NavLink} to="/favorites">
                        <FaHeart /> Favorites
                    </Nav.Link>
                </a>

                {/* Logout button aligned to the right */}
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
