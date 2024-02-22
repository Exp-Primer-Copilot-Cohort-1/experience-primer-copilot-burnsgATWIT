// Create web server
// Run: node comments.js
// Test: http://localhost:3000

var express = require('express');
var app = express();

// Set up the database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments');

// Set up the schema
var commentSchema = mongoose.Schema({
    name: String,
    comment: String
});

// Set up the model
var Comment = mongoose.model('Comment', commentSchema);

// Set up the body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the ejs view engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static('public'));

// Set up the routes
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/getComments', function(req, res) {
    Comment.find({}, function(err, comments) {
        if (err) throw err;
        res.send(comments);
    });
});

app.post('/addComment', function(req, res) {
    var newComment = new Comment(req.body);
    newComment.save(function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});

// Set up the server
app.listen(3000, function() {
    console.log('Server running on port 3000');
});