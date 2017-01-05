<template>
  <div class="window-content request-view">
    <div class="pane-group">
      <div class="pane-sm sidebar">
        <request-sidebar></request-sidebar>
      </div>
      <div class="pane">
        <request></request>
      </div>
    </div>
  </div>
</template>

<script>
import RequestSidebar from './RequestSidebar.vue'
import Request from './Request.vue'

export default {
  name: 'RequestView',
  components: {
    RequestSidebar,
    Request
  }
}
</script>
