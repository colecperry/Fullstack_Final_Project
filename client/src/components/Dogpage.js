import React from "react";
import "../assets/App.css"
import { allFavoritesState, dogsState, userState, breederState } from "../recoil/atoms"
import { useRecoilValue, useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { Image, Button, Icon } from "semantic-ui-react";
import { Container, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function DogPage() {
    const { id } = useParams();
    const dogs = useRecoilValue(dogsState);
    const user = useRecoilValue(userState);
    const [allFavorites, setAllFavorites] = useRecoilState(allFavoritesState)
    const [breeder, setBreeder] = useRecoilState(breederState)
    const [dogImage, setDogImage] = useState("")
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate()
    // console.log("ID:", id);
    // console.log("Dogs:", dogs);

    const dog = dogs?.find((dog) => dog.id == id);
    // const breederDogs = dogs?.find((dog) => dog.breeder_id == dog.user.id);
    // console.log("Dog:", dog);

    console.log(allFavorites)
    const favoritesArray = allFavorites.filter((favorite)=> {
        console.log(id)
        if (favorite.user.id == user.id && favorite.dog.id == id)
            return favorite
    })
    // console.log("favorite", favoritesArray)
    console.log(favoritesArray)
    const specificLike = favoritesArray[0]

    // console.log("specific like", specificLike)


        const handleLikeButton = () => {
            //*DELETE EXISTING LIKE
            if (specificLike) {
                fetch(`/favorites/${specificLike.id}`, {
                    method: "DELETE", 
                })
                .then(()=>{
                    const updatedFavorites = allFavorites.filter((favorite)=>favorite.id !== specificLike.id)
                    setAllFavorites(updatedFavorites)
                })
            }else{
                //*ADD NEW LIKE
                const new_favorite = {
                    dog_id: parseInt(id),
                    user_id: user.id,
                }
                fetch("/favorites", {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify(new_favorite) 
                }).then(r=>r.json())
                .then((new_favorite)=>{
                    setAllFavorites((prevFavorites)=>[...prevFavorites,new_favorite])
                }) 
            } 
        }


        // const onLikeButtonClick = () => {
        //     setIsLiked(!isLiked)
        //     handleLikedDog(likedDog)
        // }
        // console.log(dog)

        // function extractFirstName(fullName) {
        //     const regex = /^[^\s]+/;
        //     const match = fullName.match(regex);
        //     return match ? match[0] : '';
        // }
        const firstName = dog.user.user_name.split(' ')[0]

        return (
            <div className="dog-page-container" style={{fontFamily: 'Verdana, sans-serif'}}>
                <div className="dog-image" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <img className="ui medium rounded image" src={dog.dog_image} alt="dog" />
                </div>
                {dog && (
                    <div className="dog-details" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", marginTop: "10px", marginBottom: "10px"}}>
                        <h1 style={{ marginRight: "10px"}}>{dog.dog_name}</h1>
                        <Icon className='likeIcon' color={(specificLike) ? "green" : "grey"} name='heart' onClick={handleLikeButton} style={{fontSize: "22px", display: "flex", alignItems: "center", marginBottom: "10px" }}/>
                        {/* {isLiked ?
                        // <FaHeart classname="fullHeart" onClick={() => window.alert("You've already liked this post!")}/>
                        // : <FaRegHeart classname="emptyHeart" onClick={onLikeButtonClick} />} */}
                    </div>
                    <button className="ui primary button" onClick={() => {
                        setBreeder(dog.user)
                        navigate("/messages")
                    }
                    }>
                        Contact {firstName}
                    </button>
                        <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginTop: "15px"

                    }}>
                        <Container style={{
                            width: "650px",
                            marginRight: "10px",
                            fontSize: "18px"
                        }}>
                            <h2 style={{ marginLeft: "0" }}>About {dog.dog_name}</h2>
                            <p>
                                {dog.dog_description}
                            </p>
                        </Container>
                        <div style={{ width: "15px" }}></div>
                        <Container style={{
                            border: "1px solid black",
                            padding: "10px",
                            width: "300px",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "10px"
                        }}>
                            <h2>Puppy Snapshot</h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
                                <p>
                                    <strong>Breed:</strong> {dog.dog_breed}
                                </p>
                                <p>
                                    <strong>Gender:</strong> {dog.dog_gender}
                                </p>
                                <p>
                                    <strong>Age:</strong> {dog.dog_age}
                                </p>
                                <p>
                                    <strong>Weight:</strong> {dog.dog_weight}
                                </p>
                                <p>
                                    <strong>Color:</strong> {dog.dog_color}
                                </p>
                                <p>
                                    <strong>Price:</strong> ${dog.dog_price}
                                </p>
                            </div>
                        </Container>
                    </div>
                    <Container style={{
                            border: "1px solid black",
                            padding: "10px",
                            width: "550px",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "15px",
                            marginBottom: "10px"
                        }}>
                            <h2>Parent Spotlight</h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridRowGap: "10px", gridColumnGap: "15px" }}>
                                <p>
                                    <strong>Mother's Name:</strong> {dog.mother_name}
                                </p>
                                <p>
                                    <strong>Father's Name:</strong> {dog.father_name}
                                </p>
                                <p>
                                    <strong>Mother's Breed:</strong> {dog.mother_breed}
                                </p>
                                <p>
                                    <strong>Father's Breed:</strong> {dog.father_breed}
                                </p>
                                <p>
                                    <strong>Mother's Weight:</strong> {dog.mother_weight}
                                </p>
                                <p>
                                    <strong>Father's Weight:</strong> {dog.father_weight}
                                </p>
                                <p>
                                    <strong>Mother's Age:</strong> {dog.mother_age}
                                </p>
                                <p>
                                    <strong>Father's Age:</strong> {dog.father_age}
                                </p>
                                </div>
                            </Container>
                    </div>
                )}
                </div>
            );
        }

export default DogPage;