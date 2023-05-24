import React from "react";
import "../assets/App.css"
import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"
import { Card } from "semantic-ui-react";

function FavoritesCard({ dogFavorite }) {
    const [image, setImage] = useState("")
    const navigate = useNavigate();
    const dog_id = dogFavorite.dog.id
    // console.log("dog_id", dog_id)

    // useEffect(() => {
    //     const dog_breed = dogFavorite.dog.dog_breed
    //     const breed = dog_breed.split(" ")
    //     if (breed.length === 1) {
    //         fetch(`https://dog.ceo/api/breed/${dog_breed.toLowerCase()}/images/random`)
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             setImage(data)
    //         });
    //     } else {
    //         // format string
    //         const reversedBreed = breed.reverse().join("/").toLowerCase()
    //         fetch(`https://dog.ceo/api/breed/${reversedBreed}/images/random`)
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             setImage(data)
    //         });
    //     }

    // }, []);

    console.log(dogFavorite)

    const handleCardClick = () => {
        navigate(`/dog-page/${dog_id}`);
    }

    return (
        <Card  className="custom-card">
            <div onClick={handleCardClick}>
                <div className="image">
                <img
                    src={dogFavorite.dog.dog_image}
                    alt="dog"
                    style={{ width: "100px", height: "100px" }}
                />
                </div>
                <div className="content">
                <a className="dog name">{dogFavorite.dog.dog_name}</a>
                <div className="meta">
                    <span className="breed">{dogFavorite.dog.dog_breed}</span>
                </div>
                <div className="age">{dogFavorite.dog.dog_age}</div>
                </div>
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