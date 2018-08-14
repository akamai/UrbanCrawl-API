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
var moment = require('moment');

module.exports = function(Order) {
  /**
   * This method is accessed only through the Cart model now
   * @param {*} body
   * @param {*} cb
   */
  Order.checkout = function(userId, cb) {
    var Cart = app.models.Cart;
    Cart.find({where: {userid: userId},
    },
      function(err, cartItems) {
        if (!err) {
          if (cartItems.length > 0) {
            // Proceed only if there were items in cart from the supplied userid
            var orderid = Date.now();
            for (var item of cartItems) {
              var createdate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
              Order.create({
                orderid: orderid, cityid: item.cityid, userid: item.userid,
                thumburl: item.thumburl, unitprice: item.unitprice,
                quantity: item.quantity, totalprice: item.totalprice,
                createdate: createdate, updatedate: createdate,
              },
                function(err, createResult) {
                  if (!err) {
                    console.log('ORDER: Create Order Result: ', createResult);
                    console.log('ORDER : Order Id: ', orderid);
                    // Order made, delete these items from cart
                    Cart.destroyAll({userid: userId},
                      function(err, result) {
                        if (!err) {
                          console.log('ORDER : Cart Delete: ', result);
                          returnOrdersByUserId(userId, orderid, cb);
                        } else {
                          console.log('Order : checkout : error: Cart.destroyAll: ', err);
                          var error = new Error();
                          error.message = 'Something went wrong and we couldn\'t clear your cart. Your order, however, has went through, check your account. Write to us if this persists';
                          error.errorCode = 'PARTIALLY_COMPLETE';
                          error.status = 206;
                          cb(error, null);
                        }
                      });
                  } else {
                    console.log('Order : checkout : error: Order.create: ', err);
                    var error = new Error();
                    error.message = 'Something went wrong and we couldn\'t create your order. Your order, however, has went through, check your account. Write to us if this persists';
                    error.errorCode = 'PARTIALLY_COMPLETE';
                    error.status = 206;
                    cb(error, null);
                  }
                });
            }
          } else {
            console.log('Order : checkout : error: No orders for the given userid ', userId);
            var error = new Error();
            error.message = 'No cart items were found for the given user';
            error.errorCode = 'RESOURCE_NOT_FOUND';
            error.status = 404;
            cb(error, null);
          }
        } else {
          console.log('Order : checkout : error: Cart.find ', err);
          var error = new Error();
          error.message = 'Something went wrong and we couldn\'t get the items to checkout. Write to us if this persists';
          error.errorCode = 'OTHER_ERROR';
          error.status = 500;
          cb(error, null);
        }
      });
  };

  var _actionCode = Object.freeze({GET_ORDERS: 1, DELETE_ORDER: 2});

  // Function to verify the token passed to it
  var verifyTokenAndProceed = function(token, actionCode, body, cb) {
    var Token = app.models.Token;
    Token.find({where: {token: token}}, function(err, tokenFindResult) {
      if (!err) {
        if (tokenFindResult.length > 0) {
          tokenFindResult = tokenFindResult[0];

          var tokenIssuedDate = moment(tokenFindResult.createddate);
          var dateNow = moment();
          var diffInSecs = (dateNow.diff(tokenIssuedDate)) / 1000;

          var userId = tokenFindResult.userid;

          if (diffInSecs <= tokenFindResult.ttl) {
            // Token is still valid
            switch (actionCode) {
              case _actionCode.GET_ORDERS:
                returnOrdersByUserId(userId, undefined, cb);
                break;
              case _actionCode.DELETE_ORDER:
                deleteOrder(userId, body.id, cb);
                break;
              default:
                console.log('Order : verifyTokenAndProceed : error: Operation Not Defined');
                var error = new Error();
                error.message = 'Operation Not Defined';
                error.errorCode = 'OTHER_ERROR';
                error.status = 500;
                cb(error, null);
            }
          } else {
            // The token wasn't found, return that token was invalid
            console.log('Order : verifyTokenAndProceed : error: Token Expired (Token.find found 0 tokens): ');
            var error = new Error();
            error.message = 'Token Invalid';
            error.errorCode = 'AUTH_INVALID';
            error.status = 403;
            cb(error, null);
          }
          return;
        } else {
          // Token has expired
          console.log('Order : verifyTokenAndProceed : error: Token Expired');
          var error = new Error();
          error.message = 'Token Expired';
          error.errorCode = 'AUTH_EXPIRED';
          error.status = 403;
          cb(error, null);
        }
      } else {
        console.log('Order : verifyTokenAndProceed : error: Token Expired (Token.find err): ', err);
        var error = new Error();
        error.message = 'Incorrect Authentication';
        error.errorCode = 'AUTH_INVALID';
        error.status = 403;
        cb(error, null);
        return;
      }
    });
  };

  var returnOrdersByUserId = function(userId, orderId, cb) {
    if (orderId === undefined) {
      var whereClause = {userid: userId};
    } else {
      var whereClause = {userid: userId, orderid: orderId};
    }

    Order.find({
      where: whereClause,
      fields: {orderid: true, cityid: true, thumburl: true, quantity: true, totalprice: true, createdate: true}},
      function(err, orders) {
        if (!err) {
          cb(null, orders);
        } else {
          console.log('Order : returnOrdersByUserId : error: Order.find: ', err);
          var error = new Error();
          error.message = 'Something went wrong and we couldn\'t get the items of the order. Write to us if this persists';
          error.errorCode = 'OTHER_ERROR';
          error.status = 500;
          cb(error, null);
        }
      });
  };

  var deleteOrder = function(userId, orderId, cb) {
    Order.destroyAll({userid: userId, orderid: orderId},
      function(err, result) {
        if (!err) {
          returnOrdersByUserId(userId, undefined, cb);
        } else {
          console.log('Order : deleteOrder : error: Order.destroyAll: ', err);
          var error = new Error();
          error.message = 'Something went wrong and we couldn\'t delete the order. Write to us if this persists';
          error.errorCode = 'OTHER_ERROR';
          error.status = 500;
          cb(error, null);
        }
      });
  };

  Order.getAllOrders = function(version, req, cb) {
    switch (version.apiVersion) {
      case 'v2':
        var sentToken = req.headers.authorization;
        if (sentToken === undefined) {
          console.log('Order : getAllOrders : error: Auth Required, sentToken was : ', sentToken);
          var error = new Error();
          error.message = 'Authorization Required';
          error.errorCode = 'AUTH_REQUIRED';
          error.status = 401;
          cb(error, null);
          return;
        } else {
          // try to verify token
          verifyTokenAndProceed(sentToken, _actionCode.GET_ORDERS, null, cb);
        }

        break;
      default:
        console.log('Order : getAllOrders : error: invalid API version');
        var error = new Error();
        error.message = 'You must supply a valid api version';
        error.errorCode = 'INVALID_API_VERSION';
        error.status = 400;
        cb(error, null);
    }
  };

  Order.remoteMethod(
    'getAllOrders', {
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
        arg: 'items',
        description: 'Returns an HTTP 200, and the items in cart for this user, if everything goes well',
        type: [Order],
        root: true,
      },
    }
  );

  // DELETE Order by ID
  Order.deleteOrderByID = function(version, req, orderId, cb) {
    switch (version.apiVersion) {
      case 'v2':
        var sentToken = req.headers.authorization;
        if (sentToken === undefined) {
          console.log('Order : deleteOrderByID : error: Auth Required, sentToken was : ', sentToken);
          var error = new Error();
          error.message = 'Authorization Required';
          error.errorCode = 'AUTH_REQUIRED';
          error.status = 401;
          cb(error, null);
          return;
        } else {
          // try to verify token
          var body = {id: orderId};
          verifyTokenAndProceed(sentToken, _actionCode.DELETE_ORDER, body, cb);
        }

        break;
      default:
        console.log('Order : deleteOrderByID : error: invalid API version');
        var error = new Error();
        error.message = 'You must supply a valid api version';
        error.errorCode = 'INVALID_API_VERSION';
        error.status = 400;
        cb(error, null);
    }
  };

  Order.remoteMethod(
    'deleteOrderByID', {
      http: {
        path: '/:orderId',
        verb: 'delete',
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
        {
          arg: 'orderId',
          type: 'any',
        },
      ],
      returns: {
        arg: 'items',
        description: 'Returns an HTTP 200 if the deletion of an order was successful, and the remaining orders for this user',
        type: [Order],
        root: true,
      },
    }
  );
};
