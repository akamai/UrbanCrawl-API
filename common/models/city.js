'use strict';

module.exports = function(City) {

City.getAllCities = function(cb) {

    City.find({fields: {id:true, name: true, countryname: true, lat: true, lng: true, thumburl: true, description: true} },
    	function(err, result){
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

    	City.find({
    		where: {id: idToFind}, 
    		fields: {createdate: false, lastupdated: false}, 
    		include: {relation: 'places', scope: {fields: ["id", "name", "heroimage", "herovideo", "description", "numimages", "timings"]}}
    	},
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
