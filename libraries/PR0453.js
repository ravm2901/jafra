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
					"personalActivity" : {
						"activity" : [
							["PQNC", 0, 0, 0, 0, 0, 0, 0], 
							["PBB", 0, 0, 0, 0, 0, 0, 0], 
							["MPRS", 0, 0, 0, 0, 0, 0, 0]
						],
						"pointsEarned" : [
							["PQNC", 0, 0, 0, 0, 0, 0, 0], 
							["PBB", 0, 0, 0, 0, 0, 0, 0], 
							["MPRS", 0, 0, 0, 0, 0, 0, 0]
						]
					},
					"centralDistrictSales" : [
						["CDPRSG", 0, 0, 0, 0, 0, 0], 
						["AS", 0, 0, 0, 0, 0, 0]
					]
				};





			var fields = "h.*, cu.ENAOCC as CUTI, be.ENAOCC as BETI," 
					   +" IFNULL(g.GONPRO,0) as GONPRO,"
					   +" IFNULL(g.GOCONU,0) as GOCONU,"
					   +" IFNULL(g.GOGMTH1,0) as GOGMTH1,"
					   +" IFNULL(g.GOGMTH2,0) as GOGMTH2,"
					   +" IFNULL(g.GOGMTH3,0) as GOGMTH3,"
					   +" IFNULL(g.GOGMTH4,0) as GOGMTH4,"
					   +" IFNULL(g.GOGMTH5,0) as GOGMTH5,"
					   +" IFNULL(g.GOGMTH6,0) as GOGMTH6,"
					   +" IFNULL(g.GORMTH1,0) as GORMTH1,"
					   +" IFNULL(g.GORMTH2,0) as GORMTH2,"
					   +" IFNULL(g.GORMTH3,0) as GORMTH3,"
					   +" IFNULL(g.GORMTH4,0) as GORMTH4,"
					   +" IFNULL(g.GORMTH5,0) as GORMTH5,"
					   +" IFNULL(g.GORMTH6,0) as GORMTH6";

			lib.DBM.getActivity(fields, params, instance.options.db, function(err, rows){

				//console.log('==>', rows[0].GOCONU);

				var pointsEarned     = rows[0].SHPBBP + rows[0].SHQNCP + rows[0].SHMPRP,
                    achieved10BB     = (rows[0].SHTPANSNCA >= 10) ? 'YES' : 'NO';

                var sumGrowth = (rows[0].GORMTH1 + rows[0].GORMTH2 + rows[0].GORMTH3 + rows[0].GORMTH4 + rows[0].GORMTH5 + rows[0].GORMTH6)
                			  - (rows[0].GOGMTH1 + rows[0].GOGMTH2 + rows[0].GOGMTH3 + rows[0].GOGMTH4 + rows[0].GOGMTH5 + rows[0].GOGMTH6);

                var achievedCDGrowth = (sumGrowth >= 0) ? 'YES' : 'NO';


            	var tripLevelAchieved = 'IN_PROGRESS';
                if(rows[0].SHLVLAT > 0 || rows[0].SHLVLATA > 0){
                	tripLevelAchieved = 'COMPLETED';
                }


				if(rows.length > 0){
					
					json.consID            = rows[0].SHCONU;
					json.name              = rows[0].SHNADE;
					json.janTitle          = rows[0].BETI;
					json.currentTitle      = rows[0].CUTI;
					json.tripLevelAchieved = rows[0].SHLVLAT;
					json.ambLevelAchieved  = rows[0].SHLVLATA;

					json.centralDistrictSales[0][1] = rows[0].GOGMTH1;
					json.centralDistrictSales[0][2] = rows[0].GOGMTH2;
					json.centralDistrictSales[0][3] = rows[0].GOGMTH3;
					json.centralDistrictSales[0][4] = rows[0].GOGMTH4;
					json.centralDistrictSales[0][5] = rows[0].GOGMTH5;
					json.centralDistrictSales[0][6] = rows[0].GOGMTH6;

					json.centralDistrictSales[1][1] = rows[0].GORMTH1;
					json.centralDistrictSales[1][2] = rows[0].GORMTH2;
					json.centralDistrictSales[1][3] = rows[0].GORMTH3;
					json.centralDistrictSales[1][4] = rows[0].GORMTH4;
					json.centralDistrictSales[1][5] = rows[0].GORMTH5;
					json.centralDistrictSales[1][6] = rows[0].GORMTH6;




					lib.DBM.getActiPersPQNC(fields, params, instance.options.db, function(err, rowsC){

						json.personalActivity.activity[0][1] = rowsC[0].C1;
						json.personalActivity.activity[0][2] = rowsC[0].C2;
						json.personalActivity.activity[0][3] = rowsC[0].C3;
						json.personalActivity.activity[0][4] = rowsC[0].C4;
						json.personalActivity.activity[0][5] = rowsC[0].C5;
						json.personalActivity.activity[0][6] = rowsC[0].C6;
						json.personalActivity.activity[0][7] = rows[0].SHQNCT;

						completed++;
					});



					lib.DBM.getActiPersPBB(fields, params, instance.options.db, function(err, rowsD){

						json.personalActivity.activity[1][1] = rowsD[0].D1;
						json.personalActivity.activity[1][2] = rowsD[0].D2;
						json.personalActivity.activity[1][3] = rowsD[0].D3;
						json.personalActivity.activity[1][4] = rowsD[0].D4;
						json.personalActivity.activity[1][5] = rowsD[0].D5;
						json.personalActivity.activity[1][6] = rowsD[0].D6;
						json.personalActivity.activity[1][7] = rows[0].SHTPANSNCA;

						completed++;
					});



					lib.DBM.getActiPersMPRS(fields, params, instance.options.db, function(err, rowsG){

						json.personalActivity.activity[2][1] = rowsG[0].G1;
						json.personalActivity.activity[2][2] = rowsG[0].G2;
						json.personalActivity.activity[2][3] = rowsG[0].G3;
						json.personalActivity.activity[2][4] = rowsG[0].G4;
						json.personalActivity.activity[2][5] = rowsG[0].G5;
						json.personalActivity.activity[2][6] = rowsG[0].G6;
						json.personalActivity.activity[2][7] = rows[0].SHTMPRS;

						completed++;
					});



					lib.DBM.getActiPersPQNC2(fields, params, instance.options.db, function(err, rowsE){

						json.personalActivity.pointsEarned[0][1] = rowsE[0].E1;
						json.personalActivity.pointsEarned[0][2] = rowsE[0].E2;
						json.personalActivity.pointsEarned[0][3] = rowsE[0].E3;
						json.personalActivity.pointsEarned[0][4] = rowsE[0].E4;
						json.personalActivity.pointsEarned[0][5] = rowsE[0].E5;
						json.personalActivity.pointsEarned[0][6] = rowsE[0].E6;
						json.personalActivity.pointsEarned[0][7] = rows[0].SHQNCP;

						completed++;
					});



					lib.DBM.getActiPersPBB2(fields, params, instance.options.db, function(err, rowsF){

						json.personalActivity.pointsEarned[1][1] = rowsF[0].F1;
						json.personalActivity.pointsEarned[1][2] = rowsF[0].F2;
						json.personalActivity.pointsEarned[1][3] = rowsF[0].F3;
						json.personalActivity.pointsEarned[1][4] = rowsF[0].F4;
						json.personalActivity.pointsEarned[1][5] = rowsF[0].F5;
						json.personalActivity.pointsEarned[1][6] = rowsF[0].F6;
						json.personalActivity.pointsEarned[1][7] = rows[0].SHPBBP;

						completed++;
					});



					lib.DBM.getActiPersMPRS2(fields, params, instance.options.db, function(err, rowsH){

						json.personalActivity.pointsEarned[2][1] = rowsH[0].H1;
						json.personalActivity.pointsEarned[2][2] = rowsH[0].H2;
						json.personalActivity.pointsEarned[2][3] = rowsH[0].H3;
						json.personalActivity.pointsEarned[2][4] = rowsH[0].H4;
						json.personalActivity.pointsEarned[2][5] = rowsH[0].H5;
						json.personalActivity.pointsEarned[2][6] = rowsH[0].H6;
						json.personalActivity.pointsEarned[2][7] = rows[0].SHMPRP;

						completed++;
					});

				}


				completed++;
			});




			var interval = setInterval(function(){
				if(completed == 7){
					clearInterval(interval);
					done(JSON.stringify(json));
				}

			}, 100);

		}

	};


	return {
		init   : instance.init,
		getData: instance.getData
	}
}


