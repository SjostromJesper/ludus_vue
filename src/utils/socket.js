import {io} from "socket.io-client";
import axios from "axios";
import {useUserStore} from "../stores/userStore.js";
import {useCharacterStore} from "../stores/characterStore.js";
let socket;


export const sendMessage = () => {
    console.log("emitting")
    socket.emit('chat message', "häst")
}

export const auth = async (username, password) => {
    return await axios.post('http://localhost:8080/login', {username: username, password: password}).then(res => {
        startSocket(res.data.data.id)

        return res.data
    })
}

export const register = async (email, password, username) => {
    const data = await axios.post('http://localhost:8080/register', {username: 'pelle', password: 'pellesLösenord', email: 'pelle@pelle.pelle'})
}

const startSocket = (user) => {
    socket = io('http://localhost:8080', {auth: {
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