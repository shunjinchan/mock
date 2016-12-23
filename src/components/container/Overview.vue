<template>
  <div>  
    <el-table
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
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
  name: 'Overview',

  data () {
    return {
      tableData: [
        {
          name: 'name',
          value: 'value'
        }
      ],
      currentRow: null
    }
  },

  methods: {
    handleCurrentChange (val) {
      this.currentRow = val
    }
  },

  computed: {
    requests () {
      console.log(this.$store.state.requests.all)
      return this.$store.state.requests.all
    }
  }
}
</script>

<style>
</style>