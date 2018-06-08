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

// 'use strict';

var app = require('../../server/server');

var unitprice;
var moment = require("moment");

//--------------------- ADD TO CART ------------
module.exports = function(Cart) {

	//Add new items
	// {
	// "cityid": 44,
	// "userid" : "user-id",
	// "qty":2
	// }
	Cart.addToCart = function(version, body, cb){

		switch(version.apiVersion){
	      case 'v2':

	      	if(body === undefined || 
				body.cityid === undefined || 
				body.userid === undefined ||
				body.qty === undefined){
				
				var error = new Error("Supplied parameters are insufficient.");
		  		error.status = 400;
		  		cb(error, null);
		  		return;
			}
			var City = app.models.City;

			City.find({
				where: {id: body.cityid}, 
				fields: {id:true, thumburl: true, tour_price: true}
			},
			function(err, cityResult){
				if(!err){
					unitprice = cityResult[0].tour_price;
					Cart.find({
						where: {cityid: body.cityid, userid: body.userid}
					}, function(err, cartResult){
						// The item exists, update it's details
						if(!err){
							console.log("CART: Existing Items Length: ", cartResult.length);
							if(cartResult.length > 0){
								//There are items which should be updated
								console.log("CART: UPDATING EXISTING ITEM");
								var newQuantity = cartResult[0].quantity+body.qty;
								var dateNow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
								Cart.updateAll(
									{cityid: body.cityid, userid: body.userid},
									{quantity: newQuantity, totalprice: (cityResult[0].tour_price*newQuantity),
										updatedate: dateNow},
									function(err, updateInfo){
										console.log("CART: UPDATE RESULT ", updateInfo);
										Cart.find({
											where: {cityid: body.cityid, userid: body.userid},
											fields: {createdate:false, updatedate: false}
										},
										function(err, cartUpdateResult){
											if(!err){
												cb(null, cartUpdateResult);
											}else{
												var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
										  		error.status = 500;
										  		cb(error, null);
											}
										});
								});
							}else{
								
								console.log("CART: ADDING NEW ITEM");
								var dateNow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
								Cart.create(
									{cityid: body.cityid, userid: body.userid, thumburl: cityResult[0].thumburl, 
										unitprice: cityResult[0].tour_price, quantity: body.qty, 
										totalprice: (cityResult[0].tour_price*body.qty), createdate: dateNow,
										updatedate: dateNow},
									function(err, createResult){
										if(!err){
											//return a total number of items for this user
											Cart.count({
												userid:body.userid},
												function(err, count){
													if(!err){
														cb(null, count);
													}else{
														var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
												  		error.status = 500;
												  		cb(error, null);
													}
												});
										}else{
											var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
									  		error.status = 500;
									  		cb(error, null);
										}
									});
							}
						}else{
							var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
					  		error.status = 500;
					  		cb(error, null);
						}
					});
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

	Cart.remoteMethod(
	    'addToCart', {
	    	http: {
		        path: '/',
		        verb: 'post'
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
			      	arg: 'items', 
			      	type: 'any', 
			      	http: {
			      		source: 'body'
			      	}
			    }
		    ],
	    	returns: {
				arg: 'items',
				description: 'Returns an HTTP 200, and the items in cart for this user, if everything goes well',
				type: 'any'
	    	}
		}
	);


//------------- UPDATE THE CART ----------------
/**
* this method is not visible now, since the POST addToCart takes care of amendment of the cart items
**/

	Cart.updateCart = function(version, body, cb){
		
		switch(version.apiVersion){
	      case 'v2':
	      	var City = app.models.City;
			if(body.qty > 0){
				City.find({
					where: {id: body.cityid}, 
					fields: {id:true, thumburl: true, tour_price: true}
				},
				function(err, result){
					if(!err){
						unitprice = result[0].tour_price;
						var dateNow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
						Cart.updateAll({cityid: body.cityid, userid: body.userid},
							{quantity: body.qty, totalprice: result[0].tour_price*body.qty,
								updatedate: dateNow},
							function(err, info){
								console.log("#### UPDATE RESULT ", info);
								Cart.find({
									where: {cityid: body.cityid, userid: body.userid},
									fields: {cityid:true, quantity:true, totalprice: true}
								},
								function(err, result){
									if(!err){
										cb(null, result);
									}else{
										var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
								  		error.status = 500;
								  		cb(error, null);
									}
								});
							});
					}else{
						var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
				  		error.status = 500;
				  		cb(error, null);
					}
				});
			}else{
				//quantity 0, delete the item
				Cart.destroyAll({
					where: {cityid: body.cityid, userid: body.userid}},
					function(err, result){
						if(!err){
							console.log("########## DELETION RESULT: ",result);
							if(result.count >= 1){
								//respond with updated cart
								Cart.find({
									where: {cityid: body.cityid, userid: body.userid},
									fields: {cityid:true, quantity:true, totalprice: true}
								},
								function(err, result){
									if(!err){
										cb(null, result);
									}else{
										var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
								  		error.status = 500;
								  		cb(error, null);
									}
								});
							}else{
								var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
						  		error.status = 500;
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


	Cart.remoteMethod(
	    'updateCart', {
	    	http: {
		        path: '/updateCart',
		        status: 200
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
			      	arg: 'items', 
			      	type: 'any', 
			      	http: {
			      		source: 'body'
			      	}
			    }
		    ],
	    	returns: {
				arg: 'item',
				description: 'Returns an HTTP 200, cityid of the item updated, along with the total amount, if everything goes well',
				type: 'any'
	    	}
		}
	);




// ---------------- Show all cart items ----------

	Cart.getCart = function(version, userid, cb){

		switch(version.apiVersion){
	      case 'v2':
			if(userid === undefined){
				var error = new Error("No id was supplied. You must supply a user id");
				error.status = 404;
				cb(error, null);
			}else{
				Cart.find({
					where: {userid: userid},
					fields: {cityid:true, quantity:true, totalprice: true}
				},
				function(err, result){
					if(!err){
						cb(null, result);
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


	Cart.remoteMethod(
	    'getCart', {
	    	http: {
		        path: '/:userId',
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
			      	arg: 'userid', 
			      	type: 'string',
			      	required: true
			    }
		    ],
	    	returns: {
				arg: 'item',
				description: 'Returns an HTTP 200, and all the cart items, if everything goes well',
				type: 'any'
	    	}
		}
	);

// ---------------- Checkout ----------

	Cart.checkout = function(version, body, cb){


		switch(version.apiVersion){
	      case 'v2':
	      	var app = require('../../server/server');
			var Order = app.models.Order;
	    	Order.checkout(body, cb);
	      break;
	      default:
	        var error = new Error("You must supply a valid api version");
	        error.status = 404;
	        cb(error, null);
	    }
	};


	Cart.remoteMethod(
	    'checkout', {
	    	http: {
		        path: '/checkout',
		      	verb: 'put'
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
			      	arg: 'params', 
			      	type: 'any', 
			      	http: {
			      		source: 'body'
			      	}
			    }
		    ],
	    	returns: {
				arg: 'items',
				description: 'Returns an HTTP 200, and the items in cart for this user, if everything goes well',
				type: 'any'
	    	}
		}
	);
};
