<template>
    <nav class="indigo accent-3">
        <div class="nav-wrapper">
            <div id="logo-container" class="brand-logo center"><a href="/"><img src="../assets/img/smukfest-logo.svg"></a></div>
            <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
                <ul class="side-nav" id="mobile-demo">
                    <li class="top"><a href="/"></a></li>
                    <li class="headline">Vagtplan</li>
                    <li><a href="/onsdag.html"><i class="material-icons time">access_time</i> Onsdag</a></li>
                    <li><a href="/torsdag.html"><i class="material-icons time">access_time</i> Torsdag</a></li>
                    <li><a href="/fredag.html"><i class="material-icons time">access_time</i> Fredag</a></li>
                    <li><a href="/loerdag.html"><i class="material-icons time">access_time</i> Lørdag</a></li>
                    <li class="divider"></li>
                    <li class="headline">Information</li>
                    <li><a href="/telefonliste.html"><i class="material-icons phone">contact_phone</i> Telefonliste</a></li>
                    <li><a href="/hold.html"><i class="material-icons people">people</i> Holdliste</a></li>
                    <li><a href="/facts.html"><i class="material-icons facts">info_outline</i> Facts & figures</a></li>
                    <li><a href="/finurligheder.html"><i class="material-icons finurligheder">favorite</i> Finurligheder</a></li>
                    <li><a href="https://www.facebook.com/groups/240788406061190" target="_blank"><i class="material-icons">open_in_new</i> Facebook</a></li>
                </ul>
                
                <a class="refresh right" onclick="refresh()"><i class="material-icons">refresh</i></a>
        
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
export default {
    name: 'SidePannel'

}
</script>

<style lang="scss">
    @import "../sass/app.scss";
</style>

