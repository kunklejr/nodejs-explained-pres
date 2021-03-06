if (window.io) {
  var socket = io.connect('http://192.168.1.52:3000');

  socket.on('step', function (stepId) {
    var el = document.getElementById(stepId);
    presentation.goto(el);
  });

  presentation.on('step', function (step) {
    socket.emit('step', step.el.id);
  });

  socket.on('connections', function (num) {
    var el = document.getElementById('status');
    el.innerHTML = num + " participants, press 'c' to chat with them";
  });
}
