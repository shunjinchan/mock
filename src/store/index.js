/*
 * @Author: shunjinchan
 * @Date: 2016-12-21 21:23:06
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2016-12-24 12:36:49
 */

'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import requests from './modules/requests.js'
import response from './modules/response.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    requests,
    response
  },
  strict: debug
})
