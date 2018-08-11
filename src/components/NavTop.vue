<template>
    <nav class="pink accent-5 nav-wrapper top">
    <div class="title">{{PS.title}}</div>
        <!-- <a class="refresh" onclick="refresh()"><i class="material-icons">refresh</i></a> -->
    </nav>
</template>

<script>
import PagesStore from '../stores/PagesStore.js'

export default {
  name: 'NavTop',
  data() {
        return { 
            rows: null, 
            PS: PagesStore.data
        };
    },
}
</script>

<style lang="scss">
@import "../sass/app.scss";

</style>
