import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4669a914 = () => interopDefault(import('..\\pages\\CreatePost.vue' /* webpackChunkName: "pages/CreatePost" */))
const _31108748 = () => interopDefault(import('..\\pages\\HomePage.vue' /* webpackChunkName: "pages/HomePage" */))
const _533930e4 = () => interopDefault(import('..\\pages\\ProfilePage.vue' /* webpackChunkName: "pages/ProfilePage" */))
const _2c960d54 = () => interopDefault(import('..\\pages\\tweetpage\\_id.vue' /* webpackChunkName: "pages/tweetpage/_id" */))
const _73ebae28 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/CreatePost",
    component: _4669a914,
    name: "CreatePost"
  }, {
    path: "/HomePage",
    component: _31108748,
    name: "HomePage"
  }, {
    path: "/ProfilePage",
    component: _533930e4,
    name: "ProfilePage"
  }, {
    path: "/tweetpage/:id?",
    component: _2c960d54,
    name: "tweetpage-id"
  }, {
    path: "/",
    component: _73ebae28,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
