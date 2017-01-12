<template>
  <div class="request">
    <div class="request-list">
      <div class="hd clearfix">
        <div class="type">
         Url
        </div>
        <div class="action"></div>
      </div>
      <div class="bd">
        <ul>
          <li v-for="request in requests" v-if="request.isShow" @click="selectRequest(request)" class="clearfix">
            <div class="type">{{ request.url }}</div>
            <div class="action" @click.prevent.stop="addMock">
              <i class="icon icon-plus"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <el-dialog v-model="dialogRequestVisible" size="large" custom-class="dialog-request" :modal="false" top="10%">
      <el-tabs type="border-card">
        <el-tab-pane label="请求详情">
          <request-detail></request-detail>
        </el-tab-pane>
        <el-tab-pane label="响应详情">
          <response-detail></response-detail>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog title="Mock data" v-model="dialogMockVisible" size="large" custom-class="dialog-mock" :modal="true" top="10%">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="form-group raw">
              <label>Raw data</label>
              <textarea class="form-control" rows="3" v-model="currentResponse.body" disabled></textarea>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class="form-group mock">
              <label>Mock data</label>
              <textarea class="form-control" rows="3" v-model="mockData">
          </div>
        </el-col>
        <i class="icon icon-right pipe" @click="pipe"></i>
      </el-row>
      <div class="form-actions">
        <button type="submit" class="btn btn-form btn-large btn-default">Cancel</button>
        <button type="submit" class="btn btn-form btn-large btn-primary">OK</button>
      </div>
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
      dialogRequestVisible: false,
      dialogMockVisible: false,
      mockData: ''
    }
  },

  methods: {
    addRequest (req) {
      req.isShow = true
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
    selectRequest (req) {
      this.dialogRequestVisible = true
      this.$store.commit({
        type: 'selectRequest',
        req: req
      })
      this.$store.commit({
        type: 'selectResponse',
        uuid: req.uuid
      })
    },
    addMock (e) {
      e.preventDefault()
      e.stopPropagation()
      this.dialogMockVisible = true
    },
    pipe () {
      this.mockData = this.currentResponse.body
    }
  },

  computed: {
    requests () {
      return this.$store.state.requests.filter
    },
    currentResponse () {
      return this.$store.state.response.current
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
  
  .request .el-dialog {
    min-height: 200px;
  }

  .request .dialog-request .el-dialog__headerbtn {
    position: absolute;
    top: 12px;
    right: 20px;
    z-index: 1;
  }
  .request .dialog-request .el-tabs {
    width: 100%;
    box-shadow: none;
  }
  .request .dialog-request .el-dialog__header {
    padding: 0 20px;
  }
  .request .dialog-request .el-dialog__body {
    padding: 0;
  }
  .request .dialog-request .el-tabs--border-card {
    border: none;
    border-top: 1px solid #d3dce6;
  }

  .request-list {
    width: 425px;
    box-sizing: border-box;
    border-right: 1px solid #ddd;
    height: 100%;
    position: relative;
  }
  .request-list * {
    box-sizing: border-box;
  }
  .request-list .hd {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
  }
  .request-list .bd {
    padding-top: 24px;
    overflow-x: hidden;
    height: 100%;
    overflow-y: scroll;
    position: relative;
  }
  .request-list .hd, .request-list li:nth-child(even) {
    background: #f5f5f4;
  }
  .request-list .hd, .request-list li {
    border-bottom: 1px solid #ddd;
    height: 24px;
    line-height: 24px;
    overflow: hidden;
  }
  .request-list .type {
    border-right: 1px solid #ddd;
    white-space: nowrap;
  }
  .request-list ul, .request-list li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .request-list li {
    width: 100%;
    overflow: hidden;
  }
  .request-list .type {
    float: left;
    width: 400px;
    padding: 0 15px;
    text-align: left;
    overflow-x: scroll;
  }
  .request-list .action {
    width: 24px;
    height: 24px;
    padding: 0;
    text-align: center;
    font-size: 16px;
    line-height: 24px;
    color: #1A9DFF;
    float: right;
  }

  .request .dialog-mock textarea {
    height: 320px;
  }
  .request .dialog-mock .raw {
    padding-right: 25px;
  }
  .request .dialog-mock .mock {
    padding-left: 25px;
  }
  .request .dialog-mock .pipe {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    -webkit-transform: translate3d(-50%, -50%, 0);
    font-size: 30px;
  }
  .request .dialog-mock .form-actions {
    text-align: center;
  }
</style>
