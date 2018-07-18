/**
 * V 1.0
 * @author Rodolfo A. Vilchis M.
 * Date: 2017-12-05
 */ 
var CONSTANTS   = null;
var summer      = null;
var timeLoad    = null;
var tooTimeLoad = null;


var UIGlobal       = null;
var UI_Activity    = null;
var UI_Acti_Deta   = null;
var UI_sponsors    = null;
var UI_central     = null;
var UI_ActivityAMB = null;
var UI_DistrictAMB = null;
var UI_LineageAMB  = null;
var UI_BoardAMB    = null;
var UI_Coe         = null;


/************************************* CONSTANTS VALUES ****************************************/
(function($){
    
	$.CONSTANTS = function() {
	
		
		CONSTANTS = {
			rootURL                : "http://localhost:8081/",
			htmlActivity           : "activity",
			htmlActivityPersonal   : "activity_personal",
			htmlSponsor            : "activity_sponsors",
			htmlCentral            : "activity_central",
			htmlActivityAMB        : "amb_activity",
			htmlDistrictAMB        : "amb_district",
			htmlLineageAMB         : "amb_lineage",
			htmlBoardAMB           : "amb_board",
			htmlCOE                : "coe2018.html",
			pgmActivity            : "PR0452",
			pgmActiDeta            : "PR0453",
			pgmSponsor             : "PR0454",
			pgmCentral             : "PR0455",
			pgmAmbActi             : "PR0456",
			pgmAmbDist             : "PR0457",
			pgmAmbLine             : "PR0458",
			pgmAmbBoard            : "PR0459",
			scriptLanguageES       : "assets/summer-es.js",
			scriptLanguageEN       : "assets/summer-en.js",
			consId                 : 0,
			lineage                : -1,
			language               : "en",
			tooTimeToLoad          : 10000,
			timeToLoad             : 3000,
			maxTimeAjaxLoad        : 30000
		};
		
		
		return CONSTANTS;

	};
	
})(jQuery);
/************************************* END CONSTANTS VALUES ****************************************/




var searchJSON = function(jsonData, path, index) {

    if (!(jsonData instanceof Object)) {
        console.log("Error, JSON is not an object");
        return;
    }
	
    if (typeof (path) === "undefined") {
        console.log("Error, path is not define");
        return;
    }
	
    index = typeof (index) === "undefined" ? 0 : index + 1;


    var data = path.split(".");

    var value;
	var d = new Date();
		
    if (index + 1 === data.length) {
        value = jsonData[data[index]];
    } 
	else {
        value = searchJSON(jsonData[data[index]], path, index);
    }
	
	
	d.setDate(d.getDate() - 1);
	
	try{
		value = value.replace(/%bm/g, getMonth(d.getMonth() + 1)).replace(/%bd/g, d.getDate()).replace(/%by/g, d.getFullYear());
	}
	catch(e){
		
	}
	
    return value;
};









(function($) {

    $.fn.hasScrollBar = function() {
        var e = this.get(0);
        return {
            vertical: e.scrollHeight > e.clientHeight,
            horizontal: e.scrollWidth > e.clientWidth
        };
    };
	
	
	
	
	$.fn.checkValue = function(){
		var val = $(this).val().split("-");
		
		if(val[0].length > 0){
			val[0] = val[0].substr(0,5);
		}
		
		$(this).val(val[0]);
		
	};
	
	
	
	$.fn.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};
	
})(jQuery);









var UUID = function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};









var getMonth = function(month){

	month = month - 1;
	
	
	if(month >= 0 && month < 12){
	
		var months = {
			"es" : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],		
			"en" : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		}
		
		
		if(CONSTANTS.language == 'es'){
			return months.es[month];
		}
		else{
			return months.en[month];
		}

	}
	else{
		return "";
	}
}









var openPopUp = function( itemsObj, showCloseBtn){

	var _showCloseBtn = showCloseBtn || false;

	$.magnificPopup.open({
		items: itemsObj,		
		gallery: {
		  enabled:true
		},
		closeOnContentClick: false,
		closeOnBgClick: false,
		closeBtnInside: true,
		fixedContentPos: true,
		showCloseBtn: _showCloseBtn,
		image: {
			verticalFit: true
		},
		callbacks: {
			beforeOpen: function(){
				$("html").addClass('overFlowHidden');				
			},
			open: function() {
				
				$('#wrapper').addClass('blur');
				
				$.magnificPopup.instance.close = function() {
					
					try{
						if(this.currItem.index < (this.items.length-1)){
							this.next();
						
							return false;
						}
					}
					catch(e){
						
					}
				   
					$.magnificPopup.proto.close.call();
					
				};
				
				
				
				
				$.magnificPopup.instance.next = function(){
					
					var a = this.index + 1;
					var c = this.items.length;
													
					this.direction = true;
					this.index = a>c-1?a-c:0>a?c+a:a;
					this.updateItemHTML();

					return true;
				};
				
				
				$.magnificPopup.instance.prev = function(){
					var a = this.index - 1;
					var c = this.items.length;
													
					this.direction = true;
					this.index = a>c-1?a-c:0>a?c+a:a;
					this.updateItemHTML();

					return true;
				};
				
			},
			close: function(){			
				$("html").removeClass('overFlowHidden');
				$('#wrapper').removeClass('blur');
			},
			resize: function(){
			},
			updateStatus: function(data) {
			}
		},
		preloader: true,
		lazyLoad: function(item) {
		}
	}, 0);

}









