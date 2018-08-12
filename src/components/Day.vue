<template>
    <ul id="feed" class="feed collapsible collection" data-collapsible="accordion" v-on:click="toggleDetails">
        <li class="day"><h4>Lørdag 🎉</h4></li>
        <li v-for="(row, index) in rows" :key="index" class="row-item">
            <!-- <li v-if="row.Dag" class="day"><h4>{{cells.Dag}}</h4></li>
            <li v-else> -->
            <div class="flex-container collapsible-header ">
                <div :class="getCircleClasses(row)">{{row.Antal}}</div>
                <div class="left">
                    <span class="headline">{{row.Firma}}</span><br>
                    <span class="info">{{row.Type}}<span v-if="row.Hold"> · {{row.Hold}}</span></span>
                </div>
                <div v-if="row.Tidspunkt2"  class="number right">kl. {{row.Tidspunkt}} / {{row.Tidspunkt2}}</div>
                <div v-else                 class="number right">kl. {{row.Tidspunkt}}</div>
            </div>
            <div class="collapsible-body">
                <span v-if="row.Mødetidspunkt">
                    <h6>Mødetidspunkt</h6>
                    <p>⏱ Kl. <u>{{row.Mødetidspunkt}}</u></p>
                </span>

                <span v-if="row.Sluttid">
                    <h6>Sluttidspunkt</h6>
                    <p>⌚️ Kl. {{row.Sluttid}}<span v-if="row.Sluttid2"> / {{row.Sluttid2}}</span></p>
                </span>

                <span v-if="row.Navn">
                    <h6>Kontaktperson</h6>
                    <p>📱 {{row.Navn}} <a v-if="row.Mobilnummer" :href="getPhoneNumberStr(row.Mobilnummer)">{{row.Mobilnummer}}</a></p>
                </span>
            
                <span v-if="row.Start">
                    <h6>Start lokation</h6>
                    <p>✅ {{row.Start}}</p>
                </span>

                <span v-if="row.Slut">
                    <h6>Slut lokation</h6>
                    <p>🎯 {{row.Slut}}</p>
                </span>

                <span v-if="row.Bemærkninger">
                    <h6>Bemærkninger</h6>
                    <p>⁉️ {{row.Bemærkninger}}</p>
                </span>
            </div>
        </li>
    </ul>
</template>

<script>
import PagesStore from '../stores/PagesStore.js'
import $ from 'jquery'

export default {
    name: 'Day',
    data() {
        return { 
            rows: null, 
            PS: PagesStore.data
        };
    },
    mounted() {
        $('.day').show();
        var name = "Home";
        this.rows = PagesStore.loadFromLocalStorage(name.toLowerCase()).rows;
    },
    methods: {
        getPhoneNumberStr: function (phoneNumber) {
            return "tel:" + phoneNumber;
        },

        getCircleClasses: function (row) {
            var type = "";
            type = "" + (row.Type === "Afhentning") ? row.Type.toLowerCase() : "";
            type = "" + (row.Type === "Guided tur") ? row.Type.toLowerCase() : "";
            return "circle " + type;
        },

        // Helper methods for toggling row
        toggleDetails: function (event) {
            // Cheating my way around to collapse all the row items after "redirecting" to another page
            if (!event) {
                this.toggleSections($(".row-item"), false);
                return;
            }

            var ele = $(event.target)

            var clickedAgain = ele.closest("li").hasClass("active");
            if (clickedAgain) {
                this.toggleSections(ele, false)
            } else {
                var allRows = $(".row-item");
                this.toggleSections(allRows, false);
                this.toggleSections(ele, true);
            }
        },

        toggleSections: function (ele, toggle) {
            var speed = 200;
            var li = ele.closest("li");
            var div = li.find("div");

            if (!toggle) {
                li.removeClass("active");
                div.removeClass("active");
                li.find("div.collapsible-body").slideUp(speed);
            } else {
                li.addClass("active");
                div.addClass("active");
                li.find("div.collapsible-body").slideDown(speed);
            }
        }
    }
}
</script>

<style>

</style>
