const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({
  port: 9002
})

wss.on('connection', function connection (ws) {
  ws.send('something')
})
