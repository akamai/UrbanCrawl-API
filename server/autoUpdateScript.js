var server = require('./server');
var ds = server.dataSources.terraplanet-db-heroku;
var lbTables = ['cart', 'User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
ds.autoupdate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});

