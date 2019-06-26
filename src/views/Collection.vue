<template>
    <v-card>
        <v-card-text>
            <div v-html="marked(collection)"></div>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "Link",
    computed: {
      ...mapState(['collection']),
    },
}
</script>
