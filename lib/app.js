/*
 * @Author: shunjinchan
 * @Date: 2017-01-05 18:28:01
* @Last modified by:   shunjinchan
* @Last modified time: 2017-01-12T23:42:19+08:00
 */

'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const proxy = require('./proxy.js')
const map = require('./routes/map.js')
const switcher = require('./routes/switcher.js')
const app = express()

// 跨域支持
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// router
app.use('/map', map)
app.use('/switch', switcher)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

proxy.run()
app.listen(9002)
