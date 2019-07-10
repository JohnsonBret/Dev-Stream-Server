var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/DevStream",
{useNewUrlParser: true, useFindAndModify: false});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to the Database");
});

module.exports = {
    mongoose: mongoose
}
