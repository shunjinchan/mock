<template>
  <div id="app" class="app">
    <div class="window">
      <header-bar></header-bar>
      <router-view></router-view>
      <footer class="toolbar toolbar-footer">
        <h1 class="title">Footer</h1>
      </footer>
    </div>
  </div>
</template>

<script>
import store from './store/index.js'
import HeaderBar from './components/header/HeaderBar'

export default {
  name: 'app',
  store: store,
  components: {
    HeaderBar
  }
}
</script>

<style>
  .el-dialog__wrapper {
    z-index: 1000;
  }
</style>
