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

export default {
  name: 'App',
  components: {
    NavTop,
    ContentSection,
    NavBottom
  }
}
</script>

<style>

</style>
