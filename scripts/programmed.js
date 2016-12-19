/* ### PROGRAMMED ### */

// STATE 1 - RUN INSTRUCTIONS
function prog_state1(){
	stateVar = 1;
	animationLock = true;
	stateTime[stateVar] = 0;
	
	process2_state1();
	process1_state1();
	$('#content_ram_string1').html(string_hello+"<br>");
	$('#content_ram_string2').html('');
	
	// Limpando elementos
	$('#process1_intr3').removeAttr('style');
	$('#process1_intr3').addClass('content_process_intr3');
	$('#process_status').removeClass('content_process_status_blocked');
	$('#process_status').addClass('content_process_status_running');
	$('#printer_status').removeClass('content_printer_status_occupied');
	$('#printer_status').addClass('content_printer_status_idle');
	
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);
	
	prog_state1_1();
}
function prog_state1_1(){
	$('#content_cpu_text').hide();
	process_setRunning(1, fadeTime);
	
	setTimeout(prog_state1_2, waitTime+fadeTime);
}

function prog_state1_2(){
	$('#process1_intr2').html(instructions[langSelect][0]);
	$('#process1_intr3').html(instructions[langSelect][1]);
	$('#process1_intr4').html(instructions[langSelect][2]);
	$('#process1_intr5').html(instructions[langSelect][13]);
	updateTime(2);
	stateTime[stateVar] += 2;
	
	setTimeout(prog_state1_3, waitTime);
}

function prog_state1_3(){
	$('#process1_intr1').html(instructions[langSelect][0]);
	$('#process1_intr2').html(instructions[langSelect][1]);
	$('#process1_intr3').html(instructions[langSelect][2]);
	$('#process1_intr4').html(instructions[langSelect][13]);
	$('#process1_intr5').html(instructions[langSelect][14]);
	updateTime(2);
	stateTime[stateVar] += 2;
	
	setTimeout(prog_state1_4, waitTime);
}

function prog_state1_4(){
	$('#process1_intr1').html(instructions[langSelect][1]);
	$('#process1_intr2').html(instructions[langSelect][2]);
	$('#process1_intr3').html(instructions[langSelect][13]);
	$('#process1_intr4').html(instructions[langSelect][14]);
	$('#process1_intr5').html(instructions[langSelect][5]);
	updateTime(2);
	stateTime[stateVar] += 2;

	setTimeout(prog_state1_5, waitTime);
}

function prog_state1_5(){
	// Sets Open Printer to red and Acquire Printer	
	$('#process1_intr3').css({'border': '2px solid #CC0000', 'color': '#CC0000'});
	$('#process_status').removeClass('content_process_status_running');
	$('#process_status').addClass('content_process_status_blocked');
	
	downArrowStyle(langStrings[langSelect][18], 1);
	
	// Changes from IDLE to OCCUPIED
	setTimeout(function(){
		$('#printer_status').removeClass('content_printer_status_idle');
		$('#printer_status').addClass('content_printer_status_occupied');
	}, waitTime);
	
	// Sets Open Printer to green and Printer Acquired
	setTimeout(function(){
		$('#process1_intr3').css({'border': '2px solid #063', 'color': '#063'});
		
		upArrowStyle(langStrings[langSelect][19], 1, 2);
		
		clearArrowText(1);
	}, 2*waitTime);
	
	setTimeout(function(){
		$('#process1_intr3').removeAttr('style');
		$('#process1_intr3').addClass('content_process_intr3');
		$('#process_status').removeClass('content_process_status_blocked');
		$('#process_status').addClass('content_process_status_running');
		
		clearArrowText(2);
	}, 3*waitTime);		
	
	if(isRunning) {
		setTimeout(prog_state2, 4 * waitTime);
	}else{
		unlockButtons();
	}
		
	animationLock = false;
}

