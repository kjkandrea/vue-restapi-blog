import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6d31bd92 = () => interopDefault(import('../pages/404.vue' /* webpackChunkName: "pages/404" */))
const _0e1b773e = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _771cf24f = () => interopDefault(import('../pages/category/_slug.vue' /* webpackChunkName: "pages/category/_slug" */))
const _716bc5a0 = () => interopDefault(import('../pages/page/_slug.vue' /* webpackChunkName: "pages/page/_slug" */))
const _db5f4b1e = () => interopDefault(import('../pages/post/_slug.vue' /* webpackChunkName: "pages/post/_slug" */))
const _0234dda2 = () => interopDefault(import('../pages/tag/_slug.vue' /* webpackChunkName: "pages/tag/_slug" */))
const _0b6e57ac = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/404",
    component: _6d31bd92,
    name: "404"
  }, {
    path: "/search",
    component: _0e1b773e,
    name: "search"
  }, {
    path: "/category/:slug?",
    component: _771cf24f,
    name: "category-slug"
  }, {
    path: "/page/:slug?",
    component: _716bc5a0,
    name: "page-slug"
  }, {
    path: "/post/:slug?",
    component: _db5f4b1e,
    name: "post-slug"
  }, {
    path: "/tag/:slug?",
    component: _0234dda2,
    name: "tag-slug"
  }, {
    path: "/",
    component: _0b6e57ac,
    name: "index"
  }, {
    path: "*",
    component: _6d31bd92,
    name: "pageNotFound"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
