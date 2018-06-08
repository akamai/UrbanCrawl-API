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

module.exports = function(Order) {


	Order.checkout = function(body, cb){

		if(body === undefined ||
			body.userid === undefined){

			var error = new Error("Supplied parameters are insufficient.");
	  		error.status = 400;
	  		cb(error, null);
	  		return;

		}else{
			var Cart = app.models.Cart;

			Cart.find({
				where : {userid: body.userid}
				},
				function(err, cartItems){
					if(!err){
						var orderid = Date.now();
						for(var item of cartItems){
							var createdate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
							Order.create({
								orderid: orderid, cityid: item.cityid, userid: item.userid,
								thumburl: item.thumburl, unitprice: item.unitprice,
								quantity: item.quantity, totalprice: item.totalprice,
								createdate: createdate, updatedate: createdate
								},
								function(err, createResult){
									console.log("ORDER: CREATE RESULT: ", createResult);
								});
						}
						//Order made, delete these items from cart
						Cart.destroyAll({
							where: {userid: body.userid}},
							function(err, result){
								console.log("CART DELETE: ", result);
							});
						console.log("timestamp ", orderid);
						cb(null, cartItems);
					}
				});
		}
	};

	Order.remoteMethod(
	    'checkout', {
	    	http: {
		        path: '/checkout',
		        status: 200
	    	},
	    	accepts: {
		      	arg: 'params',
		      	type: 'any',
		      	http: {
		      		source: 'body'
		      	}
		    },
	    	returns: {
				arg: 'items',
				description: 'Returns an HTTP 200, and the items in cart for this user, if everything goes well',
				type: 'any'
	    	}
		}
	);

};
