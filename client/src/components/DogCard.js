import React from "react";
import "../assets/App.css"
import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"
// import { Card } from "semantic-ui-react";

function DogCard({ dog }) {
    const [image, setImage] = useState("")
    const navigate = useNavigate();

    // useEffect(() => {
    //     const {dog_breed} = dog
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

    // console.log(image)

    const handleCardClick = () => {
        const dog_id = dog.id
        // console.log(dog)
        // console.log(dog.id)
        navigate(`/dog-page/${dog_id}`);
    }
    
    return (
            <div className="card" onClick={handleCardClick}>
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
                <div className="content" style={{marginBottom: "0px"}}>
                    <a className="dog name" style={{ fontSize: "30px"}}>{dog.dog_name}</a>
                <div className="meta" style={{marginTop: "5px", marginBottom: "5px"}}>
                    <span className="breed" style={{ fontSize: "20px"}}>{dog.dog_breed}</span>
                </div>
                <div className="age" style={{ fontSize: "16px"}}>{dog.dog_age}</div>
                </div>
                <div className="extra content">
                    <a style={{ fontSize: "18px"}}>
                        <i className="user icon"></i>
                        {dog.dog_gender}
                    </a>
                </div>
            </div>
        );
    }

export default DogCard; 






