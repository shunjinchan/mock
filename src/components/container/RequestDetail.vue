<template>
  <div>  
    <el-table
      :data="currentRequest"
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
  name: 'RequestDetail',

  methods: {
    handleCurrentChange (val) {
      this.currentRow = val
    }
  },

  computed: {
    currentRequest () {
      let req = this.$store.state.requests.current
      let data = []
      let process = (req) => {
        for (var attr in req) {
          if (req.hasOwnProperty(attr)) {
            if (typeof req[attr] !== 'object') {
              data.push({
                name: attr,
                value: req[attr]
              })
            } else {
              process(req[attr])
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