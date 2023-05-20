import React from "react";
import DogCollection from "./DogCollection"
import Filter from "./Filter"
import { useState, useEffect } from "react";
import { dogsState } from "../recoil/atoms";
import { useRecoilState } from 'recoil'

function Home(){
    const [ dogs, setDogs ] = useRecoilState(dogsState)

    useEffect(() => {
        fetch("/dogs")
        .then(resp => resp.json())
        .then(data => setDogs(data))
    }, [])

    return(
        <div>
            <Filter/>
            <DogCollection />
        </div>
    )
}

export default Home;