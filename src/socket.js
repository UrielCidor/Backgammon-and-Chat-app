const { User } = require('./database');
const { Chat } = require('./database');

let onlines = [];

module.exports = function (socket, io) {
    console.log('A user connected: ' + socket.id);

    io.emit('getOnlines', onlines);

    socket.on('online', (username) => {
        if (!onlines.includes(username)) onlines.push(username);
    })

    socket.on('send-message', message => {
        console.log("message:", message);
        //find contact-chat or create new one and add message.
        const chat = Chat.find().lean().exec(
            function (err, chats) {
                if (err) {
                    console.log('Error finding chat');
                    console.log(err);
                } else {
                    let chat = chats.find(c => {
                        return c.users.includes(message.channel.username) && c.users.includes(message.sender)
                    });
                    if (chat) {
                        console.log('Successfully found this chat');
                        Chat.updateOne(
                            { _id: chat._id }, { $push: { messages: message } }
                        ).exec(console.log("messages updated"));
                    } else {
                        const newChat = Chat.create({
                            users: [message.channel.username, message.sender],
                            messages: [message]
                        })
                    }
                    io.emit('message', chat);
                }
            }
        );

    });

    socket.on('offline', (username) => {
        onlines.splice(username, 1);
    })
}