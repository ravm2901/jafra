'use strict';


var lib = require("./libraries");





module.exports =  function(req, res, db){


	var instance = {

		options : {
			req : req,
			res : res,
			db  : db
		},




		init: function(){
			//console.log(instance.options)
		},




		getData: function(done){

			var completed = 0;


			var params = {
				SHNPRO : lib.CONSTANTS.PROMO_ID,
				SHCONU : req.body.CTA_H,
				STPRID : lib.CONSTANTS.PROMO_ID
			}



			var json = {
					"consID" : -1, 
					"winner" : false,
					"name"   : "Not found", 
					"janTitle" :     "CON",
					"currentTitle" : "CON",
					"tripLevelAchieved" : "0",
					"ambLevelAchieved" : "0", 
					"eaSumTrip" :[
						[1, "120", "TLO"], 
						[2, "160", "AIT"], 
						[3, "240", "AITLFG"]
					], 
					"pointsEaTrip" : {
						"pointsEarned"      : 0,
						"achieved10BB"      : "NO",
						"achievedCDGrowth"  : "NO",
						"tripLevelAchieved" : "IN_PROGRESS"
					},
					"personalSpon" : {
						"newConsSpon"     : 0,
						"newCons500"      : 0,
						"businessBuilder" : 0
					},
					"activitiesToEarn" : [
						["PQNC", "", 0], 
						["PBB", "", 0], 
						["MPR", "500", 0], 
						["MPR", "1000", 0], 
						["MPR", "1500", 0] 
					]
				};



			var promise = new Promise( function(resolve, rejecte){


				lib.DBM.getParams('*', params, instance.options.db, function(err, rows){

					if(!err && rows.length > 0){
						return resolve(rows);
					}
					else{
						return reject( new Error('Unable to get parameters from DB') );
					}

				})

			});


			promise
				.then( (dataPromise) => {
					return new Promise( function(resolve, reject){
						var fields = "h.*, cu.ENAOCC as CUTI, be.ENAOCC as BETI," 
			                       +"	IFNULL(g.GONPRO,0) as GONPRO,"
								   +"   IFNULL(g.GOCONU,0) as GOCONU,"
								   +"   IFNULL(g.GOGMTH1,0) as GOGMTH1,"
								   +"   IFNULL(g.GOGMTH2,0) as GOGMTH2,"
								   +"   IFNULL(g.GOGMTH3,0) as GOGMTH3,"
								   +"   IFNULL(g.GOGMTH4,0) as GOGMTH4,"
								   +"   IFNULL(g.GOGMTH5,0) as GOGMTH5,"
								   +"   IFNULL(g.GOGMTH6,0) as GOGMTH6,"
								   +"   IFNULL(g.GORMTH1,0) as GORMTH1,"
								   +"   IFNULL(g.GORMTH2,0) as GORMTH2,"
								   +"   IFNULL(g.GORMTH3,0) as GORMTH3,"
								   +"   IFNULL(g.GORMTH4,0) as GORMTH4,"
								   +"   IFNULL(g.GORMTH5,0) as GORMTH5,"
								   +"   IFNULL(g.GORMTH6,0) as GORMTH6";

						lib.DBM.getActivity(fields, params, instance.options.db, function(err, rows){


							var pointsEarned     = rows[0].SHPBBP + rows[0].SHQNCP + rows[0].SHMPRP,
			                    achieved10BB     = (rows[0].SHTPANSNCA >= 10) ? 'YES' : 'NO';

			                var sumGrowth = (rows[0].GORMTH1 + rows[0].GORMTH2 + rows[0].GORMTH3 + rows[0].GORMTH4 + rows[0].GORMTH5 + rows[0].GORMTH6)
			                			  - (rows[0].GOGMTH1 + rows[0].GOGMTH2 + rows[0].GOGMTH3 + rows[0].GOGMTH4 + rows[0].GOGMTH5 + rows[0].GOGMTH6);

			                var achievedCDGrowth = (sumGrowth >= 0) ? 'YES' : 'NO';


			            	var tripLevelAchieved = 'IN_PROGRESS';

			                if(rows[0].SHLVLAT > 0 || rows[0].SHLVLATA > 0){
			                	tripLevelAchieved = 'COMPLETED';
			                }


							if(!err && rows.length > 0){
								
								json.consID                         = rows[0].SHCONU;
								json.name                           = rows[0].SHNADE;
								json.janTitle                       = rows[0].BETI;
								json.currentTitle                   = rows[0].CUTI;
								json.tripLevelAchieved              = rows[0].SHLVLAT;
								json.ambLevelAchieved               = rows[0].SHLVLATA;
								json.pointsEaTrip.pointsEarned      = pointsEarned;
								json.pointsEaTrip.achieved10BB      = achieved10BB;
								json.pointsEaTrip.achievedCDGrowth  = achievedCDGrowth;
								json.pointsEaTrip.tripLevelAchieved = tripLevelAchieved;
								json.personalSpon.newConsSpon       = rows[0].SHTPANSNC;
								json.personalSpon.newCons500        = rows[0].SHQNCT;
								json.personalSpon.businessBuilder   = rows[0].SHTPANSNCA;

								json.eaSumTrip[0][1]        = dataPromise[0].STLV1Q;
								json.eaSumTrip[1][1]        = dataPromise[0].STLV2Q;
								json.eaSumTrip[2][1]        = dataPromise[0].STLV3Q;

								json.activitiesToEarn[2][1] = dataPromise[0].STMPR1S;
								json.activitiesToEarn[3][1] = dataPromise[0].STMPR2S;
								json.activitiesToEarn[4][1] = dataPromise[0].STMPR3S;

								json.activitiesToEarn[0][2] = dataPromise[0].STPQNCP;
								json.activitiesToEarn[1][2] = dataPromise[0].STPBBP;
								json.activitiesToEarn[2][2] = dataPromise[0].STMPR1P;
								json.activitiesToEarn[3][2] = dataPromise[0].STMPR2P;
								json.activitiesToEarn[4][2] = dataPromise[0].STMPR3P;


								return resolve(true);
							}
							else{
								return reject( new Error('Unable to get info') );
							}

						});

					})

				})
				.then( (dataPromise) => {
					done(JSON.stringify(json));
				})
				.catch( (err) => {
					console.log(err.message);
					done(JSON.stringify(json));
				})

		}

	};


	return {
		init   : instance.init,
		getData: instance.getData
	}
}


