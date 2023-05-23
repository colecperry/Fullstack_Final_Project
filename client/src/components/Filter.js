import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { allDogsState } from "../recoil/atoms";
import { Dropdown } from "semantic-ui-react";

function Filter({selectedBreed, setSelectedBreed}) {
    const allDogs = useRecoilValue(allDogsState);

    const renderFilter = allDogs?.map((dog) => (
        <option key={dog.id} value={dog.dog_breed}>
        {dog.dog_breed}
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