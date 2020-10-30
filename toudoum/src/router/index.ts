import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig, RouteRecord } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Login,
        meta: {
            AccessRight: true
        }
    },
    {
        path: '/SignUp',
        name: 'SignUp',
        component: SignUp,
        meta: {
            requiredAuth: true
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            requiredAuth: true
        }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
    if (to.matched.some((route: RouteRecord) => route.meta.requiredAuth)) {
        if (!store.getters.isLoggedIn) {
            next({ name: "Login" });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
