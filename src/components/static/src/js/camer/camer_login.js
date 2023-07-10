import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import { mdbContainer, mdbBtn, mdbModal, mdbTab, mdbTabItem, mdbModalBody, mdbInput, mdbModalFooter, mdbModalTitle, mdbIcon } from 'mdbvue'
import Api from '../../../../../api/Api'
export default {
    name: 'Login',
    props: ['logedIn'],
    components: {
        mdbContainer,
        mdbBtn,
        mdbModal,
        mdbTab,
        mdbTabItem,
        mdbModalBody,
        mdbInput,
        mdbModalFooter,
        mdbIcon,
        mdbModalTitle
    },
    data(){
    	return {
            cascading: true,
            tabs: 1,
            email: '',
            password: '',
            users: []
    	}
    },
    methods: {
        closeModal(){
            this.cascading = false
            this.$router.push('/')
            window.location.reload()
        },
        doLogin(){
            tabs = 1
            // if(this.email && this.password in db)
            this.closeModal()
            this.$props.logedIn = true
            this.$router.push('/apps')
            // window.location.reload()
            alert(this.$props.logedIn)
        },
        doSignUp(){
            tabs = 2
            // if(this.email && this.password in db)
            this.closeModal()
            this.$props.logedIn = true
            this.$router.push('/apps')
            // window.location.reload()
            alert(this.$props.logedIn)
        }
    },
    async created() {
        this.users = await Api.getAll('users')
    }
}
