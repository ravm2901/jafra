var express    = require("express");

var router = express.Router();



/* 
	server.com/app/ 
*/
router.get("/", function(req,res){
	res.send("Ok");
});



module.exports = router;