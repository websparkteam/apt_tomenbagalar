import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/SiteHome.vue'
import Search from '../views/SiteSearch.vue'
import Cart from '../views/SiteCart.vue'
import Checkout from '../views/SiteCheckout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router