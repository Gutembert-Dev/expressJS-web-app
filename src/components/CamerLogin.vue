<template>
  <mdb-container>
    <mdb-modal :show="cascading" @close="closeModal" cascade tabs>
      <mdb-tab tabs justify class="light-blue darken-3">
        <mdb-tab-item :active="tabs==1" @click.native.prevent="tabs = 1"><mdb-icon icon="user" class="mr-1"/>Login</mdb-tab-item>
        <mdb-tab-item :active="tabs==2" @click.native.prevent="tabs = 2"><mdb-icon icon="user-plus" class="mr-1"/>Register</mdb-tab-item>
      </mdb-tab>
      <mdb-modal-body class="mx-3" v-if="tabs==1">
        <mdb-input label="Your email" icon="envelope" type="email" class="mb-5"/>
        <mdb-input label="Your password" icon="lock" type="password"/>
        <div class="mt-2 text-center">
          <!-- <mdb-btn color="info" @click.native="doLogin">Log in <mdb-icon icon="sign-in-alt" class="ml-1"/></mdb-btn> -->
          <mdb-btn outline="info" class="ml-auto" @click.native="doLogin">Log in</mdb-btn>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer center v-if="tabs==1">
        <div class="options text-center text-md-right mt-1">
          <p>Not a member? <a href="#" @click="tabs=2">Sign Up</a></p>
          <p>Forgot <a href="#">Password?</a></p>
        </div>
        <mdb-btn outline="info" class="ml-auto" @click.native="closeModal">Close</mdb-btn>
      </mdb-modal-footer>
      <mdb-modal-body class="mx-3" v-if="tabs==2">
        <mdb-input label="Your email" icon="envelope" type="email" class="mb-5"/>
        <mdb-input label="Your password" icon="lock" type="password" class="mb-5"/>
        <mdb-input label="Repeat password" icon="lock" type="password"/>
        <div class="mt-2 text-center">
          <mdb-btn color="info" @click.native="doSignUp">Sign Up<mdb-icon icon="sign-in-alt" class="ml-1"/></mdb-btn>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer center v-if="tabs==2">
        <div class="options text-center text-md-right mt-1">
          <p>Already have an account? <a href="#" @click="tabs=1">Log in</a></p>
        </div>
        <mdb-btn outline="info" class="ml-auto" @click.native="closeModal">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </mdb-container>
</template>
<script src="./static/src/js/camer/camer_login.js"></script>
<style scoped src="./static/src/css/camer/camer_login.css"></style>