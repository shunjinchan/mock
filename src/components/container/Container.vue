<template>
  <div class="container">
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple aside">
          <request></request>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple main">
          <display></display>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Request from './Request.vue'
import Display from './Display.vue'

export default {
  name: 'Container',
  components: {
    Request,
    Display
  },
  data () {
    return {}
  }
}
</script>

<style>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.el-row, .main, .aside, .el-col {
  height: 100%;
}
</style>