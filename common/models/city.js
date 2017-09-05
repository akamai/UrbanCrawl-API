'use strict';

var app = require('../../server/server');

module.exports = function(City) {

City.getAllCities = function(cb) {

    City.find({fields: {id:true, name: true, countryname: true, lat: true, lng: true, thumburl: true, description: true} },
    	function(err, result){
    		console.log("Error: "+err);
    		if(!err){
    			cb(null, result);	
    		}else{
				var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
		  		error.status = 500;
		  		cb(error, null);
    		}
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


  City.getCityDetails = function(idToFind, cb) {

  	var placesOfCity;

  	if(idToFind === undefined){
  		var error = new Error("No id was supplied. You must supply a cidy id");
  		error.status = 404;
  		cb(error, null);
  	}else{

  		City.app.models.Place.find({where: {cityid: idToFind}, fields: {createdate: false, lastupdated: false, cityId: false} },
  		function(err, result){
  			//TODO : ID is sent, but nothing found from that ID in place db
  			placesOfCity = result;
  		});

    	City.find({where: {id: idToFind}, fields: {createdate: false, lastupdated: false}, include: 'Place' },
    	function(err, result){

    		//TODO : ID is sent, but no city found from this id

    		console.log("Error: "+err);

    		result[0].places = placesOfCity;

    		//TODO : Handle errors
    		cb(null, result[0]);	
    });
  	}

  	

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
