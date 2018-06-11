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

var app = require('../../server/server');
var EdgeGrid = require('edgegrid');

module.exports = function (Account) {

// {
// "email" : "foo1@bar1.com",
// "password" : "foobar1",
// "name" : "Foo Bar"
// }

Account.register = function (body, cb) {

  if (body === undefined ||
    body.email === undefined ||
    body.password === undefined ||
    body.full_name === undefined) {
    var env = process.env.NODE_ENV;
    var error = new Error("Insufficient parameters supplied. env: " + env);
    error.status = 400;
    cb(error, null);
    return;
  }

  var bcrypt = require('bcrypt');
  var moment = require("moment");
  const saltRounds = 10;

  var registerWithKey = function (pair) {
    Account.count({email: body.email}, function (err, count) {
      if (!err) {
        if (count == 0) {

          var plainPassword = body.password;

          bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
            if (!err) {
              const uuidv1 = require('uuid/v1');

              var userId = uuidv1();
              var dateNow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
              Account.create(
                {userid: userId, email: body.email, password: hash, full_name: body.full_name, createdate: dateNow},
                function (err, createResult) {
                  if (!err) {

                    var crypto = require("crypto");
                    var sha256 = crypto.createHash("sha256");
                    sha256.update(userId + "-" + dateNow);
                    var sha256Token = sha256.digest("hex");

                    var CustomerToken = app.models.Token;
                    var moment = require("moment");
                    var createdate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

                    CustomerToken.create({token: sha256Token, userid: userId, createdate: createdate},
                      function (err, result) {
                        if (!err) {
                          if (!sendTokenToGateway(sha256Token)) {
                            cb(new Error("Unable to create key"), null);
                          }
                          cb(null, {status: "ok", token: sha256Token});
                        } else {
                          cb(err, null);
                        }
                      });

                  } else {
                    cb(err, null);
                  }
                });
            } else {
              cb(err, null);
            }
          });
        } else {
          cb(null, {status: "error", message: "Email already exists"});
        }
        return;
      } else {
        cb(err, null);
      }
    });
  };

  registerWithKey();
};

