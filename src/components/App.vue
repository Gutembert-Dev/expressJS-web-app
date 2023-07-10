<template>
  <div id="app">
      <div class="locale-changer" style="float:right">
        <span>Language </span><select v-model="$i18n.locale">
          <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
        </select>
      </div>
      
      <vue-tabs active-tab-color="#e74c3c" 
           active-text-color="white"
           type="pills"
           :start-index="1"
      >
        <div id="home" v-if="!logedIn">
          <v-tab :title="$t('Home')" icon="ti-home">
            <p>{{$t('Hello World from')}} {{name}}</p> <!--<camer-home :login="!logedIn"/> -->
            <!--<camer-login/>
            <camer-report/>
            <camer-view/>
            <camer-template/> -->
          </v-tab>
        </div>

        <div id="shop" v-if="!logedIn">
          <v-tab :title="$t('Shop')" icon="ti-home">
            <form method="get" action="/shop" class="pagination form-inline o_website_sale_search">
              <div class="input-group">
                  <div class="oe_search">
                      <input type="text" name="search" class="search-query form-control oe_search_box" placeholder="Search..." value="">
                  </div>
                  <span class="input-group-btn">
                    <button type="submit" class="btn btn-default oe_search_button"><i class="fa fa-search"></i></button>
                  </span>
              </div>
            </form>
            <div class="hidden btn-group">
              <a href="#" class="dropdown-toggle btn btn-default" data-toggle="dropdown">
                  Public Pricelist
                  <span class="caret"></span>
              </a>
              <ul class="dropdown-menu" role="menu">
                  
              </ul>
            </div>
            <div class="dropdown btn-group dropdown_sorty_by">
                  <a href="#" class="dropdown-toggle btn btn-default" data-toggle="dropdown">
                      <span>Sort by</span>
                      <span class="caret"></span>
                  </a>
                  <ul class="dropdown-menu" role="menu">
                      <li>
                          <a href="/shop?order=list_price+desc">
                              <span>Price <i class="fa fa-arrow-up" aria-hidden="true"></i></span>
                          </a>
                      </li><li>
                          <a href="/shop?order=list_price+asc">
                              <span>Price <i class="fa fa-arrow-down" aria-hidden="true"></i></span>
                          </a>
                      </li><li>
                          <a href="/shop?order=name+asc">
                              <span>Name</span>
                          </a>
                      </li>
                  </ul>
              </div>
              <camer-shop/>
          </v-tab>
        </div>

        <div id="contact" v-if="!logedIn">
          <v-tab :title="$t('Contact us')" icon="ti-settings"> <!-- https://mdbootstrap.com/docs/vue/modals/forms/ -->
            <camer-contact-us/>
          </v-tab>
        </div>

        <div id="login" v-if="!logedIn">
          <v-tab :title="$t('Login / Register')" icon="ti-check">
            <camer-login :logedIn="logedIn"/>
          </v-tab>
        </div>

        <!-- <div id="apps" v-if="logedIn">
          <v-tab title="Apps" icon="ti-check">
            <camer-apps/>
          </v-tab>
        </div> -->

    </vue-tabs>
    <router-view/>
  </div>
</template>
<script src="./static/src/js/camer/app.js"></script>
<style scoped src="./static/src/css/camer/app.css"></style>