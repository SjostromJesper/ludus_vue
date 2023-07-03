import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useSocketStore = defineStore('socket', () => {
    const socket = ref()
    const report = ref()

    function setSocket(ws) {
        socket.value = ws
    }

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

    return {
        socket,
        report,
        setSocket,
        setReport,
        emit,
        on
    }
})
