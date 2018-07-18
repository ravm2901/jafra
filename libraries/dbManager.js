'use strict';



var dbm = require('./core/DBM');




exports.getParams = function(fields, params, db, done) {


	var query =  "SELECT "+ fields +" FROM `prstsvn` AS p " 
 		      +"  WHERE p.STPRID=" + params.STPRID;



	var result = db.get().query(query, function (err, rows) {

		if (err){
			done(err, null);
		}

		done(null, rows);
	});

}









exports.getActivity = function(fields, params, db, done) {


	var query =  "SELECT "+ fields +" FROM `prsummhf` AS h" 
			  +"  LEFT JOIN `categf` as cu on cu.ENAOCO = h.SHCUTI"
			  +"  LEFT JOIN `categf` as be on be.ENAOCO = h.SHBETI"
			  +"  LEFT JOIN `prsummgf` as g on g.GONPRO = h.SHNPRO and g.GOCONU = h.SHCONU"
 		      +"  WHERE h.SHNPRO=" + params.SHNPRO + " And h.SHCONU = " + params.SHCONU;



	var result = db.get().query(query, function (err, rows) {

		if (err){
			done(err, null);
		}

		done(null, rows);
	});

}









exports.getActiPersPQNC = function(fields, params, db, done) {


	var query =  "SELECT IFNULL(SUM(C1),0) as C1," 
		      +"         IFNULL(SUM(C2),0) as C2," 
			  +"		 IFNULL(SUM(C3),0) as C3," 
			  +"		 IFNULL(SUM(C4),0) as C4," 
			  +"		 IFNULL(SUM(C5),0) as C5," 
			  +"		 IFNULL(SUM(C6),0) as C6"                                      
			  +"	FROM ("                                                               
			  +"	SELECT"                                                               
			  +"	CASE WHEN SDYEAR = 2017 AND SDMONTH =12 THEN COUNT(*) ELSE 0  END C1,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =01 THEN COUNT(*) ELSE 0  END C2,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =02 THEN COUNT(*) ELSE 0  END C3,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =03 THEN COUNT(*) ELSE 0  END C4,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =04 THEN COUNT(*) ELSE 0  END C5,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =05 THEN COUNT(*) ELSE 0  END C6" 
			  +"	FROM `prsummdf`"                                                        
			  +"	WHERE SDPA = " + params.SHCONU + " and SDQNCD <> 0"                                
			  +"	GROUP BY SDYEAR, SDMONTH) AS A";



	var result = db.get().query(query, function (err, rows) {

		if (err){
			done(err, null);
		}

		done(null, rows);
	});

}









exports.getActiPersPBB = function(fields, params, db, done) {


	var query =  "SELECT IFNULL(SUM(D1),0) as D1," 
		      +"         IFNULL(SUM(D2),0) as D2," 
			  +"		 IFNULL(SUM(D3),0) as D3," 
			  +"		 IFNULL(SUM(D4),0) as D4," 
			  +"		 IFNULL(SUM(D5),0) as D5," 
			  +"		 IFNULL(SUM(D6),0) as D6 "                                     
			  +"	FROM ("                                                               
			  +"	SELECT"                                                               
			  +"	CASE WHEN SDYEAR = 2017 AND SDMONTH =12 THEN COUNT(*) ELSE 0  END D1,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =01 THEN COUNT(*) ELSE 0  END D2,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =02 THEN COUNT(*) ELSE 0  END D3,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =03 THEN COUNT(*) ELSE 0  END D4,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =04 THEN COUNT(*) ELSE 0  END D5,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =05 THEN COUNT(*) ELSE 0  END D6 "
			  +"	FROM `prsummdf`"                                                        
			  +"	WHERE SDPA = " + params.SHCONU + " and SDACH = 'Y'"                                
			  +"	GROUP BY SDYEAR, SDMONTH) AS A";



	var result = db.get().query(query, function (err, rows) {

		if (err){
			done(err, null);
		}

		done(null, rows);
	});

}









exports.getActiPersMPRS = function(fields, params, db, done) {


	var query =  "SELECT IFNULL(SUM(G1),0) as G1," 
		      +"         IFNULL(SUM(G2),0) as G2," 
			  +"		 IFNULL(SUM(G3),0) as G3," 
			  +"		 IFNULL(SUM(G4),0) as G4," 
			  +"		 IFNULL(SUM(G5),0) as G5," 
			  +"		 IFNULL(SUM(G6),0) as G6 "                                     
			  +"	FROM ("                                                               
			  +"	SELECT"                                                               
			  +"	CASE WHEN SDYEAR = 2017 AND SDMONTH =12 THEN SUM(SDORS) ELSE 0  END G1,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =01 THEN SUM(SDORS) ELSE 0  END G2,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =02 THEN SUM(SDORS) ELSE 0  END G3,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =03 THEN SUM(SDORS) ELSE 0  END G4,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =04 THEN SUM(SDORS) ELSE 0  END G5,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =05 THEN SUM(SDORS) ELSE 0  END G6 "
			  +"	FROM `prsummdf`"                                                        
			  +"	WHERE SDCONU = " + params.SHCONU                                
			  +"	GROUP BY SDYEAR, SDMONTH) AS A";



	var result = db.get().query(query, function (err, rows) {

		if (err){
			done(err, null);
		}

		done(null, rows);
	});

}









