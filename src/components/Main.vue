<template>
   <div>
        <ul v-if="rows != null" id="feed" class="feed collapsible collection" data-collapsible="accordion">
            <li v-for="(row, index) in rows" :key="index">
                <p>{{row.Firma}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import $ from 'jquery';
import sheetrock from 'sheetrock';

export default {
    name: 'Main',
    data() {
        var rows = null;
        return { rows };
    },

    mounted () {
        this.loadDataIntoSpreadSheet();
    },
    methods: {
        loadFromLocalStorage: function() {
            var data = localStorage.getItem('loerdag');
            if (data == null) { return data; }
            return JSON.parse(data);
        },

        refresh: function() {
            localStorage.setItem('loerdag', null);
            location.reload();
        },

        setInLocalStorage: function(rawData) {
            localStorage.setItem('loerdag', JSON.stringify(rawData));
        },

        loadDataIntoSpreadSheet: function () {
            var data = this.loadFromLocalStorage();
            var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1CNrVQoSyKQ1j0SYOHPf0s4TPgXZvYlBZh3I2lopW73M/edit#gid=956771978';
            // Out feed
            sheetrock({
            url: mySpreadsheet,
            query: "select A,B,C,D,E,F,G,H,I,J,K,L,M,N",
            callback: this.myCallback
            }, data);
        },

        myCallback: function (success, options, response) {
            this.setInLocalStorage(response.raw);
            this.rows = [1, 2, 3]; 
            
            var arr = this.loadFromLocalStorage().table.rows;
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
        }
    }
}

</script>

<style>

</style>