// {
// "email" : "foo1@bar1.com",
// "password" : "foobar1",
// }

  Account.login = function (version, body, cb) {

    if (body === undefined ||
      body.email === undefined ||
      body.password === undefined) {
      var error = new Error("Insufficient parameters supplied.");
      error.status = 400;
      cb(error, null);
      return;
    }

    //trying to find existing keys to use
    var app = require('../../server/server');
    var Keypairs = app.models.keypairs;

    Keypairs.find(function (err, keys) {
      if (!err) {
        loginWithKey(keys);
      } else {
        var error = new Error("Couldn't login. Reason : unavailable encryption resources. Please contact us");
        error.status = 500;
        cb(error, null);
        return;
      }
    });

    var loginWithKey = function (pair) {
      Account.find({where: {email: body.email}},
        function (err, findResults) {
          if (!err) {
            if (findResults.length > 0) {

              var bcrypt = require('bcrypt');

              bcrypt.compare(body.password, findResults[0].password, function (err, valid) {
                if (!err) {
                  if (valid == true) {

                    var crypto = require("crypto");
                    var sha256 = crypto.createHash("sha256");
                    sha256.update(findResults[0].userid);
                    var sha256Token = sha256.digest("base64");

                    cb(null, {status: "ok", token: sha256Token});

                  } else if (valid == false) {
                    cb(null, {status: "error", message: "Incorrect Password"});
                  }
                } else {
                  cb(err, null);
                }
              });
            } else {
              cb(null, {status: "error", message: "email not found"});
            }
          } else {
            cb(err, null);
          }
        });
    }
  };

  const ApiKeyGroup = "UrbanCrawlUserCollection";

  var sendTokenToGateway = function (sha256Token) {
    var eg = new EdgeGrid(process.env.AKAMAI_CLIENT_TOKEN,
      process.env.AKAMAI_CLIENT_SECRET,
      process.env.AKAMAI_ACCESS_TOKEN,
      process.env.AKAMAI_HOST);

    eg.auth({
      path: '/apikey-manager-api/v1/collections',
      method: 'GET',
      headers: {},
      body: {}
    });

    try {
      eg.send(function (data, response) {
        console.log("sendTokenToGateway: Listing all collections...");

        data = JSON.parse(response.body);
        console.log("sendTokenToGateway: Status: ", response.statusCode);
        console.log("sendTokenToGateway: Data: ", data);
        if (response.statusCode != 200) {
          console.log(response.statusCode, response.statusMessage);
          throw "Unable to retrieve key collections";
        }

        if (data.length > 0) {
          for (var i in data) {
            if (data[i].name == ApiKeyGroup) {
              console.log("sendTokenToGateway: Collection present, going to send token");
              if (!sendToken(data[i].id, sha256Token)) {
                throw "Unable to create key";
              }

              return true;
            }
          }
        }

        console.log("sendTokenToGateway: Collection not present, going to create a collection");
        if (!createNewCollectionAndSendToken(sha256Token)) {
          throw "Unable to create key";
        }
      });
    } catch (e) {
      return false;
    }

    return true;
  };

  var createNewCollectionAndSendToken = function (sha256Token) {
    var EdgeGrid = require('edgegrid');
    var eg = new EdgeGrid(process.env.AKAMAI_CLIENT_TOKEN,
      process.env.AKAMAI_CLIENT_SECRET,
      process.env.AKAMAI_ACCESS_TOKEN,
      process.env.AKAMAI_HOST);

    eg.auth({
      path: '/apikey-manager-api/v1/collections',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        "name": "UrbanCrawlUserCollection",
        "contractId": "C-1FRYVV3",
        "groupId": 111340,
        "description": "Collection for UrbanCrawl Users",
        "quota": {
          "enabled": true,
          "value": 100,
          "interval": "HOUR_1",
          "headers": {
            "denyLimitHeaderShown": true,
            "denyRemainingHeaderShown": true,
            "denyNextHeaderShown": true,
            "allowLimitHeaderShown": true,
            "allowRemainingHeaderShown": true,
            "allowResetHeaderShown": true
          }
        }
      }
    });

    try {
      eg.send(function (data, response) {
        console.log("createNewCollectionAndSendToken: Listing all collections...");
        data = JSON.parse(response.body);
        console.log("createNewCollectionAndSendToken: Data ", data);
        console.log("createNewCollectionAndSendToken: Response status: ", response.statusCode);
        if (response.statusCode >= 200 && response.statusCode < 300) {
          if (!sendToken(data.id, sha256Token)) {
            throw "Unable to create key";
          }
        } else {
          throw "Unable to create collection";
        }
      });
    } catch (e) {
      return false;
    }

    return true;
  };

  var sendToken = function (collectionId, sha256Token) {
    var EdgeGrid = require('edgegrid');
    var eg = new EdgeGrid(process.env.AKAMAI_CLIENT_TOKEN,
      process.env.AKAMAI_CLIENT_SECRET,
      process.env.AKAMAI_ACCESS_TOKEN,
      process.env.AKAMAI_HOST);

    eg.auth({
      path: '/apikey-manager-api/v1/keys',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        "collectionId": collectionId,
        "mode": "CREATE_ONE",
        "tags": [
          "single",
          "new"
        ],
        "value": sha256Token,
        "label": "Access Token",
        "description": "Access Token for Urban Crawl User"
      }
    });

    try {
      eg.send(function (data, response) {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          data = JSON.parse(response.body);
          console.log("sendToken: Data ", data);
          console.log("sendToken Status: ", response.statusCode);
        }
      });
    } catch (e) {
      return false;
    }

    return true;
  };

  Account.remoteMethod(
    'register', {
      http: {
        path: '/',
        verb: 'put'
      },
      accepts: [
        {
          arg: 'request',
          type: 'account',
          http: {
            source: 'body'
          }
        }
      ],
      returns: {
        arg: 'token',
        description: 'Returns a token when successful',
        type: 'string'
      }
    }
  );

  Account.remoteMethod(
    'login', {
      http: {
        path: '/',
        verb: 'post'
      },
      accepts: [
        {
          arg: 'request',
          type: 'login',
          http: {
            source: 'body'
          }
        }
      ],
      returns: {
        arg: 'token',
        description: 'Returns a token when successful',
        type: 'string'
      }
    }
  );
};
