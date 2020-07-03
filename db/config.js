var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Varsha-26',
    database : 'urlshortener'
  });
  connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
  });

  module.exports = { connection }