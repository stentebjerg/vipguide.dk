<template>
    <ul id="feed" class="feed collapsible collection" data-collapsible="accordion">
        <li v-for="(row, index) in rows" :key="index" class="collection-item avatar">
            <img v-if="row.Billede" :src="getImageUrl(row.Billede)" :alt="row.Billede" class="circle">
            <i v-else class="material-icons circle grey lighten-2">perm_identity</i>
            <span class="title">{{row.Navn}}</span><span><br><a v-if="row.Telefon" :href="getPhoneNumberStr(row.Telefon)">📱 {{row.Telefon}}</a></span>
        </li>
    </ul>
</template>

<script>
import PagesStore from '../stores/PagesStore.js'

export default {
    name: 'Telefonliste',
    data() {
        return { 
            rows: null, 
            PS: PagesStore.data
        };
    },
    mounted() {
        var name = this.$options._componentTag;
        this.rows = PagesStore.loadFromLocalStorage(name.toLowerCase()).rows;
    },
    methods: {
        getImageUrl: function (str) {
                return "https://memba.dk/images/Members/" + str + "?width=100&height=100&anchor=center&mode=crop";
        },

        getPhoneNumberStr: function (phoneNumber) {
                return "tel:" + phoneNumber;
        },
    }
}
</script>

<style>

</style>
