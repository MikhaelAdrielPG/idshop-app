import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
