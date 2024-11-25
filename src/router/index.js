import { createRouter, createWebHistory } from 'vue-router';
import Skull from '../components/Skull.vue';
import AppAccounts from '../components/AppAccounts.vue';
import Home from '../components/Home.vue';
import appInsights from '../plugins/appInsights';
import RegistrationPage from '../components/RegistrationPage.vue';


const routes = [
  {
    path: '/skull',
    name: 'Skull',
    component: Skull,
  },
  {
    path: '/accounts',
    name: 'AppAccounts',
    component: AppAccounts,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Registration',
    component: RegistrationPage,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Log route changes with Application Insights
router.afterEach((to, from) => {
  appInsights.trackPageView({
    name: to.name || to.path,
    properties: {
      from: from.fullPath,
      to: to.fullPath,
    },
  });
});

export default router;
