/*
 * @Author: shunjinchan
 * @Date: 2016-12-21 21:23:06
* @Last modified by:   shunjinchan
* @Last modified time: 2017-01-13T11:19:00+08:00
 */

'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import requests from './modules/requests.js'
import response from './modules/response.js'
import map from './modules/map.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    requests,
    response,
    map
  },
  strict: debug
})
