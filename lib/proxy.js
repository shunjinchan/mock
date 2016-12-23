/*
 * @Author: shunjinchan
 * @Date: 2016-12-21 21:22:49
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2016-12-23 19:11:44
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

function send (req, res, pres, buffer) {
  res.statusCode = pres.statusCode
  mace.each(pres.headers, function (val, name) {
    res.setHeader(name, val)
  })
  res.write(buffer)
  res.end()
}

function crequest (creq, cres) {
  let creqUrl = url.parse(creq.url)

  let options = {
    hostname: creqUrl.hostname,
    port: creqUrl.port || 80,
    path: creqUrl.path,
    method: creq.method,
    headers: creq.headers
  }

  io.sockets.emit('changed', JSON.stringify(options))

  let buff = []
  let preq = http.request(options, function (pres) {
    pres.on('data', (chunk) => {
      buff.push(chunk)
    })
    pres.on('end', () => {
      debug('response data finished')
      let contentType = pres.headers['content-type'] || ''
      debug('Content-Type: %s', contentType)
      // 合并
      buff = joinbuffer(buff, pres, creq)
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

    // cres.writeHead(pres.statusCode, pres.headers)
    // pres.pipe(cres)
  }).on('error', function (e) {
    cres.end()
  })

  // creq.pipe(preq)
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
