var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);
var sockets = [];

sockets.prototype.remove = function(socket) {
	var length = this.length;
	for (var i = 0; i < length; i++) {
		if (this[i] == socket) {
			return this.splice(i, 1);
		}
	}
}

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

app.listen(3000);

io.sockets.on('connection', function (socket) {
  sockets.push(socket);
  socket.on('disconnect', function () {
		sockets.remove(socket);
  });
});


