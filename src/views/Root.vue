<template>
    <div>
        <router-view />
    </div>
</template>
<script>
export default {
    name: "Root",
    mounted () {
        this.$router.push({ name: 'home' })
    }
}
</script>
