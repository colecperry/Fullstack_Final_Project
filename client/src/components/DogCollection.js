import React from "react";
import DogCard from "./DogCard";
import { dogsState } from "../recoil/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { Card } from "semantic-ui-react";

function DogCollection() {
    const dogs = useRecoilValue(dogsState)
    // console.log(dogs)


    const renderDogs = dogs?.map((dog) => {
        return <DogCard dog={dog} key={dog.id} />;
    });
    // console.log(renderDogs)

    return (
        <div>
            <Card.Group>
                {renderDogs}
            </Card.Group>
        </div>
    );
}

export default DogCollection;