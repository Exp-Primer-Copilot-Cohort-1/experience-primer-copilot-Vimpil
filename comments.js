// Create web server and listen on port 3000
// Import express module
var express = require('express');
var app = express();
// Import body-parser module
var bodyParser = require('body-parser');
// Import mongoose module
var mongoose = require('mongoose');
// Connect to the database
mongoose.connect('mongodb://localhost/comment');
// Import Comment model
var Comment = require('./models/comment');
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Use body-parser module
app.use(bodyParser.urlencoded({extended: true}));
// Create a new comment
app.post('/comments', function (req, res) {
  var newComment = new Comment(req.body);
  newComment.save(function (err) {
    if (err) throw err;
    res.redirect('/comments');
  });
});
// Get all comments
app.get('/comments', function (req, res) {
  Comment.find({}, function (err, comments) {
    if (err) throw err;
    res.render('comments', {comments: comments});
  });
});
// Listen on port 3000
app.listen(3000, function () {
  console.log('Listening on port 3000');
});