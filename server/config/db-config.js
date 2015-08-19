// db-config.js -- set up database connection and schema
// ----------------------------------------------
var BluebirdPromise = require('bluebird');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost:27017/beer-tab-db');

// Define user schema
var schema = mongoose.Schema ({
  username: { type: String, index: { unique: true } },
  password: String,
  network: { type: mongoose.Schema.Types.Mixed , default: {} }
});

// Hash pashword before saving to database
schema.pre('save', function(next){
  var cipher = BluebirdPromise.promisify(bcrypt.hash);

  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();  
    });
});

var User = mongoose.model('User', schema);

User.prototype.comparePassword = function(attemptedPassword, savedPassword, callback) {
  bcrypt.compare(attemptedPassword, savedPassword, function(err, isMatch) {
    if (err){
      callback(err);
    } else {
      callback(null, isMatch);
    }
  });
};

module.exports = User;

var user1 = new User({
  username: 'kyle',
  password: 'argleBargle1',
  network: {'stvnwu': -1, 'Vandres': 2, 'mKurrel': 0, 'dRosson': 3}
});

var user2 = new User({
  username: 'trevor',
  password: 'argleBargle2',
  network: {'iemanatemire': 1, 'Vandres': 0, 'mKurrel': 2, 'dRosson': -3}
});

var user3 = new User({
  username: 'mack',
  password: 'argleBargle3',
  network: {'stvnwu': 0, 'iemanatemire': -2, 'mKurrel': 1, 'dRosson': 0}
});

var user4 = new User({
  username: 'jimmy',
  password: 'argleBargle4',
  network: {'stvnwu': -2, 'Vandres': -1, 'iemanatemire': 0, 'dRosson': 3}
});

user1.save( function(err, newUser) { 
  if (err) {console.log('user already in DB');} 
  else {console.log('successfully added');}
});
user2.save( function(err, newUser) { 
  if (err) {console.log('user already in DB');} 
  else {console.log('successfully added');}
});
user3.save( function(err, newUser) { 
  if (err) {console.log('user already in DB');} 
  else {console.log('successfully added');}
});
user4.save( function(err, newUser) { 
  if (err) {console.log('user already in DB');} 
  else {console.log('successfully added');}
});
