'use strict';
var sql = require('mssql');
    // database config
    var sqlConfig = {
        user: 'sa',
        password: '123456789',
        server: 'DESKTOP\\SQLEXPRESS', 
        database: 'Thesis',
	"dialect": "mssql",
	"dialectOptions": {
	"instanceName": "SQLEXPRESS"
	}
    };
sql.connect(sqlConfig);

module.exports = sql;

 
