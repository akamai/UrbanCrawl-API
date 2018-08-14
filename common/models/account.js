/*
 * Copyright 2018. Akamai Technologies, Inc
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var app = require('../../server/server');
var EdgeGrid = require('edgegrid');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var moment = require('moment');
var jwt = require('jsonwebtoken');

module.exports = function(Account) {
  // {
  // 'email' : 'foo1@bar1.com',
  // 'password' : 'foobar1',
  // 'full_name' : 'Foo Bar'
  // }

  var ttl = 604800;
  Account.register = function(version, body, cb) {
    switch (version.apiVersion) {
      case 'v2':
        if (
          body === undefined ||
          body.email === undefined ||
          body.password === undefined ||
          body.full_name === undefined
        ) {
          console.log('Account : register : error: Supplied parameters insufficient. Body: ', body);
          var error = new Error();
          error.message = 'Insufficient parameters supplied.';
          error.errorCode = 'INSUFFICIENT_PARAMETERS_SUPPLIED';
          error.status = 400;
          cb(error, null);
          return;
        }

        // trying to find existing keys to use
        var Keypairs = app.models.keypairs;

        Keypairs.find(function(err, keys) {
          if (!err) {
            registerWithKey(keys);
          } else {
            console.log('Account : register : error: unavailable encryption resources.');
            var error = new Error();
            error.message = 'Couldn\'t register. Reason : unavailable encryption resources. Please contact us';
            error.errorCode = 'OTHER_ERROR';
            error.status = 500;
            cb(error, null);
            return;
          }
        });

        var registerWithKey = function(pair) {
          Account.count({email: body.email}, function(err, count) {
            if (!err) {
              if (count == 0) {
                var plainPassword = body.password;

                bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
                  if (!err) {
                    const uuidv1 = require('uuid/v1');

                    var userId = uuidv1();
                    var dateNow = moment(Date.now()).format(
                      'YYYY-MM-DD HH:mm:ss'
                    );

                    Account.create(
                      {
                        userid: userId,
                        email: body.email,
                        password: hash,
                        full_name: body.full_name,
                        createdate: dateNow,
                      },
                      function(err, createResult) {
                        if (!err) {
                          var crypto = require('crypto');
                          var sha256 = crypto.createHash('sha256');
                          sha256.update(userId + '-' + dateNow);
                          var sha256Token = sha256.digest('hex');

                          var Token = app.models.Token;
                          var moment = require('moment');
                          dateNow = moment(Date.now()).format(
                            'YYYY-MM-DD HH:mm:ss'
                          );

                          Token.create(
                            {
                              token: sha256Token,
                              userid: userId,
                              createddate: dateNow,
                            },
                            function(err, result) {
                              if (!err) {
                                // blocking call to send these tokens to APIG
                                // if this fails, we send an error back as response
                                var env = process.env.NODE_ENV;
                                if (env !== undefined && env === 'demo') {
                                  if (!sendTokenToGateway(sha256Token)) {
                                    console.log('Account : registerWithKey : Unable to create key');
                                    var error = new Error();
                                    error.message = 'Unable to create key';
                                    error.errorCode = 'OTHER_ERROR';
                                    error.status = 500;
                                    cb(error, null);
                                  }
                                }
                                cb(null, {
                                  status: 'ok',
                                  token: sha256Token,
                                  expires_in_seconds: ttl,
                                });
                              } else {
                                console.log('Account : registerWithKey : error: Token.create', err);
                                var error = new Error();
                                error.message = 'Some error occurred';
                                error.errorCode = 'OTHER_ERROR';
                                error.status = 500;
                                cb(error, null);
                              }
                            }
                          );
                        } else {
                          console.log('Account : registerWithKey : error: Account.create', err);
                          var error = new Error();
                          error.message = 'Some error occurred';
                          error.errorCode = 'OTHER_ERROR';
                          error.status = 500;
                          cb(error, null);
                        }
                      }
                    );
                  } else {
                    console.log('Account : registerWithKey : error: bcrypt.hash', err);
                    var error = new Error();
                    error.message = 'Some error occurred';
                    error.errorCode = 'OTHER_ERROR';
                    error.status = 500;
                    cb(error, null);
                  }
                });
              } else {
                cb(null, {status: 'error', message: 'Email already exists'});
              }
              return;
            } else {
              console.log('Account : registerWithKey : error : Account.count', err);
              var error = new Error();
              error.message = 'Some error occurred';
              error.errorCode = 'OTHER_ERROR';
              error.status = 500;
              cb(error, null);
            }
          });
        };

        break;
      default:
        console.log('Account : register : error: invalid API version');
        var error = new Error();
        error.message = 'You must supply a valid api version';
        error.errorCode = 'INVALID_API_VERSION';
        error.status = 400;
        cb(error, null);
    }
  };

  Account.remoteMethod('register', {
    http: {
      path: '/',
      verb: 'put',
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
        arg: 'items',
        type: 'object',
        http: {
          source: 'body',
        },
      },
    ],
    returns: {
      arg: 'token',
      description: 'Returns a token when successful',
      type: 'string',
    },
  });

  // {
  // 'email' : 'foo1@bar1.com',
  // 'password' : 'foobar1',
  // }
  // Content-Type : must be "application/json"

  Account.login = function(version, body, cb) {
    console.log('Account:Login: Version, Body', version, body);
    switch (version.apiVersion) {
      case 'v2':
        if (
          body === undefined ||
          body.email === undefined ||
          body.password === undefined
        ) {
          console.log('Account : login : error: Supplied parameters insufficient. Body: ', body);
          var error = new Error();
          error.message = 'Insufficient parameters supplied.';
          error.errorCode = 'INSUFFICIENT_PARAMETERS_SUPPLIED';
          error.status = 400;
          cb(error, null);
          return;
        }

        // trying to find existing keys to use
        var app = require('../../server/server');
        var Keypairs = app.models.keypairs;

        Keypairs.find(function(err, keys) {
          if (!err) {
            loginWithKey(keys);
          } else {
            console.log('Account : login : error:  unavailable encryption resources');
            var error = new Error();
            error.message = 'Couldn\'t login. Reason : unavailable encryption resources. Please contact us';
            error.errorCode = 'OTHER_ERROR';
            error.status = 500;
            cb(error, null);
            return;
          }
        });

        var loginWithKey = function(pair) {
          Account.find({where: {email: body.email}}, function(
            err,
            findResults
          ) {
            if (!err) {
              if (findResults.length > 0) {
                var bcrypt = require('bcrypt');

                bcrypt.compare(body.password, findResults[0].password, function(
                  err,
                  valid
                ) {
                  if (!err) {
                    if (valid == true) {
                      var dateNow = moment(Date.now()).format(
                        'YYYY-MM-DD HH:mm:ss'
                      );
                      var crypto = require('crypto');
                      var sha256 = crypto.createHash('sha256');
                      sha256.update(findResults[0].userid + '-' + dateNow);
                      var sha256Token = sha256.digest('hex');

                      var Token = app.models.Token;
                      // var moment = require('moment');

                      // First delete any tokens that exist for this userid
                      Token.destroyAll({userid: findResults[0].userid},
                      function(err, results) {
                        console.log('Login : Token : deleted existing: ', results);
                        if (!err) {
                          Token.create({
                            token: sha256Token,
                            userid: findResults[0].userid,
                            createddate: dateNow,
                          }, function(err, result) {
                            console.log('Login : Token : Create Result: ', result);
                            if (!err) {
                              // blocking call to send these tokens to APIG
                              // if this fails, we send an error back as response
                              var env = process.env.NODE_ENV;
                              if (env !== undefined && env === 'demo') {
                                if (!sendTokenToGateway(sha256Token)) {
                                  cb(new Error('Unable to update key'), null);
                                }
                              }
                              cb(null, {
                                status: 'ok',
                                token: sha256Token,
                                expires_in_seconds: ttl,
                              });
                            } else {
                              console.log('Account : login : error:  Token.create : ', err);
                              var error = new Error();
                              error.message = 'Some error occurred';
                              error.errorCode = 'OTHER_ERROR';
                              error.status = 500;
                              cb(error, null);
                            }
                          });
                        } else {
                          console.log('Account : login : error:  Token.destroyAll : failed to delete.', err);
                          var error = new Error();
                          error.message = 'Couldn\'t create new tokens : failed to delete. Please contact us if this persists';
                          error.errorCode = 'OTHER_ERROR';
                          error.status = 500;
                          cb(error, null);
                          return;
                        }
                      });
                    } else if (valid == false) {
                      cb(null, {
                        status: 'error',
                        message: 'Incorrect Password',
                      });
                    }
                  } else {
                    console.log('Account : login : error:  bcrypt.compare', err);
                    var error = new Error();
                    error.message = 'Some error occurred and we couldn\'t verify your password';
                    error.errorCode = 'OTHER_ERROR';
                    error.status = 500;
                    cb(error, null);
                  }
                });
              } else {
                cb(null, {status: 'error', message: 'email not found'});
              }
            } else {
              console.log('Account : login : error:  Account.find', err);
              var error = new Error();
              error.message = 'Error while finding your Account';
              error.errorCode = 'OTHER_ERROR';
              error.status = 500;
              cb(error, null);
            }
          });
        };
        break;
      default:
        console.log('Account : login : error: Invalid API Version');
        var error = new Error();
        error.message = 'You must supply a valid api version';
        error.errorCode = 'INVALID_API_VERSION';
        error.status = 400;
        cb(error, null);
    }
  };

  Account.remoteMethod('login', {
    http: {
      path: '/',
      verb: 'post',
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
        arg: 'items',
        type: 'any',
        http: {
          source: 'body',
        },
      },
    ],
    returns: {
      arg: 'token',
      description: 'Returns a token when successful',
      type: 'string',
    },
  });

  const ApiKeyGroup = 'UrbanCrawlUserCollection';

  var sendTokenToGateway = function(sha256Token) {
    var eg = new EdgeGrid(
      process.env.AKAMAI_CLIENT_TOKEN,
      process.env.AKAMAI_CLIENT_SECRET,
      process.env.AKAMAI_ACCESS_TOKEN,
      process.env.AKAMAI_HOST
    );

    eg.auth({
      path: '/apikey-manager-api/v1/collections',
      method: 'GET',
      headers: {},
      body: {},
    });

    try {
      eg.send(function(data, response) {
        console.log('sendTokenToGateway: Listing all collections...');

        data = JSON.parse(response.body);
        console.log('sendTokenToGateway: Status: ', response.statusCode);
        console.log('sendTokenToGateway: Data: ', data);
        if (response.statusCode != 200) {
          console.log(response.statusCode, response.statusMessage);
          throw 'Unable to retrieve key collections';
        }

        if (data.length > 0) {
          for (var i in data) {
            if (data[i].name == ApiKeyGroup) {
              console.log(
                'sendTokenToGateway: Collection present, going to send token'
              );
              if (!sendToken(data[i].id, sha256Token)) {
                throw 'Unable to create key';
              }
              return true;
            }
          }
        }

        console.log(
          'sendTokenToGateway: Collection not present, going to create a collection'
        );
        if (!createNewCollectionAndSendToken(sha256Token)) {
          throw 'Unable to create key';
        }
      });
    } catch (e) {
      return false;
    }

    return true;
  };

  var createNewCollectionAndSendToken = function(sha256Token) {
    var EdgeGrid = require('edgegrid');
    var eg = new EdgeGrid(
      process.env.AKAMAI_CLIENT_TOKEN,
      process.env.AKAMAI_CLIENT_SECRET,
      process.env.AKAMAI_ACCESS_TOKEN,
      process.env.AKAMAI_HOST
    );

    eg.auth({
      path: '/apikey-manager-api/v1/collections',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name: 'UrbanCrawlUserCollection',
        contractId: 'C-1FRYVV3',
        groupId: 64867,
        description: 'Collection for UrbanCrawl Users',
        quota: {
          enabled: true,
          value: 100,
          interval: 'HOUR_1',
          headers: {
            denyLimitHeaderShown: true,
            denyRemainingHeaderShown: true,
            denyNextHeaderShown: true,
            allowLimitHeaderShown: true,
            allowRemainingHeaderShown: true,
            allowResetHeaderShown: true,
          },
        },
      },
    });

    try {
      eg.send(function(data, response) {
        console.log(
          'createNewCollectionAndSendToken: Listing all collections...'
        );
        data = JSON.parse(response.body);
        console.log('createNewCollectionAndSendToken: Data ', data);
        console.log(
          'createNewCollectionAndSendToken: Response status: ',
          response.statusCode
        );
        if (response.statusCode >= 200 && response.statusCode < 300) {
          if (!sendToken(data.id, sha256Token)) {
            throw 'Unable to create key';
          }
        } else {
          throw 'Unable to create collection';
        }
      });
    } catch (e) {
      return false;
    }

    return true;
  };

  var sendToken = function(collectionId, sha256Token) {
    var EdgeGrid = require('edgegrid');
    var eg = new EdgeGrid(
      process.env.AKAMAI_CLIENT_TOKEN,
      process.env.AKAMAI_CLIENT_SECRET,
      process.env.AKAMAI_ACCESS_TOKEN,
      process.env.AKAMAI_HOST
    );

    eg.auth({
      path: '/apikey-manager-api/v1/keys',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        collectionId: collectionId,
        mode: 'CREATE_ONE',
        tags: ['single', 'new'],
        value: sha256Token,
        label: 'Access Token',
        description: 'Access Token for Urban Crawl User',
      },
    });

    try {
      eg.send(function(data, response) {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          data = JSON.parse(response.body);
          console.log('sendToken: Data ', data);
          console.log('sendToken Status: ', response.statusCode);
        }
      });
    } catch (e) {
      return false;
    }

    return true;
  };

  var _actionCode = Object.freeze({GET_PROFILE: 1, UPDATE_PROFILE: 2});

  // Function to verify the token passed to it
  var verifyTokenAndProceed = function(token, body, actionCode, cb) {
    var Token = app.models.Token;
    console.log('Account : Get Account : Sent Token : ', token);
    Token.find({where: {token: token}}, function(err, tokenFindResult) {
      if (!err) {
        console.log('Account : Get Account : Token Find Result: ', tokenFindResult);

        if (tokenFindResult.length > 0) {
          tokenFindResult = tokenFindResult[0];
          var tokenIssuedDate = moment(tokenFindResult.createddate);
          var dateNow = moment();
          var diffInSecs = dateNow.diff(tokenIssuedDate) / 1000;

          var userId = tokenFindResult.userid;

          if (diffInSecs <= tokenFindResult.ttl) {
            // Token is still valid
            switch (actionCode) {
              case _actionCode.GET_PROFILE:
                // Return profile
                returnUserProfile(userId, cb);
                break;
              case _actionCode.UPDATE_PROFILE:
                // Update Profile
                saveProfileUpdates(body, userId, cb);
                break;
              default:
                console.log('Account : verifyTokenAndProceed : error: Operation Not Defined');
                var error = new Error();
                error.message = 'Operation Not Defined';
                error.errorCode = 'OTHER_ERROR';
                error.status = 500;
                cb(error, null);
            }
          } else {
            // Token has expired
            console.log('Account : verifyTokenAndProceed : error: Token Expired');
            var error = new Error();
            error.message = 'Token Expired';
            error.errorCode = 'AUTH_EXPIRED';
            error.status = 403;
            cb(error, null);
          }
        } else {
          // The token wasn't found, return that token was invalid
          console.log('Account : verifyTokenAndProceed : error: Token Expired (Token.find found 0 tokens): ');
          var error = new Error();
          error.message = 'Token Invalid';
          error.errorCode = 'AUTH_INVALID';
          error.status = 403;
          cb(error, null);
        }
        return;
      } else {
        console.log('Account : verifyTokenAndProceed : error: Token Expired (Token.find err): ', err);
        var error = new Error();
        error.message = 'Incorrect Authentication';
        error.errorCode = 'AUTH_INVALID';
        error.status = 403;
        cb(error, null);
      }
    });
  };

  var saveProfileUpdates = function(body, userId, cb) {
    var Account = app.models.Account;

    if (body === undefined) {
      var error = new Error('Insufficient parameters supplied.');
      error.status = 400;
      cb(error, null);
      return;
    } else {
      var updatedValues = {};

      if (!(body.email === undefined)) {
        updatedValues.email = body.email;
      }

      if (!(body.full_name === undefined)) {
        updatedValues.full_name = body.full_name;
      }

      if (!(body.password === undefined)) {
        var updateSalt = bcrypt.genSaltSync(saltRounds);
        var updatedHash = bcrypt.hashSync(body.password, updateSalt);
        updatedValues.password = updatedHash;
      }

      updatedValues.updatedate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

      Account.update({userid: userId}, updatedValues, function(
        err,
        updateResult
      ) {
        if (!err) {
          var result = {
            status: 'ok',
            updated_profile: {
              email: body.email,
              full_name: body.full_name,
            },
          };
          cb(null, result);
        } else {
          console.log('Account : saveProfileUpdates : error: Account.update: ', err);
          var error = new Error();
          error.message = 'Something went wrong and we couldn\'t update the profile. Write to us if this persists';
          error.errorCode = 'OTHER_ERROR';
          error.status = 500;
          cb(error, null);
        }
      });
    }
  };

  var returnUserProfile = function(userId, cb) {
    var Account = app.models.Account;
    Account.find(
      {where: {userid: userId}},
      {fields: {userid: true, email: true, full_name: true}},
      function(err, findResults) {
        if (!err) {
          findResults = findResults[0];
          var result = {
            userid: findResults.userid,
            email: findResults.email,
            full_name: findResults.full_name,
          };

          cb(null, result);
        } else {
          console.log('Account : returnUserProfile : error: Account.find: ', err);
          var error = new Error();
          error.message = 'Something went wrong and we couldn\'t fetch the profile. Write to us if this persists';
          error.errorCode = 'OTHER_ERROR';
          error.status = 500;
          cb(error, null);
        }
      }
    );
  };

  // Update Profile of the logged in user

  Account.updateProfile = function(version, body, req, cb) {
    switch (version.apiVersion) {
      case 'v2':
        var sentToken = req.headers.authorization;
        if (sentToken === undefined) {
          console.log('Account : updateProfile : error: Auth Required, sentToken was : ', sentToken);
          var error = new Error();
          error.message = 'Authorization Required';
          error.errorCode = 'AUTH_REQUIRED';
          error.status = 401;
          cb(error, null);
          return;
        } else {
          // verify token, and proceed to update profile if token is valid
          verifyTokenAndProceed(
            sentToken,
            body,
            _actionCode.UPDATE_PROFILE,
            cb
          );
        }
        break;
      default:
        console.log('Account : updateProfile : error: invalid API version');
        var error = new Error();
        error.message = 'You must supply a valid api version';
        error.errorCode = 'INVALID_API_VERSION';
        error.status = 400;
        cb(error, null);
    }
  };

  Account.remoteMethod('updateProfile', {
    http: {
      path: '/update',
      verb: 'post',
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
        arg: 'items',
        type: 'object',
        http: {
          source: 'body',
        },
      },
      {
        arg: 'request',
        type: 'object',
        http: {
          source: 'req',
        },
      },
    ],
    returns: {
      arg: 'result',
      description: 'Returns the updated profile when successful',
      type: 'string',
    },
  });

  // Get Profile of the logged in user

  Account.getProfile = function(version, req, cb) {
    switch (version.apiVersion) {
      case 'v2':
        var sentToken = req.headers.authorization;
        if (sentToken === undefined) {
          console.log('Account : getProfile : error: Auth Required, sentToken was : ', sentToken);
          var error = new Error();
          error.message = 'Authorization Required';
          error.errorCode = 'AUTH_REQUIRED';
          error.status = 401;
          cb(error, null);
          return;
        } else {
          // verify token, and proceed to update profile if token is valid
          verifyTokenAndProceed(sentToken, null, _actionCode.GET_PROFILE, cb);
        }
        break;
      default:
        console.log('Account : updateProfile : error: invalid API version');
        var error = new Error();
        error.message = 'You must supply a valid api version';
        error.errorCode = 'INVALID_API_VERSION';
        error.status = 400;
        cb(error, null);
    }
  };

  Account.remoteMethod('getProfile', {
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
      {
        arg: 'request',
        type: 'object',
        http: {
          source: 'req',
        },
      },
    ],
    returns: {
      arg: 'result',
      description: 'Returns the logged in user\'s profile',
      type: 'string',
    },
  });
};
