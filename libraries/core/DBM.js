'use strict';



var dbConnect = require('./dbConnect');




exports._insert = function(table, data) {
  
	/*
		data = [
			{
				field1: "value1",
				field2: "value2",
				field3: "value3"
				...
			}
		]
	*/

	var str1 = "",
		str2 = "",
		values = [];

	data.forEach(function(item){
		Object.keys(item).forEach(function(key){
			str1 += "`" + key + "`,";
			str2 += "?,";	
		})

		values = item;
	})


	dbConnect.get().query('INSERT INTO '+ table +' ('+ str1 +') VALUES(' + str2 + ')', values, function(err, result) {

		if (err) 
			return done(err)

		done(null, result.insertId)
	})

}









exports._delete = function(table, where) {
  

	if(where.length > 0){
		where = ' WHERE' + where;
	}

	dbConnect.get().query('DELETE FROM '+ table + where, function(err, result) {

		if (err) 
			return done(err);

		done(null, result.affectedRows);
	})
}









exports._update = function(table, data, where, bool=false) {
  
	/* data must be in this format
		data = [
				{
					"field1": "val1",
					"field2": "val2",
					"field3": "val3"
				},
				{
					"field1": "val1",
					"field2": "val2",
					"field3": "val3"
				}
			]
	*/
	var str = "";

	if(bool){
		data.forEach(function(item){
			Object.keys(item).forEach(function(key){
				str += key + "='" + item[key] + "', ";	
			})
			
		})
	}
	else{
		data.forEach(function(item){
			Object.keys(item).forEach(function(key){
				str += key + '=' + item[key] + ', ';	
			})
			
		})	
	}


	str = str.substr(0, str.length - 2);


	if(where.length > 0){
		where = ' WHERE' + where;
	}



	dbConnect.get().query('UPDATE '+ table + ' SET ' + str + ' ' + where, function(err, result) {

		if (err) 
			return done(err);

		done(null, result.affectedRows);
	})
}




