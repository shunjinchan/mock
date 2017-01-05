/*
 * @Author: shunjinchan
 * @Date: 2017-01-04 13:39:19
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2017-01-05 10:24:26
 */

'use strict'

const fs = require('fs')
const path = require('path')
const cfPath = path.join(__dirname, '/config/map.json')

function readConfig (path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}

const config = readConfig(cfPath)

function map (url) {
  for (let i = 0; i < config.length; i++) {
    let cf = config[i]

    // 读取 mock 文件
    if (url.indexOf(cf.url) > -1 && cf.localUrl && fs.existsSync(cf.localUrl)) {
      return fs.readFileSync(cf.localUrl, 'utf-8')
    }
    return
  }
}

module.exports = map
