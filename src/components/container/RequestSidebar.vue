<template>
  <div>
    <nav class="nav-group">
      <h5 class="nav-group-title">Requests</h5>
      <a class="nav-group-item active">
        All Requests
      </a>

      <h5 class="nav-group-title">Host</h5>
      <a class="nav-group-item active">
        m.vip.com
      </a>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',

  computed: {
    requests () {
      return this.$store.state.requests.all
    }
  }
}
</script>
