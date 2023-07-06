import {io} from "socket.io-client";
import axios from "axios";
import {useUserStore} from "../stores/userStore.js";
import {useCharacterStore} from "../stores/characterStore.js";
import {useSocketStore} from "../stores/socketStore.js";

const url = import.meta.env.VITE_SERVER_URL

export const auth = async (username, password) => {
    return await axios.post(url + '/login', {username: username, password: password}).then(res => {
        return res.data
    })
}

export const register = async (email, password, username) => {
    console.log("register")
    console.log(url)
    const data = await axios.post(url + '/register', {username: username, password: password, email: email})
    console.log("dororro", data)
    console.log("spela")
}

export const createCharacter = async (characterData, userId) => {
    return await axios.post(url + '/create-character', {characterData, userId})
}
