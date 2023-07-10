import Vue from "vue"
import VueSidebarMenu from 'vue-sidebar-menu'
// import 'vue-sidebar-menu/dist/vue-sidebar-menu.css' // done via the browser in the html file
Vue.use(VueSidebarMenu)

var instance =  {
  name: 'CamerMenu',
  props: ['menu']
}
export default instance