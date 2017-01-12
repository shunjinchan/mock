/*
 * @Author: shunjinchan
 * @Date: 2016-12-21 21:22:49
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2017-01-11 21:42:14
 */

'use strict'

const http = require('http')
const https = require('https')
const net = require('net')
const url = require('url')
const map = require('./middleware/map.js')
const zlib = require('./middleware/zlib.js')
const server = http.createServer()
const io = require('socket.io')(server)

function send (req, res, proxyRes, buffer) {
  let type = proxyRes.headers['content-type'] || ''
  let urlPattern = url.parse(req.url)
  let resBody

  res.statusCode = proxyRes.statusCode

  // 解压
  buffer = zlib(buffer, proxyRes, req)

  // 暂时将图片请求忽略
  if (type.indexOf('image') > -1) {
    resBody = '图片'
  } else {
    resBody = buffer.toString('utf8')
  }

  for (let key in proxyRes.headers) {
    if (proxyRes.headers.hasOwnProperty(key)) {
      res.setHeader(key, proxyRes.headers[key])
    }
  }

  if (map(req.url)) {
    // map local
    res.write(new Buffer(map(req.url)))
  } else {
    res.write(buffer)
  }

  // send socket
  io.sockets.emit('changed', JSON.stringify({
    req: {
      url: req.url,
      hostname: urlPattern.hostname,
      port: urlPattern.port || 80,
      path: urlPattern.path,
      method: req.method,
      headers: req.headers
    },
    res: {
      headers: proxyRes.headers,
      body: resBody
    }
  }))

  res.end()
}

function request (req, res) {
  let host = req.headers.host
  let protocol = /^http:/.test(req.url) ? 'https' : 'http'
  let fullUrl = protocol === 'http' ? req.url : (protocol + '://' + host + req.url)
  let urlPattern = url.parse(req.url)
  let buff = []
  let size = 0
  let options = {
    hostname: urlPattern.hostname,
    port: urlPattern.port || (/https/.test(protocol) ? 443 : 80),
    path: urlPattern.path,
    method: req.method,
    headers: req.headers
  }
  let proxyReq = (/https/.test(protocol) ? https : http).request(options, (pres) => {
    pres.on('data', (chunk) => {
      buff.push(chunk)
      size += chunk.length
    })

    pres.on('end', () => {
      // 合并
      buff = Buffer.concat(buff, size)

      send(req, res, pres, buff)
    })

    pres.on('close', (e) => {
      console.log('closing ', e)
    })
  })

  proxyReq.on('error', (e) => {
    res.end()
  })

  // 可以修改发送过来的 form 数据
  req.on('data', (data) => {
    proxyReq.write(data)
  })

  req.on('end', () => {
    proxyReq.end()
  })

  req.on('error', (e) => {
    proxyReq.abort()
  })
}

// handle https
function connect (req, sock) {
  let urlPattern = url.parse('http://' + req.url)
  let proxySock = net.connect(urlPattern.port, urlPattern.hostname, () => {
    sock.write('HTTP/1.1 200 Connection Established\r\n\r\n')
    proxySock.pipe(sock)
  })
  .on('error', (e) => {
    sock.end()
  })

  sock.pipe(proxySock)
}

const proxy = {
  run: function () {
    server
      .on('request', request)
      .on('connect', connect)
      .listen(9001, '0.0.0.0')
  }
}

module.exports = proxy
