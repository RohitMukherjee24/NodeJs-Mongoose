var mongoose = require('mongoose'),
    assert = require('assert');

var Leaders = require('./models/leaders');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  // Connection established
  console.log('Connected correctly to server');

  // Create a new promotion
  Leaders.create({
      "name": "Peter Pan",
      "image": "images/alberto.png",
      "designation": "Chief Epicurious Officer",
      "abbr": "CEO",
      "description": "Our CEO, Peter, . . ."
    }, function(err, leader) {
      if (err) throw err;
      console.log('leaders created!');
      console.log(leader);

      var id = leader._id;
      // get all the promotiones
      setTimeout(function() {
        Leaders.findByIdAndUpdate(id, {
          $set: {
            description: 'Updated Test'
          }
        }, {
          new: true
        })
        .exec(function(err, leader) {
          if (err) throw err;
          console.log('Updated leaders!');
          console.log(leader);

          leader.save(function(err, leader) {
            console.log('Updated leaders');
            console.log(leader);

            db.collection('leaders').drop(function() {
              db.close();
            });
          });
        });
      }, 3000);
    });
});