import React from "react";
import DogCollection from "./DogCollection"
import Filter from "./Filter"
import { useState, useEffect } from "react";
import { dogsState, allDogsState } from "../recoil/atoms";
import { useRecoilValue, useRecoilState } from 'recoil'

function Home(){
    const dogs = useRecoilValue(dogsState)
    const allDogs = useRecoilValue(allDogsState)
    const [dogssState, setDogssState] = useRecoilState(dogsState)
    // const [ filteredDogs, setFilteredDogs] = useState([])
    const [ selectedBreed, setSelectedBreed ] = useState("Choose Breed");
    // useEffect(() => {
    //     fetch("/dogs")
    //     .then(resp => resp.json())
    //     .then(data => {
    //         setDogs(data)})
    // }, [])

    useEffect(() => {
        if (selectedBreed === "Choose Breed") {
            setDogssState(allDogs)
        }
        else {
        const filteredDogs = allDogs.filter((dog) => {
            return dog.dog_breed.toLowerCase().includes(selectedBreed.toLowerCase())
        })
        setDogssState(filteredDogs)}
        // console.log(filterDogs)
        // setDogssState(filterDogs);
    }, [selectedBreed])

    // const filterDogs = () => {
    //     // if (selectedBreed === "Choose Breed") {
    //     //     return dogs
    //     } else {

            // setFilteredDogs(fd)
        


    return(
        <div>
            <Filter selectedBreed={selectedBreed} setSelectedBreed={setSelectedBreed}/>
            <DogCollection 
            // dogs={filteredDogs.length ? filteredDogs : dogs }
            />

        </div>
    )
}

export default Home;