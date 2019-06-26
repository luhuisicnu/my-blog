<template>
    <v-card>
        <v-card-text>
            <v-list two-line>
                <v-list-tile
                    v-for="item in tags"
                    :key="item.title"
                    avatar
                >
                    <v-list-tile-content>
                    <v-list-tile-title>
                        <router-link :to="{ name: 'home', params: { tag: item.title }}">{{ item.title }}</router-link>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>找到{{ item.count }}篇</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        {{ item.ratio }}%
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-card-text>
    </v-card>    
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "Category",
    computed: {
      ...mapState(['articles']),
      tags () {
          const info = new Object()
          this.articles.forEach((item) => {
              item.tag.forEach((tag) => {
                  if (info[tag]) {
                      info[tag] += 1
                  } else {
                      info[tag] = 1
                  }
              })
          })
          return Object.keys(info).map((item) => ({ title: item, count: info[item], ratio: (info[item] / this.total * 100).toFixed(2) }))
      },
      total () {
          return this.articles.length
      }
    },
}
</script>
