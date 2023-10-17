import { atom, selector } from 'recoil'


export const userState = atom({
    key: 'userState',
    default: ""
})

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

export const loginNotSignupState = atom({
    key: 'loginNotSignupState',
    default: true
})

export const dogsState = atom({
    key: 'dogsState',
    default: selector( {
        key: 'dogLoader',
        get: async () => {
                const response = await fetch("https://doggio.onrender.com/dogs");
                const data = await response.json()
                console.log("data:", data)
                return data
            }
        }

    )
})

export const allDogsState = atom({
    key: 'allDogsState',
    default: selector( {
        key: 'allDogsLoader',
        get: async () => {
                const response = await fetch("https://doggio.onrender.com/dogs");
                const data = await response.json()
                return data
            }
        }

    )
})

export const allFavoritesState = atom({
    key: 'allFavoritesState',
    default: selector( {
        key: 'favoritesLoader',
        get: async () => {
                const response = await fetch("https://doggio.onrender.com/favorites");
                const data = await response.json()
                return data
            }
        }

    )
})

export const allMessagesState= atom({
    key: 'allMessagesState',
    default: selector( {
        key: 'messagesLoader',
        get: async () => {
                const response = await fetch("https://doggio.onrender.com/messages");
                const data = await response.json()
                return data
            }
        }

    )
})