'use strict';

module.exports = function(City) {

City.getAllCities = function(cb) {

    City.find({fields: {name: true, countryname: true, lat: true, lng: true, thumburl: true, description: true} },
    	function(err, result){

    		//TODO : Handle errors
    	cb(null, result);	
    });

  };


  City.remoteMethod(
    'getAllCities', {
      http: {
        path: '/getAllCities',
        verb: 'get'
      },
      returns: {
		arg: 'cities',
		type: 'array'
      }
    }
  );

};
