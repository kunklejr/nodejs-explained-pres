var os = require('os');
var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);
var fs = require('fs');

var sockets = [];
var masterSocket = null;
var chatLog = fs.createWriteStream('chat.log', { flags: 'a' });

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

app.listen(3000);

var broadcast = function(event, data, ignoreSocket) {
  for (var i = 0, l = sockets.length; i < l; i++) {
    if (sockets[i] !== ignoreSocket) {
      sockets[i].emit(event, data);
    }
  }
  if (masterSocket && (ignoreSocket === undefined || ignoreSocket !== masterSocket)) {
    masterSocket.emit(event, data);
  }
};

var addSocket = function(socket) {
  if (masterSocket === null && socket.handshake.address.address === findLocalAddress()) {
    masterSocket = socket;
  } else {
    sockets.push(socket);
  }
};

var removeSocket = function (socket) {
  if (socket === masterSocket) {
    masterSocket = null;
  } else {
    for (var i = 0, l = sockets.length; i < l; i++) {
      if (socket === sockets[i]) {
        return sockets.splice(i, 1);
      }
    }
  }
};

var findLocalAddress = function() {
  var en1 = os.networkInterfaces().en1;
  for (var i = 0, l = en1.length; i < l; i++) {
    if (en1[i].family === 'IPv4') {
      return en1[i].address;
    }
  }
}

var onChat = function(msg) {
  if (msg === null || msg === undefined ||
      msg.indexOf('<') > -1 || msg.indexOf('>') > -1) {
    return;
  }
  broadcast('chat', msg);
  chatLog.write(msg + '\n');
};

io.sockets.on('connection', function (socket) {
  addSocket(socket);
  socket.on('step', function (stepId) {
    if (socket === masterSocket) {
      broadcast('step', stepId, masterSocket);
    }
  });
  socket.on('disconnect', function() {
    console.log('Socket disconnected');
    removeSocket(socket);
    broadcast('connections', sockets.length + 1); // need to include master socket
  });
  socket.on('chat', onChat.bind(this));
  broadcast('connections', sockets.length + 1);
});

console.log('Connect to http://' + findLocalAddress() + ':3000');
