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
