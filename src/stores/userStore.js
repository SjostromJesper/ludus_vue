import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useUserStore = defineStore('user', () => {
    const userId = ref('')
    const user = ref({})
    const usersOnline = ref(0)


    // const getCharacterId = computed(() => user.value.character)
    // const getUser = computed(() => user.value)

    function getId() {
        return user.value.name
    }

    function setUser(data) {
        user.value = data
    }

    function setUserId(id) {
        userId.value = id
    }

    function clearUser() {
        user.value = null
        userId.value = ''
    }

    function setUsersOnline(data) {
        usersOnline.value = data
    }


    return {
        user,
        userId,
        usersOnline,
        // getUser,
        // getCharacterId,
        getId,
        setUser,
        clearUser,
        setUserId,
        setUsersOnline
    }
}, {persist: {storage: sessionStorage}})
