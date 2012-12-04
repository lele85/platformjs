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

var unassigned_clients = [];
var client_socket;


io.sockets.on('connection', function (socket) {
  socket.on('register_client', function (from) {
    unassigned_clients.push(from);
    console.log(unassigned_clients);
    client_socket = socket;
  });
  
  socket.on('register_keyboard', function (from) {
    var client_id = unassigned_clients.pop();
    console.log(unassigned_clients);
    
    socket.on('keydown', function(e){
      client_socket.emit('keydown_'+ client_id, e);
    });

    socket.on('keyup', function(e){
      client_socket.emit('keyup_'+ client_id, e);
    });
  });
});