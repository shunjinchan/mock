<template>
  <div class="display">
    <el-tabs :active-name="activeName" type="border-card">
      <el-tab-pane label="预览" name="first">
        <overview></overview>
      </el-tab-pane>
      <el-tab-pane label="请求" name="second">
        <request-detail></request-detail>
      </el-tab-pane>
      <el-tab-pane label="响应" name="third">响应</el-tab-pane>
      <el-tab-pane label="timeline" name="fourth">timeline</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Overview from './Overview.vue'
import RequestDetail from './RequestDetail.vue'

export default {
  name: 'Display',

  components: {
    Overview,
    RequestDetail
  },

  data () {
    return {
      activeName: 'second'
    }
  },

  methods: {
    handleCurrentChange (val) {
      this.currentRow = val
    }
  },

  computed: {
    requests () {
      return this.$store.state.requests.all
    }
  }
}
</script>

<style>
.display {
  height: 100%;
  overflow: hidden;
}
.display * {
  box-sizing: border-box;
}
.display .el-tabs__item {
  height: 32px;
  line-height: 32px;
}
.display .el-tabs--border-card {
  width: 100%;
  height: 100%;
  position: relative;
  border-left: 0;
}
.display .el-tabs__header {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
}
.display .el-tabs--border-card .el-tabs__content {
  padding: 0;
  border-top: 30px solid #fff;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
</style>