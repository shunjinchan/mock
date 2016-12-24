<template>
  <div class="request">
    <el-tabs :active-name="activeName" type="border-card">
      <el-tab-pane label="按顺序" name="first">
        <el-table
          :data="requests"
          highlight-current-row
          @current-change="selectRequest"
          style="width: 100%">
          <el-table-column
            property="hostname"
            label="请求">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="按域名" name="second">按域名</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import uuidV4 from 'uuid/v4'

export default {
  name: 'request',

  data () {
    return {
      activeName: 'first'
    }
  },

  methods: {
    addRequest (req) {
      this.$store.commit({
        type: 'addRequest',
        req: req
      })
    },
    selectRequest (val) {
      this.currentRow = val
      this.$store.commit({
        type: 'selectRequest',
        req: val
      })
      this.$store.commit({
        type: 'selectResponse',
        uuid: val.uuid
      })
    },
    addResponse (res) {
      this.$store.commit({
        type: 'addResponse',
        res: res
      })
    }
  },

  computed: {
    requests () {
      return this.$store.state.requests.allReq
    }
  },

  socket: {
    events: {
      connect () {
        console.log('connect')
      },
      changed (data) {
        let uuid = uuidV4()
        // request
        let req = JSON.parse(data).req
        req.uuid = uuid
        this.addRequest(req)

        // response
        let res = JSON.parse(data).res
        res.uuid = uuid
        this.addResponse(res)
      }
    }
  }
}
</script>

<style>
.request {
  height: 100%;
  overflow: hidden;
}
.request * {
  box-sizing: border-box;
}
.request .el-tabs__item {
  height: 32px;
  line-height: 32px;
}
.request .el-tabs--border-card {
  width: 100%;
  height: 100%;
  position: relative;
}
.request .el-tabs__header {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
}
.request .el-tabs--border-card .el-tabs__content {
  padding: 0;
  border-top: 30px solid #fff;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.request .el-table__header-wrapper {
  display: none;
}
</style>