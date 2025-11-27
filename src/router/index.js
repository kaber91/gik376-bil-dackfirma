import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookServiceView from '../views/BookServiceView.vue'
import BookingsView from '../views/BookingsView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/boka-service', name: 'book-service', component: BookServiceView },
    { path: '/bokningar', name: 'bookings', component: BookingsView },
    { path: '/om-oss', name: 'about', component: AboutView }
  ]
})

export default router
