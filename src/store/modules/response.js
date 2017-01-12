/*
 * @Author: shunjinchan
 * @Date: 2016-12-24 02:07:38
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2017-01-09 15:23:57
 */

'use strict'

import config from '../../config/config.js'

const state = {
  all: [],
  current: [],
  filter: []
}

// getters
// const getters = {
//   allRes: state => state.all,
//   currentRes: state => state.current
// }

const mutations = {
  /**
  * @param  {Object} state
  * @param  {Object} res
  */
  addResponse (state, data) {
    state.all.push(data.res)
    if (state.all.length > config.maxReq) {
      state.all.shift()
    }
    state.filter = state.all
  },
  /**
  * @param  {Object} state
  * @param  {Object} res
  */
  selectResponse (state, data) {
    for (let i = 0; i < state.all.length; i++) {
      let res = state.all[i]

      if (res.uuid === data.uuid) {
        state.current = res
      }
    }
  },
  /**
  * @param  {Object} state
  */
  clearResponse (state) {
    state.all = []
    state.current = []
    state.filter = []
  }
}

export default {
  state,
  // getters,
  mutations
}
