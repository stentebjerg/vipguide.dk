<template>
    <ul id="feed" class="feed collapsible collection team" data-collapsible="accordion">
        <li v-for="(row, index) in rows" :key="index" class="collection-item avatar">
            <i class="circle">{{row.Holdnummer}}</i>
            <span class="title">
                <span v-for="(name, j) in splitNames(row.Navne)" :key="j">
                    <span class="title">{{name}}</span>
                    <br>
                </span>
            </span>
        </li>
    </ul>
</template>

<script>
import PagesStore from '../stores/PagesStore.js'

export default {
    name: 'Hold',
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
        splitNames: function(namesStr) {
            return (namesStr) ? namesStr.split(", ") : [];
        }
    }
}
</script>

<style>

</style>
