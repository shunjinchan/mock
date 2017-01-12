/**
* @Author: shunjinchan
* @Date:   2017-01-12T23:36:49+08:00
* @Last modified by:   shunjinchan
* @Last modified time: 2017-01-12T23:42:29+08:00
*/

'use strict'

const express = require('express')
const router = express.Router()

router.route('/map')
.all(function (req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  next()
})
.get(function (req, res, next) {
  res.json(require('../store/map.json'))
})
.put(function (req, res, next) {

})
.post(function (req, res, next) {
  next(new Error('not implemented'))
})

module.exports = router
