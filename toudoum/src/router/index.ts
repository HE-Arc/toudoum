import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig, RouteRecord } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Account from '../views/Account.vue'
import Logout from '../views/Logout.vue'
import store from '@/store'
import Workbooks from '@/views/Workbooks.vue'
import Tasks from '@/views/Tasks.vue'
import AllTasks from '@/views/AllTasks.vue'
import TaskDetails from '@/views/TaskDetails.vue'
import Api from "@/api/ApiRequester";
import { IUser } from '@/models/IUser'
import VueMasonry from 'vue-masonry-css';

// Use Vue plugins
Vue.use(VueMasonry);
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
        path: '/Logout',
        name: 'Logout',
        component: Logout,
        meta: {
            onlyLogged: true
        }
    },
    {
        path: '/',
        name: 'Workbooks',
        component: Workbooks,
        meta: {
            onlyLogged: true
        }
    },
    {
        path: '/Tasks/:workbook_id',
        name: 'Tasks',
        props: true,
        component: Tasks,
        meta: {
            onlyLogged: true
        },

    },
    {
        path: '/Tasks',
        name: 'AllTasks',
        props: true,
        component: AllTasks,
        meta: {
            onlyLogged: true
        },

    },
    {
        path: '/Account',
        name: 'Account',
        component: Account,
        meta: {
            onlyLogged: true
        }
    },
    {
        path: '/Taskdetail/:task_id',
        name: 'TaskDetail',
        props: true,
        component: TaskDetails,
        meta: {
            onlyLogged: true
        }
    }
]

/**
 * Get session from sessionStorage if user reload page
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @return {*}  {boolean} true if session stored in sessionStorage; false otherwise
 */
function loadSessionFromStorage(): boolean {
    if (window.sessionStorage.getItem("user") != null) {
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
    const isConnected = store.getters.isLoggedIn || loadSessionFromStorage();
    if (isConnected) {
        store.actions.updateUserAvatar();
    }
    return isConnected;
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
