const {User} = require('./database');

let onlines = [];

module.exports = function (socket, io){
    console.log('A user connected: ' + socket.id);

    io.emit('getOnlines', onlines);

    socket.on('online', (username) => {
        if(!onlines.includes(username)) onlines.push(username);
        // console.log(onlines);
        // io.emit('updateOnlines', onlines);
    })

    socket.on('send-message', message =>{
        console.log(message);
        io.emit('message', message);
    })

    socket.on('offline', (username) => {
        onlines.splice(username, 1);
        
        // console.log(onlines);
    })
}