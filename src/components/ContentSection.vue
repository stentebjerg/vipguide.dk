<template>
    <div>
      <Day v-if="isCurrentPage('home')"></Day>
      <Telefonliste v-if="isCurrentPage('telefonliste')"></Telefonliste>
      <Hold v-if="isCurrentPage('hold')"></Hold>
      <Facts v-if="isCurrentPage('facts')"></Facts>
    </div>
</template>

<script>
import PagesStore from '../stores/PagesStore.js'
import sheetrock from 'sheetrock';

import Day from './Day.vue'
import Telefonliste from './Telefonliste.vue'
import Hold from './Hold.vue'
import Facts from './Facts.vue'

export default {
    name: 'ContentSection',
    components: {
        Day,
        Telefonliste,
        Hold,
        Facts
    },
    data() {
        return { PS: PagesStore.data };
    },
    created() {
        PagesStore.initData()
        this.loadDataForEeachPage(this.PS.allData.pagesData);
    },
    methods: {
        loadDataForEeachPage: function(arr) {
            for (const i in arr) {
                this.loadDataFromSpreadSheet(i);
            }
        },

        isCurrentPage: function(page) {
            return this.PS.currentPage === page;
        },

        loadDataFromSpreadSheet: function (pageName) {
            var data = PagesStore.loadFromLocalStorage(pageName);
            var allData = PagesStore.loadFromLocalStorage("allData");
            
            var sheetNameNo = allData.pagesData[pageName].sheetNo;
            var sheetColls = allData.pagesData[pageName].cols;
            if (!sheetNameNo || !sheetColls) return;

            var sheetName = "sheet" + sheetNameNo;
            var mySpreadsheet = allData.sheets[sheetName];

            var myQuery = "select " + allData.pagesData[pageName].cols;

            // Out feed
            sheetrock({
                url: mySpreadsheet,
                query: myQuery,
                callback: this.myCallback,
                params: { "pageName": pageName }
            }, data);
        },

        myCallback: function (success, options, response) {
            var pageName = options.user.params.pageName;
            this.setInLocalStorage(pageName, response.raw);
        },

        setInLocalStorage: function (pageName, rawData) {
            var headers = this.initHeaders(rawData.table.cols);
            var rows = this.transformRows(rawData.table.rows, headers);
            var pageObj = { headers: headers, rows: rows };
            localStorage.setItem(pageName, JSON.stringify(pageObj));
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
                var newObj = this.transformRow(arr[i], headers);
                if (newObj) resultArr.push(newObj); // Objects with all the properties == null are not pushed
            }
            return resultArr;
        },

        transformRow: function (row, headers) {
            var count = 0;
            var rowArr = row.c;
            var newObj = { };
            for (let i = 0; i < rowArr.length; i++) {
                newObj[headers[i]] = (rowArr[i]) ? rowArr[i].v : null;
                if (!newObj[headers[i]]) count++;
            }
            return (count !== rowArr.length) ? newObj : null;
        },
    }
}
</script>

<style>


</style>
