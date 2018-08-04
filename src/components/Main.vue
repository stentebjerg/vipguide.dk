<template>
   <div>
        <ul v-if="rows != null" id="feed" class="feed collapsible collection" data-collapsible="accordion">
            <li v-for="(value, index) in rows" :key="index">
                <!-- <p>{{value}}</p> -->
            </li>
        </ul>
        <p>More soon.</p>
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
            // window.console.log('rawDAta');
            // window.console.log(rawData);
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
            this.rows = this.loadFromLocalStorage().table.rows;
            $('.preloader-wrapper').hide();
        },
    }
}

</script>

<style>

</style>
