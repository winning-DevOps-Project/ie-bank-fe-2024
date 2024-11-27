// src/router/index.js

import Vue from 'vue';
import Router from 'vue-router';
import Skull from '../components/Skull.vue';
import AppAccounts from '../components/AppAccounts.vue';
import Home from '../components/Home.vue';
import RegistrationPage from '../components/RegistrationPage.vue';
import TransactionPage from '../components/TransactionPage.vue';
import LoginPage from '@/components/LoginPage.vue';
import appInsights from '../plugins/appInsights';
import { component } from 'vue/types/umd';

// Register Vue Router
Vue.use(Router);

// Define routes
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
    name: 'Base',
    component: Home,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Registration',
    component: RegistrationPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: TransactionPage,
  },
];

// Create router instance
const router = new Router({
  mode: 'history', // Use history mode for cleaner URLs
  base: process.env.BASE_URL,
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
