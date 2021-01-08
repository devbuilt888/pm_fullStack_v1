var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var fileUpload = require('express-fileupload';
var cors = require('cors');
var router = require('./router');

const DB_URL = "mongodb+srv://dataAdmin:VXjgm4LxlIIqnW38@cluster0.l5884.mongodb.net/PM-LATAM-V1?retryWrites=true&w=majority";
const port = process.env.PORT || 5000;
const app = express();

// HEROKU CHANGE

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

// HEROKU CHANGE


// Parse incoming requests data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(fileUpload());
// app.use('/public', express.static(__dirname + '/public'));

// Connect to database
mongoose.connect(DB_URL);

// Set access control response header
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
  next();
});


// Add api route
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

