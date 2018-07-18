/**
 * V 1.0
 * @author Rodolfo A. Vilchis M.
 * Date: 2017-12-13
 */


/************************************* UI CONTROLERS - STEP 1 ****************************************/
(function($){
    
	$.UI_BoardAmb = function(options) {
		UI_boardAmb = {
	

			options: $.extend( {
				
				btnReturn                : $('#btn-return'),
				
				divError                 : $('#summer-errors'),
								
				chart                    : $('#chart2')
				
				
				
			}, options),
			
			
			/* Private values */
			

			
			
			init: function(){
						
						
				if(window.location.hash) {
					var hash = window.location.hash.substring(1);
					var inf  = hash.split("_");
					
					if(inf.length >= 2){
						CONSTANTS.consId   = inf[0];
						CONSTANTS.language = inf[1];
						
						UI_boardAmb._setElements_UI();
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
			
				UI_boardAmb.options.btnReturn.click(function(e){
					e.preventDefault();
					
					document.location.href = CONSTANTS.htmlActivityAMB + '?t='+ new Date().getTime() +'#' + CONSTANTS.consId + '_' + CONSTANTS.language;
					
					
				});
				
					
				
			},
			
			
			
			
			
			/*Private methods*/		
			_getInfoFields: function(){				
				$.ajax({
					url:  CONSTANTS.rootURL + CONSTANTS.pgmAmbBoard,
					async: true,
					data: 'CTA_H='+ CONSTANTS.consId,
					
					beforeSend: function(obj){
						timeLoad = setTimeout(function(){
							UI_boardAmb.options.divError.html('<i class="fa myspin fa-refresh"></i> ' + translate.commons.timeToLoad);
							UI_boardAmb.options.divError.css('display', 'block');
							
							tooTimeLoad = setTimeout(function(){
								obj.parent().parent().find('td:nth-child(4)').html('<i class="fa myspin fa-refresh"></i> ' + translate.commons.tooTimeToLoad);
								UI_boardAmb.options.divError.css('display', 'block');
							}, CONSTANTS.tooTimeToLoad);
							
						}, CONSTANTS.timeToLoad);
					},
				
					complete: function(obj, success){},
					
					error: function(obj, what, otherObj){	
						console.log("Error load:", obj, what, otherObj);
						
						clearTimeout(timeLoad);
						clearTimeout(tooTimeLoad);
						
						
						UI_boardAmb.options.divError.html('Error loading information. Please check your internet connection and try again.');
						UI_boardAmb.options.divError.css('display', 'block');
						
					},
							
					success: function(dat){},
					
					cache: true,
					timeout: CONSTANTS.maxTimeAjaxLoad,
					type: 'get'
						
				}).always(function() {
								  
				}).done(function(response){
					
					clearTimeout(timeLoad);
					clearTimeout(tooTimeLoad);
											
					try{
						UI_boardAmb._buildGraph(response.s1, response.s2, response.axisX);
					}
					catch(e){
						console.log("Error get data:", e);
					}
										
				});
			},
			
			
			
			
			
			
			
			
			
			_buildGraph:function(s1, s2, months){
						
							
				
				plot2 = $.jqplot("chart2", [s1, s2], {
					stackSeries: true,
				    title: translate.summer.board.title, 
					animate: true,
					animateReplot: true,
					seriesColors: ["#9D57C2", "#79D61C"],
					cursor: {
						show: true,
						zoom: false,
						looseZoom: true,
						showTooltip: false
					},
					series:[
						 
						{
							pointLabels: {
								show: true,
								hideZeros: true
							},
							renderer: $.jqplot.BarRenderer,
							label: translate.summer.board.lLevel1,						
							showHighlight: true,
							yaxis: 'yaxis',
							rendererOptions: {
								animation: {
									speed: 2500
								},
								barWidth: 30,
								barPadding: -15,
								barMargin: 0,
								marginRight:20,
								highlightMouseOver: false
							}
						}, 
						{
							pointLabels: {
								show: true,
								hideZeros: true
							},
							renderer: $.jqplot.BarRenderer,
							label: translate.summer.board.lLevel2, 
							showLabel : false,
							showHighlight: true,
							yaxis: 'yaxis',
							rendererOptions: {
								animation: {
									speed: 2500
								},
								barWidth: 30,
								barPadding: -15,
								barMargin: 0,
								marginRight:20,
								highlightMouseOver: false
							}
						}
					],
					legend: {
						show: true,
						renderer: $.jqplot.EnhancedLegendRenderer,
						location: 's',
						placement: 'outsideGrid',
						rendererOptions: {
							numberColumns: 2,
							toolTips:'a'
						}
					},
					axesDefaults: {
						pad: 0
					},
					axes: {
						xaxis:{
							renderer: $.jqplot.CategoryAxisRenderer,
							drawMajorGridlines: true,
							drawMinorGridlines: true,
							drawMajorTickMarks: true,
							tickRenderer: $.jqplot.CanvasAxisTickRenderer,
							tickOptions: {
							   angle: -60,
							   textColor: '#333'
							},
							ticks: months
						},
						yaxis: {
							showTicks: false,
							max: 230,
							tickOptions: {
							    formatString: "%'d%",
								textColor: '#333'
							},
							Ticks:[[0],[25],[50],[75],[100],[125],[150],[175],[200]],
							rendererOptions: {
								forceTickAt0: true
							},
							label:'' /*<div style="margin-top:-50%;padding:0px;color:#000;">Level&nbsp;2</div><div style="margin:51% 0px 54% 0px;font-size:0.75em;line-height: 1em;background-color:#79D61C;color:#000;padding:2px">Level&nbsp;2<br>%Achieved</div><div style="padding:0px;color:#000;">Level&nbsp;1</div><div style="margin: 57% 0px 25% 0px;font-size:0.75em;line-height: 1em;background-color:#9D57C2;color:#fff;padding:2px">Level&nbsp;1<br>%Achieved</div>'*/
							
						}
					},
					highlighter: {
						show: false, 
						showLabel: true, 
						tooltipAxes: 'y',
						sizeAdjust: 7.5 , 
						tooltipLocation : 'ne'
					},
					canvasOverlay: {
						show: true,
						objects: [
							{
								horizontalLine: {
									name: 'Level 1',
									y: 100,
									lineWidth: 2,
									color: '#dd0000',
									shadow: false
								}
							},
							{
								horizontalLine: {
									name: 'Level 1',
									y: 200,
									lineWidth: 2,
									color: '#0000dd',
									shadow: false
								}
							}
						]
					}
				});
				
				
				$( window ).resize(function() {
					plot2.replot( { resetAxes: false } );
				});
				
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
						UI_boardAmb.translateUI();
						UI_boardAmb._getInfoFields();
						UI_boardAmb.registerUIActions();
						
						
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
            init             : UI_boardAmb.init,
			options          : UI_boardAmb.options,
            registerUIActions: UI_boardAmb.registerUIActions,
			translateUI      : UI_boardAmb.translateUI
		
        };

	};
	
	
})(jQuery);
/************************************* END UI CONTROLERS ****************************************/