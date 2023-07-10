import Vue from "vue"
import BootstrapVue from "bootstrap-vue"
import api from '../../../../../api/Api'
Vue.use(BootstrapVue)

var instance =  {
  name: 'CamerShop',
  data() {
    return {
      products: []
    }
  },

  methods: { // https://blog.logrocket.com/how-to-build-an-ecommerce-site-with-strapi-vue-js-and-flutterwave/
    placeOrder() {
      window.FlutterwaveCheckout({
        public_key: "INSERT YOUR PUBLIC KEY",
        tx_ref: "new-sale"+ new Date(),
        amount: 29.99,
        currency: "USD",
        country: "NG",
        payment_options: "card",
        customer: {
          email: "ekene@gmail.com",
          phone_number: "+234702909304",
          name: "Ekene Eze",
        },
        callback: function(data) {
          console.log(data);
        },
        onclose: function() {},
        customizations: {
          title: "MealsHub",
          description: "Payment for selected meal",
          logo: "http://localhost:1337/uploads/beef_b538baa14d.png",
        },
      });
    }
  },

  // Fetches products when the component is created.
  async created() {
    this.products = await api.getAll("products")
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}
export default instance