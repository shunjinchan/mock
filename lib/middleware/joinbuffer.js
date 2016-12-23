/*
 * @Author: shunjinchan
 * @Date: 2016-12-23 18:07:17
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2016-12-23 18:41:37
 */

const debug = require('debug')('mock:joinbuffer')

exports = module.exports = function (buffer, proxyRes) {
  return exports.joinBuffer(buffer)
}
exports.joinBuffer = function (bufferStore) {
  var length = bufferStore.reduce(function (previous, current) {
    return previous + current.length
  }, 0)
  var buffer = new Buffer(length)
  var startPos = 0
  bufferStore.forEach(function (piece) {
    piece.copy(buffer, startPos)
    startPos += piece.length
  })
  return buffer
}
