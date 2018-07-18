/**
 * V 1.0
 * @author Rodolfo A. Vilchis M.
 * Date: 2016-07-15
 */


/************************************* UI CONTROLERS - STEP 1 ****************************************/
(function($){
    
	$.UI_AMB_Activity = function(options) {
	
		UI_amb_activity = {

			options: $.extend( {
				
				btnAmbBoard              : $('#btnAmbBoard'),
				btnDetails               : $('#btn-details'),
				btnReturn                : $('#btn-return'),
				
				divError                 : $('#summer-errors'),
				
				rowAMBHead               : $('#ambLabelDataHead'),
				
				fieldConsId              : $('#consID'),
				fieldJanTitle            : $('#janTitle'),
				fieldName                : $('#name'),
				fieldCurrentTitle        : $('#currentTitle'),
				fieldTripLevelAchieved   : $('#tripLevelAchieved'),
				fieldAMBLevel1           : $('#aLevel1'),
				fieldAMBLevel2           : $('#aLevel2'),
				fieldAMBLevelAchievedHead: $('#ambLevelAchievedHead'),
							
				tPersonalActivity        : $('#summer-amb-personalActi'),
				tTotalDistrict           : $('#summer-amb-tNewCons')
								
				
				
			}, options),
			
			
			/* Private values */
			

			
			
			init: function(){
				
				UI_amb_activity.options.rowAMBHead.hide();
						
				if(window.location.hash) {
					var hash = window.location.hash.substring(1);
					var inf  = hash.split("_");
					
					if(inf.length >= 2){
						CONSTANTS.consId   = inf[0];
						CONSTANTS.language = inf[1];
						
						UI_amb_activity._setElements_UI();
					}
					else{
						
						var itemsObj = [];
						
						itemsObj.push({src: UI_amb_activity._getPopupConsultantId() ,type:'inline'})
												
						openPopUp( itemsObj, false);

						UI_amb_activity._activateEventsPopup();
					}
				
				}
				else{
					var itemsObj = [];
						
					itemsObj.push({src: UI_amb_activity._getPopupConsultantId() ,type:'inline'})
										
					openPopUp( itemsObj, false);
					
					UI_amb_activity._activateEventsPopup();
					
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
				
				UI_amb_activity.options.btnReturn.click(function(e){
					e.preventDefault();
					
					document.location.href = CONSTANTS.htmlActivity + '?t='+ new Date().getTime() +'#' + CONSTANTS.consId + '_' + CONSTANTS.language;
					
					
				});
				
				
			
				UI_amb_activity.options.btnAmbBoard.click(function(e){
					e.preventDefault();
					
					document.location.href = CONSTANTS.htmlBoardAMB + '?t='+ new Date().getTime() +'#' + CONSTANTS.consId + '_' + CONSTANTS.language;
										
				});
				
				
				
				UI_amb_activity.options.btnDetails.click(function(e){
					e.preventDefault();
					
					document.location.href = CONSTANTS.htmlDistrictAMB + '?t='+ new Date().getTime() +'#' + CONSTANTS.consId + '_' + CONSTANTS.language;
										
				});
				
					
				
			},
			
			
			
			
			
			/*Private methods*/
			_getPopupConsultantId: function(){
								
				var html = '<div class="content-promo summer-popup">'
						 + '<div class="summer-subtitle txt-center">Please, introduce your consultant ID</div>'
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
							document.location.href = CONSTANTS.htmlActivityAMB + '?t='+ new Date().getTime() +'#' + consId + '_' + lang;
						}
					}
					catch(e){
						
					}
				});
			},
			
			
			
			
			
			
			
			
			
			_getInfoFields: function(){				
				
				$.ajax({
					url:  CONSTANTS.rootURL + CONSTANTS.pgmAmbActi,
					async: true,
					data: 'CTA_H='+ CONSTANTS.consId,
					
					beforeSend: function(obj){
						timeLoad = setTimeout(function(){
							UI_amb_activity.options.divError.html('<i class="fa myspin fa-refresh"></i> ' + translate.commons.timeToLoad);
							UI_amb_activity.options.divError.css('display', 'block');
							
							tooTimeLoad = setTimeout(function(){
								obj.parent().parent().find('td:nth-child(4)').html('<i class="fa myspin fa-refresh"></i> ' + translate.commons.tooTimeToLoad);
								UI_amb_activity.options.divError.css('display', 'block');
							}, CONSTANTS.tooTimeToLoad);
							
						}, CONSTANTS.timeToLoad);
					},
				
					complete: function(obj, success){},
					
					error: function(obj, what, otherObj){	
						console.log("Error load:", obj, what, otherObj);
						
						clearTimeout(timeLoad);
						clearTimeout(tooTimeLoad);
						
						//Apply compact mode
						UI_amb_activity.options.divError.html('Error loading information. Please check your internet connection and try again.');
						UI_amb_activity.options.divError.css('display', 'block');
						
					},
							
					success: function(dat){},
					
					cache: true,
					timeout: CONSTANTS.maxTimeAjaxLoad,
					type: 'get'
						
				}).always(function() {
								  
				}).done(function(response){
					
					clearTimeout(timeLoad);
					clearTimeout(tooTimeLoad);
					
					
					if(response.consID > 0){
					
					
						if(response.janTitle == 'AMB'){
							UI_amb_activity.options.rowAMBHead.show();
							UI_amb_activity.options.fieldAMBLevelAchievedHead.text(response.ambLevelAchieved);
						}
						else{
							UI_amb_activity.options.rowAMBHead.hide();
						}
						
					
						UI_amb_activity.options.fieldConsId.text(response.consID);
						UI_amb_activity.options.fieldJanTitle.text(translate.commons.titles[response.janTitle]);
						UI_amb_activity.options.fieldName.text(response.name);
						UI_amb_activity.options.fieldCurrentTitle.text(translate.commons.titles[response.currentTitle]);
						UI_amb_activity.options.fieldTripLevelAchieved.text(response.tripLevelAchieved);
						UI_amb_activity.options.fieldAMBLevel1.text(response.totalDistrictActivity.level1);
						UI_amb_activity.options.fieldAMBLevel2.text(response.totalDistrictActivity.level2); 
						
						
						UI_amb_activity._buildPersonalActivities(response.personalActivity);
						UI_amb_activity._buildTotalDistrictActi(response.totalNewConsultants);
						
						
					}
					else{//Type 1, compact mode				
						UI_amb_activity.options.divError.html('Consultant not found.');
						UI_amb_activity.options.divError.css('display', 'block');
						
					}
					
				});
				
			},
			
			
			
			
			
			
			
			
			
			_buildPersonalActivities: function(data){
				
				try{
			
					for(var i = 0; i < data.length; i++){
						
						
						var row = '<tr>';
						
							for(var j = 0; j < data[i].length; j++){
								row += '<td>' + data[i][j] + '</td>';									 								
							}
							
							row	+= '</tr>';
				
						UI_amb_activity.options.tPersonalActivity.find('tbody').append( row );
					}
					
				}
				catch(e){
					console.log("Exception: " + e);
					
					
					var row = '<tr>'
								+'	<td colspan="2">Bad data</td>'
								+'</tr>';
					
					UI_amb_activity.options.tPersonalActivity.find('tbody').append( row )
				}
				
			},
			
			
			
			
			
			
			
			
			
			_buildTotalDistrictActi: function(data){
				
				try{
			
					for(var i = 0; i < data.length; i++){
						
						
						var row = '<tr>';
						
							for(var j = 0; j < data[i].length; j++){
								row += '<td>' + data[i][j] + '</td>';									 								
							}
							
							row	+= '</tr>';
				
						UI_amb_activity.options.tTotalDistrict.find('tbody').append( row );
					}
					
				}
				catch(e){
					console.log("Exception: " + e);
					
					
					var row = '<tr>'
								+'	<td colspan="2">Bad data</td>'
								+'</tr>';
					
					UI_amb_activity.options.tTotalDistrict.find('tbody').append( row )
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
								
								if(j < name.length - 1){
									label += "<br />";
								}
							}
						}
						
						if(data[i][3] != ""){
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
						}
						
						
						var row = '<tr>'
								+'	<td>' + data[i][0] + '</td>'
								+'	<td>' + data[i][1] + ' ' + ((i < 3) ? translate.summer.activity.BB : translate.summer.activity.points) + '</td>'
								+'	<td>' + label + '</td>'
								+'	<td>' + label2 + '</td>'
								+'</tr>';
				
						UI_amb_activity.options.tableEarnPoints.find('tbody').append( row );
					}
					
				}
				catch(e){
					console.log("Exception: " + e);
					
					
					var row = '<tr>'
								+'	<td colspan="4">Bad data</td>'
								+'</tr>';
					
					UI_amb_activity.options.tableEarnPoints.find('tbody').append( row )
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
						UI_amb_activity.translateUI();
						UI_amb_activity._getInfoFields();
						UI_amb_activity.registerUIActions();
						
						
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
            init             : UI_amb_activity.init,
			options          : UI_amb_activity.options,
            registerUIActions: UI_amb_activity.registerUIActions,
			translateUI      : UI_amb_activity.translateUI
		
        };

	};
	
	
})(jQuery);
/************************************* END UI CONTROLERS ****************************************/