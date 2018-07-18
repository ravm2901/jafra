'use strict';



var DBM       = require("./dbManager"),
    CONSTANTS = require("./constants");



var parseURL = function(request){
	var params = [],
	    pars   = {};

	if(request.url.indexOf("?") > 0){

		var url = request.url.split("?");
		params = url[1].split("&");

	}

	for(var i = 0; i < params.length; i++){

		var param = params[i].split("=");
		pars[param[0]] = param[1];
	}

	return pars;
}





var render = function(html, data){

	console.log(data);

	var replace = html.match(/[^\{\}]+(?=\})/g);

	for(var i = 0; i < replace.length; i++){
		if(typeof data[replace[i]] === "undefined"){
			html = html.replace("{" + replace[i] + "}", '');
		}
		else{
			html = html.replace("{" + replace[i] + "}", data[replace[i]]);
		}
	}

	return html;
}




module.exports.parseURL  = parseURL;
module.exports.render    = render;
module.exports.CONSTANTS = CONSTANTS;
module.exports.DBM       = DBM;