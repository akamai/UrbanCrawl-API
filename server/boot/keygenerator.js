'use strict';

module.exports = function(app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */
	console.log("$$$ From keygenerator boot script");

	var env = process.env.NODE_ENV;

	console.log("$$$ Environment: ",env);

  var Keypairs = app.models.keypairs;

  var keypair = require('keypair');
  var pair = keypair();
  var cert = pair.private;

  Keypairs.count({}, function(err, count){
    if(!err){
      if(count == 0){
        saveKeys(pair);
      }
    }else{
      console.log("$$$ err", err);
    }
  });


  var saveKeys = function(pair){
    Keypairs.create({private_key: pair.private, public_key: pair.public},
          function(err, createResults){
            if(!err){
              console.log("$$$ keys created and saved", pair);
            }else{
              console.log("$$$ keys couldn't be saved", pair);
            }
          });
  };
  	process.nextTick(cb); // Remove if you pass `cb` to an async function yourself

};
