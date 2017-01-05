/*
 * @Author: shunjinchan
 * @Date: 2016-12-21 21:22:49
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2017-01-04 23:37:05
 */

'use strict'

const http = require('http')
const net = require('net')
const url = require('url')
const map = require('./map.js')
const zlib = require('./middleware/zlib.js')
const server = http.createServer()
const io = require('socket.io')(server)

function send (creq, cres, pres, buffer) {
  let contentType = pres.headers['content-type'] || ''
  let creqUrl = url.parse(creq.url)
  let resBody
  cres.statusCode = pres.statusCode

  // 解压
  buffer = zlib(buffer, pres, creq)
  // buffer = charset(buffer, pres, req)
  // 暂时将图片请求忽略
  if (contentType.indexOf('image') > -1) {
    resBody = '图片'
  } else {
    resBody = buffer.toString('utf8')
  }

  for (let key in pres.headers) {
    if (pres.headers.hasOwnProperty(key)) {
      cres.setHeader(key, pres.headers[key])
    }
  }

  if (map(creq.url)) {
    // map local
    cres.write(new Buffer(map(creq.url)))
  } else {
    cres.write(buffer)
  }

  // send socket
  io.sockets.emit('changed', JSON.stringify({
    req: {
      url: creq.url,
      hostname: creqUrl.hostname,
      port: creqUrl.port || 80,
      path: creqUrl.path,
      method: creq.method,
      headers: creq.headers
    },
    res: {
      headers: pres.headers,
      body: resBody
    }
  }))

  cres.end()
}

function proxy (creq, cres) {
  let creqUrl = url.parse(creq.url)
  let buff = []
  let size = 0
  let preq = http
    .request({
      hostname: creqUrl.hostname,
      port: creqUrl.port || 80,
      path: creqUrl.path,
      method: creq.method,
      headers: creq.headers
    },
    // 代理请求回调
    function (pres) {
      pres.on('data', (chunk) => {
        buff.push(chunk)
        size += chunk.length
      })

      pres.on('end', () => {
        // 合并
        buff = Buffer.concat(buff, size)

        send(creq, cres, pres, buff)
      })

      pres.on('close', (e) => {
        console.log('closing ', e)
      })
    })

  preq.on('error', function (e) {
    cres.end()
  })

  // 可以修改发送过来的 form 数据
  creq.on('data', function (data) {
    preq.write(data)
  })

  creq.on('end', function () {
    preq.end()
  })

  creq.on('error', function (e) {
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

const mock = {
  run: function () {
    server
      .on('request', proxy)
      .on('connect', connect)
      .listen(9001, '0.0.0.0')
  }
}

mock.run()
