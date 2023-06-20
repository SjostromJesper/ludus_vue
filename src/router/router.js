import {createRouter, createWebHistory} from "vue-router";
import {supabase} from "../supabase.js";

import Overview from "../views/Overview.vue";
import SignIn from "../views/auth/SignIn.vue";
import SignUp from "../views/auth/SignUp.vue";
import {useUserStore} from "../stores/userStore.js";
import RandomDuel from "../views/arena/RandomDuel.vue";

let localUser;

const routes = [
    {path: '/overview', name: 'Overview', component: Overview, meta: {requiresAuth: true}},
    {path: '/random-duel', name: 'RandomDUel', components: {home: RandomDuel}, meta: {requiresAuth: true}},
    {path: '/sign-in', name: 'SignIn', component: SignIn, meta: {requiresAuth: false}},
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
        next('/sign-in')
    }
    else {
        next()
    }
}

router.beforeEach( async (to, from, next) => {
    const userStore = await useUserStore()

    if(to.meta.requiresAuth) {
        if(userStore.user) next()
        else next('/sign-in')
    }
    else {
        if(userStore.user) next('/overview')
        else next()
    }
})