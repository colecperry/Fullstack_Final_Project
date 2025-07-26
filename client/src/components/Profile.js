/**
 * Profile.js
 *
 * This component displays the user's profile information.
 * - Shows a profile picture and user details in a table format.
 * - Includes a toggle to switch between view mode and edit mode.
 * - When editing, it renders the ProfileForm component.
 * - User data is accessed via Recoil state.
 */

import React, { useState, useEffect } from "react";
import { userState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import ProfileForm from "./ProfileForm";

function Profile() {
    const user = useRecoilValue(userState); // Retrieve the logged-in user from Recoil
    const [isEditingProfile, setIsEditingProfile] = useState(false); // Toggle between view and edit modes

    const handleEditProfile = () => {
        setIsEditingProfile(!isEditingProfile); // Toggle edit mode
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {isEditingProfile ? (
                // Show editable form if user is editing
                <ProfileForm user={user} isEditingProfile={isEditingProfile} setIsEditingProfile={setIsEditingProfile}/>
            ) : (
                // Show profile information
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img 
                        className="ui medium rounded image" 
                        src="https://img.freepik.com/premium-vector/simple-minimalist-cute-dog-cartoon-illustration-drawing_68410-138.jpg?w=2000" 
                        alt="Profile" 
                    />
                    <button 
                        className="ui button" 
                        onClick={handleEditProfile} 
                        style={{ marginBottom: "10px", marginTop: "20px" }}
                    >
                        {isEditingProfile ? "Cancel" : "Edit Profile"}
                    </button>
                    
                    {/* Table of user info */}
                    <table 
                        className="ui celled striped table" 
                        style={{
                            padding: "10px",
                            width: "300px",
                            marginLeft: "20px",
                            textAlign: "center",
                        }}
                    >
                        <thead>
                            <tr><th colSpan="3">{user.user_name}</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="collapsing">Email</td>
                                <td>{user.user_email}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{user.user_phone_number}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{user.user_address}</td>
                            </tr>
                            <tr>
                                <td>City</td>
                                <td>{user.user_city}</td>
                            </tr>
                            <tr>
                                <td>State</td>
                                <td>{user.user_state}</td>
                            </tr>
                            <tr>
                                <td>Zip Code</td>
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
