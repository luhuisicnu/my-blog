import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Article from './views/Article.vue'
import Category from './views/Category.vue'
import Self from './views/Self.vue'
import Collection from './views/Collection.vue'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
    },
    {
      path: '/self',
      name: 'self',
      component: Self,
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection,
    },
    {
      path: '/article/:index',
      name: 'article',
      component: Article,
    },
  ]
})
