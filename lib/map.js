/*
 * @Author: shunjinchan
 * @Date: 2017-01-04 13:39:19
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2017-01-04 13:49:53
 */

'use strict'

const config = require('./map-config.js')

function map (url) {
  for (let i = 0; i < config.length; i++) {
    let cf = config[i]

    if (url.indexOf(cf.remoteUrl) > -1) {
      return cf.data
    }
    return
  }
}

module.exports = map
