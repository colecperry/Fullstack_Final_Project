/**
 * Home.js
 *
 * This component serves as the landing page after login.
 * It displays a filterable collection of dog cards.
 * Users can select a breed using the <Filter /> component,
 * which updates the <DogCollection /> display accordingly.
 */

import React from "react";
import DogCollection from "./DogCollection";
import Filter from "./Filter";
import { useState, useEffect } from "react";
import { dogsState, allDogsState } from "../recoil/atoms";
import { useRecoilValue, useRecoilState } from 'recoil';

function Home(){
    // Read global state: full list of dogs and current filtered list
    const dogs = useRecoilValue(dogsState);
    const allDogs = useRecoilValue(allDogsState);

    // Setter for filtered list of dogs
    const [dogssState, setDogssState] = useRecoilState(dogsState);

    // Local state to track currently selected breed from dropdown
    const [selectedBreed, setSelectedBreed] = useState("Choose Breed");

    // Run this effect whenever selectedBreed changes
    useEffect(() => {
        if (selectedBreed === "Choose Breed") {
            // Show all dogs if no specific breed is selected
            setDogssState(allDogs);
        } else {
            // Filter dogs by breed match (case-insensitive)
            const filteredDogs = allDogs.filter((dog) => {
                return dog.dog_breed.toLowerCase().includes(selectedBreed.toLowerCase());
            });
            setDogssState(filteredDogs);
        }
    }, [selectedBreed]);

    return (
        <div>
            {/* Dropdown filter to set selectedBreed */}
            <Filter selectedBreed={selectedBreed} setSelectedBreed={setSelectedBreed} />
            {/* Displays cards for filtered dogs */}
            <DogCollection />
        </div>
    );
}

export default Home;
