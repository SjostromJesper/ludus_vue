import {createRouter, createWebHistory} from "vue-router";

import Overview from "../views/Overview.vue";
import SignIn from "../views/auth/SignIn.vue";
import SignUp from "../views/auth/SignUp.vue";
import {useUserStore} from "../stores/userStore.js";
import Equipment from "../views/character/Equipment.vue";
import RandomDuel from "../views/arena/RandomDuel.vue";
import Shop from "../views/shops/Shop.vue";
import BeastDuel from "../views/arena/BeastDuel.vue";
import Ladder from "../views/information/Ladder.vue";
import AssignPoints from "../views/character/AssignPoints.vue";
import {useCharacterStore} from "../stores/characterStore.js";
import Tavern from "../views/city/Tavern.vue";

const routes = [
    {path: '/overview', name: 'Overview', component: Overview, meta: {requiresAuth: true}},
    {path: '/equipment', name: 'Inventory', component: Equipment, meta: {requiresAuth: true}},
    {path: '/assign-points', name: 'Assign Points', component: AssignPoints, meta: {requiresAuth: true}},
    {path: '/random-duel', name: 'Random Duel', component: RandomDuel, meta: {requiresAuth: true}},
    {path: '/beast-duel', name: 'Beasts', component: BeastDuel, meta: {requiresAuth: true}},
    {path: '/shop', name: 'Shop', component: Shop, meta: {requiresAuth: true}},
    {path: '/tavern', name: 'Tavern', component: Tavern, meta: {requiresAuth: true}},
    {path: '/ladder', name: 'Ladder', component: Ladder, meta: {requiresAuth: true}},
    {path: '/', name: 'Sign In', component: SignIn, meta: {requiresAuth: false}},
    {path: '/sign-up', name: 'Sign Up', component: SignUp, meta: {requiresAuth: false}},
]

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach( async (to, from, next) => {
    const userStore = await useUserStore()
    const characterStore = await useCharacterStore()

    if(to.meta.requiresAuth) {
        if(userStore.userId) next()
        else next('/')
    }
    else {
        if(userStore.userId) next('/overview')
        else next()
    }
})