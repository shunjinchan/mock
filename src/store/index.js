/*
 * @Author: shunjinchan
 * @Date: 2016-12-21 21:23:06
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2016-12-22 00:25:24
 */

'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import requests from './modules/requests.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    requests
  },
  strict: debug
})
