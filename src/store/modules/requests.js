/*
 * @Author: shunjinchan
 * @Date: 2016-12-21 21:27:31
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2016-12-24 12:59:01
 */

'use strict'

const state = {
  all: [],
  current: []
}

// getters
const getters = {
  allReq: state => state.all,
  current: state => state.current
}

const mutations = {
  /**
  * @param  {Object} state
  * @param  {Object} req
  */
  addRequest (state, data) {
    state.all.push(data.req)
  },
  /**
  * @param  {Object} state
  * @param  {Object} req
  */
  selectRequest (state, data) {
    console.log(data.req)
    state.current = data.req
  }
}

export default {
  state,
  getters,
  mutations
}
