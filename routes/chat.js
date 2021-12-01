/*
API route for viewing Chat Lobby.
*/

const { User } = require('../src/database');
const { Chat } = require('../src/database');

module.exports = (router) => {
	router.get('/chat/getContacts', async (req, res) => {
		// Find all users in database base
		const users_result = User.find()
            .lean()
            .exec(function (err, users) {
                if (err) {
                    console.log('Error finding users');
                    console.log(err);
                } else {
                    console.log('Successfully found users');
                    users.forEach(u => console.log(u.username));
                    res.json({users});
                }
            });
	});

    router.get('/chat/getChat', async (req, res) => {
        let user1 = req.query.user1;
        let user2 = req.query.user2;
        console.log(`in getChat: ${user1} - ${user2}`);
        const channel_chats = Chat.find()
            .lean()
            .exec(function (err, chats) {
                if (err) {
                    console.log('Error finding chats');
                    console.log(err);
                } else {
                    console.log('Successfully found chats');
                    let chat = chats.find(c => {
                        return c.users.includes(user1) && c.users.includes(user2)
                    });
                    console.log({chat});
                    res.json({chat});
                }
            })
    })
    
};