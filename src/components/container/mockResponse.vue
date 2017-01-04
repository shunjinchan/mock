<template>
  <div>
    <div class="res-ft">
      <div class="mock" @click="toggleMockPopup">
        mock
      </div>
    </div>

    <div class="mock-popup" v-if="isOpenMockPopup">
      <el-form ref="form" :model="mock">
        <el-form-item>
          <el-input type="textarea" v-model="mock.res"></el-input>
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="mockSwitch"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitMock">确定</el-button>
          <el-button @click="toggleMockPopup">取消</el-button>
        </el-form-item>
      </el-form-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MockResponse',

  data () {
    return {
      isOpenMockPopup: false,
      mockSwitch: true,
      mock: {
        res: ''
      }
    }
  },

  methods: {
    toggleMockPopup () {
      this.isOpenMockPopup = !this.isOpenMockPopup
    },

    submitMock () {}
  },

  computed: {
    currentResponse () {}
  }
}
</script>

<style>
.res-ft {
  height: 32px;
  line-height: 32px;
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;
  background-color: #eff2f7;
  position: absolute;
  border-top: 1px solid #d3dce6;
}
.res-ft > div {
  padding: 0 16px;
}
.mock-popup {
  position: absolute;
  padding: 20px;
  left: 30%;
  right: 0;
  top: 2px;
  bottom: 32px;
  background-color: #eff2f7;
  border-left: 1px solid #d3dce6;
  z-index: 2;
}
.mock-popup textarea {
  height: 300px;
}
</style>