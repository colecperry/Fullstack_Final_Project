/**
 * DogCollection.js
 *
 * This component displays a collection of DogCard components.
 * It uses Recoil state to retrieve the list of dogs from the global state (`dogsState`).
 * Each dog is rendered as an individual DogCard.
 */

import React from "react";
import DogCard from "./DogCard";
import { dogsState } from "../recoil/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { Card } from "semantic-ui-react";

function DogCollection() {
    // Retrieve the list of dogs from Recoil state
    const dogs = useRecoilValue(dogsState);

    // Map over the dogs array and create a DogCard for each one
    const renderDogs = dogs?.map((dog) => {
        return <DogCard dog={dog} key={dog.id} />;
    });

    return (
        <div>
            {/* Container for dog cards, using Semantic UI styling */}
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
