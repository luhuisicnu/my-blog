<template>
    <div>
      <template v-for="(article, index) in queryArticles">
        <v-card v-if="!article.disabled" :key="article.title" class="my-5">
          <!-- <v-img
            :src="require(`@/assets/images/${article.image}`)"
            aspect-ratio="3.75"
          ></v-img> -->
          <v-parallax :src="require(`@/assets/images/${article.image}`)" aspect-ratio="3.75"></v-parallax>
          <v-card-title>
            <h1><router-link :to="{ name: 'article', params: { index }}">{{ article.title }}</router-link></h1>
          </v-card-title>
          <v-card-text>{{ article.summary }}</v-card-text>
        </v-card>
      </template>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Home',
    data: () => ({
    }),
    computed: {
      ...mapState(['articles']),
      queryArticles () {
        if (this.$route.params.tag) {
          return this.articles.map((item) => {
            const newItem = this.copy(item)
            if (item.tag.indexOf(this.$route.params.tag) === -1) {
              newItem.disabled = true
            } else {
              newItem.disabled = false
            }
            return newItem
          })
        }
        return this.articles
      }
    },
    methods: {
      copy (obj) {
        const newObj = {}
        for (let item in obj) {
          newObj[item] = obj[item]
        }
        return newObj
      }
    },
}
</script>
