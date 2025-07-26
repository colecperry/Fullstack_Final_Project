/**
 * Filter.js
 *
 * This component provides a dropdown menu for selecting a dog breed to filter
 * the list of dogs displayed elsewhere in the app. It pulls data from the
 * allDogsState Recoil atom, extracts unique breeds, and allows the user to
 * update the selectedBreed state in the parent component.
 */

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { allDogsState } from "../recoil/atoms";
import { Dropdown } from "semantic-ui-react";

function Filter({ selectedBreed, setSelectedBreed }) {
    // Get the full list of dogs from global Recoil state
    const allDogs = useRecoilValue(allDogsState);

    // Create a Set to store unique dog breeds
    const uniqueBreeds = new Set();

    // Populate the Set with each dog's breed
    allDogs?.forEach((dog) => {
        uniqueBreeds.add(dog.dog_breed);
    });

    // Convert the Set to an alphabetically sorted array
    const uniqueBreedsArray = Array.from(uniqueBreeds).sort();

    // Render each breed as an <option> in the dropdown
    const renderFilter = uniqueBreedsArray.map((dog_breed) => (
        <option key={dog_breed} value={dog_breed}>
            {dog_breed}
        </option>
    ));

    // Update selected breed when dropdown changes
    const handleDropDownMenu = (event) => {
        setSelectedBreed(event.target.value);
    };

    return (
        <select className="ui dropdown"
            style={{
                marginBottom: "20px",
                marginTop: "10px",
                borderRadius: "10px 10px 10px 10px",
                height: "40px",
                width: "200px"
            }}
            placeholder="Choose Breed"
            value={selectedBreed}
            onChange={handleDropDownMenu}
        >
            {/* Placeholder option */}
            <option
                value="Choose Breed"
                style={{
                    fontWeight: 'bold',
                    fontSize: '25px'
                }}
            >
                Choose Breed
            </option>

            {/* Breed options */}
            {renderFilter}
        </select>
    );
}

export default Filter;
