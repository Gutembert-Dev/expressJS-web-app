<template> <!-- v-bind:img-src="`http://localhost:1337/uploads/beef_b538baa14d.png`" -->
  <b-container>
    <div v-if="apps.length && isApps">
      <b-row>
        <div :key="app.id" v-for="app in apps">
          <b-col l="4">
            <b-card
              :img-src="`/home/log/Documents/devs/camer/addons/dbprod/images/icon.png`"
              :title="app.name"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2 rounded-circle img-responsive"
              alt="avatar"
            > <!--Load images localy from an absolute path-->
              <b-card-text>{{ `${app.description}` }}</b-card-text>
              <span>
                <strong>Version: {{ `${app.version}` }} </strong>
              </span>
              <b-button @click="goToApp(app.models)" variant="primary">Go to App</b-button>
            </b-card>
          </b-col>
        </div>
      </b-row>
    </div>
    <div v-else>
      <h5 v-if="isApps">Fetching apps . . .</h5>
    </div>
    <div id="menu" v-if="!isApps">
       <camer-menu :menu="menu" collapsed="true"/>
    </div>
  </b-container>
</template>
<script src="./static/src/js/camer/camer_apps.js"></script>
<style scoped src="./static/src/css/camer/camer_apps.css"></style>