import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useCharacterStore} from "./characterStore.js";
import {io} from "socket.io-client";
import {useUserStore} from "./userStore.js";

export const useSocketStore = defineStore('socket', () => {
    const socket = ref()
    const report = ref()

    function setReport(data) {
        report.value = data
    }

    function emit(action, data) {
        console.log("emit in socketstore!")
        socket.value.emit(action, data)
    }

    function on(listener) {
        socket.value.on(listener, async data => {
            report.value = data
        })
    }

    const startSocket = () => {
        const userStore = useUserStore()
        const characterStore = useCharacterStore()

        if(socket.value) return
        console.log("socket value", socket.value)
        if(!userStore.userId) return


        console.log("starting socket")


        const websocket = io(import.meta.env.VITE_SERVER_URL, {
            auth: {
                token: "abc",
                user: userStore.userId
            }})

        websocket.on('USERS_ONLINE', message => {
            const userStore = useUserStore()
            userStore.setUsersOnline(message)
        })

        websocket.on('CHARACTER_UPDATE', (data) => {
            console.log("update character happening")
            console.log(data)

            characterStore.setCharacter(data.characterData)
        })

        websocket.on('GET_EQUIPMENT', (data) => {
            console.log('GET_EQUIPMENT')
            console.log(data)
            characterStore.setEquipment(data)
        })

        websocket.on('GET_INVENTORY', (data) => {
            console.log('GET INVENTORY')
            characterStore.setInventory(data)
        })

        websocket.on('DUEL_RESULT', (data) => {
            console.log("DUEL RESULT")
            console.log(data)
            setReport(data)
        })

        socket.value = websocket
    }

    startSocket()

    return {
        socket,
        report,
        setReport,
        startSocket,
        emit,
        on
    }
})
