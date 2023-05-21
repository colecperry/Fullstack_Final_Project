import React from "react";
import "../assets/App.css"
import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"

function DogCard({ dog }) {
    const [image, setImage] = useState("")
    const navigate = useNavigate();

    // useEffect(() => {
    //     fetch(`https://dog.ceo/api/breed/${dog.dog_breed}/images/random`)
    //     .then((resp) => resp.json())
    //     .then((data) => setImage(data));
    // }, [dog.dog_breed]);

    const handleCardClick = () => {
        navigate(`/dog-page/${dog.id}`);
    }

    return (
        <div className="ui card custom-card" onClick={handleCardClick}>
            <div className="image">
            <img
                src={image}
                alt="dog"
                style={{ width: "100px", height: "100px" }}
            />
            </div>
            <div className="content">
            <a className="dog name">{dog.dog_name}</a>
            <div className="meta">
                <span className="breed">{dog.dog_breed}</span>
            </div>
            <div className="age">{dog.dog_age}</div>
            </div>
            <div className="extra content">
            <a>
                <i className="user icon"></i>
                {dog.dog_gender}
            </a>
            </div>
        </div>
        );
    }

export default DogCard; 






