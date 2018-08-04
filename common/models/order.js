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
var moment = require("moment");

module.exports = function (Order) {

	/**
	 * This method is accessed only through the Cart model now
	 * @param {*} body 
	 * @param {*} cb 
	 */
	Order.checkout = function (body, cb) {

		if (body === undefined ||
			body.userid === undefined) {

			var error = new Error("Supplied parameters are insufficient.");
			error.status = 400;
			cb(error, null);
			return;

		} else {
			var Cart = app.models.Cart;

			Cart.find({
				where: { userid: body.userid }
			},
				function (err, cartItems) {
					if (!err) {
						var orderid = Date.now();
						for (var item of cartItems) {
							var createdate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
							Order.create({
								orderid: orderid, cityid: item.cityid, userid: item.userid,
								thumburl: item.thumburl, unitprice: item.unitprice,
								quantity: item.quantity, totalprice: item.totalprice,
								createdate: createdate, updatedate: createdate
							},
								function (err, createResult) {
									console.log("ORDER: CREATE RESULT: ", createResult);
								});
						}
						//Order made, delete these items from cart
						Cart.destroyAll({
							where: { userid: body.userid }
						},
							function (err, result) {
								console.log("CART DELETE: ", result);
							});
						console.log("timestamp ", orderid);
						cb(null, cartItems);
					}
				});
		}
	};

	var _actionCode = Object.freeze({ GET_ORDERS: 1 });

	//Function to verify the token passed to it
	var verifyToken = function (token, actionCode, cb) {
		var Token = app.models.Token;
		Token.find({ where: { token: token } }, function (err, tokenFindResult) {

			if (!err) {
				tokenFindResult = tokenFindResult[0];

				var tokenIssuedDate = moment(tokenFindResult.createddate);
				var dateNow = moment();
				var diffInSecs = (dateNow.diff(tokenIssuedDate)) / 1000;

				var userId = tokenFindResult.userid;

				if (diffInSecs <= tokenFindResult.ttl) {
					//Token is still valid
					switch (actionCode) {
						case _actionCode.GET_ORDERS:
							// addItemToCart(body, userId, cb);
							// returnOrders(userId, cb);
							returnOrdersByUserId(userId, undefined, cb);
							break;
						default:
							var error = new Error("Operation Not Defined");
							error.status = 500;
							cb(error, null);
					}
				} else {
					//Token has expired
					var error = new Error("Token Expired");
					error.status = 401;
					cb(error, null);
				}
				return;
			}else{
				console.log("Error in finding provided Token: ",err);
				var error = new Error("Incorrect Authentication");
				error.status = 401;
				cb(error, null);
				return;
			}
		});
	}

	var returnOrdersByUserId = function(userId, orderId, cb) {

		if (orderId === undefined) {
			var whereClause = { userid: userId };
		} else {
			var whereClause = { userid: userId, orderid: orderId };
		}

		Order.find({
			where: whereClause,
			fields: { orderid: true, cityid: true, thumburl: true, quantity: true, totalprice: true, createdate: true }
		}, function (err, orders) {
			if (!err) {
				cb(null, orders);
			} else {
				var error = new Error("Something went wrong and we couldn't get the items of the order. Write to us if this persists");
				error.status = 500;
				error.error_code = "SERVER_ERROR";
				cb(error, null);
			}
		});
	}


	Order.getAllOrders = function(version, req, cb) {
		switch (version.apiVersion) {
			case 'v2':

				var sentToken = req.headers.authorization;
				if (sentToken === undefined) {
					var error = new Error("Authorization Required");
					error.status = 400;
					cb(error, null);
					return;
				} else {
					// try to verify token
					verifyToken(sentToken, _actionCode.GET_ORDERS, cb);
				}

				break;
			default:
				var error = new Error("You must supply a valid api version");
				error.status = 404;
				cb(error, null);
		}
	}

	Order.remoteMethod(
		'getAllOrders', {
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
						return { apiVersion: context.req.apiVersion };
					}
				},
				{
					arg: 'request',
					type: 'object',
					http: {
						source: 'req'
					}
				}
			],
			returns: {
				arg: 'items',
				description: 'Returns an HTTP 200, and the items in cart for this user, if everything goes well',
				type: [Order],
				root: true
			}
		}
	);

	

};
