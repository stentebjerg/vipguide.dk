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
import $ from 'jquery';

export default {
  name: 'NavBottom',
    data() {
        return { PS: PagesStore.data };
    },
  methods: {
    loadPage: function (event) {
        var pageName = this.$router.resolve(location).location.path;
        pageName = pageName.substring(1, pageName.indexOf('.'));
        this.PS.currentPage = pageName;
        this.PS.title = this.PS.allData.pagesData[pageName].title;
        // this.toggleNavIcons(event);
    },
    toggleNavIcons: function (event) {
        $("nav-wrapper > a").removeClass("active");
        $(event.target).closest("a").addClass("active");
    }
  }
}
</script>

<style lang="scss">
@import "../sass/app.scss";

</style>
