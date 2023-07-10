<template>
  <mdb-container>
    <mdb-modal :show="contact" @close="closeModal">
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h4" bold class="w-100">Write to us</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="mx-3 grey-text">
        <mdb-input label="Your name" icon="user" class="mb-5"/>
        <mdb-input label="Your email" icon="envelope" type="email" class="mb-5"/>
        <mdb-input label="Subject" icon="tag" class="mb-5"/>
        <mdb-textarea icon="pencil-alt" label="Your message"/>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn @click.native="writeToUs" color="unique">Send <mdb-icon icon="paper-plane" class="ml-1"/></mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </mdb-container>
</template>
<script src="./static/src/js/camer/camer_contact_us.js"></script>
<style scoped src="./static/src/css/camer/camer_contact_us.css"></style>