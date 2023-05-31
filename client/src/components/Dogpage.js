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

    // window.location.reload();

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
                    <div style={{ display: "flex", alignItems: "center", marginTop: "10px", marginBottom: "0px"}}>
                        <h1 style={{ marginRight: "10px"}}>{dog.dog_name}</h1>
                        <Icon className='likeIcon' color={(specificLike) ? "red" : "grey"} name='heart' onClick={handleLikeButton} style={{fontSize: "22px", display: "flex", alignItems: "center", marginBottom: "10px" }}/>
                    </div>
                    <div>
                    <button className="ui primary button" onClick={() => {
                        setBreeder(dog.user)
                        navigate("/messages")
                    }
                    }>
                        Contact {firstName}
                    </button>
                    </div>
                        <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginTop: "15px"

                    }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
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
                                <p>
                                    {dog.dog_description}
                                </p>
                            </Container>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                                <table className="ui celled striped table" style={{
                                    padding: "10px",
                                    width: "300px",
                                    marginLeft: "20px",
                                    textAlign: "center",
                                }}>
                                    <thead>
                                        <tr><th colspan="3">
                                        Puppy Snapshot
                                        </th>
                                    </tr></thead>
                                    <tbody>
                                        <tr>
                                        <td class="collapsing">
                                            Breed
                                        </td>
                                        <td>{dog.dog_breed}</td>
                                        </tr>
                                        <tr>
                                        <td>
                                            Gender
                                        </td>
                                        <td>{dog.dog_gender}</td>
                                        </tr>
                                        <tr>
                                        <td>
                                            Age
                                        </td>
                                        <td>{dog.dog_age}</td>
                                        </tr>
                                        <tr>
                                        <td>
                                            Weight
                                        </td>
                                        <td>{dog.dog_weight}</td>
                                        </tr>
                                        <tr>
                                        <td>
                                            Price
                                        </td>
                                        <td>${dog.dog_price}</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                    <table className="ui celled striped table" style={{
                                    padding: "10px",
                                    width: "300px",
                                    marginLeft: "20px",
                                    textAlign: "center",
                                    alignSelf: "flex-start",
                                    // marginBottom: "10px"
                                }}>
                                    <thead>
                                        <tr><th colspan="3">
                                        Mother
                                        </th>
                                    </tr></thead>
                                    <tbody>
                                        <tr>
                                        <td class="collapsing">
                                            Name
                                        </td>
                                        <td>{dog.mother_name}</td>
                                        </tr>
                                        <tr>
                                        <td>
                                            Breed
                                        </td>
                                        <td>{dog.mother_breed}</td>
                                        </tr>
                                        <tr>
                                        <td>
                                            Weight
                                        </td>
                                        <td>{dog.mother_weight}</td>
                                        </tr>
                                        <tr>
                                        <td>
                                            Age
                                        </td>
                                        <td>{dog.mother_age}</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                    <table className="ui celled striped table" style={{
                                    padding: "10px",
                                    width: "300px",
                                    marginLeft: "20px",
                                    textAlign: "center",
                                    alignSelf: "flex-start",
                                }}>
                                    <thead>
                                        <tr><th colspan="3">
                                        Father
                                        </th>
                                    </tr></thead>
                                    <tbody>
                                        <tr>
                                        <td class="collapsing">
                                            Name
                                        </td>
                                        <td>{dog.father_name}</td>
                                        </tr>
                                        <tr>
                                        <td>
                                            Breed
                                        </td>
                                        <td>{dog.father_breed}</td>
                                        </tr>
                                        <tr>
                                        <td>
                                            Weight
                                        </td>
                                        <td>{dog.father_weight}</td>
                                        </tr>
                                        <tr>
                                        <td>
                                            Age
                                        </td>
                                        <td>{dog.father_age}</td>
                                        </tr>
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