// STATE 2 - COPY STRING FROM USER TO KERNEL
function prog_state2(){
	stateVar = 2;
	stateTime[stateVar] = 0;
	animationLock = true;
	lockButtons();

	// Seta o estado inicial dos elementos
	$('#content_ram_string1').removeAttr('style');
	$('#content_ram_string3').removeAttr('style');
	$('#process1_intr3').addClass('content_process_intr3');
	$('#process_status').removeClass('content_process_status_blocked');
	$('#process_status').addClass('content_process_status_running');
	
	$('#process1_intr1').html(instructions[langSelect][2]);
	$('#process1_intr2').html(instructions[langSelect][13]);
	$('#process1_intr3').html(instructions[langSelect][14]);
	$('#process1_intr4').html(instructions[langSelect][3]);
	$('#process1_intr5').html(instructions[langSelect][4]);
	$('#content_ram_string3').html(string_empty);
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);
	$('#text_1').html('');
	$('#text_2').html('');
	
	// Colore a syscall e seta o estado do processo
	setTimeout(function(){
		$('#process1_intr3').css({'border': '2px solid #CC0000', 'color': '#CC0000'});
		$('#process_status').removeClass('content_process_status_running');
		$('#process_status').addClass('content_process_status_blocked');
	}, waitTime);
	
	// Colore a string no espaço de usuário
	setTimeout(function(){
		$('#content_ram_string1').css({'color': '#CC0000', 'border': '2px solid #CC0000'});
	}, 2*waitTime);
	
	// Copia a string Hello World! no espaço de kernel
	setTimeout(function(){
		$('#content_ram_string3').css({'color': '#CC0000', 'border': '2px solid #CC0000'});
		$('#content_ram_string3').html(string_hello);
	}, 3*waitTime);
	
	// Volta as strings ao normal
	setTimeout(function(){
		$('#content_ram_string1').removeAttr('style');
		$('#content_ram_string3').removeAttr('style');
		updateTime(2);
		stateTime[stateVar] += 2;
	}, 4*waitTime);
	
	if(isRunning) {
		setTimeout(prog_state3, 5 * waitTime);
	}else{
		unlockButtons();
	}
		
	animationLock = false;	
}

// STATE 3 - PRINT FROM MEMORY TO PAGE
function prog_state3(){
	stateVar = 3;
	stateTime[stateVar] = 0;
	animationLock = true;
	lockButtons();
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);
	
	$('#content_ram_string3').css({'border': '2px solid #CC0000'});
	$('#content_printer_page').html('');
	$('#process_status').removeClass('content_process_status_running');
	$('#process_status').addClass('content_process_status_blocked');
	$('#content_ram_reg').html('');
	
	stringToPrinter(1, 0);
}

// STATE 4 - CONTINUE EXECUTING
function prog_state4(){
	stateVar = 4;
	stateTime[stateVar] = 0;
	animationLock = true;
	lockButtons();
	
	$('#process1_intr3').removeAttr('style');
	$('#process1_intr1').html(instructions[langSelect][2]);
	$('#process1_intr2').html(instructions[langSelect][13]);
	$('#process1_intr3').html(instructions[langSelect][14]);
	$('#process1_intr4').html(instructions[langSelect][3]);
	$('#process1_intr5').html(instructions[langSelect][4]);
	updateTime(2);
	stateTime[stateVar] += 2;
	
	clearArrowText(2);
	
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);
	
	setTimeout(function(){
		$('#process1_intr1').html(instructions[langSelect][13]);
		$('#process1_intr2').html(instructions[langSelect][14]);
		$('#process1_intr3').html(instructions[langSelect][3]);
		$('#process1_intr4').html(instructions[langSelect][4]);
		$('#process1_intr5').html(instructions[langSelect][5]);
		updateTime(2);
		stateTime[stateVar] += 2;
	}, waitTime);
	
	setTimeout(function(){
		$('#process1_intr1').html(instructions[langSelect][14]);
		$('#process1_intr2').html(instructions[langSelect][3]);
		$('#process1_intr3').html(instructions[langSelect][4]);
		$('#process1_intr4').html(instructions[langSelect][5]);
		$('#process1_intr5').html('&nbsp');
		updateTime(2);
		stateTime[stateVar] += 2;
	}, 2*waitTime);
	
	setTimeout(function(){
		$('#process1_intr1').html(instructions[langSelect][3]);
		$('#process1_intr2').html(instructions[langSelect][4]);
		$('#process1_intr3').html(instructions[langSelect][5]);
		$('#process1_intr4').html('&nbsp');
		$('#process1_intr5').html('&nbsp');
		updateTime(2);
		stateTime[stateVar] += 2;
	}, 3*waitTime);
	
	setTimeout(function(){
		$('#content_process_1_cpu').slideUp(fadeTime);
		process_setRunning(2, fadeTime);
		updateTime(3);
		stateTime[stateVar] += 3;
	}, 4*waitTime);

	unlockButtonsAll();
	animationLock = false;
}