var PouchDB = require('PouchDB');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
//var popup = require ('popups');
PouchDB.plugin(require('pouchdb-find'));

var localdb = new PouchDB('my_database');
var remoteDB = new PouchDB('http://localhost:3333/my_datadase');

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

try {
	localdb.sync(remoteDB, {
		live: true,
		retry: true
	  }).on('change', function (change) {
		console.log('synchronization success');
	  }).on('paused', function (info) {
		console.log('synced paused, connection is lost. Either you are offline / the DB is could not be reached'); // replication was paused, usually because of a lost connection
	  	alert ('you reoffline, sync paused')
	  }).on('active', function (info) {
		console.log('synchronization resumed, DB will be synced now');// replication was resumed
	  }).on('error', function (err) {
		console.log('synchronization failed.');// totally unhandled error (shouldn't happen)
	  });

}
catch(error) {
	console.error(error)
}



app.get('/getlocaldb', function(request, response) {
	localdb.getIndexes().then(function (result) {
  	// yo, a result
	}).catch(function (err) {
	  // ouch, an error
	});
});

app.get('/getremotedb', function(request, response) {
	remoteDB.getIndexes().then(function (result) {
  // yo, a result
	}).catch(function (err) {
	  // ouch, an error
	});
});

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/daftar', function(request, response) {
	//id = leftPad(randomIntInc(1, 100), 3)
	id = Math.floor(Math.random()*(999-100+1)+100);
	id.toString();
	var getUsername = request.body.username;
	var getPassword = request.body.password;
	//console.log(getPassword + getUsername)
	id += 1;
	if (getUsername && getPassword) {
		//inputUsername = 
		doc = {
		   _id : id.toString(),
		   username: getUsername.toString(),
		   password: getPassword.toString()
		   }
		//Inserting Document
		localdb.put(doc, function(err, response) {
		   if (err) {
		      	return console.log(err);
		   } else {
		    	console.log("User " + getUsername + " created Successfully");
		    	// popup.alert({
		    	// 	content: "test user : " + getUsername

		    	// });

		   }
		});


		
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/masuk', function(request, response) {
	
	var getUsername = request.body.username;
	var getPassword = request.body.password;
	//console.log(getPassword + getUsername)
	if (getUsername && getPassword) {
		var getAccount = localdb.find({ 
			selector: {username : getUsername,password : getPassword}})
			.then(function (result) {
			// list of people shown here
			if(result.docs.length>0)
				response.sendFile(path.join(__dirname + '/profile.html'));
			else
				response.send("User tidak ditemukan!");
		  });
		
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);
app.use('/static', express.static('static'))
