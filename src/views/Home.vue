<template>
    <div>
      <v-card v-for="(article, index) in articles" :key="article.title" class="my-5">
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
    },
}
</script>
