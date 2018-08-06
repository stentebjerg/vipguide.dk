<template>
  <div id="app">
    <SidePannel></SidePannel>
    <ContentSection></ContentSection>
  </div>
</template>

<script>
import SidePannel from './components/SidePannel.vue'
import ContentSection from './components/ContentSection.vue'

import pagesJson from './feed/pages.json'

export default {
  name: 'App',
  components: {
    SidePannel,
    ContentSection
  },
  created() {
    this.addPagesToLocalStorage();
  },
  methods: {
    addPagesToLocalStorage: function() {
      // localStorage.clear();
      localStorage.pages = JSON.stringify(pagesJson);
    }
  }
}
</script>

<style>

</style>
