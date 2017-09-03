'use strict';

module.exports = function(Place) {

Place.getAllPlacesOfCity = function(idToFind, next) {

    Place.find({where: {cityid: idToFind}, fields: {createdate: false, lastupdated: false, cityid: false} },
    	function(err, result){

    		//TODO : Handle errors
    		next(null, result);	
    });

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

};
