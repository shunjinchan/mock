<template>
  <div class="map-local">
    <form>
      <div class="checkbox">
        <h5>Map local</h5>
        <label>
          <input type="checkbox" id="mapCheckbox" v-model="mapChecked"> Enable map local
        </label>
      </div>
    </form>

    <div class="map-list">
      <table class="table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Remote</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="map in mapList" @click="selectMap(map.uuid)">
            <td>
              <input type="checkbox">
            </td>
            <td>{{ map.url }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="map-action">
      <input type="file" @change="addMap">
      <button class="btn btn-default">
        Add
      </button>
      <button class="btn btn-default">
        Remove
      </button>
    </div>
  </div>
</template>

<script>
import config from '../../config/config.js'

export default {
  name: 'MockSidebar',

  data () {
    return {
      mapChecked: false,
      mapList: null
    }
  },

  created () {
    this.fetchMapList()
  },

  methods: {
    toggleMap () {
      console.log(this.mapChecked)
    },
    // fetch map list
    fetchMapList () {
      this.$http.get(`${config.server}/map`).then((res) => {
        if (res.status === 200) {
          this.mapList = res.body
        }
      }, (res) => {
        console.log(res)
      })
    },
    selectMap (uuid) {
      this.$router.push({
        name: 'map',
        params: {
          uuid: uuid
        }
      })
    },
    addMap (e) {
      console.log(e.target.files[0])
      console.log(e.target.value)
    }
  }
}
</script>

<style>
  .map-local form {
    padding: 0 10px;
  }
  .map-local h5 {
    margin: 10px 0 5px 0;
    font-size: 14px;
    font-weight: normal;
  }
  .map-local .map-list {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    overflow-x: scroll;
  }
  .map-local .map-list th:first-child, .map-local .map-list td:first-child {
    width: 30px;
    min-width: 30px;
    padding-left: 0;
    padding-right: 0;
    text-align: center;
  }

  .map-action {
    margin-top: 10px;
    text-align: center;
  }
  .map-action .btn {
    margin: 0 5px;
  }
</style>
