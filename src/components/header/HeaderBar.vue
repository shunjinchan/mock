<template>
  <header class="toolbar toolbar-header">
    <div class="toolbar-actions">
      <div class="btn-group">
        <router-link to="/" class="btn btn-default">
          <span class="icon icon-home icon-text"></span>
          Requests
        </router-link>
        <router-link to="/mock" class="btn btn-default">
          <span class="icon icon-archive icon-text"></span>
          Mock
        </router-link>
      </div>

      <button class="btn btn-default btn-dropdown pull-right">
        <span class="icon icon-megaphone"></span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>
  .toolbar-header a {
    text-decoration: none;
  }
</style>
