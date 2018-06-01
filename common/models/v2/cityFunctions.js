var getAllCities = function(City, cb){
	City.find({fields: {id:true, name: true, countryname: true, lat: true, lng: true, thumburl: true, description: true, tour_price: true} },
		function(err, result){
			if(!err){
				cb(null, result);	
			}else{
				var error = new Error("Something went wrong and we couldn't fulfill this request. Write to us if this persists");
		  		error.status = 500;
		  		cb(error, null);
			}
		});
}