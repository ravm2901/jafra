'use strict';



var    db     = require("mysql"),
   CONSTANTS  = require("../constants"),
    async     = require("async");




var PRODUCTION_DB = CONSTANTS.PRO_DB,
          TEST_DB = CONSTANTS.DEV_DB;


exports.MODE_TEST       = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';



var state = {
	pool: null,
	mode: null,
}



exports.connect = function(mode, done) {

	state.pool = db.createPool({
		host: CONSTANTS.HOST,
		user: CONSTANTS.USER,
		password: CONSTANTS.PASSWORD,
		database: mode === exports.MODE_PRODUCTION ? CONSTANTS.PRO_DB : CONSTANTS.DEV_DB
	});


	state.mode = mode;
	done();
}




exports.get = function() {
	return state.pool
}




/**** Only for test ****/

exports.fixtures = function(data) {
	var pool = state.pool

	if (!pool) 
		return done(new Error('Missing database connection.'))

	var names = Object.keys(data.tables);

	async.each(names, function(name, cb) {
		async.each(data.tables[name], function(row, cb) {
	  		var keys = Object.keys(row),
	  		  	values = keys.map(function(key) { 
	  		  		return "'" + row[key] + "'" 
	  		  	});

		pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
	}, cb)
	}, done)
}




exports.drop = function(tables, done) {
	var pool = state.pool;

	if (!pool) 
		return done(new Error('Missing database connection.'))

	async.each(tables, function(name, cb) {
		pool.query('DELETE * FROM ' + name, cb)
	}, done)
}