exports.getActiPersPQNC2 = function(fields, params, db, done) {


	var query =  "SELECT IFNULL(SUM(C1),0) as E1," 
		      +"         IFNULL(SUM(C2),0) as E2," 
			  +"		 IFNULL(SUM(C3),0) as E3," 
			  +"		 IFNULL(SUM(C4),0) as E4," 
			  +"		 IFNULL(SUM(C5),0) as E5," 
			  +"		 IFNULL(SUM(C6),0) as E6 "                                     
			  +"	FROM ("                                                               
			  +"	SELECT"                                                               
			  +"	CASE WHEN SDYEAR = 2017 AND SDMONTH =12 THEN SUM(SDQNCP) ELSE 0  END C1,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =01 THEN SUM(SDQNCP) ELSE 0  END C2,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =02 THEN SUM(SDQNCP) ELSE 0  END C3,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =03 THEN SUM(SDQNCP) ELSE 0  END C4,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =04 THEN SUM(SDQNCP) ELSE 0  END C5,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =05 THEN SUM(SDQNCP) ELSE 0  END C6 "
			  +"	FROM `prsummdf`"                                                        
			  +"	WHERE SDPA = " + params.SHCONU                            
			  +"	GROUP BY SDYEAR, SDMONTH) AS A";



	var result = db.get().query(query, function (err, rows) {

		if (err){
			done(err, null);
		}

		done(null, rows);
	});

}









exports.getActiPersPBB2 = function(fields, params, db, done) {


	var query =  "SELECT IFNULL(SUM(D1),0) as F1," 
		      +"         IFNULL(SUM(D2),0) as F2," 
			  +"		 IFNULL(SUM(D3),0) as F3," 
			  +"		 IFNULL(SUM(D4),0) as F4," 
			  +"		 IFNULL(SUM(D5),0) as F5," 
			  +"		 IFNULL(SUM(D6),0) as F6 "                                     
			  +"	FROM ("                                                               
			  +"	SELECT"                                                               
			  +"	CASE WHEN SDYEAR = 2017 AND SDMONTH =12 THEN SUM(SDPBBP) ELSE 0  END D1,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =01 THEN SUM(SDPBBP) ELSE 0  END D2,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =02 THEN SUM(SDPBBP) ELSE 0  END D3,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =03 THEN SUM(SDPBBP) ELSE 0  END D4,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =04 THEN SUM(SDPBBP) ELSE 0  END D5,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =05 THEN SUM(SDPBBP) ELSE 0  END D6 "
			  +"	FROM `prsummdf`"                                                        
			  +"	WHERE SDPA = " + params.SHCONU                            
			  +"	GROUP BY SDYEAR, SDMONTH) AS A";



	var result = db.get().query(query, function (err, rows) {

		if (err){
			done(err, null);
		}

		done(null, rows);
	});

}









exports.getActiPersMPRS2 = function(fields, params, db, done) {


	var query =  "SELECT IFNULL(SUM(G1),0) as H1," 
		      +"         IFNULL(SUM(G2),0) as H2," 
			  +"		 IFNULL(SUM(G3),0) as H3," 
			  +"		 IFNULL(SUM(G4),0) as H4," 
			  +"		 IFNULL(SUM(G5),0) as H5," 
			  +"		 IFNULL(SUM(G6),0) as H6 "                                     
			  +"	FROM ("                                                               
			  +"	SELECT"                                                               
			  +"	CASE WHEN SDYEAR = 2017 AND SDMONTH =12 THEN SUM(SDMPRP) ELSE 0  END G1,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =01 THEN SUM(SDMPRP) ELSE 0  END G2,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =02 THEN SUM(SDMPRP) ELSE 0  END G3,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =03 THEN SUM(SDMPRP) ELSE 0  END G4,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =04 THEN SUM(SDMPRP) ELSE 0  END G5,"
			  +"	CASE WHEN SDYEAR = 2018 AND SDMONTH =05 THEN SUM(SDMPRP) ELSE 0  END G6 "
			  +"	FROM `prsummdf`"                                                        
			  +"	WHERE SDCONU = " + params.SHCONU                                
			  +"	GROUP BY SDYEAR, SDMONTH) AS A";



	var result = db.get().query(query, function (err, rows) {

		if (err){
			done(err, null);
		}

		done(null, rows);
	});

}