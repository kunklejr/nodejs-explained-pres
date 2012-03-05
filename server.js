var os = require('os');
var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);

var sockets = [];
var masterSocket = null;

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

app.listen(3000);

var addSocket = function(socket) {
	if (masterSocket === null) {
		masterSocket = socket;
	} else {
		sockets.push(socket);	
	}
};

var removeSocket = function (socket) {
	if (socket === masterSocket) {
		masterSocket = null;
	} else {
		var socketLength = sockets.length;
		for (var i = 0; i < socketLength; i++) {
			if (socket === sockets[i]) {
				return sockets.splice(i, 1);
			}
		}	
	}
};

var findLocalAddress = function() {
	var en1 = os.networkInterfaces().en1;
	for (var i = 0, length = en1.length; i < length; i++) {
		if (en1[i].family === 'IPv4') {
			return en1[i].address;
		}
	}
}

io.sockets.on('connection', function (socket) {
	addSocket(socket);
  	socket.on('step', function (stepId) {
		if (socket === masterSocket) {
			var socketLength = sockets.length;
			for (var i = 0; i < socketLength; i++) {
				sockets[i].emit('step', stepId);
			}
		}
  	});
  	socket.on('disconnect', function() {
		console.log('Socket disconnected');
		removeSocket(socket);
	})
});

console.log('Connect to http://' + findLocalAddress() + ':3000');