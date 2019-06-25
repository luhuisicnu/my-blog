import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow.css';
import BaseBtn from '@/components/base/Btn'

Vue.component(BaseBtn.name, BaseBtn)

Vue.use(Vuetify, {
  theme: {
    primary: '#CBAA5C',
    secondary: '#083759'
  },
  iconfont: 'mdi', // 'md' || 'mdi' || 'fa' || 'fa4'   mdi会出现checkbox不显示问题
})

Vue.config.productionTip = false

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});
Vue.prototype.marked = marked

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
