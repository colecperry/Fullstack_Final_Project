/**
 * recoil/atoms.js
 *
 * This file defines global state atoms and selectors using Recoil for managing user, dog,
 * favorite, and message data throughout the React app. Selectors are used for asynchronous
 * fetching from the backend API on initialization.
 */

import { atom, selector } from 'recoil'

// Stores the current logged-in user as a string or object
export const userState = atom({
    key: 'userState',
    default: ""
})

// Stores the currently logged-in breeder's full info (used to pre-fill forms or messages)
export const breederState = atom({
    key: 'breederState',
    default: {
        id: 0,
        message_receiver: null,
        message_sender: null, 
        user_address: "",
        user_city: "",
        user_email: "",
        user_image: "",
        user_name: "",
        user_phone_number: "",
        user_state: "",
        user_zip_code: 0,
        _password_hash: ""
    }
})

// Boolean toggle to show login vs signup view
export const loginNotSignupState = atom({
    key: 'loginNotSignupState',
    default: true
})

// Loads visible dogs for a specific view (e.g., filtered dogs)
// This fetches dog data from the API when the atom is first used
export const dogsState = atom({
    key: 'dogsState',
    default: selector({
        key: 'dogLoader',
        get: async () => {
            const response = await fetch("https://doggio.onrender.com/dogs");
            const data = await response.json()
            console.log("data:", data)
            return data
        }
    })
})

// Loads all dogs regardless of filters (used for full dataset access)
export const allDogsState = atom({
    key: 'allDogsState',
    default: selector({
        key: 'allDogsLoader',
        get: async () => {
            const response = await fetch("https://doggio.onrender.com/dogs");
            const data = await response.json()
            return data
        }
    })
})

// Loads all favorite dogs for current users
export const allFavoritesState = atom({
    key: 'allFavoritesState',
    default: selector({
        key: 'favoritesLoader',
        get: async () => {
            const response = await fetch("https://doggio.onrender.com/favorites");
            const data = await response.json()
            return data
        }
    })
})

// Loads all messages across users for chat functionality
export const allMessagesState = atom({
    key: 'allMessagesState',
    default: selector({
        key: 'messagesLoader',
        get: async () => {
            const response = await fetch("https://doggio.onrender.com/messages");
            const data = await response.json()
            return data
        }
    })
})
