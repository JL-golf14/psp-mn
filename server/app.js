var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var portDecision = process.env.PORT || 3000;

//Serving favicon
var favicon = require('serve-favicon')

//Routes
var admin = require('./routes/admin');
var adminTopics = require('./routes/admin-topics');
var login = require('./routes/login');
var data = require('./routes/data');
// var list_data = require('./routes/list_data');
var public = require('./routes/public');
var admin = require('./routes/admin');

//Serve Static Files
app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/data', data);
app.use('/admin', admin);
app.use('/public', public);
app.use('/admin-topics', adminTopics);



app.use(favicon(path.join(__dirname, '../public/assets/favicon.ico')));

/* Whatever you do below this is protected by your authentication. */
app.use(decoder.token);
app.use('/login', login);


app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});
