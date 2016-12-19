$(function(){
	// Builds the initial screen
	languageSet();
	$('#content_header_method').hide();
	$('#content_scheduler').hide();
	$('#content_cpu').hide();
	$('#content_ram').hide();
	$('#content_help').hide();
	$('#content_dma').hide();
	$('#content_printer').hide();
	
	$('#content_arrow_top').hide();
	$('#content_arrow_bottom').hide();
	/*
	$('#text_1').hide();
	$('#arrow_1v').hide();
	$('#arrow_1a').hide();
	$('#text_2').hide();
	$('#arrow_2v').hide();
	$('#arrow_2a').hide();
	$('#arrow_5').hide();
	$('#text_5').hide();
	*/
	
	// Sets up events for buttons !Tip: don't uncomment if the function doesn't exist XD
	$('#btnMethod1').on('click', {number: '1'}, setupMethod);
	$('#btnMethod2').on('click', {number: '2'}, setupMethod);
	$('#btnMethod3').on('click', {number: '3'}, setupMethod);
	
	$('#btnStart').on('click', start);
	$('#btnStop').on('click', stop);
    $('#btnBack').on('click', back);
    $('#btnRepeat').on('click', repeat);
    $('#btnForward').on('click', forward);
	$('#btnReload').on('click', reset);
    
    $('#btnLanguage1').on('click', function(){langSelect = 0;languageSet();});
    $('#btnLanguage2').on('click', function(){langSelect = 1;languageSet();});
	
});