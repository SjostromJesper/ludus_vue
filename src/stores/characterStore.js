import {defineStore} from "pinia";
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
    const characterPosition = ref({x: 0, y: 0})
    const allPlayerPositions = ref([])

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

    function setPosX(data) {
        characterPosition.value.x += data
    }

    function setPosY(data) {
        characterPosition.value.y += data
    }

    function setAllPlayerPositions(data) {
        allPlayerPositions.value = data
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
        characterPosition,
        allPlayerPositions,
        setCharacter,
        setEquipment,
        setInventory,
        setPosX,
        setPosY,
        setAllPlayerPositions,
        clearCharacter
    }
}, {persist: {storage: sessionStorage}})

