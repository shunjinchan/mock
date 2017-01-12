/*
 * @Author: shunjinchan
 * @Date: 2017-01-04 13:39:19
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2017-01-06 15:03:45
 */

'use strict'

const fs = require('fs')
const path = require('path')
const mapPath = path.join(__dirname, '../store/map.json')
const config = JSON.parse(fs.readFileSync(mapPath, 'utf8'))

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
