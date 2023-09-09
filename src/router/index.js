import { createRouter, createWebHistory } from 'vue-router';
import keycloak from '../keycloak'; // Import your Keycloak instance. The path might vary based on your folder structure.

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    meta: { title: 'Home - SexyCoders', public: true },
  },
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Manage meta titles
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.title);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  else if (previousNearestWithMeta) document.title = previousNearestWithMeta.meta.title;

  // Check for protected routes
  if (to.matched.some(record => !record.meta.public)) {
    // This route requires authentication
    if (keycloak.authenticated) {
      next();
    } else {
      keycloak.login();
    }
  } else {
    next(); // Public route or user is authenticated
  }
});

export default router;

