import {defineStore} from "pinia";
import {supabase} from "../supabase.js";
import axios from "axios";
import {ref} from "vue";

export const useCharacterStore = defineStore('character', () => {
    const character = ref()
    const history = ref()
    const isSearching = ref()

    // async function load(id) {
    //     console.log("character store load id:", id)
    //
    //     let {error, data: character} = await supabase
    //         .from('characters')
    //         .select()
    //         .eq('owner', id)
    //         .limit(1)
    //         .single()
    //
    //     console.log("error", error)
    //
    //     console.log("character", character)
    //
    //     this.character = character
    // }

    // async function realtime(id) {
    //     console.log("realtime activated")
    //
    //     const channel = supabase
    //         .channel('character_update')
    //         .on(
    //             'postgres_changes',
    //             {
    //                 event: '*',
    //                 schema: 'public',
    //                 table: 'characters',
    //                 filter: 'owner=eq.' + id
    //             },
    //             (payload) => {
    //                 const eventType = payload.eventType
    //                 const newRecord = payload.new
    //                 const oldRecord = payload.old
    //
    //                 console.log(newRecord)
    //
    //                 this.character = newRecord
    //             }
    //         )
    //         .subscribe()
    // }

    // async function duelPolling() {
    //     console.log("ping")
    //     console.log("owner:", character.value.owner)
    //     axios.get('http://localhost:3000/match-ping', {
    //         params: {id: character.value.owner}
    //     }).then(res => {
    //         console.log(res)
    //         this.isSearching = res.data.status === true;
    //
    //         console.log("TODOTODO")
    //
    //         if (res.data.status) {
    //             console.log("reccur")
    //             setTimeout(duelPolling, 5000)
    //         }
    //     })
    // }

    async function setIsSearching(value) {
        isSearching.value = value
        duelPolling()
    }

    function clearCharacter() {
        character.value = null
        history.value = null
        isSearching.value = null
    }

    return {
        character,
        history,
        isSearching,
        // load,
        // realtime,
        // duelPolling,
        setIsSearching,
        clearCharacter
    }
}, {persist: {storage: sessionStorage}})

// export const useCharacterStore = defineStore('character', {
//     state: () => {
//         return {
//             character: null,
//             history: null,
//             isSearching: false
//         }
//     },
//     getters: {
//         getCharacter(state) {
//             return state.character
//         },
//         getName(state) {
//             return state.character.name
//         },
//         getOwner(state) {
//             return state.character.owner
//         },
//         getIsSearching(state) {
//             return state.isSearching
//         }
//     },
//     actions: {
//         async loadCharacter(id) {
//             console.log("id", id)
//
//             let {error, data: character} = await supabase
//                 .from('characters')
//                 .select()
//                 .eq('owner', id)
//                 .limit(1)
//                 .single()
//
//             console.log("error", error)
//
//             console.log("character", character)
//
//             this.character = character
//         },
//         async startRealtime() {
//             const userStore = useUserStore()
//
//             console.log("realtime activated")
//
//             const channel = supabase
//                 .channel('character_update')
//                 .on(
//                     'postgres_changes',
//                     {
//                         event: '*',
//                         schema: 'public',
//                         table: 'characters',
//                         filter: 'owner=eq.' + userStore.getId
//                     },
//                     (payload) => {
//                         const eventType = payload.eventType
//                         const newRecord = payload.new
//                         const oldRecord = payload.old
//
//                         console.log(newRecord)
//
//                         this.character = newRecord
//                     }
//                 )
//                 .subscribe()
//         },
//         async duelPolling() {
//             console.log("ping")
//             console.log("owner:", this.character.owner)
//             axios.get('http://localhost:3000/match-ping', {
//                 params: {id: this.character.owner}
//             }).then(res => {
//                 console.log(res)
//                 this.isSearching = res.data.status === true;
//
//                 console.log("TODOTODO")
//
//                 if (res.data.status) {
//                     console.log("reccur")
//                     setTimeout(this.duelPolling, 5000)
//                 }
//             })
//
//         },
//         async setIsSearching(value) {
//             this.isSearching = value
//             this.duelPolling()
//         }
//     },
//     persist: {storage: sessionStorage}
// })
