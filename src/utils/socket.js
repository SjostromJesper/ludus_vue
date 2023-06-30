import {io} from "socket.io-client";
import axios from "axios";
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
    console.log(email)
    console.log(password)
    console.log(username)
    const data = await axios.post(url + '/register', {username: username, password: password, email: email})
}

export const createCharacter = async (characterData, userId) => {
    const data = await axios.post(url + '/create-character', {characterData, userId})
}

const startSocket = (user) => {
    socket = io(url, {auth: {
            token: "abc",
            user: user
        }})

    socket.on('connect', () => {
        console.log("io connect")
    })

    socket.on('disconnect', () => {
        console.log("io disconnect")
    })
}