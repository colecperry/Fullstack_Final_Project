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
    default: []
})
