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
import sheetrock from 'sheetrock';

export default {
    name: 'Telefonliste',
    data() {
        return { 
            rows: null, 
            PS: PagesStore.data
        };
    },
    mounted() {
        this.loadDataFromSpreadSheet("telefonliste");
    },
    methods: {
        loadFromLocalStorage: function(pageName) {
            var data = localStorage.getItem(pageName);
            if (data == null) { return data; }
            return JSON.parse(data);
        },

        refresh: function() {
            // localStorage.setItem(this.PS.currentPage, null);
            location.reload();
        },

        setInLocalStorage: function (pageName, rawData) {
            localStorage.setItem(pageName, JSON.stringify(rawData));
        },

        loadDataFromSpreadSheet: function (pageName) {
            // var page = JSON.parse(localStorage.getItem(pageName));
            var pages = JSON.parse(localStorage.getItem("pages"));
            var mySpreadsheet = pages.docs.telefonliste;
            // var mySpreadsheet = pages[this.PS.currentPage].url;
            var data = this.loadFromLocalStorage(pageName);
            // Out feed
            sheetrock({
                url: mySpreadsheet,
                query: "select A,B,C",
                callback: this.myCallback,
                params: { "pageName": pageName }
            }, data);
        },

        myCallback: function (success, options, response) {
                // console.log(response.raw);
                this.setInLocalStorage(options.user.params.pageName, response.raw); 
                var localData = this.loadFromLocalStorage(options.user.params.pageName)
                var rows = localData.table.rows;
                var headers = this.initHeaders(localData.table.cols);
                // console.log(headers);
                this.rows = this.transformRows(rows, headers);
        },

        // Helper methods for getting names of the columns
        initHeaders: function (arr) {
            var headers = [];
            for (let i = 0; i < arr.length; i++) {
                headers.push(arr[i].label);
            }
            return headers;
        },

        transformRows: function (arr, headers) {
            var resultArr = [];
            for (let i = 0; i < arr.length; i++) {
                resultArr.push(this.transformRow(arr[i], headers));
            }
            return resultArr;
        },

        transformRow: function (row, headers) {
            var rowArr = row.c;
            var newObj = { };
            for (let i = 0; i < rowArr.length; i++) {
                newObj[headers[i]] = (rowArr[i]) ? rowArr[i].v : null;
            }
            return newObj;
        },

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
