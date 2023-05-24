import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { allDogsState } from "../recoil/atoms";
import { Dropdown } from "semantic-ui-react";

function Filter({ selectedBreed, setSelectedBreed }) {
    const allDogs = useRecoilValue(allDogsState);

    // Create a Set to store unique dog breeds
    const uniqueBreeds = new Set();

    // Iterate through allDogs and add each dog_breed to the uniqueBreeds Set
    allDogs?.forEach((dog) => {
        uniqueBreeds.add(dog.dog_breed);
    });

    // Convert the Set back to an array and sort it alphabetically
    const uniqueBreedsArray = Array.from(uniqueBreeds).sort();

    const renderFilter = uniqueBreedsArray.map((dog_breed) => (
        <option key={dog_breed} value={dog_breed}>
        {dog_breed}
        </option>
    ));

    const handleDropDownMenu = (event) => {
        setSelectedBreed(event.target.value);
    };

    return (
        <select
        placeholder="Choose Breed"
        value={selectedBreed}
        onChange={handleDropDownMenu}
        >
        <option value="Choose Breed">Choose Breed</option>
        {renderFilter}
        </select>
    );
}

export default Filter;







