/*
 * @Author: shunjinchan
 * @Date: 2016-12-24 02:07:38
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2016-12-24 12:57:38
 */

'use strict'

const state = {
  all: [],
  current: []
}

// getters
const getters = {
  allRes: state => state.all,
  currentRes: state => state.current
}

const mutations = {
  /**
  * @param  {Object} state
  * @param  {Object} res
  */
  addResponse (state, data) {
    state.allResponse.push(data.res)
  },
  /**
  * @param  {Object} state
  * @param  {Object} res
  */
  selectResponse (state, data) {
    console.log(data.uuid)
  }
}

export default {
  state,
  getters,
  mutations
}
