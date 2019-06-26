import Vue from 'vue'
import Router from 'vue-router'
import Root from './views/Root.vue'
import Home from './views/Home.vue'
import Article from './views/Article.vue'
import Category from './views/Category.vue'
import Self from './views/Self.vue'
import Timeline from './views/Timeline.vue'
import Collection from './views/Collection.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'category',
          name: 'category',
          component: Category
        },
        {
          path: 'self',
          name: 'self',
          component: Self
        },
        {
          path: 'timeline',
          name: 'timeline',
          component: Timeline
        },
        {
          path: 'collection',
          name: 'collection',
          component: Collection
        },
        {
          path: 'article/:index',
          name: 'article',
          component: Article
        },
      ]
    },
  ]
})
