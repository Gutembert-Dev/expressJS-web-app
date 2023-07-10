import $ from "jquery"
import "jquery-deparam"
import Vue from "vue"
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import api from '../../../../../api/Api'
import {tree} from 'vued3tree'
import toCapitalize from '../../../../../../tools/capitalize'
import vueFormParsing from '../../../../../../tools/vue-form-parsing'
import vueFormPopulating from '../../../../../../tools/vue-form-populating'
import CamerMenu from '../../../../CamerMenu.vue'

var instance =  {
  name: 'CamerView',
  components: {
    tree,
    CamerMenu
  },
  data() {    //data: function() OR data: () => 
    return {
      posts: [],
      errors: [],
      relationMappingsKey: "",
      keys: [],
      keysLimit: 0,
      count: 0,
      fieldsToDisplayOnTreeView: [],
      currentSort:'id',
      currentSortDir:'desc',
      pageSize:4,
      currentPage:1,
      search: "",
      formName: "",
      fieldsToDisplayOnFormView: [],
      newId: 0,
      parentId: 0,
      classId: 0,
      view: false,
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
     ]
    }
  },

  methods: {
    async viewFunction(className, id){
      this.view = true
      this.formName = className
      this.classId = id
      var classFormAttr = await api.getOne(className, "form")
      var valueFormAttr = await api.getOne(className, id)
      var data = valueFormAttr[0]
      var classForm = classFormAttr.form
      $('form#modal-form').append(classForm)
      this.fieldsToDisplayOnFormView = classFormAttr
      .fieldsToDisplayOnFormView
      vueFormPopulating(this.fieldsToDisplayOnFormView, data, true)
    },

    async editFunction(className, id){
      this.formName = className
      this.classId = id
      var classFormAttr = await api.getOne(className, "form")
      var valueFormAttr = await api.getOne(className, id)
      var data = valueFormAttr[0]
      var classForm = classFormAttr.form
      $('form#modal-form').append(classForm)
      this.fieldsToDisplayOnFormView = classFormAttr
      .fieldsToDisplayOnFormView
      vueFormPopulating(this.fieldsToDisplayOnFormView, data, false)
    },

    async updateFunction(className){
      $('button#update').attr("hidden", true)
      $('div#formDiv').remove()
      this.editFunction(this.formName, this.classId)
    },

    async deleteFunction(className, id){
      if(confirm("Do you really want to delete " + className + " #" + id + "?")){
        await api.removeForId(className, id)
        this.$router.push('/view/' + className)
        window.location.reload()
      }
    },

    async addChildFunction(className, parentId){
      this.formName = className
      this.parentId = parentId
      var classFormAttr = await api.getOne(className, "form")
      var classForm = classFormAttr.form
      $('form#modal-form').append(classForm)
      this.fieldsToDisplayOnFormView = classFormAttr
      .fieldsToDisplayOnFormView
    },

    capitalize(str){
        return toCapitalize(str)
    },

    clickNode(className, id){
      if ($('#node_'+className+'_'+id+':checkbox:checked').length > 0){
        $('button#create').attr("hidden", true)
        $('button#cancel').attr("hidden", false)
        $('button#delete').attr("hidden", false)
        if (this.posts.length == 1) {
          $('button#select').attr("hidden", true)
        }
      }
      if ($('input[type=checkbox]:checked').length == 0) {
        $('button#create').attr("hidden", false)
        $('button#cancel').attr("hidden", true)
        $('button#delete').attr("hidden", true)
        $('button#select').attr("hidden", false)
      }
    },
     
    async createForm(className){
      this.formName = className
      var classFormAttr = await api.getOne(className, "form")
      var classForm = classFormAttr.form
      $('form#modal-form').append(classForm)
      this.fieldsToDisplayOnFormView = classFormAttr
      .fieldsToDisplayOnFormView
    },

    async okForm(className){
      var data = vueFormParsing(this.fieldsToDisplayOnFormView)
      if(typeof data === 'string')
        alert(data)
      else{
        if (this.parentId !== 0) {
          var parentData = await api.getOne(this.$route.params.className, this.parentId)
          parentData[0][className].push(data)
          await api.updateForId(this.$route.params.className, parentData)
          if (this.$route.params.hasOwnProperty('id')) {
            this.$router.push('/view/' + this.$route.params.className + "/" + this.$route.params.id)
          }
          else
            this.$router.push('/view/' + this.$route.params.className)
          window.location.reload()
        }
        else if(this.classId !== 0){
          data.id = this.classId
          await api.updateForId(this.$route.params.className, data)
          window.location.reload()
        }
        else{
          var newData = await api.createNew(className, data)
          this.newId = newData.id
          this.$router.push('/view/' + className + "/" + this.newId)
          window.location.reload()
        }
      }
    },
     
    saveForm(){
      alert('Working on saveForm??')
      // get class and dynamically save a form
    },

    clickAllNodes(){
      $('input[type=checkbox]').prop('checked', true)
      $('button#create').attr("hidden", true)
      $('button#cancel').attr("hidden", false)
      $('button#delete').attr("hidden", false)
      $('button#select').attr("hidden", true)
      $('button#save').attr("hidden", true)
      //TODO
    },
    
    // for loop and delete where checkbox is true
    async deleteNodes(){
      if(confirm("Do you really want to delete?")){
        for (var i = 0; i < $('input[type=checkbox]:checked').length; i++) {
          var checkedId = $('input[type=checkbox]:checked')[i].id
          var checked = checkedId.split('_')
          var className = checked[1]
          var id = checked[2]
          await api.removeForId(className, id)
        }
        this.$router.push('/view/' + className)
        window.location.reload()
      }
    },

    unClickAllNodes(){
      $('input[type=checkbox]').prop('checked', false)
      $('div#tree').attr("hidden", false)
      $('button#cancel').attr("hidden", true)
      $('button#create').attr("hidden", false)
      $('button#delete').attr("hidden", true)
      $('button#save').attr("hidden", true)
      if(this.posts.length !== 0)
        $('button#select').attr("hidden", false)
    },

    sort(s){
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc'
      }
      this.currentSort = s
      $("th").css("background-color", "#FFFAFA")
      $("th#"+s).css("background-color", "gray")
    },

    nextPage() {
      if((this.currentPage*this.pageSize) < this.posts.length) this.currentPage++
    },

    prevPage() {
      if(this.currentPage > 1) this.currentPage--
    }
  },

  computed: {
    sortedPosts() {
      return this.posts.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0;
      }).filter((row, index) => {
        if(this.search)
          return this.search.toLowerCase().split(' ').every(v => row.name.toLowerCase().includes(v))
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(this.currentPage === 1)
          $('button#prev').attr("hidden", true)
        else if(this.currentPage*this.pageSize > this.posts.length)
          $('button#next').attr("hidden", true)
        else {
          $('button#prev').attr("hidden", false)
          $('button#next').attr("hidden", false)
        }
        if(index >= start && index < end) return true
      })
    }
  },

  // Fetches posts when the component is created.
  async created() {
    this.fieldsToDisplayOnTreeView = await api.getOne(this.$route.params.className, "tree")
    if(this.$route.params.hasOwnProperty('id'))
      this.posts = await api.getOne(this.$route.params.className, this.$route.params.id)
    else
      this.posts = await api.getAll(this.$route.params.className)
    if(this.posts.length !== 0)
      $('button#select').attr("hidden", false)
    if(this.posts.length === 0){
      $('button#prev').attr("hidden", true)
      $('button#next').attr("hidden", true)
    }
    if(this.currentPage === 1 && this.posts.length <= this.pageSize)
      $('button#next').attr("hidden", true)
    
    this.apps = await api.getApps()
    var models
    for (var app of this.apps) {
      if (app.models.join(',').includes(this.$route.params.className)) {
        models = app.models
        break
      }
    }
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
  }
}
export default instance