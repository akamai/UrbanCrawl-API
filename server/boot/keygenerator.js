'use strict';

module.exports = function(app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

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
      }else{
        deleteAndSaveNewKeys(pair);
        
      }
    }else{
      console.log("BOOTSCRIPT: count err", err);
    }
  });

  var deleteAndSaveNewKeys = function(pair){
    Keypairs.destroyAll(function(err, info){
      if(!err){
        console.log("BOOTSCRIPT: destroy old keys result", info);
        saveKeys(pair);
      }else{

      }
    });
  }

  var saveKeys = function(pair){
    Keypairs.create({private_key: pair.private, public_key: pair.public},
          function(err, createResults){
            if(!err){
              console.log("BOOTSCRIPT: keys created and saved");
            }else{
              console.log("BOOTSCRIPT: keys couldn't be saved");
            }
          });
  };
  	process.nextTick(cb); // Remove if you pass `cb` to an async function yourself

};
