var app = new Vue({
	        //this targets the div id app
	        el: '#app',
	        data: {
	        name: [] //this stores data values for ‘name’
	        },
	        created() {
	         	axios.get(`http://localhost:3000/api/gut/1`)
				     .then(response => {
				        // JSON responses are automatically parsed.
				        this.name = response.data //api.getOneId('gut', 2) //api.createNew('gut', {"subtotal":50, "total":20, "taxes":9}) api.removeForId('gut', 15) 
				     })
				    .catch(e => {
				        this.errors.push(e)
				    })
            }
        })

const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // dynamic segments start with a colon
    { path: '/user/:id', component: User }
  ]
})