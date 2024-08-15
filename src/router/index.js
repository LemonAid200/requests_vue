import Vue from 'vue';
import Router from 'vue-router';
import requestsPage from '../views/requestsPage.vue';
import registrationPage from '../views/registrationPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // Используйте 'hash', если не хотите настраивать сервер
  routes: [
    {
      path: '/',
      name: 'Requests',
      component: requestsPage,
    },
    {
      path: '/login',
      name: 'Registration',
      component: registrationPage,
    },
  ],
});
