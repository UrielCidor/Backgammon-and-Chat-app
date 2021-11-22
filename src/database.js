const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true
        },
        passwordHash: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
        averageWPM: {
			type: Number,
			default: 0,
		},
		gamesCompleted: {
			type: Number,
			default: 0,
		},
		gamesWon: {
			type: Number,
			default: 0,
		},
    },
    {
        timestamps: true,
    }
);

const ChatSchema = new Schema(
	{
		users: {
			type: Array,
			required: true,
		},
		chatStatus: {
			type: String,
			required: true,
		},
        messages: {
            type: Array,
            required: true,
            default: [],
        }
	},
	{
		timestamps: true,
	}
);

// const channelSchema = new Schema(
//     {

//     }
// )

const backgammonSchema = new Schema(
	{
		players: {
			type: Array,
			required: true,
		},
		gameStatus: {
			type: String,
			required: true,
		},
		winner: {
			type: String,
			required: false,
		},
		boardState: {
			type: Array,
			required: true,
		},
		leaderboard: {
			type: Array,
			required: true,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const tokenSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		// Token document will automatically delete itself after 12 hours
		expires: 43200,
	},
});

const User = mongoose.model('User', userSchema);
const Chat = mongoose.model('Chat', ChatSchema);
const Game = mongoose.model('Game', backgammonSchema);
const AccountToken = mongoose.model('AccountToken', tokenSchema);

module.exports = {
    mongoose,
    User,
    Chat,
    Game,
    AccountToken
}
