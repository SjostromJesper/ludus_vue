import {defineStore} from "pinia";
import {supabase} from "../supabase.js";
import {computed, ref} from "vue";
import {useCharacterStore} from "./characterStore.js";

export const useUserStore = defineStore('user', () => {
    const userId = ref()
    const user = ref()

    const getCharacterId = computed(() => user.value.character)
    const getUser = computed(() => user.value)

    function getId() {
        return user.value.id
    }

    function setUser(user) {
        user.value = user
    }

    function clearUser() {
        user.value = null
    }

    async function load() {
        const characterStore = useCharacterStore()

        const data = await supabase.auth.getSession()


        console.log("userStore load")

        if(!data.data.session) return

        const {error, data: usr} = await supabase
            .from('users')
            .select()
            .eq('id', data.data.session.user.id)
            .limit(1)
            .single()

        console.log("user in userStore load function: ", usr)


        if(usr !== null) {
            console.log("updating user value in user store")
            user.value = usr

            characterStore.load(user.value.id)
            characterStore.realtime(user.value.id)
        }
    }


    load()

    return {
        user,
        getUser,
        getCharacterId,
        getId,
        setUser,
        clearUser,
        load,
    }
}, {persist: {storage: sessionStorage}})

// export const useUserStore = defineStore('user', {
//     state: () => {
//         return {
//             user: {}
//         }
//     },
//     getters: {
//         getId(state) {
//             return state.user.id
//         }
//     },
//     actions: {
//         setUser(user) {
//             this.user = user
//         },
//         clearUser() {
//             this.user = null
//         },
//         async load() {
//
//         }
//     },
//     persist: {storage: sessionStorage}
// })
