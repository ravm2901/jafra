/**
 * V 1.0
 * @author Rodolfo A. Vilchis M.
 * Date: 2017-12-13
 */


/************************************* UI CONTROLERS - STEP 1 ****************************************/
(function($){
    
	$.UI_Acti_Deta = function(options) {
		UI_acti_deta = {
	

			options: $.extend( {
				
				btnReturn                : $('#btn-return'),
				btnPersonalDetails       : $('#btn-personal-details'),
				btnCentralDetails        : $('#btn-central-details'),
				
				rowAMBHead               : $('#ambLabelDataHead'),
				rowHideCON               : $('.rowHideCON'),
				
				divError                 : $('#summer-errors'),
				
				fieldConsId              : $('#consID'),
				fieldJanTitle            : $('#janTitle'),
				fieldName                : $('#name'),
				fieldCurrentTitle        : $('#currentTitle'),
				fieldTripLevelAchieved   : $('#tripLevelAchieved'),
				fieldAMBLevelAchievedHead: $('#ambLevelAchievedHead'),
				
				tableActivityPersonal    : $('#summer-activity2-personal')
				
			}, options),
			
			
			/* Private values */
			

			
			
			init: function(){
						
				UI_acti_deta.options.rowAMBHead.hide();
				
						
				if(window.location.hash) {
					var hash = window.location.hash.substring(1);
					var inf  = hash.split("_");
					
					if(inf.length >= 2){
						CONSTANTS.consId   = inf[0];
						CONSTANTS.language = inf[1];
						
						UI_acti_deta._setElements_UI();
					}
					else{
						document.location.href = CONSTANTS.htmlActivity + '?t='+ new Date().getTime()
					}
				
				}
				else{
					document.location.href = CONSTANTS.htmlActivity + '?t='+ new Date().getTime()					
				}
					
				
				
				
			},
			
			
			
			
			translateUI: function(){
			
				// translate page
				$('[data-localize]').each(function(i){
					var path = $(this).attr('data-localize');
					$(this).text(searchJSON(translate, path));
					
					path = $(this).prop('title'); 
					
					if(path != ""){
						$(this).prop('title', searchJSON(translate, path));
					}
				});
			
			},
			

			
			
			registerUIActions: function() {
			
				UI_acti_deta.options.btnReturn.click(function(e){
					e.preventDefault();
					
					document.location.href = CONSTANTS.htmlActivity + '?t='+ new Date().getTime() +'#' + CONSTANTS.consId + '_' + CONSTANTS.language;
					
					
				});
				
				
				
				UI_acti_deta.options.btnPersonalDetails.click(function(e){
					e.preventDefault();
					
					document.location.href = CONSTANTS.htmlSponsor + '?t='+ new Date().getTime() +'#' + CONSTANTS.consId + '_' + CONSTANTS.language;
					
					
				});
				
				
				UI_acti_deta.options.btnCentralDetails.click(function(e){
					e.preventDefault();
					
					document.location.href = CONSTANTS.htmlCentral + '?t='+ new Date().getTime() +'#' + CONSTANTS.consId + '_' + CONSTANTS.language;
										
				});
				
				
								
				
			},
			
			
			
			
			
			/*Private methods*/		
			_getInfoFields: function(){				
				$.ajax({
					url:  CONSTANTS.rootURL + CONSTANTS.pgmActiDeta,
					async: true,
					data: 'CTA_H='+ CONSTANTS.consId,
					
					beforeSend: function(obj){
						timeLoad = setTimeout(function(){
							UI_acti_deta.options.divError.html('<i class="fa myspin fa-refresh"></i> ' + translate.commons.timeToLoad);
							UI_acti_deta.options.divError.css('display', 'block');
							
							tooTimeLoad = setTimeout(function(){
								obj.parent().parent().find('td:nth-child(4)').html('<i class="fa myspin fa-refresh"></i> ' + translate.commons.tooTimeToLoad);
								UI_acti_deta.options.divError.css('display', 'block');
							}, CONSTANTS.tooTimeToLoad);
							
						}, CONSTANTS.timeToLoad);
					},
				
					complete: function(obj, success){},
					
					error: function(obj, what, otherObj){	
						console.log("Error load:", obj, what, otherObj);
						
						clearTimeout(timeLoad);
						clearTimeout(tooTimeLoad);
						
						
						UI_acti_deta.options.divError.html('Error loading information. Please check your internet connection and try again.');
						UI_acti_deta.options.divError.css('display', 'block');
						
					},
							
					success: function(dat){},
					
					cache: true,
					timeout: CONSTANTS.maxTimeAjaxLoad,
					type: 'post'
						
				}).always(function() {
								  
				}).done(function(response){
					
					clearTimeout(timeLoad);
					clearTimeout(tooTimeLoad);
					
					if(response.consID > 0){
					
						if(response.janTitle == 'AMB'){
							UI_acti_deta.options.rowAMBHead.show();
							UI_acti_deta.options.fieldAMBLevelAchievedHead.text(response.ambLevelAchieved);
							UI_acti_deta.options.rowHideCON.show();
						}
						else{
							
							if(response.janTitle == 'CON'){
								UI_acti_deta.options.rowHideCON.hide();
							}
							else{
								UI_acti_deta.options.rowHideCON.show();
							}
							
							
							UI_acti_deta.options.rowAMBHead.hide();
						}
					
						UI_acti_deta.options.fieldConsId.text(response.consID);
						UI_acti_deta.options.fieldJanTitle.text(translate.commons.titles[response.janTitle]);
						UI_acti_deta.options.fieldName.text(response.name);
						UI_acti_deta.options.fieldCurrentTitle.text(translate.commons.titles[response.currentTitle]);
						UI_acti_deta.options.fieldTripLevelAchieved.text(response.tripLevelAchieved);
						
						UI_acti_deta._buildActivityPersonal(response.personalActivity);
						UI_acti_deta._buildCentralDisctrict(response.centralDistrictSales);
						
						
					}
					else{			
						UI_acti_deta.options.divError.html('Consultant not found.');
						UI_acti_deta.options.divError.css('display', 'block');
						
					}
					
				});
			},
			
			
			
			
			
			
			
			
			
			_buildActivityPersonal: function(data){
			
				try{
					
									
					for(var i = 0; i < data.activity.length; i++){
						
						var tr  = $('#activity-' + data.activity[i][0]);
						var col = "";
						
						for(var j = 0; j < data.activity[i].length; j++){
							
							if(j == 0){
								if(typeof translate.summer.activityDeta.actiPersonal[data.activity[i][j]] == "string"){
									col += '<td>' + translate.summer.activityDeta.actiPersonal[data.activity[i][j]] + '</td>';
								}
								else{									
									col += '<td>' + $.number(data.activity[i][j]) + '</td>';
								}
							}
							else{
								col += '<td>' + $.number(data.activity[i][j]) + '</td>';
							}
							
							
							
							
						}
						
						$('#activity-' + data.activity[i][0]).append(col);
					}
					
					
					
					
					
					var pointsEarnedSum = ["TP", 0, 0, 0, 0, 0, 0, 0];
					
					
					for(var j = 1; j < data.pointsEarned[0].length; j++){
						for(var i = 0; i < data.pointsEarned.length; i++){
							pointsEarnedSum[j] += data.pointsEarned[i][j];
						}
					}
										
					
					data.pointsEarned.push(pointsEarnedSum);
					
					
					
					for(var i = 0; i < data.pointsEarned.length; i++){
						
						var tr  = $('#pointsEarned-' + data.pointsEarned[i][0]);
						var col = "";
						
						for(var j = 0; j < data.pointsEarned[i].length; j++){
							
							
							if(j == 0){
								if(typeof translate.summer.activityDeta.actiPersonal[data.pointsEarned[i][j]] == "string"){
									col += '<td>' + translate.summer.activityDeta.actiPersonal[data.pointsEarned[i][j]] + '</td>';
								}
								else{									
									col += '<td>' + $.number(data.pointsEarned[i][j]) + '</td>';
								}
							}
							else{
								col += '<td>' + $.number(data.pointsEarned[i][j]) + '</td>';
							}
							
							
							
						}
						
						$('#pointsEarned-' + data.pointsEarned[i][0]).append(col);
					}
					
					
				}
				catch(e){
					console.log("Exception: " + e);
				}
				
			},
			
			
			
			
			
			
			
			
			
			_buildCentralDisctrict: function(data){
				
				try{
					
					var maxLength = data[0].length;
					
					
					
					for(var i = 0; i < data.length; i++){
						
						data[i][maxLength] = 0;
						
						for(var j = 1; j < maxLength; j++){
							data[i][maxLength] += data[i][j];
						}
					}
					
					
					
					
					var centralDistrictSum = ["TGW", 0, 0, 0, 0, 0, 0];
					
					
					for(var j = 1; j < data[0].length; j++){
						for(var i =  data.length-1; i >= 0; i--){
							if(i == data.length-1){
								centralDistrictSum[j] = data[i][j];
							}
							else{
								centralDistrictSum[j] -= data[i][j];
							}
						}
					}
										
					
					data.push(centralDistrictSum);
					
					
					
					
					for(var i = 0; i < data.length; i++){
						
						var tr = $('#centralDistrictSales-' + data[i][0]);
						var col = "";
						
						for(var j = 0; j < data[i].length; j++){
							
							if(j > 0){
								col += '<td>' + $.number(data[i][j]) + '</td>';
							}
							else{
								if(typeof translate.summer.activityDeta.actiPersonal[data[i][j]] == "string"){
									col += '<td>' + translate.summer.activityDeta.actiPersonal[data[i][j]] + '</td>';
								}
								else{									
									col += '<td>' + data[i][j] + '</td>';
								}
							}
							
						}
						
						$('#centralDistrictSales-' + data[i][0]).append(col);
					}
					
				}
				catch(e){
					console.log("Exception: " + e);
				}
				
			},
			
			
			
			
			
			
			
			
			
			_setElements_UI: function(){
				
				try{
			
			
					var scriptLanguage = ( CONSTANTS.language == "es" ) ? CONSTANTS.scriptLanguageES : CONSTANTS.scriptLanguageEN;
					
					
					$.getScript( scriptLanguage ).done(function( script, textStatus ) {
				
																
						//translate page
						localize.setLang(CONSTANTS.language);
						localize.init('js');
						localize.finalize();
						
						// translate page
						UI_acti_deta.translateUI();
						UI_acti_deta._getInfoFields();
						UI_acti_deta.registerUIActions();
						
						
					}).fail(function( jqxhr, settings, exception ){
						console.log(jqxhr);
					});
					
					
				}
				catch(e){
					console.log("Exception: " + e);
				}
				
			}
			
		};
		
		
		return {
            init             : UI_acti_deta.init,
			options          : UI_acti_deta.options,
            registerUIActions: UI_acti_deta.registerUIActions,
			translateUI      : UI_acti_deta.translateUI
		
        };

	};
	
	
})(jQuery);
/************************************* END UI CONTROLERS ****************************************/