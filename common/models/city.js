'use strict';

var app = require('../../server/server');

module.exports = function(City) {

City.getAllCities = function(cb) {

    City.find({fields: {id:true, name: true, countryname: true, lat: true, lng: true, thumburl: true, description: true} },
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
		description: 'Returns a JSON array of all the available cities, mainly to use in City List screen',
		type: 'array'
      }
    }
  );


  City.getCityDetails = function(idToFind, next) {

  	var placesOfCity;

  	if(idToFind === undefined){
  		// console.log("undefined "+idToFind);
  	}else{
  		// console.log("defined "+idToFind);
  	}

  	City.app.models.Place.find({where: {cityid: idToFind}, fields: {createdate: false, lastupdated: false, cityId: false} },
  		function(err, result){
  		placesOfCity = result;
  	});

    City.find({where: {id: idToFind}, fields: {createdate: false, lastupdated: false}, include: 'Place' },
    	function(err, result){
    		result[0].places = placesOfCity;

    		//TODO : Handle errors
    		next(null, result[0]);	
    });

  };

  City.remoteMethod(
    'getCityDetails', {
      http: {
        path: '/getCityDetails',
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
		arg: 'cityDetails',
		description: 'Returns a JSON object containing details and places of a city whose ID is supplied',
		type: 'Object'
      }
    }
  );

};
