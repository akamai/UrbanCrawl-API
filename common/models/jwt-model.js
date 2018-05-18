'use strict';

module.exports = function(Jwtmodel) {

	Jwtmodel.printkeys = function(cb){
		var jwt = require('jsonwebtoken');
		var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

		cb(null, token);
	};

	Jwtmodel.remoteMethod(
    'printkeys', {
      http: {
        path: '/printkeys',
        verb: 'get'
      },
      returns: {
	    arg: 'key',
	    description: 'Returns a JWT key',
	    type: 'string'
      }
    }
  );

};


