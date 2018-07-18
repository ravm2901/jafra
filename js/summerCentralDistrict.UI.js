/**
 * V 1.0
 * @author Rodolfo A. Vilchis M.
 * Date: 2017-12-13
 */


/************************************* UI CONTROLERS - STEP 1 ****************************************/
(function($){
    
	$.UI_CentralDis = function(options) {
		UI_centralDis = {
	

			options: $.extend( {
				
				btnReturn                : $('#btn-return'),
				
				divError                 : $('#summer-errors'),
				
				tableSponsors            : $('#summer-sponsor')
				
				
				
			}, options),
			
			
			/* Private values */
			

			
			
			init: function(){
						
						
				if(window.location.hash) {
					var hash = window.location.hash.substring(1);
					var inf  = hash.split("_");
					
					if(inf.length >= 2){
						CONSTANTS.consId   = inf[0];
						CONSTANTS.language = inf[1];
						
						UI_centralDis._setElements_UI();
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
			
				UI_centralDis.options.btnReturn.click(function(e){
					e.preventDefault();
					
					document.location.href = CONSTANTS.htmlActivityPersonal + '?t='+ new Date().getTime() +'#' + CONSTANTS.consId + '_' + CONSTANTS.language;
					
					
				});
				
					
				
			},
			
			
			
			
			
			/*Private methods*/		
			_getInfoFields: function(){				
				$.ajax({
					url:  CONSTANTS.rootURL + CONSTANTS.pgmCentral,
					async: true,
					data: 'CTA_H='+ CONSTANTS.consId,
					
					beforeSend: function(obj){
						timeLoad = setTimeout(function(){
							UI_centralDis.options.divError.html('<i class="fa myspin fa-refresh"></i> ' + translate.commons.timeToLoad);
							UI_centralDis.options.divError.css('display', 'block');
							
							tooTimeLoad = setTimeout(function(){
								obj.parent().parent().find('td:nth-child(4)').html('<i class="fa myspin fa-refresh"></i> ' + translate.commons.tooTimeToLoad);
								UI_centralDis.options.divError.css('display', 'block');
							}, CONSTANTS.tooTimeToLoad);
							
						}, CONSTANTS.timeToLoad);
					},
				
					complete: function(obj, success){},
					
					error: function(obj, what, otherObj){	
						console.log("Error load:", obj, what, otherObj);
						
						clearTimeout(timeLoad);
						clearTimeout(tooTimeLoad);
						
						
						UI_centralDis.options.divError.html('Error loading information. Please check your internet connection and try again.');
						UI_centralDis.options.divError.css('display', 'block');
						
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
											
						UI_centralDis._buildCentral(response.ListConsultant);
						
					}
					else{			
						//UI_sponsor.options.divError.html('Consultant not found.');
						//UI_sponsor.options.divError.css('display', 'block');
						UI_centralDis.options.tableSponsors.find('tbody').append('<tr><td colspan="7">Data not found</td></tr>');
					}
				});
			},
			
			
			
			
			
			
			
			
			
			_buildCentral: function(data){
			
				try{
					var d = document;
									
					for(var i = 0; i < data.length; i++){
						
						var tr = d.createElement("tr");
						
						
						for(var j = 0; j < data[i].length; j++){
							var td = d.createElement("td");
				
							
							$(td).html(data[i][j]);
							
							
							$(tr).append(td);
						}
					
						UI_centralDis.options.tableSponsors.find('tbody').append(tr);
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
						UI_centralDis.translateUI();
						UI_centralDis._getInfoFields();
						UI_centralDis.registerUIActions();
						
						
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
            init             : UI_centralDis.init,
			options          : UI_centralDis.options,
            registerUIActions: UI_centralDis.registerUIActions,
			translateUI      : UI_centralDis.translateUI
		
        };

	};
	
	
})(jQuery);
/************************************* END UI CONTROLERS ****************************************/