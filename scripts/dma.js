/* ### DMA ### */
function dma_state1(){
	lockButtons();
	process1_state1();
	process_setReady(1, 0);
	process_setReady(2, 0);
	$('#content_cpu_text').show();

	stateVar = 1;
	animationLock = true;
	stateTime[stateVar] = 0;
	//lockButtons();

	$('#content_ram_string1').html(string_hello+"<br>");
	$('#content_ram_string2').html(string_hi);

	$('#process1_intr3').removeAttr('style');
	$('#process1_intr3').addClass('content_process_intr3');
	$('#process_status').removeClass('content_process_status_blocked');
	$('#process_status').addClass('content_process_status_running');
	$('#printer_status').removeClass('content_printer_status_occupied');
	$('#printer_status').addClass('content_printer_status_idle');

	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);

	dma_state1_1();
}

function dma_state1_1(){
	$('#content_cpu_text').hide();
	process_setRunning(1, fadeTime);

	setTimeout(dma_state1_2, waitTime+fadeTime);
}


function dma_state1_2(){
	$('#process1_intr2').html(instructions[langSelect][0]);
	$('#process1_intr3').html(instructions[langSelect][1]);
	$('#process1_intr4').html(instructions[langSelect][2]);
	$('#process1_intr5').html(instructions[langSelect][16]);
	updateTime(2);
	stateTime[stateVar] += 2;

	setTimeout(dma_state1_3, waitTime);
}

function dma_state1_3(){
	$('#process1_intr1').html(instructions[langSelect][0]);
	$('#process1_intr2').html(instructions[langSelect][1]);
	$('#process1_intr3').html(instructions[langSelect][2]);
	$('#process1_intr4').html(instructions[langSelect][16]);
	$('#process1_intr5').html(instructions[langSelect][3]);
	updateTime(2);
	stateTime[stateVar] += 2;

	setTimeout(dma_state1_4, waitTime);
}

function dma_state1_4(){
	$('#process1_intr1').html(instructions[langSelect][1]);
	$('#process1_intr2').html(instructions[langSelect][2]);
	$('#process1_intr3').html(instructions[langSelect][16]);
	$('#process1_intr4').html(instructions[langSelect][3]);
	$('#process1_intr5').html(instructions[langSelect][4]);
	updateTime(2);
	stateTime[stateVar] += 2;

	setTimeout(dma_state1_5, waitTime);
}

// ACQUIRE DMA
function dma_state1_5() {
	// 
	$('#process1_intr3').css({'border': '2px solid #CC0000', 'color': '#CC0000'});
	$('#process_status').removeClass('content_process_status_running');
	$('#process_status').addClass('content_process_status_blocked');
	
	downArrowStyle(langStrings[langSelect][33], 1);
	
	setTimeout(function(){
		$('#content_dma_content').html(langStrings[langSelect][31]);
		$('#content_dma_content').css({'border': '2px solid #CC0000', 'color': '#CC0000'});
	}, waitTime);

	setTimeout(function(){
		$('#process1_intr3').css({'border': '2px solid #063', 'color': '#063'});
		
		upArrowStyle(langStrings[langSelect][34], 1, 2);
		
		clearArrowText(1);
	}, 2*waitTime);
	
	setTimeout(function(){
		$('#process1_intr3').removeAttr('style');
		$('#process1_intr3').addClass('content_process_intr3');
		//$('#process_status').removeClass('content_process_status_blocked');
		//$('#process_status').addClass('content_process_status_running');
		
		clearArrowText(2);
	}, 3*waitTime);	

	if(isRunning) {
		setTimeout(dma_state2, 3*waitTime);
	}else{
		setTimeout(function(){ unlockButtons() },3*waitTime);
	}
	updateTime(3);
	stateTime[stateVar] += 3;
	animationLock = false;
}

// STATE 2 - COPY STRING FROM USER TO KERNEL
function dma_state2(){
	stateVar = 2;
	stateTime[stateVar] = 0;
	animationLock = true;
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);
	lockButtons();

	process2_state1();
	updateTime(2);
	stateTime[stateVar] += 2;
	clearArrowText(1);
	clearArrowText(2);
	$('#text_1').html('');
	$('#text_2').html('');
	
	process_setBlockedSqd(1, fadeTime);
	process_setRunning(2, fadeTime);
	
	setTimeout(dma_state2_1, fadeTime+waitTime);
}

function dma_state2_1(){
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);
	//lockButtons();

	// Sets Open Printer to red and Acquire Printer
	downArrowStyle(langStrings[langSelect][18], 3);

	// Changes from IDLE to OCCUPIED
	setTimeout(function(){
		$('#printer_status').removeClass('content_printer_status_idle');
		$('#printer_status').addClass('content_printer_status_occupied');
	}, waitTime);

	// Sets Open Printer to green and Printer Acquired
	setTimeout(function(){
		process2_state2();
		//$('#process1_intr3').css({'border': '2px solid #063', 'color': '#063'});
		upArrowStyle(langStrings[langSelect][19], 1, 4);
		clearArrowText(3);
	}, 2*waitTime);

	setTimeout(function(){
		//$('#process1_intr3').removeAttr('style');
		//$('#process1_intr3').addClass('content_process_intr3');
		//$('#process_status').removeClass('content_process_status_blocked');
		//$('#process_status').addClass('content_process_status_running');
		clearArrowText(4);
	}, 3*waitTime);

	setTimeout(dma_state2_2, 4 * waitTime);
}

