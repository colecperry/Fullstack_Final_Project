import React from "react";
import { useEffect, useState } from "react";
import { userState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import { Card } from "semantic-ui-react";
import DogCard from "./DogCard";
import FavoritesCard from "./FavoritesCard";
import { useParams } from "react-router-dom";

function FavoritesCollection() {
    const [dogFavorites, setDogFavorites] = useState([]);
    const user = useRecoilValue(userState)

    // useEffect(()=> { 
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('/favorites'); // Replace '/api/data' with your actual API path
    //             const allFavorites = await response.json();
    //             const favorites = allFavorites.filter((obj) => obj?.user_id == user.id);
    //             setDogFavorites(favorites)
    //             // console.log(id)
    //             console.log("Favorites:", favorites);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             }
    //         };
    //         fetchData();
    //     }, []);

    

        useEffect(()=> {
            fetch("/favorites")
            .then(r=>r.json())
            .then(favorites=>setDogFavorites(favorites))
        }, [])

        // console.log("user.id", user.id)
        // console.log("dogFavorites", dogFavorites)

        const favoriteCollection = dogFavorites.filter((favorite) => favorite.user.id == user.id)

        // console.log("filteredDogs", favoriteCollection)


        const renderFavorites = favoriteCollection?.map((dogFavorite) => {
            return <FavoritesCard dogFavorite={dogFavorite} key={dogFavorite.id} />;
        });

        // const fetchDog = async (dog_id) => {
        //     try {
        //         const response = await fetch(`/dogs/${dog_id}`)
        //         const dog = await response.json();
        //         console.log("dog_id:", dog_id)
        //         // return dog
        //     }
        //     catch (error) {
        //         console.error('Error fetching data:', error)}
        // }

        // const renderDogs = dogFavorites?.map((dog) => {
        //     // const render_dog = fetchDog(dog.id)
        //     // return <DogCard dog={render_dog} key={dog.id} />;
        // });
        // console.log(renderDogs)
    
        return (
            // <div>
            //     <Card.Group itemsPerRow={4}>
            //     {renderFavorites}
            //     </Card.Group>
            // </div>

        <div>
            <div class="ui link cards"
            style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
            >
            {renderFavorites}
            </div>
        </div>
        );
    }



export default FavoritesCollection;