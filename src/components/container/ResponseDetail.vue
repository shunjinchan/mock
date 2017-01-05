<template>
  <div>
    <el-table
      :data="currentResponse"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
      height="400">
      <el-table-column
        fixed
        property="name"
        label="属性"
        width="120">
      </el-table-column>
      <el-table-column
        property="value"
        label="值">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ResponseDetail',

  methods: {
    handleCurrentChange (val) {
      this.currentRow = val
    }
  },

  computed: {
    currentResponse () {
      let req = this.$store.state.response.current
      let data = []
      let val
      let process = (req) => {
        for (var attr in req) {
          if (req.hasOwnProperty(attr)) {
            val = req[attr]
            if (typeof val !== 'object') {
              data.push({
                name: attr,
                value: val
              })
            } else {
              process(val)
            }
          }
        }
      }

      process(req)
      return data
    }
  }
}
</script>

<style>
</style>