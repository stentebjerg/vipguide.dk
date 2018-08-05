<template>
  <div id="app">
    <SidePannel></SidePannel>
    <ContentSection></ContentSection>
  </div>
</template>

<script>
import SidePannel from './components/SidePannel.vue'
import ContentSection from './components/ContentSection.vue'

export default {
  name: 'App',
  components: {
    SidePannel,
    ContentSection
  }
}
</script>

<style>

</style>
