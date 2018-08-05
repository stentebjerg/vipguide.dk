<template>
  <div id="app">
    <SidePannel></SidePannel>
    <Main></Main>
    <div class="hidden-area"></div>
  </div>
</template>

<script>
import SidePannel from './components/SidePannel.vue'
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    SidePannel,
    Main
  }
}
</script>

<style>

</style>
