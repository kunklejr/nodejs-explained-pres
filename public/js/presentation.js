if (window.io) {
  var socket = io.connect('http://192.168.13.124:3000');

  socket.on('step', function (stepId) {
    var el = document.getElementById(stepId);
    presentation.goto(el);
  });

  presentation.on('step', function (step) {
    socket.emit('step', step.el.id);
  });

  socket.on('connections', function (num) {
    var el = document.getElementById('connections');
    el.innerHTML = num + ' participants';
  });
}
