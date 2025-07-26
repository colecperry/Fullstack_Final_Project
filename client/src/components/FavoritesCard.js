/**
 * FavoritesCard.js
 *
 * This component displays a card for a single dog that has been favorited by the user.
 * It shows the dog's image, name, breed, age, and gender.
 * Clicking the card navigates to the detailed DogPage for that dog.
 */

import React from "react";
import "../assets/App.css"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Card } from "semantic-ui-react";

function FavoritesCard({ dogFavorite }) {
    // Holds the dog's image (can be used for caching or manipulation later if needed)
    const [image, setImage] = useState("")

    // React Router navigation hook
    const navigate = useNavigate();

    // Extract the dog's ID from the favorite object
    const dog_id = dogFavorite.dog.id

    // Debug: log the full dogFavorite object
    console.log(dogFavorite)

    // Navigate to the DogPage when card is clicked
    const handleCardClick = () => {
        navigate(`/dog-page/${dog_id}`);
    }

    return (
        <Card className="custom-card">
            <div onClick={handleCardClick}>
                {/* Dog Image */}
                <div className="image">
                    <img
                        src={dogFavorite.dog.dog_image}
                        alt="dog"
                        style={{ width: "100px", height: "100px" }}
                    />
                </div>

                {/* Dog Info */}
                <div className="content">
                    <a className="dog name">{dogFavorite.dog.dog_name}</a>
                    <div className="meta">
                        <span className="breed">{dogFavorite.dog.dog_breed}</span>
                    </div>
                    <div className="age">{dogFavorite.dog.dog_age}</div>
                </div>

                {/* Extra Info: Gender */}
                <div className="extra content">
                    <a>
                        <i className="user icon"></i>
                        {dogFavorite.dog.dog_gender}
                    </a>
                </div>
            </div>
        </Card>
    );
}

export default FavoritesCard;
