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


//--------- Get All Cities ------------
City.getAllCities = function(cb) {

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


//------------- Search Cities -------------

City.search = function(keyword, cb) {

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
        path: '/search',
        verb: 'get'
      },
      accepts: {
      	arg: 'q',
      	type: 'string',
      	http: {
      		source: 'query'
      	}
      },
      returns: {
		arg: 'cities',
		description: 'Returns a JSON array of all the available cities that match the supplied keyword, mainly to use in City List screen',
		type: 'array'
      }
    }
  );

};
