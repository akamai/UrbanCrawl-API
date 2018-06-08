/*
 * Copyright 2018. Akamai Technologies, Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

module.exports = function(City) {

City.disableRemoteMethodByName('__count__places');
City.disableRemoteMethodByName('__create__places');
City.disableRemoteMethodByName('__delete__places');
City.disableRemoteMethodByName('__destroyById__places');
City.disableRemoteMethodByName('__updateById__places');
City.disableRemoteMethodByName('__findById__places');
City.disableRemoteMethodByName('__get__places');

var server = require('../../server/server');

//--------- Get All Cities ------------
City.getAllCities = function(cb) {
  City.find(
    {fields: {id:true, name: true, countryname: true, lat: true, lng: true, thumburl: true, description: true, tour_price: true} },
    function(err, result){
      if(!err){
        cb(null, result);
      }else{
        var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
        error.status = 500;
        cb(error, null);
      }
    }
  );
};

City.remoteMethod(
    'getAllCities', {
      http: {
          path: '/',
          verb: 'get'
      },
      returns: {
        arg: 'cities',
        description: 'Returns a JSON array of all the available cities, mainly to use in City List screen',
        type: [City],
        root: true
      }
  }
);


//---------- Get City Details ------------------
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
};

  City.remoteMethod(
    'getCityDetails', {
      http: {
        path: '/:cityId',
        verb: 'get'
      },
      accepts: [
        {
        	arg: 'cityId',
        	type: 'number',
          required: true
        }
      ],
      returns: {
        arg: 'city',
        description: 'Returns a JSON object containing details and places of a city whose ID is supplied',
        type: City,
        root: true
      }
    }
  );


//------------- Get Places of a city -------------

City.getPlacesOfCity = function(cityId, cb) {

      var Place = app.models.Place;
      Place.getAllPlacesOfCity(cityId, cb);
};

City.remoteMethod(
  'getPlacesOfCity', {
    http: {
      path: '/:cityId/places',
      verb: 'get'
    },
    accepts: [
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
  };

  City.remoteMethod(
    'search', {
      http: {
        path: '/search/:q',
        verb: 'get'
      },
      accepts: [
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

City.getPlaceDetails = function(cityId, placeId, cb) {
      var Place = app.models.Place;
      Place.getPlaceDetails(cityId, placeId, cb);
};

City.remoteMethod(
  'getPlaceDetails', {
    http: {
      path: '/:cityId/places/:placeId',
      verb: 'get'
    },
    accepts: [
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

City.getMediaOfPlace = function(cityId, placeId, type, cb) {

        var Media = app.models.Media;
        Media.getAllMediaByPlaceId(cityId, placeId, type, cb);
  };

  City.remoteMethod(
    'getMediaOfPlace', {
      http: {
        path: '/:cityId/places/:placeId/media/:type',
        verb: 'get'
      },
      accepts: [
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

City.getMediaOfCity = function(cityId, type, cb) {
        var Media = app.models.Media;
        Media.getAllMediaByCityId(cityId, type, cb);
  };

  City.remoteMethod(
    'getMediaOfCity', {
      http: {
        path: '/:cityId/media/:type',
        verb: 'get'
      },
      accepts: [
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
