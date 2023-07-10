import Vue from 'vue'
import Router from 'vue-router'
import Apps from './components/CamerApps.vue'
import View from './components/CamerView.vue'
import Report from './components/CamerReport.vue'
import Template from './components/CamerTemplate.vue'

Vue.use(Router);

let routes = [
    {
      path: '/view/:className',
      name: 'View',
      component: View
    },
    {
      path: '/view/:className/:id',
      name: 'View',
      component: View
    },
    {
      path: '/apps',
      name: 'Apps',
      component: Apps
    },
    {
      path: '/report',
      name: 'Report',
      component: Report
    },
    {
      path: '/template',
      name: 'Template',
      component: Template
    }
  ]

let router = new Router({
    routes
});


export default router;