// copy string
function dma_state2_2(){
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);
	//lockButtons();

	$('#content_help_content').html(langStrings[langSelect][stepOffset+stateVar]);

	// Seta o estado inicial dos elementos
	$('#content_ram_string1').removeAttr('style');
	$('#content_ram_string3').removeAttr('style');

	$('#content_ram_string3').html(string_empty);
	$('#content_help_content').html(langStrings[langSelect][stepOffset+stateVar]);
	$('#text_3').html('');
	$('#text_4').html('');


	// Colore a string no espa�o de usu�rio
	setTimeout(function(){
		process2_state3();
		$('#content_ram_string1').css({'color': '#CC0000', 'border': '2px solid #CC0000'});
	}, waitTime);

	// Copia a string Hello World! no espa�o de kernel
	setTimeout(function(){
		$('#content_ram_string3').css({'color': '#CC0000', 'border': '2px solid #CC0000'});
		$('#content_ram_string3').html(string_hello);
	}, 2*waitTime);

	// Volta as strings ao normal
	setTimeout(function(){
		$('#content_ram_string1').removeAttr('style');
		$('#content_ram_string3').removeAttr('style');
	}, 3*waitTime);

	setTimeout(dma_state2_3, 4*waitTime);
}

function dma_state2_3(){
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);
	//lockButtons();

	$('#content_printer_page').html('');
	$('#content_ram_reg').html('');

	stringToPrinter(1, 0);
	
	process2_state4();
	
	setTimeout(function(){
		process2_state5();
	}, 3*waitTime);
	
	setTimeout(function(){
		process2_state6();
	}, 3*waitTime);
	
	setTimeout(function(){
		process2_state7();
	}, 6*waitTime);
	
	setTimeout(function(){
		process2_state8();
	}, 9*waitTime);
	
	setTimeout(function(){
		process2_state9();
	}, 12*waitTime);
	
	setTimeout(function(){
		process2_state10();
	}, 15*waitTime);
	
	setTimeout(function(){
		process2_state11();
	}, 18*waitTime);
	
	setTimeout(function(){
		process2_state12();
	}, 21*waitTime);
}

function dma_state3(){
	stateVar = 3;
	stateTime[stateVar] = 0;
	animationLock = true;
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);
	lockButtons();
	
	$('#process1_intr1').html(instructions[langSelect][1]);
	$('#process1_intr2').html(instructions[langSelect][2]);
	$('#process1_intr3').html(instructions[langSelect][16]);
	$('#process1_intr4').html(instructions[langSelect][3]);
	$('#process1_intr5').html(instructions[langSelect][4]);
	updateTime(2);
	stateTime[stateVar] += 2;

	$('#content_help_content').html(langStrings[langSelect][stepOffset+stateVar]);
	
	$('#content_dma_content').html(langStrings[langSelect][32]);
	$('#content_dma_content').css({'border': '2px solid #063', 'color': '#063'});
	
	upArrowStyle(langStrings[langSelect][30], 0, 2);
	clearArrowText(4);

	setTimeout(function(){
		$('#process_status').removeClass('content_process_status_blocked');
		$('#process_status').addClass('content_process_status_running');
		process_setReady(2, fadeTime);
		process_setRunning(3, fadeTime);
		
		clearArrowText(2);
		$('#text_2').html('');
	}, 3*waitTime);
	
	setTimeout(function(){
		$('#content_process_3_cpu').slideUp(fadeTime);
		process_setReady(2, fadeTime);
		process_setRunning(1, fadeTime);
		updateTime(3);
		stateTime[stateVar] += 3;
		$('#process_status').removeClass('content_process_status_blocked');
		$('#process_status').addClass('content_process_status_running');
		
		clearArrowText(2);
		$('#text_2').html('');
	}, 6*waitTime);
	
	setTimeout(function(){
		$('#process1_intr1').html(instructions[langSelect][2]);
		$('#process1_intr2').html(instructions[langSelect][16]);
		$('#process1_intr3').html(instructions[langSelect][3]);
		$('#process1_intr4').html(instructions[langSelect][4]);
		$('#process1_intr5').html(instructions[langSelect][5]);
		updateTime(2);
		stateTime[stateVar] += 2;
	}, 7*waitTime);
	
	setTimeout(function(){
		$('#process1_intr1').html(instructions[langSelect][16]);
		$('#process1_intr2').html(instructions[langSelect][3]);
		$('#process1_intr3').html(instructions[langSelect][4]);
		$('#process1_intr4').html(instructions[langSelect][5]);
		$('#process1_intr5').html('&nbsp');
		updateTime(2);
		stateTime[stateVar] += 2;
	}, 8*waitTime);
	
	setTimeout(function(){
		$('#process1_intr1').html(instructions[langSelect][3]);
		$('#process1_intr2').html(instructions[langSelect][4]);
		$('#process1_intr3').html(instructions[langSelect][5]);
		$('#process1_intr4').html('&nbsp');
		$('#process1_intr5').html('&nbsp');
		updateTime(2);
		stateTime[stateVar] += 2;
	}, 9*waitTime);
	
	setTimeout(function(){
		$('#content_process_1_cpu').slideUp(fadeTime);
		process_setRunning(2, fadeTime);
		updateTime(3);
		stateTime[stateVar] += 3;
	}, 10*waitTime);

	unlockButtonsAll();
	animationLock = false;
}
