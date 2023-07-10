<template> <!-- v-bind:img-src="`http://localhost:1337/uploads/beef_b538baa14d.png`" -->
  <b-container>
    <div v-if="products.length">
      <b-row>
        <div v-bind:key="product.id" v-for="product in products" v-if="product.public">
          <b-col l="4">
            <b-card
              v-bind:img-src="`https://mdbootstrap.com/img/Photos/Avatars/img%20%281%29.jpg`"
              v-bind:title="product.title"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2 rounded-circle img-responsive"
              alt="avatar"
            >
              <b-card-text>{{ `${product.description}` }}</b-card-text>
              <span>
                <strong>Price: ${{ `${product.price}` }} </strong>
              </span>
              <b-button @click="placeOrder" variant="primary">Order product</b-button>
            </b-card>
          </b-col>
        </div>
      </b-row>
    </div>
    <div v-else>
      <h5>Fetching products . . .</h5>
    </div>
  </b-container>
</template>
<script src="./static/src/js/camer/camer_shop.js"></script>
<style scoped src="./static/src/css/camer/camer_shop.css"></style>