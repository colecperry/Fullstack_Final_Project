import React from "react";
import DogCollection from "./DogCollection"
import Filter from "./Filter"
import { useState, useEffect } from "react";
import { dogsState } from "../recoil/atoms";
import { useRecoilState } from 'recoil'

function Home(){
    const [ dogs, setDogs ] = useRecoilState(dogsState)
    const [ filteredDogs, setFilteredDogs] = useState([])
    const [ selectedBreed, setSelectedBreed ] = useState("Choose Breed");

    useEffect(() => {
        fetch("/dogs")
        .then(resp => resp.json())
        .then(data => {
            setDogs(data)})
    }, [])

    useEffect(() => {
        if (selectedBreed === "Choose Breed") {
            setFilteredDogs([])
        }
        filterDogs()
    }, [selectedBreed])

    const filterDogs = () => {
        if (selectedBreed === "Choose Breed") {
            return dogs
        } else {
            const filterDogs = dogs.filter((dog) => {
                return dog.dog_breed.toLowerCase().includes(selectedBreed.toLowerCase())
            })
            setFilteredDogs(filterDogs)
        }
    }

    return(
        <div>
            <Filter selectedBreed={selectedBreed} setSelectedBreed={setSelectedBreed}/>
            <DogCollection dogs={filteredDogs.length ? filteredDogs : dogs }/>
        </div>
    )
}

export default Home;