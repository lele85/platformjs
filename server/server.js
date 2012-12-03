var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  setTimeout(function(){
    socket.emit('keydown', {keyCode:39})
  }, 2000);
  setTimeout(function(){
    socket.emit('keyup', {keyCode:39})
  }, 2500);
});