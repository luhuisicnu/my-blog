<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h1 class="mb-3">{{ articles[$route.params.index].title }}</h1>
                <p>作者：{{ articles[$route.params.index].author }}</p>
                <p>日期：{{ articles[$route.params.index].date }}</p>
            </div>
        </v-card-title>
        <v-card-text>
            <div v-html="marked(articles[$route.params.index].content)"></div>
        </v-card-text>    
    </v-card>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: "Article",
    computed: {
      ...mapState(['articles']),
    },
}
</script>
