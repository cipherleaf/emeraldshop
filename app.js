// Import modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

// Express
var app = express();

// Get the routes folder
const route = require('./routes/route');

// Connect to mongodb
mongoose.connect('mongodb://localhost:27017/emeraldshop');

// On connection
mongoose.connection.on('connected', ()=>{
	console.log('Connected successfully to the MongoDB database @ 27017'); 
});

mongoose.connection.on('error', ()=>{
	if (err){
		console.log('Error connecting to the database: ' + err);
	}
});

// Connect to port 3000;
const port = 3000;

app.use(cors());

// Body-parser
app.use(bodyparser.json())

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', route);

app.listen(port,()=>{
	console.log("Server s at port:"+port);
})