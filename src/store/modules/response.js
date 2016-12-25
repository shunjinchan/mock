/*
 * @Author: shunjinchan
 * @Date: 2016-12-24 02:07:38
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2016-12-25 00:58:51
 */

'use strict'

const state = {
  all: [],
  current: []
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
  }
}

export default {
  state,
  // getters,
  mutations
}
