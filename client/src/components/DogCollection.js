import React from "react";
import DogCard from "./DogCard";
import { dogsState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import { Card } from "semantic-ui-react";

function DogCollection({dogs}) {

    const renderDogs = dogs.map((dog) => {
        return <DogCard dog={dog} key={dog.id} />;
    });

    return (
        <Card.Group itemsPerRow={4}>
        <h1>Hello From Dog Collection</h1>
        {renderDogs}
        </Card.Group>
    );
}

export default DogCollection;