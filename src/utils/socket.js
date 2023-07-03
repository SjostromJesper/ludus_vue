import {io} from "socket.io-client";
import axios from "axios";
import {useUserStore} from "../stores/userStore.js";
import {useCharacterStore} from "../stores/characterStore.js";
import {useSocketStore} from "../stores/socketStore.js";

let socket;

const url = import.meta.env.VITE_SERVER_URL


export const sendMessage = () => {
    console.log("emitting")
    socket.emit('chat message', "häst")
}

export const auth = async (username, password) => {
    return await axios.post(url + '/login', {username: username, password: password}).then(res => {
        startSocket(res.data.userData.id)
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

export const searchDuel = async (id) => {
    return await axios.post(url + '/duel', {id: id})
}


export const startSocket = (user) => {
    console.log("starting socket")
    const characterStore = useCharacterStore()
    const socketStore = useSocketStore()

    const socket = io(url, {auth: {
            token: "abc",
            user: user
        }})
    // socket.on('connect', () => {
    //     console.log("io connect")
    // })
    //
    // socket.on('disconnect', () => {
    //     console.log("io disconnect")
    // })
    //
    // socket.on('users_online', message => {
    //     const userStore = useUserStore()
    //     console.log(message)
    //     userStore.setUsersOnline(message)
    // })

    socket.on('CHARACTER_UPDATE', (data) => {
        console.log("update character happening")
        characterStore.setCharacter(data.characterData)
    })

    socket.on('DUEL_RESULT', (data) => {
        console.log(data)
        socketStore.setReport(data)
    })

    return socket
}