<template>
  <div class="map-local">
    <form>
      <div class="checkbox">
        <label>
          <input type="checkbox" id="mapCheckbox" v-model="mapChecked" @click="toggleMap"> Enable map local
        </label>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MockSidebar',

  data () {
    return {
      mapChecked: false
    }
  },

  methods: {
    toggleMap () {
      console.log(this.mapChecked)
    }
  }
}
</script>

<style>
  .map-local {
    padding: 0 10px;
  }
</style>
