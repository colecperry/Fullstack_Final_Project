import React from "react";
import { useEffect, useState } from "react";
import { userState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import { Card } from "semantic-ui-react";
import DogCard from "./DogCard";
import { useParams } from "react-router-dom";

function FavoritesCollection() {
    const [dogFavorites, setDogFavorites] = useState([]);
    const user = useRecoilValue(userState)

    useEffect(()=> { 
        const fetchData = async () => {
            try {
                const response = await fetch('/favorites'); // Replace '/api/data' with your actual API path
                const allFavorites = await response.json();
                const favorites = allFavorites.filter((obj) => obj?.user_id == user.id);
                setDogFavorites(favorites)
                // console.log(id)
                console.log("Favorites:", favorites);
            } catch (error) {
                console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }, []);

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
            <Card.Group itemsPerRow={4}>
            <h1>Hello From Dog Collection</h1>
            </Card.Group>
        );
    }


    // Match the dog_id from the dogs table to the dog_id on favorites table, if they match render a dogcard

export default FavoritesCollection;