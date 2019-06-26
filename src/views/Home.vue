<template>
    <div>
      <v-card v-for="(article, index) in queryArticles" :key="article.title" class="my-5">
        <v-img
          :src="require(`@/assets/images/${article.image}`)"
          aspect-ratio="3.75"
        ></v-img>
        <v-card-title>
          <h1><router-link :to="{ name: 'article', params: { index }}">{{ article.title }}</router-link></h1>
        </v-card-title>
        <v-card-text>{{ article.summary }}</v-card-text>
      </v-card>
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
          return this.articles.filter((item) => {
            return item.tag.indexOf(this.$route.params.tag) > -1
          })
        }
        return this.articles
      }
    },
}
</script>
