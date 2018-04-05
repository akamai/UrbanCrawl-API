// 'use strict';

var app = require('../../server/server');

var unitprice;

module.exports = function(Cart) {

	Cart.addToCart = function(body, cb){
		console.log("##### cityId: "+body.cityid+", userID: "+body.userid+", Qty: "+body.qty);
		
		var City = app.models.City;

		City.find({
			where: {id: body.cityid}, 
			fields: {id:true, thumburl: true, tour_price: true}
		},
		function(err, result){
			console.log("######## CITY RESULT ", result);
			if(!err){
				unitprice = result[0].tour_price;
				Cart.updateAll({cityid: body.cityid, userid: body.userid},
							{quantity: body.qty, totalprice: result[0].tour_price*body.qty},
							function(err, info){
								console.log("#### UPDATE RESULT ", info);
								Cart.find({
									fields: {createdate:false, updatedate: false}
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

		

		// Cart.find({
  //   		where: {cityid: body.cityid, userid: body.userid},     		
  //   	},
		// function(err, result){
		// 	console.log("##### RESULTS: ",result);
		// 	if(!err){
		// 		if(result.length > 0){
		// 			if(qty === 0){
		// 				//delete existing item
		// 			}else{
		// 				//Update stuff
		// 				Cart.updateAll({cityid: body.cityid, userid: body.userid},
		// 					{quantity: qty, totalprice: result[0].unitprice*qty},
		// 					function(err, info){
		// 						console.log("#### UPDATE RESULT ", info);
		// 					});
		// 			}
		// 		}else{
		// 			// create a new
		// 		}
		// 		cb(null, result);
		// 	}else{
		// 		var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
		//   		error.status = 500;
		//   		cb(error, null);
		// 	}
		// });
	};

	Cart.remoteMethod(
	    'addToCart', {
	    	http: {
		        path: '/addToCart',
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
					Cart.updateAll({cityid: body.cityid, userid: body.userid},
						{quantity: body.qty, totalprice: result[0].tour_price*body.qty},
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
			//quantity delete the item
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
			
			// var City = app.models.City;
			// City.find({
			// 	where: {id: body.cityid}, 
			// 	fields: {id:true, thumburl: true, tour_price: true}
			// },
			// function(err, result){
			// 	if(!err){
			// 		unitprice = result[0].tour_price;
			// 		Cart.updateAll({cityid: body.cityid, userid: body.userid},
			// 			{quantity: body.qty, totalprice: result[0].tour_price*body.qty},
			// 			function(err, info){
			// 				console.log("#### UPDATE RESULT ", info);
							
			// 			});
			// 	}else{
			// 		var error = new Error("Something went wrong and we couldn't fulfil this request. Write to us if this persists");
			//   		error.status = 500;
			//   		cb(error, null);
			// 	}
			// });
	};


	Cart.remoteMethod(
	    'getCart', {
	    	http: {
		        path: '/getCart',
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
