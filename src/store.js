import Vue from 'vue'
import Vuex from 'vuex'
import articles from '@/data/articles'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    links: require('@/data/link.json'),
    articles,
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
})
