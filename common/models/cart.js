// 'use strict';

var app = require('../../server/server');

var unitprice;
var moment = require("moment");

//--------------------- ADD TO CART ------------
module.exports = function(Cart) {

	Cart.addToCart = function(body, cb){
		console.log("##### cityId: "+body.cityid+", userID: "+body.userid+", Qty: "+body.qty);
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
			console.log("######## CITY RESULT ", cityResult);
			if(!err){
				unitprice = cityResult[0].tour_price;
				Cart.find({
					where: {cityid: body.cityid, userid: body.userid}
				}, function(err, cartResult){
					if(!err){
						console.log("######### COUNT ", cartResult.length);
						if(cartResult.length > 0){
							//There are items which should be updated
							var newQuantity = cartResult[0].quantity+body.qty;
							var dateNow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
							Cart.updateAll(
								{cityid: body.cityid, userid: body.userid},
								{quantity: newQuantity, totalprice: (cityResult[0].tour_price*newQuantity),
									updatedate: dateNow},
								function(err, updateInfo){
									console.log("#### UPDATE RESULT ", updateInfo);
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
							//Add new items
							console.log("##### ADDING NEW ITEM");
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
	};

	Cart.remoteMethod(
	    'addToCart', {
	    	http: {
		        path: '/',
		        verb: 'post'
	    	},
	    	accepts: {
		      	arg: 'items', 
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


//------------- UPDATE THE CART ----------------

	Cart.updateCart = function(body, cb){
		
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
	};


	Cart.remoteMethod(
	    'updateCart', {
	    	http: {
		        path: '/updateCart',
		        status: 200
	    	},
	    	accepts: {
		      	arg: 'items', 
		      	type: 'any', 
		      	http: {
		      		source: 'body'
		      	}
		    },
	    	returns: {
				arg: 'item',
				description: 'Returns an HTTP 200, cityid of the item updated, along with the total amount, if everything goes well',
				type: 'any'
	    	}
		}
	);




// ---------------- Show all cart items ----------

Cart.getCart = function(userid, cb){

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
};


	Cart.remoteMethod(
	    'getCart', {
	    	http: {
		        path: '/',
		      	verb: 'get'
	    	},
	    	accepts: {
		      	arg: 'userid', 
		      	type: 'number', 
		      	http: {
		      		source: 'query'
		      	}
		    },
	    	returns: {
				arg: 'item',
				description: 'Returns an HTTP 200, and all the cart items, if everything goes well',
				type: 'any'
	    	}
		}
	);
};
