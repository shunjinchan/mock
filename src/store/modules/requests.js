/*
 * @Author: shunjinchan
 * @Date: 2016-12-21 21:27:31
 * @Last Modified by:   pigsy.chen
 * @Last Modified time: 2017-01-09 19:09:24
 */

'use strict'

import config from '../../config/config.js'

const state = {
  all: [],
  filter: [],
  current: [],
  filterText: '',
  hosts: []
}

// getters
// const getters = {
//   allReq: state => state.all,
//   currentReq: state => state.current
// }

const filterUtils = {
  hostname (rawText, filterText) {
    if (rawText.indexOf(filterText) > -1) {
      return true
    } else {
      return false
    }
  },

  url (rawText, filterText) {
    if (rawText.indexOf(filterText) > -1) {
      return true
    } else {
      return false
    }
  }
}

const addHost = function (state, hostname) {
  let flag = true

  for (let i = 0; i < state.hosts.length; i++) {
    let name = state.hosts[i].name
    if (name === hostname) flag = false
  }

  flag && state.hosts.push({
    name: hostname,
    isSelected: false
  })
}

const selectHost = function (state, filterText) {
  for (let i = 0; i < state.hosts.length; i++) {
    if (state.hosts[i].name === filterText) {
      state.hosts[i].isSelected = true
    } else {
      state.hosts[i].isSelected = false
    }
  }
}

const mutations = {
  /**
  * @param  {Object} state
  * @param  {Object} req
  */
  addRequest (state, data) {
    state.all.push(data.req)

    if (state.hosts.length > 0) {
      addHost(state, data.req.hostname)
    } else {
      state.hosts.push({
        name: data.req.hostname,
        isSelected: false
      })
    }

    if (state.all.length > config.maxReq) {
      state.all.shift()
    }
    state.filter = state.all
  },
  /**
  * @param  {Object} state
  * @param  {Object} req
  */
  selectRequest (state, data) {
    state.current = data.req
  },
  /**
  * @param  {Object} state
  */
  clearRequest (state) {
    state.all = []
    state.current = []
    state.filter = []
  },
  /**
  * @param  {Object} state
  */
  filterRequest (state, data) {
    let type = data.filter.type ? data.filter.type : 'url'

    state.filter.forEach((req, i) => {
      req.isShow = filterUtils[type](req[type], data.filter.text)
    })
    selectHost(state, data.filter.text)
  }
}

export default {
  state,
  // getters,
  mutations
}
