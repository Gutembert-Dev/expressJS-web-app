import Vue from 'vue'

import App from './components/App.vue'
import Keycloak from 'keycloak-js'

let initOptions = {
  url: 'http://localhost:8081/auth', realm: 'camer.tech', clientId: 'camer-tech', onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({onLoad: initOptions.onLoad}).then((auth) => {
  if(!auth) {
    window.location.reload();
  } else {
    // Vue.$log.info("Authenticated");

    const vm = new Vue({
      el: '#app',
      render: h => h(App)
    })

    localStorage.setItem("vue-token", keycloak.token);
    localStorage.setItem("vue-refresh-token", keycloak.refreshToken);
  }
  //Token Refresh
  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        Vue.$log.debug('Token refeshed' + refreshed);
      } else {
        Vue.$log.console.warn(('Token not refreshed, valid for ' + Math.round(keycloak.tokenParsed.exp + keycloak.timeShew - new Date().getTime)));
      }
    }).error(()=> {
      Vue.$log.error('Failed to refresh token');
    });

  }, 60000)
}).console.error(() => {
  Vue.$log.error("Authenticated Failed");
});

// const vm = new Vue({
//   el: '#app',
//   render: h => h(App)
// })
