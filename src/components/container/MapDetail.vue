<template>
  <div class="map-detail">
    {{ mapDetail }}
  </div>
</template>

<script>
import config from '../../config/config.js'

export default {
  name: 'MapDetail',

  data () {
    return {
      mapDetail: null
    }
  },

  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchMapDetail()
  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchMapDetail'
  },

  methods: {
    fetchMapDetail () {
      this.$http.get(`${config.server}/map/${this.$route.params.uuid}`).then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          this.mapDetail = res.data
        }
      }, (res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
</style>
