import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/SiteHome.vue'
import Search from '../views/SiteSearch.vue'
import Cart from '../views/SiteCart.vue'
import Checkout from '../views/SiteCheckout.vue'
import Product from '../views/SiteProduct.vue'
import Information from '../views/SiteInformation.vue'
import Profile from '../views/SiteProfile.vue'
import PaymentResult from '../views/PaymentResult.vue'

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
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/information/:mode?',
    name: 'Information',
    component: Information
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/payment/:state',
    name: 'PaymentResult',
    component: PaymentResult
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router