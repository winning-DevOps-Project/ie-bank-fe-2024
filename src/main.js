import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import appInsights from './plugins/appInsights';
import store from './store/index'
//import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap'; // Import Bootstrap JS if needed

const app = createApp(App);

// Log Vue app errors globally
app.config.errorHandler = (err, vm, info) => {
    appInsights.trackException({ exception: err });
    console.error(err); // Optional: Log to console for debugging
};

app.use(router);
app.use(store);
app.mount('#app');

// Track initial page load
appInsights.trackPageView();