<template>
  <header class="toolbar toolbar-header">
    <div class="toolbar-actions">
      <div class="btn-group pull-left">
        <router-link to="/" class="btn btn-default">
          <span class="icon icon-home"></span>
        </router-link>
        <router-link to="/mock" class="btn btn-default">
          <span class="icon icon-archive"></span>
        </router-link>
      </div>
      <div class="form-group pull-left search">
        <input type="text" class="form-control ipt-search" placeholder="search" @input="search" :value="filterText">
      </div>

      <div class="pull-right">
        <button class="btn btn-default" @click="clearRequest">
          <span class="icon icon-trash"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',

  computed: {
    filterText () {
      return this.$store.state.requests.filterText
    }
  },

  methods: {
    clearRequest () {
      this.$store.commit({
        type: 'clearRequest'
      })
      this.$store.commit({
        type: 'clearResponse'
      })
    },

    search (e) {
      this.$store.commit({
        type: 'filterRequest',
        filter: {
          text: e.target.value
        }
      })
    }
  }
}
</script>

<style>
  .toolbar-header a {
    text-decoration: none;
  }
  .toolbar-header .ipt-search {
    height: 24px;
    min-height: 24px;
    box-sizing: border-box;
    padding: 3px 10px;
  }
</style>
