<template>
    <div class="navbar-fixed">
        <nav class="white">
            <div class="nav-wrapper">
                <router-link to="/home.html"            exact @click.native="loadPage"><i class="material-icons time">access_time</i></router-link>
                <router-link to="/telefonliste.html"    exact @click.native="loadPage"><i class="material-icons phone">contact_phone</i></router-link>
                <router-link to="/hold.html"            exact @click.native="loadPage"><i class="material-icons people">people</i></router-link>
                <router-link to="/facts.html"           exact @click.native="loadPage"><i class="material-icons facts">info_outline</i></router-link>
                <!-- <router-link to="/finurligheder.html"   exact @click.native="loadPage"><i class="material-icons finurligheder">favorite</i></router-link> -->
            </div>
        </nav>
    </div>
</template>

<script>
import PagesStore from '../stores/PagesStore.js'

export default {
  name: 'NavBottom',
    data() {
        return { PS: PagesStore.data };
    },
  methods: {
    loadPage: function () {
        var pageName = this.$router.resolve(location).location.path;
        this.PS.currentPage = pageName.substring(1, pageName.indexOf('.'));
    }
  }
}
</script>

<style>

</style>
