<template>
  <v-toolbar
    app
    flat
  >
    <v-toolbar-side-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />
    <v-container
      mx-auto
      py-0
    >
      <v-layout>
        <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          height="48"
          @click="$vuetify.goTo(0)"
        />
        <v-btn
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          class="ml-0 hidden-sm-and-down"
          flat
          @click="onClick($event, link)"
        >
          {{ link.text }}
        </v-btn>
        <v-spacer />
        <v-autocomplete
          v-model="select"
          :items="items"
          :search-input.sync="search"
          cache-items
          class="mx-3"
          flat
          hide-no-data
          hide-details
          label="搜索标题"
          solo-inverted
        ></v-autocomplete>
        <!-- <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          flat
          hide-details
          solo-inverted
          style="max-width: 300px;"
        /> -->
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script>
  // Utilities
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    data: () => ({
      select: -1,
      search: '',
    }),
    computed: {
      ...mapState(['links', 'articles']),
      items () {
        return this.articles.map((item, index) => ({ text: item.title, value: index }))
      }
    },
    watch: {
      select (val) {
        if (val > -1) {
          this.select = -1
          this.$router.push({ name: 'article', params: { index: val } })
        }
      },
    },
    methods: {
      ...mapMutations(['toggleDrawer']),
      onClick (e, item) {
        e.stopPropagation()

        if (item.to || !item.href) return

        this.$vuetify.goTo(item.href)
      }
    }
  }
</script>
