/**
 * FavoritesCollection.js
 *
 * This component fetches all favorite dogs from the backend and filters them
 * down to only the favorites belonging to the currently logged-in user.
 * It then renders a card for each of the user's favorite dogs using the FavoritesCard component.
 */

import React from "react";
import { useEffect, useState } from "react";
import { userState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import { Card } from "semantic-ui-react";
import DogCard from "./DogCard";
import FavoritesCard from "./FavoritesCard";
import { useParams } from "react-router-dom";

function FavoritesCollection() {
    // State to store all favorite dog records
    const [dogFavorites, setDogFavorites] = useState([]);

    // Get the current user from global state (Recoil)
    const user = useRecoilValue(userState)

    // Fetch all favorites when the component mounts
    useEffect(() => {
        fetch("https://doggio.onrender.com/favorites")
            .then(r => r.json())
            .then(favorites => setDogFavorites(favorites))
    }, [])

    // Filter the favorites to include only the ones belonging to the logged-in user
    const favoriteCollection = dogFavorites.filter((favorite) => favorite.user.id == user.id)

    // Render a card for each favorite
    const renderFavorites = favoriteCollection?.map((dogFavorite) => {
        return <FavoritesCard dogFavorite={dogFavorite} key={dogFavorite.id} />;
    });

    return (
        <div>
            <h1 style={{ fontFamily: 'Verdana, sans-serif' }}>Favorites</h1>
            <div className="ui link cards"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {renderFavorites}
            </div>
        </div>
    );
}

export default FavoritesCollection;
