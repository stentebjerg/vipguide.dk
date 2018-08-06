<template>
    <div>
        <div class="grey lighten-2 grey-text text-darken-2 date">
            {{this.title}}
        </div>
        <ul v-if="rows != null" id="feed" class="feed collapsible collection" data-collapsible="accordion" v-on:click="toggleDetails">
            <li v-for="(row, index) in rows" :key="index" class="row-item">
                <div class="collapsible-header collection-item avatar">
                    <i class="material-icons expand less">expand_less</i>
                    <i class="material-icons expand more">expand_more</i>
                    <i class="material-icons close">close</i>
                    <img :src="row.ImageUrl" :alt="row.Firma" class="circle">
                    <span class="title">{{row.Firma}}</span>
                    <p>{{row.Type}} kl. {{row.Afgang}}
                        <br>{{row.Antal}} personer
                        <br>
                        <a v-if="row.Hold" href="/hold.html">Hold {{row.Hold}}</a></p>
                </div>
                <div class="collapsible-body">
                    <div class="flex-container">
                        <div v-if="row.Moedetidspunkt" class="flex-item">
                        <h6>Mødetidspunkt</h6>
                        Mød kl. <u>{{row.Moedetidspunkt}}</u>, men kom gerne før og få en 🍺
                        </div>

                        <div v-if="row.Kontaktperson" class="flex-item">
                        <h6>Kontaktperson</h6>
                        <p>{{row.Kontaktperson}}
                            <span v-if="row.Mobil">
                                <br><a style="padding-right: 0" :href="getPhoneNumberStr(row.Mobil)">{{row.Mobil}}</a>📱
                            </span>
                        </p>
                        </div>

                        <div v-if="row.Kommentar" class="flex-item">
                        <h6>Kommentarer</h6>
                        <p>{{row.Kommentar}}</p>
                        </div>
                    
                        <div v-if="row.Afhentning" class="flex-item">
                        <h6>Afhentning</h6>
                        <p>{{row.Afhentning}}</p>
                        </div>

                        <div v-if="row.Tur" class="flex-item">
                        <h6>Tur</h6>
                        <p>{{row.Tur}}</p>
                        </div>

                        <div v-if="row.Drejebog" class="flex-item">
                        <h6>Drejebog</h6>
                        <a target="_blank" :href="row.Drejebog">Link til drejebog <i class="material-icons open-in-new">open_in_new</i></a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="hidden-area"></div>
    </div>
</template>

<script>
import $ from 'jquery';
import sheetrock from 'sheetrock';
import PagesStore from '../stores/PagesStore.js'

export default {
    name: 'Main',
    data() {
        return { 
            rows: null, 
            title: "",
            PS: PagesStore.data
        };
    },
    watch: {
        "PS.currentPage": function() {
            this.toggleDetails(null);
            this.loadDataFromSpreadSheet() 
        }
    },
    mounted() {
        this.loadDataFromSpreadSheet();
    },
    methods: {
        loadFromLocalStorage: function(pageName) {
            var data = localStorage.getItem(pageName);
            if (data == null) { return data; }
            return JSON.parse(data);
        },

        refresh: function() {
            localStorage.setItem(this.PS.currentPage, null);
            location.reload();
        },

        setInLocalStorage: function(rawData) {
            localStorage.setItem(this.PS.currentPage, JSON.stringify(rawData));
        },

        loadDataFromSpreadSheet: function () {
            var pages = JSON.parse(localStorage.getItem("pages"));
            this.title = pages[this.PS.currentPage].title;
            var mySpreadsheet = pages[this.PS.currentPage].url;
            var data = this.loadFromLocalStorage(this.PS.currentPage);
            // Out feed
            sheetrock({
                url: mySpreadsheet,
                query: "select A,B,C,D,E,F,G,H,I,J,K,L,M,N",
                callback: this.myCallback
            }, data);
        },

        myCallback: function (success, options, response) {
            this.setInLocalStorage(response.raw);
            var arr = this.loadFromLocalStorage(this.PS.currentPage).table.rows;
            var headers = this.initHeaders(arr);
            this.rows = this.transformRows(arr, headers);
            $('.preloader-wrapper').hide();
        },

        // Helper methods for getting names of the columns
        initHeaders: function (arr) {
            var headersArr = arr[0].c;
            var headers = [];
            for (let i = 0; i < headersArr.length; i++) {
                var emptyPropertyStr = "_col" + i;

                // If property doesn't exist at all or contains null
                if (headersArr[i]) {
                    var headerVal = headersArr[i];
                    headerVal = (headerVal.v) ? headerVal.v : emptyPropertyStr;
                    headers.push(headerVal);
                } else {
                    headers.push(emptyPropertyStr);
                }
            }
            return headers;
        },

        transformRows: function (arr, headers) {
            var resultArr = [];
            for (let i = 1; i < arr.length; i++) {
                resultArr.push(this.transformRow(arr[i], headers));
            }
            return resultArr;
        },

        transformRow: function (row, headers) {
            var rowArr = row.c;

            var newObj = { };
            for (let i = 0; i < rowArr.length; i++) {
                newObj[headers[i]] = this.getPropertyValue(rowArr[i]);
            }
            newObj["ImageUrl"] = this.getImageUrl(newObj["Firma"]);
            return newObj;
        },

        getPropertyValue: function (row) {
            return (row) ? row.v : null;
        },

        getImageUrl: function (name) {
            var str = name + "";
            var url = "http://vipguide.dk/assets/img/" + str.toLowerCase() + ".png";
            return url;
        },

        getPhoneNumberStr: function (phoneNumber) {
            return "tel:" + phoneNumber;
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
