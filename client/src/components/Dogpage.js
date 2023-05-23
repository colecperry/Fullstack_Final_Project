import React from "react";
import "../assets/App.css"
import { dogsState, userState } from "../recoil/atoms"
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image, Button } from "semantic-ui-react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function DogPage() {
    const { id } = useParams();
    const dogs = useRecoilValue(dogsState);
    const user = useRecoilValue(userState)
    const [dogImage, setDogImage] = useState("")
    const [isLiked, setIsLiked] = useState(false);
    console.log("ID:", id);
    console.log("Dogs:", dogs);

    const dog = dogs?.find((dog) => dog.id == id);
    console.log("Dog:", dog);

    // useEffect(() => {
    //     if (dog) {
    //         const { dog_breed } = dog;
    //         const breed = dog_breed.split(" ");
    //         if (breed.length === 1) {
    //             fetch(`https://dog.ceo/api/breed/${dog_breed.toLowerCase()}/images/random`)
    //             .then((resp) => resp.json())
    //             .then((data) => {
    //                 setDogImage(data);
    //             });
    //         } else {
    //             // format string
    //             const reversedBreed = breed.reverse().join("/").toLowerCase();
    //             fetch(`https://dog.ceo/api/breed/${reversedBreed}/images/random`)
    //             .then((resp) => resp.json())
    //             .then((data) => {
    //                 setDogImage(data);
    //             });
    //         }
    //         }
    //     }, []);
        

        const likedDog = {
            dog_id: parseInt(id),
            user_id: user.id,
        }
        console.log("LikedDog:", likedDog)

        const handleLikedDog = (likedDog) => {
            fetch("/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(likedDog)
            })
        }


        const onLikeButtonClick = () => {
            setIsLiked(!isLiked)
            handleLikedDog(likedDog)
        }


        return (
            <div className="dog-page-container">
                <div className="dog-image">
                    <Image src={dogImage.message} alt="dog" size="medium" rounded centered />
                </div>
                {dog && (
                    <div className="dog-details" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h1>{dog.dog_name}</h1>
                        {isLiked ?
                        <FaHeart classname="fullHeart" onClick={() => window.alert("You've already liked this post!")}/>
                        : <FaRegHeart classname="emptyHeart" onClick={onLikeButtonClick} />}
                    </div>
                    <h2 style={{ marginLeft: "0" }}>About {dog.dog_name}</h2>
                    <p>
                        <strong>Breed:</strong> {dog.dog_breed}
                    </p>
                    <p>
                        <strong>Age:</strong> {dog.dog_age}
                    </p>
                    <p>
                        <strong>Gender:</strong> {dog.dog_gender}
                    </p>
                    <p>
                        <strong>Weight:</strong> {dog.dog_weight}
                    </p>
                    <p>
                        <strong>Color:</strong> {dog.dog_color}
                    </p>
                    <p>
                        <strong>Price:</strong> {dog.dog_price}
                    </p>
                    <p>
                        <strong>Description:</strong> {dog.dog_description}
                    </p>
                    <p>
                        <strong>Mother's Name:</strong> {dog.mother_name}
                    </p>
                    <p>
                        <strong>Mother's Breed:</strong> {dog.mother_breed}
                    </p>
                    <p>
                        <strong>Mother's Weight:</strong> {dog.mother_weight}
                    </p>
                    <p>
                        <strong>Mother's Age:</strong> {dog.mother_age}
                    </p>
                    <p>
                        <strong>Father's Name:</strong> {dog.father_name}
                    </p>
                    <p>
                        <strong>Father's Breed:</strong> {dog.father_breed}
                    </p>
                    <p>
                        <strong>Father's Weight:</strong> {dog.father_weight}
                    </p>
                    <p>
                        <strong>Father's Age:</strong> {dog.father_age}
                    </p>
                    </div>
                )}
                </div>
            );
        }

export default DogPage;