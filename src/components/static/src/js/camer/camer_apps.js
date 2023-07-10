import Vue from "vue"
import BootstrapVue from "bootstrap-vue"
import api from '../../../../../api/Api'
Vue.use(BootstrapVue)

import CamerMenu from '../../../../CamerMenu.vue'

var instance =  {
  name: 'CamerApps',
  components: {
    CamerMenu
  },
  data() {
    return {
      apps: [],
      menu: [
        {
            header: true,
            title: 'Main Navigation',
            hiddenOnCollapse: true
        },
        {
            href: '/apps',
            title: 'Go to Apps',
            icon: 'fa fa-chart-area'
        }
     ],
     isApps: true
    }
  },

  methods: {
    goToApp(models) {
      this.isApps = false
      var modelsLength = models.length
      var menuObject
      var className
      var modelPathSplit
      var modelPathSplitLength 
      for (let index = 0; index < modelsLength; index++) {
        menuObject = {}
        modelPathSplit = models[index].split("/")
        modelPathSplitLength = modelPathSplit.length
        className = modelPathSplit[modelPathSplitLength - 1]
        menuObject.href = '/view/' + className
        menuObject.title = className
        menuObject.icon = 'fa fa-chart-area'
        this.menu.push(menuObject)
      }
      var firstModelSplit = models[0].split("/")
      var firstModelLength = firstModelSplit.length
      this.$router.push('/view/' + firstModelSplit[firstModelLength - 1])
      // window.location.reload()
    }
  },

  // Fetches applications when the component is created.
  async created() {
    this.apps = await api.getApps()
  }
}
export default instance