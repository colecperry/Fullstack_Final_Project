/**
 * DogCard.js
 *
 * This component displays individual dog information in a clickable card format.
 * When clicked, it navigates the user to the detailed page for that specific dog.
 * Props:
 *  - dog: an object containing details about the dog (image, name, breed, age, gender, id)
 */

import React from "react";
import "../assets/App.css"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

function DogCard({ dog }) {
    // Optional image state (currently unused, could be used for dynamic image loading)
    const [image, setImage] = useState("")

    // React Router navigation hook
    const navigate = useNavigate();

    // Navigate to the dog's detail page when the card is clicked
    const handleCardClick = () => {
        const dog_id = dog.id
        navigate(`/dog-page/${dog_id}`);
    }

    return (
        <div className="card" onClick={handleCardClick}>
            {/* Dog Image */}
            <div className="image">
                <img
                    src={dog.dog_image}
                    alt="dog"
                    style={{
                        width: "200px",
                        height: "200px",
                        display: "block",
                        margin: "0 auto",
                        objectFit: "cover",
                    }}
                />
            </div>

            {/* Dog name, breed, and age */}
            <div className="content" style={{ marginBottom: "0px" }}>
                <a className="dog name" style={{ fontSize: "30px" }}>{dog.dog_name}</a>
                <div className="meta" style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <span className="breed" style={{ fontSize: "20px" }}>{dog.dog_breed}</span>
                </div>
                <div className="age" style={{ fontSize: "16px" }}>{dog.dog_age}</div>
            </div>

            {/* Dog gender */}
            <div className="extra content">
                <a style={{ fontSize: "18px" }}>
                    <i className="user icon"></i>
                    {dog.dog_gender}
                </a>
            </div>
        </div>
    );
}

export default DogCard;
