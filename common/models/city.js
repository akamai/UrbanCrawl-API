'use strict';

module.exports = function(City) {

/**
disableRemoteMethod gives a deprecation warning as of now, but it's
suggested alternative, disableRemoteMethodByName doesn't seem to work.
So sticking with disableRemoteMethod as of now
**/
  
City.disableRemoteMethod('__count__places', false );
City.disableRemoteMethod('__create__places', false );
City.disableRemoteMethod('__delete__places', false );
City.disableRemoteMethod('__destroyById__places', false );
City.disableRemoteMethod('__updateById__places', false );
City.disableRemoteMethod('__findById__places', false );
City.disableRemoteMethod('__get__places', false );

var app = require('../../server/server');


//--------- Get All Cities ------------
City.getAllCities = function(version, cb) {
    switch(version.apiVersion){
      case 'v2':
        City.find({fields: {id:true, name: true, countryname: true, lat: true, lng: true, thumburl: true, description: true, tour_price: true} },
        function(err, result){
          if(!err){
            cb(null, result); 
          }else{
              var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
              error.status = 500;
              cb(error, null);
          }
        });
      break;
      default:
        var error = new Error("You must supply a valid api version");
        error.status = 404;
        cb(error, null);

    }

 	};

	City.remoteMethod(
	    'getAllCities', {
	    	http: {
		        path: '/',
		        verb: 'get'
	    	},
        accepts: [
          {
             arg: 'version', 
             type: 'object', 
             description: 'API version eg. v1, v2, etc.',
             http: function (context) {
                 return {apiVersion: context.req.apiVersion};
             }
          }
        ],
	    	returns: {
  				arg: 'cities',
  				description: 'Returns a JSON array of all the available cities, mainly to use in City List screen',
  				type: 'array'
	    	}
		}
	);


//---------- Get City Details ------------------
City.getCityDetails = function(version, idToFind, cb) {

  switch(version.apiVersion){
    case 'v2':
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
          }, function(err, result){

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
    break;
    default:
      var error = new Error("You must supply a valid api version");
      error.status = 404;
      cb(error, null);

  }

    
};

  City.remoteMethod(
    'getCityDetails', {
      http: {
        path: '/:cityId',
        verb: 'get'
      },
      accepts: [
        {
           arg: 'version', 
           type: 'object', 
           description: 'API version eg. v1, v2, etc.',
           http: function (context) {
               return {apiVersion: context.req.apiVersion};
           }
        },
        {
        	arg: 'cityId', 
        	type: 'number',
          required: true
        }
      ],
      returns: {
    		arg: 'cityDetails',
    		description: 'Returns a JSON object containing details and places of a city whose ID is supplied',
    		type: 'Object'
      }
    }
  );


//------------- Get Places of a city -------------

City.getPlacesOfCity = function(version, cityId, cb) {

  switch(version.apiVersion){
    case 'v2':
      var Place = app.models.Place;
      Place.getAllPlacesOfCity(cityId, cb);
    break;
    default:
      var error = new Error("You must supply a valid api version");
      error.status = 404;
      cb(error, null);

  }
};

City.remoteMethod(
  'getPlacesOfCity', {
    http: {
      path: '/:cityId/places',
      verb: 'get'
    },
    accepts: [
      {
         arg: 'version', 
         type: 'object', 
         description: 'API version eg. v1, v2, etc.',
         http: function (context) {
             return {apiVersion: context.req.apiVersion};
         }
      },
      {
        arg: 'cityId', 
        type: 'number',
        required: true
      }
    ],
    returns: {
      arg: 'places',
      description: 'Returns a JSON object containing details and places of a city whose ID is supplied',
      type: 'array'
    }
  }
);


//------------- Search Cities -------------

City.search = function(version, keyword, cb) {

    switch(version.apiVersion){
      case 'v2':
        var placesOfCity;

        if(keyword === undefined){
          var error = new Error("No keyword was supplied. You must supply a search keyword");
          error.status = 404;
          cb(error, null);
        }else{

          City.find({
            where: {name: {like: "%"+keyword+"%"}}, 
            fields: {id:true, name: true, countryname: true, lat: true, lng: true, thumburl: true, description: true, tour_price: true}
          },
          function(err, result){

          if(!err){
            if(result.length > 0){
              cb(null, result);
            }else{
              var error = new Error("Didn't find anything with this keyword");
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
      break;
      default:
        var error = new Error("You must supply a valid api version");
        error.status = 404;
        cb(error, null);

    }
  };

  City.remoteMethod(
    'search', {
      http: {
        path: '/search/:q',
        verb: 'get'
      },
      accepts: [
        {
           arg: 'version', 
           type: 'object', 
           description: 'API version eg. v1, v2, etc.',
           http: function (context) {
               return {apiVersion: context.req.apiVersion};
           }
        },
        {
        	arg: 'q', 
        	type: 'string',
          required: true
        }
      ],
      returns: {
    		arg: 'cities',
    		description: 'Returns a JSON array of all the available cities that match the supplied keyword, mainly to use in City List screen',
    		type: 'array'
      }
    }
  );


//------------- Get Place Details -------------

City.getPlaceDetails = function(version, cityId, placeId, cb) {

  switch(version.apiVersion){
    case 'v2':
      var Place = app.models.Place;
      Place.getPlaceDetails(cityId, placeId, cb);
    break;
    default:
      var error = new Error("You must supply a valid api version");
      error.status = 404;
      cb(error, null);

  }
};

City.remoteMethod(
  'getPlaceDetails', {
    http: {
      path: '/:cityId/places/:placeId',
      verb: 'get'
    },
    accepts: [
      {
         arg: 'version', 
         type: 'object', 
         description: 'API version eg. v1, v2, etc.',
         http: function (context) {
             return {apiVersion: context.req.apiVersion};
         }
      },
      {
        arg: 'cityId', 
        type: 'number',
        required: true
      },
      {
        arg: 'placeId', 
        type: 'number',
        required: true
      }
    ],
    returns: {
      arg: 'placeDetails',
      description: 'Returns a JSON array of all the available places, belonging to the city whose id is supplied',
      type: 'Object'
    }
  }
);


//------------- Get All Media of Place according to type supplied -------------

City.getMediaOfPlace = function(version, cityId, placeId, type, cb) {

    switch(version.apiVersion){
      case 'v2':
        var Media = app.models.Media;
        Media.getAllMediaByPlaceId(cityId, placeId, type, cb);
      break;
      default:
        var error = new Error("You must supply a valid api version");
        error.status = 404;
        cb(error, null);

    }
  };

  City.remoteMethod(
    'getMediaOfPlace', {
      http: {
        path: '/:cityId/places/:placeId/media/:type',
        verb: 'get'
      },
      accepts: [
        {
           arg: 'version', 
           type: 'object', 
           description: 'API version eg. v1, v2, etc.',
           http: function (context) {
               return {apiVersion: context.req.apiVersion};
           }
        },
        {
          arg: 'cityId', 
          type: 'number',
          required: true
        },
        {
          arg: 'placeId', 
          type: 'number',
          required: true
        },
        {
          arg: 'type', 
          type: 'string',
          required: true
        }
      ],
      returns: {
        arg: 'media',
        description: 'Returns a JSON array of all the available places, belonging to the city whose id is supplied',
        type: 'array'
      }
    }
  );


//------------- Get All Media of a City according to type supplied -------------

City.getMediaOfCity = function(version, cityId, type, cb) {

    switch(version.apiVersion){
      case 'v2':
        var Media = app.models.Media;
        Media.getAllMediaByCityId(cityId, type, cb);
      break;
      default:
        var error = new Error("You must supply a valid api version");
        error.status = 404;
        cb(error, null);
    }
  };

  City.remoteMethod(
    'getMediaOfCity', {
      http: {
        path: '/:cityId/media/:type',
        verb: 'get'
      },
      accepts: [
        {
           arg: 'version', 
           type: 'object', 
           description: 'API version eg. v1, v2, etc.',
           http: function (context) {
               return {apiVersion: context.req.apiVersion};
           }
        },
        {
          arg: 'cityId', 
          type: 'number',
          required: true
        },
        {
          arg: 'type', 
          type: 'string',
          required: true
        }
      ],
      returns: {
        arg: 'media',
        description: 'Returns a JSON array of all the available places, belonging to the city whose id is supplied',
        type: 'array'
      }
    }
  );

};
