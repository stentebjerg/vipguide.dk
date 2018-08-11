<template>
    <nav class="indigo accent-3">
        <div class="nav-wrapper">
            <div id="logo-container" class="brand-logo center"><a href="/"><img src="../assets/img/smukfest-logo.svg"></a></div>
            <a href="#" data-activates="mobile-demo" class="button-collapse" v-on:click="toggleSidePannel(true)"><i class="material-icons">menu</i></a>
                <ul class="side-nav" id="mobile-demo">
                    <li class="top"><a href="/"></a></li>
                    <li class="headline">Vagtplan</li>
                    <router-link class="col" to="/onsdag.html"  exact @click.native="loadPage"><i class="material-icons time">access_time</i>Onsdag</router-link>
                    <router-link class="col" to="/torsdag.html" exact @click.native="loadPage"><i class="material-icons time">access_time</i>Torsdag</router-link>
                    <router-link class="col" to="/fredag.html"  exact @click.native="loadPage"><i class="material-icons time">access_time</i>Fredag</router-link>
                    <router-link class="col" to="/loerdag.html" exact @click.native="loadPage"><i class="material-icons time">access_time</i>Lørdag</router-link>
                    <li class="divider"></li>
                    <li class="headline">Information</li>
                    <li><a href="/telefonliste.html"><i class="material-icons phone">contact_phone</i> Telefonliste</a></li>
                    <li><a href="/hold.html"><i class="material-icons people">people</i> Holdliste</a></li>
                    <li><a href="/facts.html"><i class="material-icons facts">info_outline</i> Facts & figures</a></li>
                    <li><a href="/finurligheder.html"><i class="material-icons finurligheder">favorite</i> Finurligheder</a></li>
                    <li><a href="https://www.facebook.com/groups/240788406061190" target="_blank"><i class="material-icons">open_in_new</i> Facebook</a></li>
                </ul>
                
                <a class="refresh right" v-on:click="refresh"><i class="material-icons">refresh</i></a>
        
            <div class="preloader-wrapper small active">
                <div class="spinner-layer spinner-blue">
                    <div class="circle-clipper left">
                    <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                    </div><div class="circle-clipper right">
                    <div class="circle"></div>
                    </div>
                </div>

                <div class="spinner-layer spinner-red">
                    <div class="circle-clipper left">
                    <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                    </div><div class="circle-clipper right">
                    <div class="circle"></div>
                    </div>
                </div>

                <div class="spinner-layer spinner-yellow">
                    <div class="circle-clipper left">
                    <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                    </div><div class="circle-clipper right">
                    <div class="circle"></div>
                    </div>
                </div>

                <div class="spinner-layer spinner-green">
                    <div class="circle-clipper left">
                    <div class="circle"></div>
                    </div><div class="gap-patch">
                    <div class="circle"></div>
                    </div><div class="circle-clipper right">
                    <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import $ from 'jquery';
import PagesStore from '../stores/PagesStore.js'

export default {
    name: 'SidePannel',
    data() {
        return { 
            PS: PagesStore.data
        };
    },
    mounted() {
        this.toggleSidePannel(false);
    },
    methods: {
        refresh: function () {
            localStorage.setItem(this.PS.currentPage, null);
            location.reload();
        }, 

        // Methods for toggling the sideNav
        toggleSidePannel: function (showSidenav) {
            var e1 = '<div class="hiddendiv common"></div>';
            var e2 = '<div class="drag-target" style="touch-action: pan-y; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); left: 0px;"></div>';
            var e3 = '<div class="drag-target" style="touch-action: pan-y; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); width: 50%; right: 0px;"></div>';
            var e4 = '<div id="sidenav-overlay" style="opacity: 1;" class=""></div>';

            var sidenav = $(".side-nav");
            var hiddenArea = $(".hidden-area");
            hiddenArea.empty();
            hiddenArea.append(e1);

            var body = $("body");
            if (showSidenav) {
                body.css({"overflow": "hidden", "width": "calc(100% - 17px)"});
                sidenav.css({"transform": "translateX(0px)", "transition": "0.3s"});

                hiddenArea.append(e3);
                hiddenArea.append(e4);

                $('#sidenav-overlay, .drag-target').on("click", { showSidenav: false }, this.toggleSidePannelCallback);
            } else {
                body.css({"overflow": "visible", "width": "100%"});
                sidenav.css({"transform": "translateX(-100%)"});

                hiddenArea.append(e2);
            }
        },

        toggleSidePannelCallback: function (event) {
            this.toggleSidePannel(event.data.showSidenav);
        },

        loadPage: function () {
            var pageName = this.$router.resolve(location).location.path;
            this.PS.currentPage = pageName.substring(1, pageName.indexOf('.'));
            this.toggleSidePannel(false);
        }
    }
}
</script>

<style>
    
</style>

