/*
API route to retrieve and update user object
*/

const requireToken = require('../src/requireToken');
const requireUser = require('../src/requireUser');
const { User } = require('../src/database');

module.exports = (router) => {
	// Utilize requireToken and requireUser middleware to authenticate the user
	router.get('/users/self', requireToken, requireUser, (req, res) => {

		const { user } = req;
		res.json({
			user,
		});
	});

	// router.put('/users/updateonline/:username', async (req, res) => {

	// 	await User.updateOne(
	// 		{ username: req.params.username },
	// 		{ $set: { isOnline: true } },
	// 		function(err, res) {
	// 			if(err) throw err;
	// 			console.log("1 user updated")
	// 		}
	// 	);
	// 	// res.send(`user ${user} is now ${isOnline ? "online" : "offline"}`);
	// 	res.send('updated');
	// });
	router.put('/users/updateonline/:id', async (req, res) => {
		if (!req.body) {
			return res.status(400).send({
				message: "Data to update can not be empty!"
			});
		}

		const id = req.params.id;
		console.log(id);

		User.findOneAndUpdate(id, req.body, { useFindAndModify: false })
			.then(data => {
				if(data.isOnline === true) req.body = false;
				else req.body =true;
				// req.body.isOnline = !data.isOnline;
				console.log("data:", data);
				console.log(req.body);
				
				if (!data) {
					res.status(400).send({
						message: `can not update user with id=${id}. maybe user was not found`
					});
				} else res.send({ message: "User updated sucessfully" });
			})
			.catch(err => {
				res.status(500).send({
					message: "Error updating user with id: " + id
				});
			});
		})
	}
