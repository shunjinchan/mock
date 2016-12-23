<template>
  <div id="app" class="app">
    <container></container>
  </div>
</template>

<script>
import store from './store/index.js'
import Container from './components/container/Container'

export default {
  name: 'app',
  store: store,
  components: {
    Container
  }
}
</script>

<style>
body, html {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
body, html, ul, li, p {
  margin: 0;
  padding: 0;
}
ul, li {
  list-style: none;
}
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
