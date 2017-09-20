'use strict';

module.exports = function(Place) {

Place.getAllPlacesOfCity = function(idToFind, cb) {

	if(idToFind === undefined){
  		var error = new Error("No id was supplied. You must supply a cidy id");
  		error.status = 404;
  		cb(error, null);
  	}else{
  		Place.find({where: {cityid: idToFind}, fields: {createdate: false, lastupdated: false, cityid: false} },
    	function(err, result){

    		if(!err){
				if(result.length > 0){
					cb(null, result);
				}else{
					var error = new Error("Didn't find anything with this id");
			  		error.status = 404;
			  		cb(error, null);
				}
			}else{
				var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
		  		error.status = 500;
		  		cb(error, null);
			}
    });
  	}
  };


  Place.remoteMethod(
    'getAllPlacesOfCity', {
      http: {
        path: '/getAllPlacesOfCity',
        verb: 'get'
      },
      accepts: {
      	arg: 'id', 
      	type: 'number', 
      	http: {
      		source: 'query'
      	}
      },
      returns: {
		arg: 'places',
		description: 'Returns a JSON array of all the available places, belonging to the city whose id is supplied',
		type: 'array'
      }
    }
  );

  Place.getPlaceDetails = function(idToFind, cb) {

  if(idToFind === undefined){
      var error = new Error("No id was supplied. You must supply a cidy id");
      error.status = 404;
      cb(error, null);
    }else{
      Place.find({where: {id: idToFind}, fields: {createdate: false, lastupdated: false, cityid: false} },
      function(err, result){

        if(!err){
        if(result.length > 0){
          cb(null, result[0]);
        }else{
          var error = new Error("Didn't find anything with this id");
            error.status = 404;
            cb(error, null);
        }
      }else{
        var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
          error.status = 500;
          cb(error, null);
      }
    });
    }
  };


  Place.remoteMethod(
    'getPlaceDetails', {
      http: {
        path: '/getPlaceDetails',
        verb: 'get'
      },
      accepts: {
        arg: 'id', 
        type: 'number', 
        http: {
          source: 'query'
        }
      },
      returns: {
    arg: 'placeDetails',
    description: 'Returns a JSON array of all the available places, belonging to the city whose id is supplied',
    type: 'Object'
      }
    }
  );

};
