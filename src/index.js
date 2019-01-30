const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const mongoose = require('mongoose');

//DB connection
mongoose.connect('mongodb://<Agustin>:<elcapomascapo12,>@ds011785.mlab.com:11785/chat-database-nodejs')
		.then(db => console.log('DB is connected'))
		.catch(err => console.error(err));


const app = express();
const server = http.createServer(app);

// SosketIO
const io = socketio.listen(server);
require('./sockets')(io);

//Settings
app.set('port',process.env.PORT || 3000);

//Middlewares

//Routes

//Static Files
app.use(express.static(path.join(__dirname,'public')));

//Starting the server
server.listen(app.get('port'),()=>
{
	console.log("Server on port", app.get('port'));
})