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

if (process.env.NODE_ENV !== 'demo') {
  console.log('Ignoring seed data.');
  process.exit(0);
}

console.log('Importing seed data.');
try {
  var mysql = require('mysql');
  var fs = require('fs');
  var readline = require('readline');
  var db;

  getDatabaseConnection();
  var dbIterations = 0;
  while (db == undefined) {
    dbIterations++;
    if (dbIterations > 120) {
      throw "Cannot connect to database";
    }

    setTimeout(getDatabaseConnection, 5000);
  }

  var rl = readline.createInterface({
    input: fs.createReadStream('./data/seed.sql'),
    terminal: false,
  });

  var sql = "";
  rl.on('line', function (chunk) {
    var line = chunk.toString('ascii');
    if (line.trim() == "" || line.startsWith("#")) {
      return
    }

    sql += line;
    if (line.endsWith(";")) {
      var query = sql;
      sql = "";
      db.query(query, function (err, sets, fields) {
        if (err) console.log(err);
      });
    }
  });
  rl.on('close', function () {
    console.log('finished');
    db.end();
  });
} catch (e) {
  console.log(e);
  process.exit(1);
}

function getDatabaseConnection() {
  db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
  db.connect();
  db.query('SELECT 1', function (error, results, fields) {
    if (error) {
      console.error(`Database not yet available: ${error.message}`);
    } else {
      console.error('Database connected.');
    }
  });
}
