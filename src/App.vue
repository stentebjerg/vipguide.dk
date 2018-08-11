<template>
  <div id="app">
    <NavTop></NavTop>
    <ContentSection></ContentSection>
    <NavBottom></NavBottom>
  </div>
</template>

<script>
import NavTop from './components/NavTop.vue'
import ContentSection from './components/ContentSection.vue'
import NavBottom from './components/NavBottom'

import pagesJson from './feed/pages.json'

export default {
  name: 'App',
  components: {
    NavTop,
    ContentSection,
    NavBottom
  },
  created() {
    this.addPagesToLocalStorage();
  },
  methods: {
    addPagesToLocalStorage: function() {
      localStorage.clear();
      localStorage.pages = JSON.stringify(pagesJson);
    }
  }
}
</script>

<style>

</style>
