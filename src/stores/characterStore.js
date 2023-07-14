import {defineStore} from "pinia";
import {supabase} from "../supabase.js";
import axios from "axios";
import {ref} from "vue";

export const useCharacterStore = defineStore('character', () => {
    const character = ref()
    const equipment = ref({
        main_hand: null,
        offhand: null,
        head: null,
        chest: null,
        legs: null,
        hands: null,
        feet: null
    })
    const inventory = ref()

    function setCharacter(data) {
        character.value = data
    }

    function setEquipment(data) {
        equipment.value = {
            main_hand: null,
            offhand: null,
            head: null,
            chest: null,
            legs: null,
            hands: null,
            feet: null
        }

        for (let key in data) {
            equipment.value[key] = data[key]
        }
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

