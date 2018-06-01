'use strict';

module.exports = function(Media) {

//getAllMediaByPlaceId
Media.getAllMediaByPlaceId = function(cityId, idToFind, mediaType, cb) {

  if(cityId === undefined || idToFind === undefined){
      var error = new Error("Insufficient paramters supplied. You must supply a city id and a place id");
      error.status = 404;
      cb(error, null);
    }else{
    	var whereCondition;
    	if(mediaType === undefined){
    		whereCondition = {cityid: cityId, placeid: idToFind};	
    	}else{
    		whereCondition = {cityid: cityId, placeid: idToFind, type: mediaType};
    	}
      Media.find({where: whereCondition, fields: {createdate: false, lastupdated: false} },
      function(err, result){

      if(!err){
        if(result.length > 0){
          cb(null, result);
        }else{
          var error = new Error("Didn't find anything with the given criterion");
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


  Media.remoteMethod(
    'getAllMediaByPlaceId', {
      http: {
        path: '/:placeId',
        verb: 'get'
      },
      accepts: [
	      {
	        arg: 'placeid', 
	        type: 'number',
	        description: 'The placeid with which you want to search',
	        required: true
	      },
	      {
	    	arg: 'type', 
	    	type: 'string', 
	    	description: 'you can provide \'image\', \'video\' to get images or videos respectively. Leave this empty to get videos and images both',
	    	http: {
	      		source: 'query'
	    	}
	      }
      ],
      returns: {
    arg: 'media',
    description: 'Returns a JSON array of all the available media, belonging to the place whose id is supplied',
    type: 'array'
      }
    }
  );

// getAllMediaByCityId
  Media.getAllMediaByCityId = function(idToFind, mediaType, cb) {

  if(idToFind === undefined){
      var error = new Error("No id was supplied. You must supply a place id");
      error.status = 404;
      cb(error, null);
    }else{
    	var whereCondition;
    	if(mediaType === undefined){
    		whereCondition = {cityid: idToFind};	
    	}else{
    		whereCondition = {cityid: idToFind, type: mediaType};
    	}
      Media.find({where: whereCondition, fields: {createdate: false, lastupdated: false} },
      function(err, result){

        if(!err){
        if(result.length > 0){
          cb(null, result);
        }else{
          var error = new Error("Didn't find anything with the given criterion");
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


  Media.remoteMethod(
    'getAllMediaByCityId', {
      http: {
        path: '/getAllMediaByCityId',
        verb: 'get'
      },
      accepts: [
	      {
	    	arg: 'cityid', 
	    	type: 'number', 
	    	description: 'The cityid with which you want to search',
	    	http: {
	      		source: 'query'
	    	}
	      },
	      {
	    	arg: 'type', 
	    	type: 'string', 
	    	description: 'you can provide \'image\', \'video\' to get images or videos respectively. Leave this empty to get videos and images both',
	    	http: {
	      		source: 'query'
	    	}
	      }
      ],
      returns: {
    arg: 'media',
    description: 'Returns a JSON array of all the available media, belonging to the city whose id is supplied',
    type: 'array'
      }
    }
  );

};
