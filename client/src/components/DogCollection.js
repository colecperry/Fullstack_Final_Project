import React from "react";
import DogCard from "./DogCard";
import { dogsState } from "../recoil/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { Card } from "semantic-ui-react";

function DogCollection() {
    const dogs = useRecoilValue(dogsState)
    // console.log(dogs)


    const renderDogs = dogs?.map((dog) => {
        // console.log(dog.id)
        return <DogCard dog={dog} key={dog.id} />;
    });
    // console.log(renderDogs)

    return (
        <div style={{
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // marginLeft: '75px'
            }}>
            <div class="ui link cards"
            style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
            >
            {renderDogs}
            </div>
        </div>
    );
}

export default DogCollection;