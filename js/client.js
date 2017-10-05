(function ($) {
  var socket = io.connect('http://localhost:1337');
  var msgtpl = $('#msgtpl').html();
  $('#msgtpl').remove();
  $('#loginform').submit(function (event) {
    event.preventDefault();
    socket.emit('login',{
      username : $('#username').val(),
      email : $('#mail').val(),
    })
  });

  $('#form').submit(function (event) {
    event.preventDefault();
    socket.emit('newmsg',{message:$('#message').val()});
    $('#message').val(''); 
    $('#message').focus();
  });


  /**
   * Envoi de messages
   */
  socket.on('newmsg',function (message) {
    console.log(message);
    $('#messages').append('<div class="message">' +Mustache.render(msgtpl,message)+'</div>')
  });

  /**
   * Gestion des utilisateurs
   */
  socket.on('newusr',function (user) {
    $('#users').append('<li id="'+user.id+'" class="list-group-item">'+user.username+'</li>')
  })
  socket.on('logged',function () {
    $('#loginform').fadeOut();
    $('#message').focus();
  });
  socket.on('delusr',function (user) {
    $('#'+user.id).remove()
  })
})(jQuery);

