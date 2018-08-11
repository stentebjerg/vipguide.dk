<template>
    <div>
      <!-- <Day></Day> -->
      <Telefonliste v-if="isCurrentPage('telefonliste')"></Telefonliste>
    </div>
</template>

<script>
import Day from './Day.vue'
import Telefonliste from './Telefonliste.vue'
import PagesStore from '../stores/PagesStore.js'

export default {
  name: 'App',
  components: {
    Day,
    Telefonliste
  },
  data() {
    return { PS: PagesStore.data };
  },
  methods: {
    isCurrentPage: function(page) {
      return this.PS.currentPage === page;
    }
  }
}
</script>

<style>


</style>
