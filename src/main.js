// main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import appInsights from './plugins/appInsights';
//import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap'; // Import Bootstrap JS if needed

// Import Bootstrap-Vue
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.errorHandler = (err, vm, info) => {
    appInsights.trackException({ exception: err });
    console.error(err); // Optional: Log to console for debugging
};

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

// Track initial page load
appInsights.trackPageView();
