import React from "react";
import "../assets/App.css"
import { dogsState } from "../recoil/atoms"
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DogPage() {
    const { id } = useParams();
    const dogs = useRecoilValue(dogsState);
    console.log("ID:", id);
    console.log("Dogs:", dogs);

    const dog = dogs.find((dog) => dog.id == id);
    console.log("Dog:", dog);


    return (
        <div>
            <h1>Hello from DogPage</h1>
            <p>Dog ID: {id}</p>
            {dog && (
            <div>
                <h2>{dog.dog_name}</h2>
                <p>Breed: {dog.dog_breed}</p>
                <p>Age: {dog.dog_age}</p>
                <p>Gender: {dog.dog_gender}</p>
            </div>
            )}
        </div>
    )
}

export default DogPage;