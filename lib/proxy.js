/*
 * @Author: shunjinchan
 * @Date: 2016-12-21 21:22:49
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2016-12-25 00:23:39
 */

'use strict'

const http = require('http')
const mace = require('mace')
const net = require('net')
const url = require('url')
const server = http.createServer()
const io = require('socket.io')(server)
const debug = require('debug')('mock')
const joinbuffer = require('./middleware/joinbuffer.js')
const nobom = require('./middleware/nobom.js')
const zlib = require('./middleware/zlib.js')
const charset = require('./middleware/charset.js')

let creqOptions = {}
function send (req, res, pres, buffer) {
  res.statusCode = pres.statusCode
  mace.each(pres.headers, function (val, name) {
    res.setHeader(name, val)
  })
  res.write(buffer)
  io.sockets.emit('changed', JSON.stringify({
    req: creqOptions,
    res: {
      headers: pres.headers,
      body: buffer.toString('utf-8')
    }
  }))
  res.end()
}

function crequest (creq, cres) {
  let creqUrl = url.parse(creq.url)

  creqOptions = {
    hostname: creqUrl.hostname,
    port: creqUrl.port || 80,
    path: creqUrl.path,
    method: creq.method,
    headers: creq.headers
  }

  let buff = []
  let size = 0
  let preq = http.request(creqOptions, function (pres) {
    pres.on('data', (chunk) => {
      buff.push(chunk)
      size += chunk.length
    })

    pres.on('end', () => {
      debug('response data finished')
      let contentType = pres.headers['content-type'] || ''
      debug('Content-Type: %s', contentType)
      // 合并
      // buff = joinbuffer(buff, pres, creq)
      buff = Buffer.concat(buff, size)
      if (contentType.indexOf('html') === -1) {
        debug('Not a html send directly!')
        return send(creq, cres, pres, buff)
      }
      // 去BOM
      buff = nobom(buff, pres, creq)
      // 解压
      buff = zlib(buff, pres, creq)
      // 解码
      buff = charset(buff, pres, creq)

      send(creq, cres, pres, buff)
    })

    pres.on('close', (e) => {
      console.log('closing ', e)
    })
  })

  preq.on('error', function (e) {
    cres.end()
  })

  // 可以修改发送过来的form数据
  creq.on('data', function (data) {
    preq.write(data)
  })

  creq.on('end', function () {
    debug('request data finished')
    preq.end()
  })

  creq.on('error', function (e) {
    debug('Abort request with error. %s %s', e.message, e.stack)
    preq.abort()
  })
}

function connect (creq, csock) {
  let creqUrl = url.parse('http://' + creq.url)

  let psock = net.connect(creqUrl.port, creqUrl.hostname, function () {
    csock.write('HTTP/1.1 200 Connection Established\r\n\r\n')
    psock.pipe(csock)
  }).on('error', function (e) {
    csock.end()
  })

  csock.pipe(psock)
}

server
  .on('request', crequest)
  .on('connect', connect)
  .listen(9001, '0.0.0.0')
