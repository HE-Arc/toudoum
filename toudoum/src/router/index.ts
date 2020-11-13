import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig, RouteRecord } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Account from '../views/Account.vue'
import Logout from '../views/Logout.vue'
import store from '@/store'
import Workbooks from '@/views/Workbooks.vue'
import Tasks from '@/views/Tasks.vue'
import Api from "@/api/ApiRequester";
import { IUser } from '@/models/IUser'

Vue.use(VueRouter)

/**
 * All routes for Toudoum App !
 */
const routes: Array<RouteConfig> = [
    {
        path: '/Login', 
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
        path: '/Account',
        name: 'Account',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            onlyLogged: true
        }
    },
    {
        path: '/Dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            onlyLogged: true
        }
    },
    {
        path: '/Groups',
        name: 'Groups',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            onlyLogged: true
        }
    },
    {
        path: '/Logout',
        name: 'Logout',
        component: Logout,
        meta: {
            onlyLogged: true
        }
    },
    {
        path: '/About',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            onlyLogged: true
        }
    },
    {
        path: '/',
        name: 'Workbooks',
        // route level code-splitting
        // this generates a separate chunk (workbook.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Workbooks,
        meta: {
            onlyLogged: true
        }
    },
    {
        path: '/tasks/:workbook_id',
        name: 'Tasks',
        props: true,
        // props: {
        //     workbook_id: ''
        // },

        // route level code-splitting
        // this generates a separate chunk (workbook.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Tasks,
        meta: {
            onlyLogged: false
        },
        
    },
    {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: {
            onlyLogged: false
        }
    },
]

/**
 * Get session from sessionStorage if user reload page
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @return {*}  {boolean} true if session stored in sessionStorage; false otherwise
 */
function loadSessionFromStorage(): boolean {
    if(window.sessionStorage.getItem("user") != null) {
        const user: IUser = JSON.parse(window.sessionStorage.getItem("user") ?? "") as IUser;
        store.actions.logUser(user);
        Api.setToken(window.sessionStorage.getItem("token") ?? "");
        return true;
    } else {
        return false;
    }
}

/**
 * Define is user is logged in Vuex ou sessionStorage
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @return {*}  {boolean} treue if user is logged in; false otherwise
 */
function isLogged(): boolean {
    return store.getters.isLoggedIn || loadSessionFromStorage();
}


const router = new VueRouter({
    routes
})

/**
 * Define autorisation for each routes
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 */
router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
    if (to.matched.some((route: RouteRecord) => route.meta.onlyLogged)) {
        if (!isLogged()) {
            next({ name: "Login" });
        } else {
            next();
        }
    } else if (to.matched.some((route: RouteRecord) => route.meta.onlyUnlogged)) {
        if (isLogged()) {
            next({ name: "Home" });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
