'use strict';



var express    = require("express"),
	    fs     = require("fs"),
        lib    = require("./libraries/libraries"),
        db     = require('./libraries/core/dbConnect'),
    bodyParser = require("body-parser"),
    router     = require("./routes");



var PR0452 = require('./libraries/PR0452');
var PR0453 = require('./libraries/PR0453');




var app = express();


app.set("view engine", "vash");


app.use("/assets", express.static('css'));
app.use("/assets", express.static('js'));
app.use("/assets", express.static('images'));
app.use("/assets", express.static('fonts'));
app.use("/assets", express.static('localize'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




db.connect(db.MODE_PRODUCTION, function(err) {
	if (err) {
		console.log('Unable to connect to MySQL.')
		process.exit(1)
	}
})


/*for(var i in data){
	for(var j in data[i]){

		console.log(i, '--', data[i][j]);
	}
}*/









app.get("/:name?", function(req, res, next){


	if(typeof(req.params.name) === "undefined"){
		req.params.name = "activity";   
	}


	var d = new Date();

	var data = {
		title: "JAFRA :: Summer Trip 2018",
		year: d.getFullYear()
	}

	
	res.render('summerTrip2018_' + req.params.name, data);
	

});









app.post("/:cls?", function(req, res){
    
	var response = "";


	switch(req.params.cls){
		case 'PR0452':
			var objPR0452 = PR0452(req, res, db);
			objPR0452.init();

			objPR0452.getData(function(json){
				res.setHeader("Content-Type", "text/json");
				res.send(json);
			});
			break;

		case 'PR0453':
			var objPR0453 = PR0453(req, res, db);
			objPR0453.init();

			objPR0453.getData(function(json){
				res.setHeader("Content-Type", "text/json");
				res.send(json);
			});
			break;
		default:
			console.log("POST -- Default");
			break;
	}

	

});



//app.use("/app", lib.checkSession);
app.use("/app", router);



app.listen(8081);