const {User} = require('./database');

module.exports = function (socket, io, username_socket_pair, all_channels){
    console.log('A user connected: ' + socket.id);

    //when joinning a channel => clicking a contact to message
    socket.on('join-channel', function (channel_id, username, callback){
        //Add username/socket ID pair
        username_socket_pair[socket.id] = username;

        let exist = socket.adapter.channels[channel_id];
        //if channel_exist join the channel, (get channel messages history) and send messages
        if(exist){
            socket.join(channel_id);
            all_channels[channel_id].user_count++;

            callback('channel exist');
        }else{
            callback('channel does not exist', channel_id);
        }
    });

    //Getting all online contacts
    socket.on('get_online_users', function(channel_id, callback){
        let channel = io.sockets.adapter.channels[channel_id];

        if(!channel){
            callback('Loby error!');
            return;
        }

        get 
    })
}