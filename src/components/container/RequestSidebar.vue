<template>
  <div>
    <nav class="nav-group">
      <h5 class="nav-group-title">Requests</h5>
      <a class="nav-group-item">
        All Requests
      </a>

      <h5 class="nav-group-title">Host</h5>
      <a v-for="host in hosts" href="javascript:;" class="nav-group-item" :class="{ selected: host.isSelected }" @click.prevent="filter(host.name)">
        {{ host.name }}
      </a>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'RequestSidebar',

  computed: {
    requests () {
      return this.$store.state.requests.filter
    },
    hosts () {
      return this.$store.state.requests.hosts
    }
  },

  methods: {
    filter (filter) {
      this.$store.commit({
        type: 'filterRequest',
        filter: {
          text: filter,
          type: 'hostname'
        }
      })
    }
  }
}
</script>

<style>
.nav-group-item.selected {
  background: #0068D9;
  color: #fff;
}
</style>
