<template>
  <div class="window-content mock-view">
    <div class="pane-group">
      <div class="pane-sm sidebar">
        <mock-sidebar></mock-sidebar>
      </div>
      <div class="pane"></div>
    </div>
  </div>
</template>

<script>
import MockSidebar from './MockSidebar.vue'

export default {
  name: 'MockView',

  components: {
    MockSidebar
  }
}
</script>

<style>
  .mock-view .sidebar {
    min-width: 300px;
    max-width: 600px;
    width: 40%;
  }
</style>
