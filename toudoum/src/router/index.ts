import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig, RouteRecord } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '@/store'
import Workbooks from '@/views/Workbooks.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            onlyLogged: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            onlyUnlogged: true
        }
    },
    {
        path: '/SignUp',
        name: 'SignUp',
        component: SignUp,
        meta: {
            onlyUnlogged: true
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
            onlyLogged: true
        }
    },
    {
        path: '/workbooks',
        name: 'Workbooks',
        // route level code-splitting
        // this generates a separate chunk (workbook.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Workbooks,
        meta: {
            onlyLogged: true
        }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
    if (to.matched.some((route: RouteRecord) => route.meta.onlyLogged)) {
        if (!store.getters.isLoggedIn) {
            next({ name: "Login" });
        } else {
            next();
        }
    } else if (to.matched.some((route: RouteRecord) => route.meta.onlyUnlogged)) {
        if (store.getters.isLoggedIn) {
            next({ name: "Home" });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
