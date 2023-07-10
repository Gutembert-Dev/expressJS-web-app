import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import { mdbContainer, mdbTextarea, mdbIcon, mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbInput, mdbModalFooter } from 'mdbvue'
export default {
	name: 'ContactUs',
    components: {
        mdbContainer,
        mdbBtn,
        mdbModal,
        mdbModalHeader,
        mdbModalBody,
        mdbInput,
        mdbModalFooter,
        mdbTextarea,
        mdbIcon,
        mdbModalTitle
    },
    data(){
    	return {
            contact: true
    	}
    },
    methods: {
        closeModal(){
            this.contact = false
            this.$router.push('/')
            window.location.reload()
        },
        writeToUs(){
            // send 
            this.contact = false
            this.$router.push('/')
            window.location.reload()
        }
    }
}
