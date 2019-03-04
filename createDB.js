//Requiring the package
var PouchDB = require('PouchDB');

//Creating the database object
var localdb = new PouchDB('my_database');
var remoteDB = new PouchDB('http://localhost:3333/my_database')

//Creating doc for testing
doc = {
   _id : '007',
   username: 'james',
   password: 'bond'
   }

doc2 = {
   _id : '046',
   username: 'redo',
   password: 'ganteng'
   }
//Inserting Document
localdb.put(doc, function(err, response) {
   if (err) {
      return console.log(err);
   } else {
      console.log("Document created Successfully");
   }
});

localdb.put(doc2, function(err, response) {
   if (err) {
      return console.log(err);
   } else {
      console.log("Document 2 created Successfully");
   }
});