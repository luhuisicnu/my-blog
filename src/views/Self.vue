<template>
    <v-card>
        <v-container>
        <div>
            <h3>大家好，我是{{ myself.name }}, 欢迎来到我的博客！</h3>
            <br />
            <p>本博客是使用Vue开发的纯前端项目，如有交流需求，请发邮件至{{ myself.email }}</p>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <v-timeline>
            <v-timeline-item
            v-for="(article, i) in articles"
            :key="i"
            :color="article.color"
            small
            >
            <template v-slot:opposite>
                <span
                :class="`headline font-weight-bold ${article.color}--text`"
                v-text="article.date"
                ></span>
            </template>
            <div class="py-3">
                <h2 :class="`headline font-weight-light mb-3 ${article.color}--text`">{{ article.title }}</h2>
                <div>
                    {{ article.summary }}
                </div>
            </div>
            </v-timeline-item>
        </v-timeline>
        </v-container>
    </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "Self",
    computed: {
      ...mapState(['articles', 'myself']),
    },
}
</script>
