'use strict';

// var app = require('../../node_modules/loopback/common/models/accesstoken');
var EdgeGrid = require('edgegrid');

module.exports = function(Customer) {

// {"email":"foo@bar.com",
// "password" : "foobar",
// "name" : "John Doe"}

	Customer.register = function(body, cb){

		if(body === undefined || 
			body.email === undefined ||
			body.password === undefined ||
			body.name === undefined){
				var env = process.env.NODE_ENV;
				var error = new Error("Insufficient parameters supplied. env: "+env);
				error.status = 400;
				cb(error, null);
				return;
		}

		var bcrypt = require('bcrypt');
		var moment = require("moment");
		var jwt = require('jsonwebtoken');

		const saltRounds = 10;

		//trying to find existing keys to use
		var app = require('../../server/server');
		var Keypairs = app.models.keypairs;

		Keypairs.find(function(err, keys){
			if(!err){
				registerWithKey(keys);
			}else{
				var error = new Error("Couldn't register. Reason : unavailable encryption resources. Please contact us");
				error.status = 500;
				cb(error, null);
				return;
			}
		});


		var registerWithKey = function(pair){
				Customer.count({email: body.email},function(err, count){
				if(!err){
					if(count == 0){

						var plainPassword = body.password;

						bcrypt.hash(plainPassword, saltRounds, function(err, hash){
							if(!err){
								const uuidv1 = require('uuid/v1');
								
								var userId = uuidv1();
								var dateNow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
								Customer.create(
									{userid: userId, email: body.email, password: hash, full_name: body.name, createdate: dateNow},
									function(err, createResult){
										if(!err){

											var crypto = require("crypto");
											var sha256 = crypto.createHash("sha256");
											sha256.update(userId);
											var sha256Token = sha256.digest("base64");
											cb(null, {status: "ok", token: sha256Token});

											sendTokenToGateway(sha256Token);

										}else{
											cb(err, null);
										}
								});
							}else{
								cb(err, null);
							}
						});
					}else{
						cb(null, {status: "error", message: "Email already exists"});
					}
					return;
				}else{
					cb(err, null);
				}
			});
		}
	}

	Customer.login = function(body, cb){

		if(body === undefined || 
			body.email === undefined ||
			body.password === undefined){
				var error = new Error("Insufficient parameters supplied.");
				error.status = 400;
				cb(error, null);
				return;
		}

		//trying to find existing keys to use
		var app = require('../../server/server');
		var Keypairs = app.models.keypairs;

		Keypairs.find(function(err, keys){
			if(!err){
				loginWithKey(keys);
			}else{
				var error = new Error("Couldn't login. Reason : unavailable encryption resources. Please contact us");
				error.status = 500;
				cb(error, null);
				return;
			}
		});

		var loginWithKey = function(pair){
		Customer.find({where: {email: body.email}},
			function(err, findResults){
				if(!err){
					if(findResults.length > 0){

						var bcrypt = require('bcrypt');

						bcrypt.compare(body.password, findResults[0].password, function(err, valid) {
							if(!err){
							    if (valid == true) {
							  		// JWT TOKEN
							  		// var jwt = require('jsonwebtoken');
									// var keypair = require('keypair');
									
									// var pair = keypair();
									// var cert = pair[0].private_key;
									// jwt.sign({ userid: findResults[0].userid }, cert, { algorithm: 'RS256' }, function(err, token) {
									//   cb(null, {status: "ok", token: token});
									// });

										var crypto = require("crypto");
										var sha256 = crypto.createHash("sha256");
										sha256.update(findResults[0].userid);
										var sha256Token = sha256.digest("base64");
										
										cb(null, {status: "ok", token: sha256Token});

										sendTokenToGateway(sha256Token);
										// var AcccessToken = app.models.AccessToken;

										// AccessToken.find(function(err, result){
										// 	if(!err){
										// 		console.log("AccessToken result ",result);
										// 	}else{
										// 		console.log("AccessToken err ",err);
										// 	}
										// });

							    } else if (valid == false) {
							        cb(null, {status: "error", message: "Incorrect Password"});
							    }
							}else{
								cb(err, null);
							}
						});
					}else{
						cb(null, {status: "error", message: "email not found"});
					}
				}else{
					cb(err, null);
				}
			});
		}
	}

	var sendTokenToGateway = function(sha256Token){
      	var eg = new EdgeGrid(process.env.AKAMAI_CLIENT_TOKEN, 
      		process.env.AKAMAI_CLIENT_SECRET, 
      		process.env.AKAMAI_ACCESS_TOKEN, 
      		process.env.AKAMAI_HOST);

      	eg.auth({
		    path: '/apikey-manager-api/v1/collections',
		    method: 'GET',
		    headers: {},
		    body: {}
		});

		eg.send(function(data, response) {
		    console.log("sendTokenToGateway: Listing all collections...");

		    data = JSON.parse(response.body);
		    console.log("sendTokenToGateway: Status: ",response.statusCode);
		    console.log("sendTokenToGateway: Data: ",data);
		    if(response.statusCode == 200 || response.statusMessage == "ok"){
			    if(data.length > 0){
			    	console.log("sendTokenToGateway: Collection present, going to send token: ",data);
			    	sendToken(data[0].id, sha256Token);
			    }else{
			    	console.log("sendTokenToGateway: Collection not present, going to create: ",data);
			    	createNewCollectionAndSendToken(sha256Token);
			    }
			}
		});
	}

	var createNewCollectionAndSendToken = function(sha256Token){
		var EdgeGrid = require('edgegrid');
      	var eg = new EdgeGrid(process.env.AKAMAI_CLIENT_TOKEN, 
      		process.env.AKAMAI_CLIENT_SECRET, 
      		process.env.AKAMAI_ACCESS_TOKEN, 
      		process.env.AKAMAI_HOST);

      	eg.auth({
		    path: '/apikey-manager-api/v1/collections',
		    method: 'POST',
		    headers: {
		    	"Content-Type": "application/json"
		    },
		    body: {
		    	"name": "UrbanCrawlCustomersCollection",
			    "contractId": "C-1FRYVV3",
			    "groupId": 68817,
			    "description": "Collection for Urban Crawl Customers"
		    }
		});

		eg.send(function(data, response) {
		    console.log("createNewCollectionAndSendToken: Listing all collections...");
		    data = JSON.parse(response.body);
		    console.log("createNewCollectionAndSendToken: Data ",data);
		    console.log("createNewCollectionAndSendToken: Response status: ",response.statusCode);
		    if(response.statusCode == 200 || response.statusMessage == "ok"){
		    	sendToken(data[0].id, sha256Token);
			}
		});
	}

	var sendToken = function(collectionId, sha256Token){
		var EdgeGrid = require('edgegrid');
      	var eg = new EdgeGrid(process.env.AKAMAI_CLIENT_TOKEN, 
      		process.env.AKAMAI_CLIENT_SECRET, 
      		process.env.AKAMAI_ACCESS_TOKEN, 
      		process.env.AKAMAI_HOST);

      	eg.auth({
		    path: '/apikey-manager-api/v1/keys',
		    method: 'POST',
		    headers: {
		    	"Content-Type": "application/json"
		    },
		    body: {
		    	"collectionId": collectionId,
			    "mode": "CREATE_ONE",
			    "tags": [
			        "single",
			        "new"
			    ],
			    "value": sha256Token,
			    "label": "Access Token",
			    "description": "Access Token for Urban Crawl Customer"
		    }
		});

		eg.send(function(data, response) {
		    data = JSON.parse(response.body);
		    console.log("sendToken: Data ",data);
		    console.log("sendToken Status: ",response.statusCode);
		});
	}

	Customer.remoteMethod(
    'register', {
      http: {
        path: '/register',
        verb: 'post'
      },
      accepts: {
	      	arg: 'items', 
	      	type: 'object', 
	      	http: {
	      		source: 'body'
	      	}
	    },
      returns: {
	    arg: 'result',
	    description: 'Returns a JWT key when successful',
	    type: 'string'
      }
    }
  );

	Customer.remoteMethod(
    'login', {
      http: {
        path: '/login',
        verb: 'post'
      },
      accepts: {
	      	arg: 'items', 
	      	type: 'object', 
	      	http: {
	      		source: 'body'
	      	}
	    },
      returns: {
	    arg: 'result',
	    description: 'Returns a JWT key when successful',
	    type: 'string'
      }
    }
  );
};
