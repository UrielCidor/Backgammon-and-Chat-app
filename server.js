const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const {mongoose} = require('./src/database');

const app = express();

app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.use('/api', require('./routes/index'));

app.use('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend', 'public', 'index.html'))
);

const server = require('http').createServer(app);
const io = require('socket.io')(server);

// var username_soket_pair = {};
// var all_rooms = {};

// io.on('connection', function(soket){
//     socketHandler(soket, io, username_soket_pair, all_rooms);
// });

const dbConfig = require('./config/db.config');
const mongoUrl = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;

mongoose
	.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB successfully connected'))
	.catch((err) => console.log(err));

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server up and running on port: ${PORT}!`))