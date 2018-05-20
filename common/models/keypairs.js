'use strict';

module.exports = function(Keypairs) {
	var env = process.env.NODE_ENV;

	Keypairs.getPublicKey = function(body, cb){

		if(env === 'demo'){
			Keypairs.find(function(err, keysResult){
				if(!err){
					var response = {
						status: "ok",
						public_key: keysResult[0].public_key
					};
					cb(null, response);
				}else{
					cb(err, null);
				}
			});
		}else{
			var result = {
				status: "error",
				message: "Environment not set to demo"
			}
			cb(null, result);
		}
	}


	Keypairs.regenerateKeys = function(body, cb){

		if(env === 'demo'){
			deleteAndSaveNewKeys(cb);
		}else{
			var result = {
				status: "error",
				message: "Environment not set to demo"
			}
			cb(null, result);
		}
	}

	var deleteAndSaveNewKeys = function(cb){
		var keypair = require('keypair');
  		var pair = keypair();
	    Keypairs.destroyAll(function(err, info){
	      if(!err){
	        console.log("KEYPAIRS: destroy old keys result", info);
	        saveKeys(pair, cb);
	      }else{

	      }
	    });
  	}

  	var saveKeys = function(pair, cb){
    	Keypairs.create({private_key: pair.private, public_key: pair.public},
          function(err, createResults){
            if(!err){
				console.log("KEYPAIRS: keys created and saved");
				var response = {
					status: "ok",
					public_key: pair.public
				};
				cb(null, response);
            }else{
				console.log("KEYPAIRS: keys couldn't be saved");
				cb(err, null);
            }
          });
  	};

	Keypairs.remoteMethod(
	    'getPublicKey', {
	      http: {
	        path: '/getPublicKey',
	        verb: 'get'
	      },
	      accepts: {
		      	arg: 'items', 
		      	type: 'string'	    	},
	      returns: {
		    arg: 'result',
		    description: 'Returns public key when environment is set to demo',
		    type: 'object'
	      }
	    }
  	);

  	Keypairs.remoteMethod(
	    'regenerateKeys', {
	      http: {
	        path: '/regenerateKeys',
	        verb: 'get'
	      },
	      accepts: {
		      	arg: 'items', 
		      	type: 'string'	    	},
	      returns: {
		    arg: 'result',
		    description: 'Returns public key when environment is set to demo',
		    type: 'object'
	      }
	    }
  	);
};
