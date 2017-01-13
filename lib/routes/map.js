/*
 * @Author: shunjinchan
 * @Date: 2017-01-06 16:17:06
* @Last modified by:   shunjinchan
* @Last modified time: 2017-01-13T15:45:07+08:00
 */

'use strict'

const fs = require('fs')
const express = require('express')
const router = express.Router()
const map = require('../store/map.json')

router.route('/')
.all(function (req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  next()
})
.get(function (req, res, next) {
  res.json(map)
})
.post(function (req, res, next) {
  next(new Error('not implemented'))
})
.delete(function (req, res, next) {
  next(new Error('not implemented'))
})

router.route('/:uuid')
.all(function (req, res, next) {
  next()
})
.get(function (req, res, next) {
  let uuid = req.url.slice(1)

  for (let i = 0; i < map.length; i++) {
    if (map[i].uuid === uuid) {
      fs.readFile(map[i].localUrl, 'utf8', (err, data) => {
        if (err) throw err
        res.json(JSON.parse(data))
      })
    }
  }
})
.post(function (req, res, next) {
  next(new Error('not implemented'))
})
.delete(function (req, res, next) {
  next(new Error('not implemented'))
})

module.exports = router
