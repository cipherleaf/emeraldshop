// Import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Express
const app = express();

// Get the routes folder
const route = require('./routes/route');

// Connect to mongodb 
mongoose.connect('mongodb://localhost:27017/emeraldshop');

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected successfully to the MongoDB database @ 27017'); 
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to the database: ' + err);
});

// Connect to port 3000;
const port = 3000;

app.use(cors());

// Body-parser
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', route);

app.listen(port, () => {
    console.log("Server is at port: " + port);
});