/**
 * V 1.0
 * @author Rodolfo A. Vilchis M.
 * Date: 2017-12-13
 */


/************************************* UI CONTROLERS - STEP 1 ****************************************/
(function($){
    
	$.UI_LineageAmb = function(options) {
		UI_lineageAmb = {
	

			options: $.extend( {
				
				btnReturn                : $('#btn-return'),
				
				divError                 : $('#summer-errors'),
				
				fieldLineage             : $('#lineageLevel'),
				
				tableLineage             : $('#summer-lineage')
				
				
				
			}, options),
			
			
			/* Private values */
			

			
			
			init: function(){
						
						
				if(window.location.hash) {
					var hash = window.location.hash.substring(1);
					var inf  = hash.split("_");
					
					if(inf.length >= 3){
						CONSTANTS.consId   = inf[0];
						CONSTANTS.lineage  = inf[1];
						CONSTANTS.language = inf[2];
						
						UI_lineageAmb._setElements_UI();
					}
					else{
						document.location.href = CONSTANTS.htmlActivityAMB + '?t='+ new Date().getTime()
					}
				
				}
				else{
					document.location.href = CONSTANTS.htmlActivityAMB + '?t='+ new Date().getTime()					
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
			
				UI_lineageAmb.options.btnReturn.click(function(e){
					e.preventDefault();
					
					document.location.href = CONSTANTS.htmlDistrictAMB + '?t='+ new Date().getTime() +'#' + CONSTANTS.consId + '_' + CONSTANTS.language;
					
					
				});
				
					
				
			},
			
			
			
			
			
			/*Private methods*/		
			_getInfoFields: function(){				
				$.ajax({
					url:  CONSTANTS.rootURL + CONSTANTS.pgmAmbLine,
					async: true,
					data: 'CTA_H='+ CONSTANTS.consId + '&LEVEL_H=' + CONSTANTS.lineage,
					
					beforeSend: function(obj){
						timeLoad = setTimeout(function(){
							UI_lineageAmb.options.divError.html('<i class="fa myspin fa-refresh"></i> ' + translate.commons.timeToLoad);
							UI_lineageAmb.options.divError.css('display', 'block');
							
							tooTimeLoad = setTimeout(function(){
								obj.parent().parent().find('td:nth-child(4)').html('<i class="fa myspin fa-refresh"></i> ' + translate.commons.tooTimeToLoad);
								UI_lineageAmb.options.divError.css('display', 'block');
							}, CONSTANTS.tooTimeToLoad);
							
						}, CONSTANTS.timeToLoad);
					},
				
					complete: function(obj, success){},
					
					error: function(obj, what, otherObj){	
						console.log("Error load:", obj, what, otherObj);
						
						clearTimeout(timeLoad);
						clearTimeout(tooTimeLoad);
						
						
						UI_lineageAmb.options.divError.html('Error loading information. Please check your internet connection and try again.');
						UI_lineageAmb.options.divError.css('display', 'block');
						
					},
							
					success: function(dat){},
					
					cache: true,
					timeout: CONSTANTS.maxTimeAjaxLoad,
					type: 'get'
						
				}).always(function() {
								  
				}).done(function(response){
					
					clearTimeout(timeLoad);
					clearTimeout(tooTimeLoad);
					
					if(response.ListConsultant.length > 0){
						
						UI_lineageAmb.options.fieldLineage.text(CONSTANTS.lineage);
						
						UI_lineageAmb._buildLineage(response.ListConsultant);
						
					}
					else{			
						
						UI_lineageAmb.options.tableLineage.find('tbody').append('<tr><td colspan="9">Data not found</td></tr>');
					}
					
				});
			},
			
			
			
			
			
			
			
			
			
			_buildLineage: function(data){
			
				try{
					var d = document;
									
					for(var i = 0; i < data.length; i++){
						
						var tr = d.createElement("tr");
						
						
						for(var j = 0; j < data[i].length; j++){
							var td = d.createElement("td");
				
							
							switch(j){
								case 3:
									$(td).html(translate.commons.titles[data[i][j]]);
									break;
								default:
									$(td).html(data[i][j]);
									break;
							}
							
							$(tr).append(td);
						}
					
						UI_lineageAmb.options.tableLineage.find('tbody').append(tr);
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
						UI_lineageAmb.translateUI();
						UI_lineageAmb._getInfoFields();
						UI_lineageAmb.registerUIActions();
						
						
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
            init             : UI_lineageAmb.init,
			options          : UI_lineageAmb.options,
            registerUIActions: UI_lineageAmb.registerUIActions,
			translateUI      : UI_lineageAmb.translateUI
		
        };

	};
	
	
})(jQuery);
/************************************* END UI CONTROLERS ****************************************/