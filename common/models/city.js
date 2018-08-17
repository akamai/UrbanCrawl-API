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

  var app = require('../../server/server');

  // --------- Get All Cities ------------
  City.getAllCities = function(version, cb) {
    switch (version.apiVersion) {
      case 'v2':
        City.find(
          {fields: {id: true, name: true, countryname: true, lat: true, lng: true, thumburl: true, heroimage: true, description: true, tour_time: true, tour_price: true}},
          function(err, result) {
            if (!err) {
              cb(null, result);
            } else {
              console.log('Cities : getAllCities : error: ', err);
              var error = new Error();
              error.message = 'Something went wrong and we couldn\'t fulfill this request. Write to us if this persists';
              error.errorCode = 'OTHER_ERROR';
              error.status = 500;
              cb(error, null);
            }
          }
        );
        break;
      default:
        console.log('Cities : getAllCities : invalid API version');
        var error = new Error();
        error.message = 'You must supply a valid api version';
        error.errorCode = 'INVALID_API_VERSION';
        error.status = 400;
        cb(error, null);
    }
  };

  City.remoteMethod(
    'getAllCities', {
      http: {
        path: '/',
        verb: 'get',
      },
      accepts: [
        {
          arg: 'version',
          type: 'object',
          description: 'API version eg. v1, v2, etc.',
          http: function(context) {
            return {apiVersion: context.req.apiVersion};
          },
        },
      ],
      returns: {
        arg: 'cities',
        description: 'Returns a JSON array of all the available cities, mainly to use in City List screen',
        type: [City],
        root: true,
      },
    }
  );

  // ---------- Get City Details ------------------
  City.getCityDetails = function(version, idToFind, cb) {
    switch (version.apiVersion) {
      case 'v2':
        var placesOfCity;

        if (idToFind === undefined) {
          console.log('Cities : getCityDetails : error: no cityid supplied');
          var error = new Error();
          error.message = 'No id was supplied. You must supply a cidy id';
          error.errorCode = 'RESOURCE_NOT_FOUND';
          error.status = 404;
          cb(error, null);
        } else {
          City.find({
            where: {id: idToFind},
            fields: {createdate: false, lastupdated: false},
            include: {relation: 'places', scope: {fields: ['id', 'name', 'heroimage', 'herovideo', 'description', 'numimages', 'timings']}},
          }, function(err, result) {
            if (!err) {
              if (result.length > 0) {
                cb(null, result[0]);
              } else {
                console.log('Cities : getCityDetails : error: Didn\'t find anything with this id');
                var error = new Error();
                error.message = 'Didn\'t find anything with this id';
                error.errorCode = 'RESOURCE_NOT_FOUND';
                error.status = 404;
                cb(error, null);
              }
            } else {
              console.log('Cities : getCityDetails : error: ', err);
              var error = new Error();
              error.message = 'Something went wrong and we couldn\'t fulfill this request. Write to us if this persists';
              error.errorCode = 'OTHER_ERROR';
              error.status = 500;
              cb(error, null);
            }
          });
        }
        break;
      default:
        console.log('Cities : getCityDetails : invalid API version');
        var error = new Error();
        error.message = 'You must supply a valid api version';
        error.errorCode = 'INVALID_API_VERSION';
        error.status = 400;
        cb(error, null);
    }
  };

  City.remoteMethod(
    'getCityDetails', {
      http: {
        path: '/:cityId',
        verb: 'get',
      },
      accepts: [
        {
          arg: 'version',
          type: 'object',
          description: 'API version eg. v1, v2, etc.',
          http: function(context) {
            return {apiVersion: context.req.apiVersion};
          },
        },
        {
          arg: 'cityId',
          type: 'number',
          required: true,
        },
      ],
      returns: {
        arg: 'city',
        description: 'Returns a JSON object containing details and places of a city whose ID is supplied',
        type: City,
        root: true,
      },
    }
  );

  // ------------- Get Places of a city -------------

  City.getPlacesOfCity = function(version, cityId, cb) {
    switch (version.apiVersion) {
      case 'v2':
        var Place = app.models.Place;
        Place.getAllPlacesOfCity(cityId, cb);
        break;
      default:
        console.log('Cities : getPlaceOfCity : invalid API version');
        var error = new Error();
        error.message = 'You must supply a valid api version';
        error.errorCode = 'INVALID_API_VERSION';
        error.status = 400;
        cb(error, null);
    }
  };

  City.remoteMethod(
    'getPlacesOfCity', {
      http: {
        path: '/:cityId/places',
        verb: 'get',
      },
      accepts: [
        {
          arg: 'version',
          type: 'object',
          description: 'API version eg. v1, v2, etc.',
          http: function(context) {
            return {apiVersion: context.req.apiVersion};
          },
        },
        {
          arg: 'cityId',
          type: 'number',
          required: true,
        },
      ],
      returns: {
        arg: 'places',
        description: 'Returns a JSON object containing details and places of a city whose ID is supplied',
        type: ['place'],
        root: true,
      },
    }
  );

  // ------------- Search Cities -------------

  City.search = function(version, keyword, page, cb) {
    switch (version.apiVersion) {
      case 'v2':
        if (keyword === undefined) {
          console.log('Cities : search : error: No keyword was supplied. You must supply a search keyword');
          var error = new Error();
          error.message = 'No keyword was supplied. You must supply a search keyword';
          error.errorCode = 'INSUFFICIENT_PARAMETERS_SUPPLIED';
          error.status = 400;
          cb(error, null);
        } else {
          if (page === undefined) {
            page = 1;
          }
          var count = 5;
          var offset = (page - 1) * count;

          // Calculate offset as per page and supply that too
          // We are currently not givin offset/skip values to Cities search, because of the Slice logic later on.
          // Slicing logic, on #273, depends on the logic that the Cities search doesn't have any offset or skip set.
          City.find({
            where: {
              or: [
                {name: {like: '%' + keyword + '%'}},
                {countryname: {like: '%' + keyword + '%'}},
                {description: {like: '%' + keyword + '%'}},
                {tour_time: {like: '%' + keyword + '%'}},
                {language: {like: '%' + keyword + '%'}},
                {traveladvice: {like: '%' + keyword + '%'}},
                {currency: {like: '%' + keyword + '%'}},
                {tour_price: {like: '%' + keyword + '%'}},
              ],
            },
            fields: {id: true, name: true, countryname: true, lat: true, lng: true, thumburl: true, heroimage: true, description: true, tour_price: true, tour_time: true},
          },
            function(err, result) {
              if (!err) {
                if ((result.length - offset) < count) {
                  // If the cities results have fewer items than count, then include Place too.
                  // This will also hold true if no cities match the search critieria
                  var Place = app.models.Place;
                  Place.find({
                    where: {
                      or: [
                        {name: {like: '%' + keyword + '%'}},
                        {description: {like: '%' + keyword + '%'}},
                      ],
                    },
                    fields: {id: true, cityid: true, name: true, heroimage: true, description: true},
                  }, function(err, placeResults) {
                    if (!err) {
                      // insert 'type' in result and placeResult before this step
                      var limit = (offset + count);
                      result = insertType(result, 'city');
                      placeResults = insertType(placeResults, 'place');
                      result = result.concat(placeResults);
                      var nextPage = (result.length - limit > 0 ? (page + 1) : null);
                      result = result.slice(offset, limit);
                      result = buildSearchResponse(result, page, nextPage, result.length);
                      cb(null, result);
                    } else {
                      // There was an error fetching  Places.
                      // If cities had any results, return them
                      if (result.length > 0) {
                        result = insertType(result, 'city');
                        result = buildSearchResponse(result, page, null, result.length);
                        cb(null, result);
                      } else {
                        // Error
                        console.log('Cities : search : error in searching places: ', err);
                        var error = new Error();
                        error.message = 'Some error occurred';
                        error.errorCode = 'OTHER_ERROR';
                        error.status = 500;
                        cb(error, null);
                      }
                    }
                  });
                } else {
                  var limit = (offset + count);
                  var nextPage = (result.length - limit > 0 ? (page + 1) : null);
                  result = result.slice(offset, limit);
                  result = buildSearchResponse(result, page, nextPage, result.length);
                  cb(null, result);
                }
              } else {
                console.log('Cities : search : error in searching city: ', err);
                var error = new Error();
                error.message = 'Something went wrong and we couldn\'t fulfill this request. Write to us if this persists';
                error.errorCode = 'OTHER_ERROR';
                error.status = 500;
                cb(error, null);
              }
            });
        }
        break;
      default:
        console.log('Cities : Search : invalid API version');
        var error = new Error();
        error.message = 'You must supply a valid api version';
        error.errorCode = 'INVALID_API_VERSION';
        error.status = 400;
        cb(error, null);

    }
  };

  City.remoteMethod(
    'search', {
      http: {
        path: '/search',
        verb: 'get',
      },
      accepts: [
        {
          arg: 'version',
          type: 'object',
          description: 'API version eg. v1, v2, etc.',
          http: function(context) {
            return {apiVersion: context.req.apiVersion};
          },
        },
        {
          arg: 'query',
          type: 'string',
          required: true,
          http: {
            source: 'query',
          },
        },
        {
          arg: 'page',
          type: 'number',
          http: {
            source: 'query',
          },
        },
      ],
      returns: {
        arg: 'cities',
        description: 'Returns a JSON array of all the available cities that match the supplied keyword, mainly to use in City List screen',
        type: ['city'],
        root: true,
      },
    }
  );

  /**
   * Builds a response to send back, appends meta data about pagination into results of search
   * @param {*} results
   * @param {*} currPage
   * @param {*} nextPage
   * @param {*} count
   */
  var buildSearchResponse = function(results, currPage, nextPage, count) {
    var searchResponse = {
      currPage: currPage,
      nextPage: nextPage,
      count: count,
      results: results,
    };

    return searchResponse;
  };

  /**
   * Inserts type 'city' or 'place' in search results.
   * @param {*} results
   * @param {*} type
   */
  var insertType = function(results, type) {
    for (var i in results) {
      results[i].type = type;
    }
    return results;
  };

  // ------------- Get Place Details -------------

  City.getPlaceDetails = function(version, cityId, placeId, cb) {
    switch (version.apiVersion) {
      case 'v2':
        var Place = app.models.Place;
        Place.getPlaceDetails(cityId, placeId, cb);
        break;
      default:
        console.log('Cities : getPlaceDetails : invalid API version');
        var error = new Error();
        error.message = 'You must supply a valid api version';
        error.errorCode = 'INVALID_API_VERSION';
        error.status = 400;
        cb(error, null);
    }
  };

  City.remoteMethod(
    'getPlaceDetails', {
      http: {
        path: '/:cityId/places/:placeId',
        verb: 'get',
      },
      accepts: [
        {
          arg: 'version',
          type: 'object',
          description: 'API version eg. v1, v2, etc.',
          http: function(context) {
            return {apiVersion: context.req.apiVersion};
          },
        },
        {
          arg: 'cityId',
          type: 'number',
          required: true,
        },
        {
          arg: 'placeId',
          type: 'number',
          required: true,
        },
      ],
      returns: {
        arg: 'placeDetails',
        description: 'Returns a JSON array of all the available places, belonging to the city whose id is supplied',
        type: 'place',
        root: true,
      },
    }
  );

  // ------------- Get All Media of Place according to type supplied -------------

  City.getMediaOfPlace = function(version, cityId, placeId, type, cb) {
    switch (version.apiVersion) {
      case 'v2':
        var Media = app.models.Media;
        Media.getAllMediaByPlaceId(cityId, placeId, type, cb);
        break;
      default:
        console.log('Cities : getPlaceDetails : invalid API version');
        var error = new Error();
        error.message = 'You must supply a valid api version';
        error.errorCode = 'INVALID_API_VERSION';
        error.status = 400;
        cb(error, null);
    }
  };

  City.remoteMethod(
    'getMediaOfPlace', {
      http: {
        path: '/:cityId/places/:placeId/media/:type',
        verb: 'get',
      },
      accepts: [
        {
          arg: 'version',
          type: 'object',
          description: 'API version eg. v1, v2, etc.',
          http: function(context) {
            return {apiVersion: context.req.apiVersion};
          },
        },
        {
          arg: 'cityId',
          type: 'number',
          required: true,
        },
        {
          arg: 'placeId',
          type: 'number',
          required: true,
        },
        {
          arg: 'type',
          type: 'string',
          required: true,
        },
      ],
      returns: {
        arg: 'media',
        description: 'Returns a JSON array of all the available places, belonging to the city whose id is supplied',
        type: ['media'],
        root: true,
      },
    }
  );

  // ------------- Get All Media of a City according to type supplied -------------

  City.getMediaOfCity = function(version, cityId, type, cb) {
    switch (version.apiVersion) {
      case 'v2':
        var Media = app.models.Media;
        Media.getAllMediaByCityId(cityId, type, cb);
        break;
      default:
        console.log('Cities : getMediaOfCity : invalid API version');
        var error = new Error();
        error.message = 'You must supply a valid api version';
        error.errorCode = 'INVALID_API_VERSION';
        error.status = 400;
        cb(error, null);
    }
  };

  City.remoteMethod(
    'getMediaOfCity', {
      http: {
        path: '/:cityId/media/:type',
        verb: 'get',
      },
      accepts: [
        {
          arg: 'version',
          type: 'object',
          description: 'API version eg. v1, v2, etc.',
          http: function(context) {
            return {apiVersion: context.req.apiVersion};
          },
        },
        {
          arg: 'cityId',
          type: 'number',
          required: true,
        },
        {
          arg: 'type',
          type: 'string',
          required: true,
        },
      ],
      returns: {
        arg: 'media',
        description: 'Returns a JSON array of all the available places, belonging to the city whose id is supplied',
        type: ['media'],
        root: true,
      },
    }
  );
};
