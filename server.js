//dependencies
var mongoose = require('mongoose');
var logger = require('morgan');

//initialize Express app
var express = require('express');
var app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//connecting to MongoDB

var databaseUri = 'mongodb://localhost/climbing_news';

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect(databaseUri);
}
// mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds121026.mlab.com:21026/heroku_k9kc44w1');



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongoose!')
});

var routes = require('./controller/controller.js');
app.use('/', routes);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on PORT ' + port);
});