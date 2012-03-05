var socket = io.connect('http://localhost:3000');

socket.on('step', function (stepId) {
	var el = document.getElementById(stepId);
	presentation.goto(el);
});

presentation.on('step', function(step) {
	socket.emit('step', step.el.id);
});
