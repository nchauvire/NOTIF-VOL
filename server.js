var http = require('http');
var fs = require('fs');
var md5 = require('MD5');


// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {

});
server.on('close', function() { // On écoute l'évènement close
  console.log('serveur fermé!');
})

server.listen(8000);

var io = require('socket.io').listen(server);

var vol = null;

getVol = function (vol,socket) {
  console.log(vol);
  var t = null;
  if(vol !== null){
    t = vol.id
  }
  var options = {
    host: "api-vol-velo",
    port: 80,
    path: '/new/vol/'+t,
    method: 'GET'
  };

  http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      data = JSON.parse(chunk);
      if(data != null){
        vol = data;
        socket.emit('message', vol.name+" "+vol.city);
        console.log( chunk);
      }
    });
  }).end();

  setTimeout(function () {
   getVol(vol,socket)
  },3000);


};




// Chargement de socket.io
io.sockets.on('connection',function (socket) {

  console.log('Un client est connecté !');


  // vérification toute les 2 seconde si il y a un nouveau vols

  getVol(vol,socket);

  socket.on('disconnect',function () {

  })

});