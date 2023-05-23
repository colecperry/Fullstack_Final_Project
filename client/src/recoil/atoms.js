import { atom, selector } from 'recoil'


export const userState = atom({
    key: 'userState',
    default: ""
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
                const response = await fetch("/dogs");
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
        key: 'dogLoader',
        get: async () => {
                const response = await fetch("/dogs");
                const data = await response.json()
                return data
            }
        }

    )
})