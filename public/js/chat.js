var chat = {
  enabled: false,

  show: function() {
    var chatWindow = document.getElementById('chat');
    chatWindow.setAttribute('class', 'active');
    chat.enabled = true;
    setTimeout(function() {
      var chatInput = document.getElementById('chat-input');
      chatInput.focus();
    }, 10);
  },

  close: function() {
    var chatWindow = document.getElementById('chat');
    chatWindow.setAttribute('class', '');
    chat.enabled = false;
  },

  send: function(person, msg) {
    if (msg) {
      socket.emit('chat', person + ": " + msg);
    }
  },

  update: function (msg) {
    var chatLog = document.getElementById('chat-log');
    chatLog.innerHTML = chatLog.innerHTML + "<p>" + msg + "</p>";
    chatLog.scrollTop = chatLog.scrollHeight;
  }
};

if (window.io) {
  document.addEventListener('keydown', function (event) {
    if (event.keyCode && event.keyCode == 67) {
      if (chat.enabled) {
        return;
      }
      chat.show();
    }
  });

  document.getElementById('chat-input').addEventListener('keydown', function (event) {
    if (event.keyCode == 13) {
      chat.send(window.username || 'Anonymous', event.target.value);
      event.target.value = '';
    }
  });

  socket.on('chat', chat.update);

  window.username = window.prompt('Please enter your real first name');
}
