import Vue from 'vue'
import Vuex from 'vuex'
import articles from '@/data/articles'
import collection from '@/data/Collection.md'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    links: require('@/data/link.json'),
    articles,
    collection,
    myself: {
      name: '一进制',
      email: 'luhuisicnu@163.com',
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
})
