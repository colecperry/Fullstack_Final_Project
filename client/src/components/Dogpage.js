/**
 * DogPage.js
 *
 * This component displays the details of a single dog, including breed, age, parents, and description.
 * It allows the user to like/unlike the dog (favorite it), and contact the breeder via a messaging interface.
 * The dog data is fetched from the backend using its ID from the URL.
 */

import React from "react";
import "../assets/App.css"
import { allFavoritesState, dogsState, userState, breederState } from "../recoil/atoms"
import { useRecoilValue, useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function DogPage() {
    // Get the dog ID from the URL
    const { id } = useParams();

    // Recoil state
    const dogs = useRecoilValue(dogsState);
    const user = useRecoilValue(userState);
    const [allFavorites, setAllFavorites] = useRecoilState(allFavoritesState)
    const [breeder, setBreeder] = useRecoilState(breederState)

    // Local component state
    const [dogImage, setDogImage] = useState("")
    const [isLiked, setIsLiked] = useState(false);
    const [error, setError] = useState([])
    const [dog, setDog] = useState([])
    const navigate = useNavigate()

    // Fetch dog details from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://doggio.onrender.com/dogs/${id}`);
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                const responseData = await response.json();
                setDog(responseData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    // Filter favorites to see if the user has already liked this dog
    const favoritesArray = allFavorites.filter((favorite)=> {
        if (favorite.user.id == user.id && favorite.dog.id == id)
            return favorite
    })
    const specificLike = favoritesArray[0]

    // Handles like/unlike button toggle
    const handleLikeButton = () => {
        if (specificLike) {
            // DELETE existing like
            fetch(`https://doggio.onrender.com/favorites/${specificLike.id}`, {
                method: "DELETE", 
            })
            .then(() => {
                const updatedFavorites = allFavorites.filter((favorite) => favorite.id !== specificLike.id)
                setAllFavorites(updatedFavorites)
            })
        } else {
            // ADD new like
            const new_favorite = {
                dog_id: parseInt(id),
                user_id: user.id,
            }
            fetch("https://doggio.onrender.com/favorites", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(new_favorite) 
            }).then(r => r.json())
            .then((new_favorite) => {
                setAllFavorites((prevFavorites) => [...prevFavorites, new_favorite])
            }) 
        } 
    }

    // Extract breeder's first name
    const firstName = dog?.user?.user_name.split(' ')[0]

    // Render component
    return (
        <div className="dog-page-container" style={{fontFamily: 'Verdana, sans-serif'}}>
            <div className="dog-image" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <img className="ui medium rounded image" src={dog.dog_image} alt="dog" />
            </div>
            {dog && (
                <div className="dog-details" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", marginTop: "10px", marginBottom: "0px"}}>
                        <h1 style={{ marginRight: "10px"}}>{dog.dog_name}</h1>
                        {/* Like (heart) icon */}
                        <Icon className='likeIcon' color={(specificLike) ? "red" : "grey"} name='heart' onClick={handleLikeButton} style={{fontSize: "22px", display: "flex", alignItems: "center", marginBottom: "10px" }}/>
                    </div>

                    {/* Contact breeder button */}
                    <div>
                        <button className="ui primary button" onClick={() => {
                            setBreeder(dog.user)
                            navigate("/messages")
                        }}>
                            Contact {firstName}
                        </button>
                    </div>

                    {/* Dog info and snapshot */}
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", marginTop: "15px" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {/* Dog description */}
                            <Container style={{
                                width: "900px",
                                marginRight: "10px",
                                fontSize: "18px",
                                display: "flex",
                                flexDirection: "column",
                                marginBottom: "20px",
                                marginTop: "10px",
                            }}>
                                <h2 style={{ marginLeft: "0" }}>About {dog.dog_name}</h2>
                                <p>{dog.dog_description}</p>
                            </Container>

                            {/* Tables: Puppy snapshot, mother, father */}
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                                {/* Puppy Snapshot Table */}
                                <table className="ui celled striped table" style={{
                                    padding: "10px",
                                    width: "300px",
                                    marginLeft: "20px",
                                    textAlign: "center",
                                }}>
                                    <thead>
                                        <tr><th colSpan="3">Puppy Snapshot</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Breed</td><td>{dog.dog_breed}</td></tr>
                                        <tr><td>Gender</td><td>{dog.dog_gender}</td></tr>
                                        <tr><td>Age</td><td>{dog.dog_age}</td></tr>
                                        <tr><td>Weight</td><td>{dog.dog_weight}</td></tr>
                                        <tr><td>Price</td><td>${dog.dog_price}</td></tr>
                                    </tbody>
                                </table>

                                {/* Mother Table */}
                                <table className="ui celled striped table" style={{
                                    padding: "10px",
                                    width: "300px",
                                    marginLeft: "20px",
                                    textAlign: "center",
                                    alignSelf: "flex-start",
                                }}>
                                    <thead>
                                        <tr><th colSpan="3">Mother</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Name</td><td>{dog.mother_name}</td></tr>
                                        <tr><td>Breed</td><td>{dog.mother_breed}</td></tr>
                                        <tr><td>Weight</td><td>{dog.mother_weight}</td></tr>
                                        <tr><td>Age</td><td>{dog.mother_age}</td></tr>
                                    </tbody>
                                </table>

                                {/* Father Table */}
                                <table className="ui celled striped table" style={{
                                    padding: "10px",
                                    width: "300px",
                                    marginLeft: "20px",
                                    textAlign: "center",
                                    alignSelf: "flex-start",
                                }}>
                                    <thead>
                                        <tr><th colSpan="3">Father</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Name</td><td>{dog.father_name}</td></tr>
                                        <tr><td>Breed</td><td>{dog.father_breed}</td></tr>
                                        <tr><td>Weight</td><td>{dog.father_weight}</td></tr>
                                        <tr><td>Age</td><td>{dog.father_age}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DogPage;
