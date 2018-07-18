/**
 * V 1.0
 * @author Rodolfo A. Vilchis M.
 * Date: 2016-07-15
 */


/************************************* UI CONTROLERS - STEP 1 ****************************************/
(function($){
    
	$.UI_Activity = function(options) {
	
		UI_activity = {

			options: $.extend( {
				
				btnDetails               : $('#btn-details'),
				btnAMB                   : $('#btn-amb'),
				
				divError                 : $('#summer-errors'),
				divRequirements          : $('#summer-requirements'),
				
				rowAMB                   : $('#ambLabelData'),
				rowAMBHead               : $('#ambLabelDataHead'),
				rowLessCon               : $('#lessCon'),
				
				fieldConsId              : $('#consID'),
				fieldJanTitle            : $('#janTitle'),
				fieldName                : $('#name'),
				fieldCurrentTitle        : $('#currentTitle'),
				fieldTripLevelAchieved   : $('#tripLevelAchieved'),
				fieldAMBLevelAchieved    : $('#ambLevelAchieved'),
				fieldAMBLevelAchievedHead: $('#ambLevelAchievedHead'),
				fieldPointsEarned        : $('#pointsEarned'),
				fieldAchieved10BB        : $('#achieved10BB'),
				fieldAchievedCDGrowth    : $('#achievedCDGrowth'),
				fieldPtTripLevelAchieved : $('#points-tripLevelAchieved'),
				fieldNewConsSpon         : $('#newConsSpon'),
				fieldNewCons500          : $('#newCons500'),
				fieldBusinessBuilder     : $('#businessBuilder'),
								
				tableEarnPoints          : $('#summer-activity-tleft'),
				tableActiEarn            : $('#summer-activity-personal-tright')
				
			}, options),
			
			
			/* Private values */
			

			
			
			init: function(){
					
				UI_activity.options.btnAMB.hide();
				UI_activity.options.rowAMB.hide();
				UI_activity.options.rowAMBHead.hide();
						
				if(window.location.hash) {
					var hash = window.location.hash.substring(1);
					var inf  = hash.split("_");
					
					if(inf.length >= 2){
						CONSTANTS.consId   = inf[0];
						CONSTANTS.language = inf[1];
						
						UI_activity._setElements_UI();
					}
					else{
						
						var itemsObj = [];
						
						itemsObj.push({src: UI_activity._getPopupConsultantId() ,type:'inline'})
												
						openPopUp( itemsObj, false);

						UI_activity._activateEventsPopup();
					}
				
				}
				else{
					var itemsObj = [];
						
					itemsObj.push({src: UI_activity._getPopupConsultantId() ,type:'inline'})
										
					openPopUp( itemsObj, false);
					
					UI_activity._activateEventsPopup();
					
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
			
				UI_activity.options.btnDetails.click(function(e){
					e.preventDefault();
					
					document.location.href = CONSTANTS.htmlActivityPersonal + '?t='+ new Date().getTime() +'#' + CONSTANTS.consId + '_' + CONSTANTS.language;
					
					
				});
				
				
				UI_activity.options.btnAMB.click(function(e){
					
					e.preventDefault();
					
					document.location.href = CONSTANTS.htmlActivityAMB + '?t='+ new Date().getTime() +'#' + CONSTANTS.consId + '_' + CONSTANTS.language;
					
				});
				
					
				
			},
			
			
			
			
			
			/*Private methods*/
			_getPopupConsultantId: function(){
								
				var html = '<div class="content-promo summer-popup">'
						 + '<div class="summer-subtitle txt-center">Please, enter your consultant ID</div>'
						 + '<div class="summer-popup-btns-content">'
						 +   '<div class="row">'
						 +     '<div class="col-md-6 txt-center">'
						 +        'Consultant Id: <input id="inp-consId" type="text" name="consId" value="" class="popup-input-txt" />'
						 +     '</div>'
						 +     '<div class="col-md-6 txt-center">'
						 +        '<input id="lang_en" type="button" value="EN" class="popup-btn popup-btn-left"/><input id="lang_es" type="button" value="ES" class="popup-btn popup-btn-right"/>'
						 +     '</div>'
						 +   '</div>'
						 +   '<div class="row">'
						 +     '<div class="col-md-12 txt-center">'
						 +        '<input id="popup-submit" type="button" value="Ok" class="popup-btn popup-btn-submit"/>'
						 +     '</div>'
						 +   '</div>'
						 + '</div>'
						 + '</div>';
						 
						 
				return html;
					
			},
			
			
			
			
			
			
			
			
			
			_activateEventsPopup: function(){
				
				$('#inp-consId').numeric();
				
				
				if(CONSTANTS.language == 'es'){
					$('#lang_en').removeClass('active');
					$('#lang_es').addClass('active');
				}
				else{
					$('#lang_es').removeClass('active');
					$('#lang_en').addClass('active');
				}
				
				
				$('#lang_en').click(function(e){
					e.preventDefault();
										
					$('#lang_es').removeClass('active');
					$('#lang_en').addClass('active');
					
					CONSTANTS.language = 'en';
				});
				
				
				
				$('#lang_es').click(function(e){
					e.preventDefault();
					
					$('#lang_en').removeClass('active');
					$('#lang_es').addClass('active');
					
					CONSTANTS.language = 'es';
				});
				
				
				
				$('#popup-submit').click(function(e){
					e.preventDefault();
										
					var consId = $('#inp-consId').val();
					var lang = CONSTANTS.language;
					
										
					try{
						if(parseInt(consId) > 0){
							document.location.href = CONSTANTS.htmlActivity + '?t='+ new Date().getTime() +'#' + consId + '_' + lang;
						}
					}
					catch(e){
						
					}
				});
			},
			
			
			
			
			
			
			
			
			
			_getInfoFields: function(){				
				
				$.ajax({
					url:  CONSTANTS.rootURL + CONSTANTS.pgmActivity,
					async: true,
					data: 'CTA_H='+ CONSTANTS.consId,
					
					beforeSend: function(obj){
						timeLoad = setTimeout(function(){
							UI_activity.options.divError.html('<i class="fa myspin fa-refresh"></i> ' + translate.commons.timeToLoad);
							UI_activity.options.divError.css('display', 'block');
							
							tooTimeLoad = setTimeout(function(){
								obj.parent().parent().find('td:nth-child(4)').html('<i class="fa myspin fa-refresh"></i> ' + translate.commons.tooTimeToLoad);
								UI_activity.options.divError.css('display', 'block');
							}, CONSTANTS.tooTimeToLoad);
							
						}, CONSTANTS.timeToLoad);
					},
				
					complete: function(obj, success){},
					
					error: function(obj, what, otherObj){	
						console.log("Error load:", obj, what, otherObj);
						
						clearTimeout(timeLoad);
						clearTimeout(tooTimeLoad);
						
						//Apply compact mode
						UI_activity.options.divError.html('Error loading information. Please check your internet connection and try again.');
						UI_activity.options.divError.css('display', 'block');
						
					},
							
					success: function(dat){},
					
					cache: true,
					timeout: CONSTANTS.maxTimeAjaxLoad,
					type: 'post'
						
				}).always(function() {
								  
				}).done(function(response){
					
					clearTimeout(timeLoad);
					clearTimeout(tooTimeLoad);
					
					console.log(response);
					if(response.consID > 0){
					
						if(response.janTitle == 'AMB'){
							UI_activity.options.btnAMB.show();
							UI_activity.options.rowAMB.show();
							UI_activity.options.rowAMBHead.show();
							UI_activity.options.fieldAMBLevelAchieved.text(response.ambLevelAchieved);
							UI_activity.options.fieldAMBLevelAchievedHead.text(response.ambLevelAchieved);
							UI_activity.options.divRequirements.html(translate.summer.activity.requirementsALL);
						}
						else{
							
							if(response.janTitle == 'CON'){
								UI_activity.options.rowLessCon.hide();
								UI_activity.options.divRequirements.html(translate.summer.activity.requirementsCON);
							}
							else{
								UI_activity.options.rowLessCon.show();
								UI_activity.options.divRequirements.html(translate.summer.activity.requirementsALL);
							}
							
							UI_activity.options.btnAMB.hide();
							UI_activity.options.rowAMB.hide();
							UI_activity.options.rowAMBHead.hide();
						}
						
						
						
					
						UI_activity.options.fieldConsId.text(response.consID);
						UI_activity.options.fieldJanTitle.text(translate.commons.titles[response.janTitle]);
						UI_activity.options.fieldName.text(response.name);
						UI_activity.options.fieldCurrentTitle.text(translate.commons.titles[response.currentTitle]);
						UI_activity.options.fieldTripLevelAchieved.text(response.tripLevelAchieved);
						UI_activity.options.fieldPointsEarned.text(response.pointsEaTrip.pointsEarned);
						UI_activity.options.fieldAchieved10BB.text(translate.summer.activity.tripLevelAchi[response.pointsEaTrip.achieved10BB]);
						UI_activity.options.fieldAchievedCDGrowth.text(translate.summer.activity.tripLevelAchi[response.pointsEaTrip.achievedCDGrowth]);
						UI_activity.options.fieldPtTripLevelAchieved.text(translate.summer.activity.tripLevelAchi[response.pointsEaTrip.tripLevelAchieved]);
						UI_activity.options.fieldNewConsSpon.text(response.personalSpon.newConsSpon);
						UI_activity.options.fieldNewCons500.text(response.personalSpon.newCons500);
						UI_activity.options.fieldBusinessBuilder.text(response.personalSpon.businessBuilder);
						
						UI_activity._buildLevelTable(response.eaSumTrip);
						UI_activity._buildActivitiesEarn(response.activitiesToEarn);
						
					}
					else{//Type 1, compact mode				
						UI_activity.options.divError.html('Consultant not found.');
						UI_activity.options.divError.css('display', 'block');
						
					}

					
				});
				
			},
			
			
			
			
			
			
			
			
			
			_buildActivitiesEarn: function(data){
				
				try{
			
					for(var i = 0; i < data.length; i++){
						
						var label = "";
																
						if(typeof translate.summer.activity.activitiesToEarn[data[i][0]] == "string"){
							label += translate.summer.activity.activitiesToEarn[data[i][0]]
						}
						else{
							label += data[i][0];
						}
						
												
						
						var row = '<tr>'
								+'	<td>' + label + ' ' + ((data[i][1] != "") ? ' - $' + data[i][1] : "") + '</td>'
								+'	<td>' + data[i][2] + '</td>'
								+'</tr>';
				
						UI_activity.options.tableActiEarn.find('tbody').append( row );
					}
					
				}
				catch(e){
					console.log("Exception: " + e);
					
					
					var row = '<tr>'
								+'	<td colspan="2">Bad data</td>'
								+'</tr>';
					
					UI_activity.options.tableActiEarn.find('tbody').append( row )
				}
				
			},
			
			
			
			
			
			
			
			_buildLevelTable: function(data){
				
				try{
			
					for(var i = 0; i < data.length; i++){
						
						var label  = "",
						    label2 = "";
						
						if(data[i][2] != ""){
							var name  = data[i][2].split("|");
							
							
							for(var j = 0; j < name.length; j++){
																
								if(typeof translate.summer.activity.eaSumTrip[name[j]] == "string"){
									label += translate.summer.activity.eaSumTrip[name[j]]
								}
								else{
									label += name[j];
								}
								
								label += ' <span class="summer-asteric">*</span>';
								
								if(j < name.length - 1){
									label += "<br />";
								}
							}
						}
						
						/*if(data[i][3] != ""){
							var name  = data[i][3].split("|");
							
							
							for(var j = 0; j < name.length; j++){
																
								if(typeof translate.summer.activity.eaSumTrip[name[j]] == "string"){
									label2 += translate.summer.activity.eaSumTrip[name[j]]
								}
								else{
									label2 += name[j];
								}
								
								label2 += ' <span class="summer-asteric">**</span>';
								
								if(j < name.length - 1){
									label2 += "<br />";
								}
							}
						}*/
						
						
						var row = '<tr>'
								+'	<td>' + data[i][0] + '</td>'
								+'	<td>' + data[i][1] + ' ' + ((i < 3) ? translate.summer.activity.points : translate.summer.activity.BB) + '</td>'
								//+'	<td>' + label + '</td>'
								+'	<td>' + label + '</td>'
								+'</tr>';
				
						UI_activity.options.tableEarnPoints.find('tbody').append( row );
					}
					
				}
				catch(e){
					console.log("Exception: " + e);
					
					
					var row = '<tr>'
								+'	<td colspan="3">Bad data</td>'
								+'</tr>';
					
					UI_activity.options.tableEarnPoints.find('tbody').append( row )
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
						UI_activity.translateUI();
						UI_activity.registerUIActions();
						UI_activity._getInfoFields();
						
						
						
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
            init             : UI_activity.init,
			options          : UI_activity.options,
            registerUIActions: UI_activity.registerUIActions,
			translateUI      : UI_activity.translateUI
		
        };

	};
	
	
})(jQuery);
/************************************* END UI CONTROLERS ****************************************/