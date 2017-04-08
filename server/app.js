var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var login = require('./routes/login');
var data = require('./routes/data');
var admin = require('./routes/admin');
var list_data = require('./routes/list_data');
var portDecision = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json());



app.use('/admin', admin);

/* Whatever you do below this is protected by your authentication. */
app.use(decoder.token);


app.use('/login', login);
app.use('/data', data);

app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});
