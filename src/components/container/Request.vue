<template>
  <div class="request">
    <table class="table-striped">
      <thead>
        <tr>
          <th>hostname</th>
          <th>Kind</th>
          <th>File Size</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in requests" @click="selectRequest(request)">
          <td>{{ request.hostname }}</td>
          <td>CSS</td>
          <td>28K</td>
        </tr>
      </tbody>
    </table>

    <el-dialog title="" v-model="dialogRequestVisible" size="large" custom-class="dialog-request" :modal="false" top="10%">
      <el-tabs type="border-card">
        <el-tab-pane label="请求详情">
          <request-detail></request-detail>
        </el-tab-pane>
        <el-tab-pane label="响应详情">
          <response-detail></response-detail>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import uuidV4 from 'uuid/v4'
import RequestDetail from './RequestDetail.vue'
import ResponseDetail from './ResponseDetail.vue'

export default {
  name: 'Request',

  components: {
    RequestDetail,
    ResponseDetail
  },

  data () {
    return {
      dialogRequestVisible: false
    }
  },

  methods: {
    addRequest (req) {
      this.$store.commit({
        type: 'addRequest',
        req: req
      })
    },
    addResponse (res) {
      this.$store.commit({
        type: 'addResponse',
        res: res
      })
    },
    selectRequest (val) {
      this.dialogRequestVisible = true
      this.$store.commit({
        type: 'selectRequest',
        req: val
      })
      this.$store.commit({
        type: 'selectResponse',
        uuid: val.uuid
      })
    }
  },

  computed: {
    requests () {
      return this.$store.state.requests.all
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
  .dialog-request .el-dialog__headerbtn {
    position: absolute;
    top: 12px;
    right: 20px;
    z-index: 1;
  }
  .dialog-request .el-tabs {
    width: 100%;
    box-shadow: none;
  }
  .dialog-request .el-dialog__header {
    padding: 0 20px;
  }
  .dialog-request .el-dialog__body {
    padding: 0;
  }
  .dialog-request .el-tabs--border-card {
    border: none;
    border-top: 1px solid #d3dce6;
  }
</style>
