/**
* @Author: shunjinchan
* @Date:   2017-01-13T10:45:26+08:00
* @Last modified by:   shunjinchan
* @Last modified time: 2017-01-13T12:51:54+08:00
*/

'use strict'

import api from '../../api/map.js'

const state = {
  all: [],
  current: []
}

const mutations = {
  /**
  * @param  {Object} state
  * @param  {Object} map
  */
  addMap (state, data) {},
  /**
  * @param  {Object} state
  * @param  {Object} map
  */
  selectMap (state, data) {},
  /**
  * @param  {Object} state
  */
  deleteMap (state) {}
}

const actions = {
  getMapList () {
    api.getMapList()
  }
}

export default {
  state,
  mutations,
  actions
}
