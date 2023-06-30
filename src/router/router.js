import {createRouter, createWebHistory} from "vue-router";
import {supabase} from "../supabase.js";

import Overview from "../views/Overview.vue";
import SignIn from "../views/auth/SignIn.vue";
import SignUp from "../views/auth/SignUp.vue";
import {useUserStore} from "../stores/userStore.js";
import Equipment from "../views/character/Equipment.vue";
import RandomDuel from "../views/arena/RandomDuel.vue";

let localUser;

const routes = [
    {path: '/overview', name: 'Overview', component: Overview, meta: {requiresAuth: true}},
    {path: '/equipment', name: 'Equipment', component: Equipment, meta: {requiresAuth: true}},
    {path: '/random-duel', name: 'RandomDuel', component: RandomDuel, meta: {requiresAuth: true}},
    {path: '/', name: 'SignIn', component: SignIn, meta: {requiresAuth: false}},
    {path: '/sign-up', name: 'SignUp', component: SignUp, meta: {requiresAuth: false}},
]

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

const getUser = async (next) => {
    localUser = await supabase.auth.getSession()

    console.log(localUser)

    if(localUser.data.session === null) {
        next('/')
    }
    else {
        next()
    }
}

router.beforeEach( async (to, from, next) => {
    const userStore = await useUserStore()


    console.log(userStore.userId)
    if(to.meta.requiresAuth) {
        if(userStore.userId) next()
        else next('/')
    }
    else {
        if(userStore.userId) next('/overview')
        else next()
    }
})