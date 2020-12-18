/**
 *
 *  ______   ______     __  __     _____     ______     __  __     __    __    
 * /\__  _\ /\  __ \   /\ \/\ \   /\  __-.  /\  __ \   /\ \/\ \   /\ "-./  \   
 * \/_/\ \/ \ \ \/\ \  \ \ \_\ \  \ \ \/\ \ \ \ \/\ \  \ \ \_\ \  \ \ \-./\ \  
 *    \ \_\  \ \_____\  \ \_____\  \ \____-  \ \_____\  \ \_____\  \ \_\ \ \_\ 
 *     \/_/   \/_____/   \/_____/   \/____/   \/_____/   \/_____/   \/_/  \/_/ 
 *
 * v1.0
 * Developed by Dos Santos Ferreira, Fridez, Goffinet
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
