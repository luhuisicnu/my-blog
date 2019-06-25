<template>
  <v-app>
    <div id="app">
      <Toolbar />
      <Drawer />
      <v-content>
        <v-container>
          <router-view />
        </v-container>
      </v-content>
      <Footer id="footer" />
    </div>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'
import Drawer from '@/components/Drawer.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    Toolbar,
    Drawer,
    Footer,
  }
}
</script>
