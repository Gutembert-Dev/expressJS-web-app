import $ from 'jquery'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import CamerView from '../../../../CamerView.vue'
import CamerShop from '../../../../CamerShop.vue'
import CamerLogin from '../../../../CamerLogin.vue'
import CamerContactUs from '../../../../CamerContactUs.vue'
import CamerReport from '../../../../CamerReport.vue'
import CamerTemplate from '../../../../CamerTemplate.vue'

import router from '../../../../../router'
import i18n from '../../../../../i18n'

import VueTabs from 'vue-nav-tabs/dist/vue-tabs.js'
// import 'vue-nav-tabs/themes/vue-tabs.css' // import via the browser (in html file)
Vue.use(VueTabs)
export default {
	name: 'App',
    router: router,
    i18n,
    components: {
        'camer-view': CamerView,
        CamerShop,
        'camer-login': CamerLogin,
        CamerContactUs,
        'camer-report': CamerReport,
        'camer-template': CamerTemplate,
    },
    data(){
    	return {
    		name: 'Gut',
            langs: ['en', 'de'],
            logedIn: false//true//false
    	}
    },
    created(){
        if (!this.logedIn) {
            this.$router.push('/')
        }
        else {
            $('div#home').hide()
        }
    }
}
