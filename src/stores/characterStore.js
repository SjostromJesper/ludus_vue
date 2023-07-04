import {defineStore} from "pinia";
import {supabase} from "../supabase.js";
import axios from "axios";
import {ref} from "vue";

export const useCharacterStore = defineStore('character', () => {
    const character = ref()
    const equipment = ref()
    const inventory = ref()

    function setCharacter(data) {
        character.value = data
    }

    function setEquipment(data) {
        equipment.value = data
    }

    function setInventory(data) {
        inventory.value = data
    }

    function clearCharacter() {
        character.value = null
        equipment.value = null
        inventory.value = null
    }

    return {
        character,
        equipment,
        inventory,
        setCharacter,
        setEquipment,
        setInventory,
        clearCharacter
    }
}, {persist: {storage: sessionStorage}})

