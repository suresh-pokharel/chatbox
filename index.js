var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	var user_id = Math.floor((Math.random() * 10000) + 1);
	socket.emit('my id',user_id);					// emit the user's id 
	
	socket.on('chat message', function(msg){
		var data = {
			user_id : user_id,
			msg: msg
		};
    	io.emit('chat message', data);
  });

	socket.on('connection success', function(msg){
		var data = {
			user_id : user_id,
			msg: msg
		};
    	io.emit('connection success', data);
  });

	socket.on('disconnect', function(msg){
    	io.emit('disconnected','user-' + user_id);
  });

});


http.listen(3000, function(){
	console.log('listening on localhost:3000');
});