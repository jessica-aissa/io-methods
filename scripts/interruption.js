/* ### INTERRUPTION-DRIVEN ### */

// STATE 1 - RUN INSTRUCTIONS

function intp_state1(){
	stateVar = 1;
	stateTime[stateVar] = 0;
	animationLock = true;
	lockButtons();
	
	$('#content_ram_string1').html(string_hello+"<br>");
	$('#content_ram_string2').html(string_hi);
	
	$('#process1_intr1').html('&nbsp');
	$('#process1_intr2').html('&nbsp');
	$('#process1_intr3').html(instructions[langSelect][0]);
	$('#process1_intr4').html(instructions[langSelect][1]);
	$('#process1_intr5').html(instructions[langSelect][2]);

	$('#process1_intr3').removeAttr('style');
	$('#process1_intr3').addClass('content_process_intr3');
	$('#process_status').removeClass('content_process_status_blocked');
	$('#process_status').addClass('content_process_status_running');
	$('#printer_status').removeClass('content_printer_status_occupied');
	$('#printer_status').addClass('content_printer_status_idle');
	
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);

	setTimeout(intp_state1_1, waitTime);
}
function intp_state1_1(){
	$('#content_cpu_text').hide();
	process_setRunning(1, fadeTime);

	setTimeout(intp_state1_2, waitTime+fadeTime);
}

function intp_state1_2(){

	$('#process1_intr2').html(instructions[langSelect][0]);
	$('#process1_intr3').html(instructions[langSelect][1]);
	$('#process1_intr4').html(instructions[langSelect][2]);
	$('#process1_intr5').html(instructions[langSelect][13]);
	updateTime(2);
	stateTime[stateVar] += 2;

	setTimeout(intp_state1_3, waitTime);
}

function intp_state1_3(){

	$('#process1_intr1').html(instructions[langSelect][0]);
	$('#process1_intr2').html(instructions[langSelect][1]);
	$('#process1_intr3').html(instructions[langSelect][2]);
	$('#process1_intr4').html(instructions[langSelect][13]);
	$('#process1_intr5').html(instructions[langSelect][15]);
	updateTime(2);
	stateTime[stateVar] += 2;

	setTimeout(intp_state1_4, waitTime);
}

function intp_state1_4(){

	$('#process1_intr1').html(instructions[langSelect][1]);
	$('#process1_intr2').html(instructions[langSelect][2]);
	$('#process1_intr3').html(instructions[langSelect][13]);
	$('#process1_intr4').html(instructions[langSelect][15]);
	$('#process1_intr5').html(instructions[langSelect][3]);
	updateTime(2);
	stateTime[stateVar] += 2;


	setTimeout(intp_state1_5, waitTime);
}

function intp_state1_5(){
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
		updateTime(2);
		stateTime[stateVar] += 2;
	}, 3*waitTime);		
	

	if(isRunning) {
		setTimeout(intp_state2, 4 * waitTime);
	}else{
		setTimeout(function(){ unlockButtons() },4*waitTime);
	}
	animationLock = false;
}

// STATE 2 - COPY STRING FROM USER TO KERNEL
function intp_state2(){
	stateVar = 2;
	stateTime[stateVar] = 0;
	lockButtons();
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);

	animationLock = true;

	// Seta o estado inicial dos elementos

	$('#content_ram_string2').removeAttr('style');
	$('#content_ram_string3').removeAttr('style');
	$('#process1_intr3').addClass('content_process_intr3');
	//$('#process_status').removeClass('content_process_status_blocked');
	//$('#process_status').addClass('content_process_status_running');

	$('#process1_intr1').html(instructions[langSelect][2]);
	$('#process1_intr2').html(instructions[langSelect][13]);
	$('#process1_intr3').html(instructions[langSelect][15]);
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

	// Colore a string no espa�o de usu�rio
	setTimeout(function(){
		$('#content_ram_string2').css({'color': '#CC0000', 'border': '2px solid #CC0000'});
	}, 2*waitTime);

	// Copia a string Hello World! no espa�o de kernel
	setTimeout(function(){
		$('#content_ram_string3').css({'color': '#CC0000', 'border': '2px solid #CC0000'});
		$('#content_ram_string3').html(string_hi);
	}, 3*waitTime);

	// Volta as strings ao normal
	setTimeout(function(){
		$('#content_ram_string2').removeAttr('style');
		$('#content_ram_string3').removeAttr('style');
		updateTime(2);
		stateTime[stateVar] += 2;
	}, 4*waitTime);

	if(isRunning) {
		setTimeout(intp_state3, 5 * waitTime);
	}else{
		setTimeout(function(){ unlockButtons() },5*waitTime);
	}

	animationLock = false;
}

function intp_state3(){
	stateVar = 3;
	stateTime[stateVar] = 0;
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);
	animationLock = true;
	lockButtons();

	$('#content_process_1_sqd_status').removeClass('content_process_status_ready');
	$('#content_process_1_sqd_status').addClass('content_process_status_blocked');
	/*$('#content_process_1_sqd').show();
	$('#content_process_2_sqd').hide();

	$('#content_process_1_cpu').hide();
	$('#process2_intr1').html('&nbsp');
	$('#process2_intr2').html('&nbsp');
	$('#content_process_2_cpu').show();*/

	$('#process2_intr1').html('&nbsp');
	$('#process2_intr2').html('&nbsp');
	$('#process2_intr3').html(instructions[langSelect][0]);
	$('#process2_intr4').html(instructions[langSelect][1]);
	$('#process2_intr5').html(instructions[langSelect][2]);
	updateTime(3);
	stateTime[stateVar] += 3;
	
	process_setBlockedSqd(1, fadeTime);
	process_setRunning(2, fadeTime);

	$('#content_printer_page').html('&nbsp');
	$('#content_ram_reg').html('&nbsp');

	intp_state3_1();

}


function intp_state3_1(){

	setTimeout(function(){
	   stringToPrinter_intp(1, 0);
	}, waitTime);

	animationLock = false;
}

// Envia a interrup��o para a CPU avisando que acabou
function intp_state4(){
	stateVar = 4;
	animationLock = true;
	lockButtons();
	
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);
	
	clearArrowText(2);
	$('#process1_intr1').html(instructions[langSelect][2]);
	$('#process1_intr2').html(instructions[langSelect][13]);
	$('#process1_intr3').html(instructions[langSelect][15]);
	$('#process1_intr4').html(instructions[langSelect][3]);
	$('#process1_intr5').html(instructions[langSelect][4]);
	
	process_setRunning(1, fadeTime);
	process_setReady(2, fadeTime);
	
	setTimeout(function(){
		$('#process1_intr3').removeAttr('style');
	}, waitTime);
	
	setTimeout(function(){
		$('#process1_intr1').html(instructions[langSelect][13]);
		$('#process1_intr2').html(instructions[langSelect][15]);
		$('#process1_intr3').html(instructions[langSelect][3]);
		$('#process1_intr4').html(instructions[langSelect][4]);
		$('#process1_intr5').html(instructions[langSelect][5]);
		updateTime(2);
		stateTime[stateVar] += 2;
	}, waitTime);
	
	setTimeout(function(){
		$('#process1_intr1').html(instructions[langSelect][15]);
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

	setTimeout(function(){
		$('#process2_intr1').html(instructions[langSelect][3]);
		$('#process2_intr2').html(instructions[langSelect][4]);
		$('#process2_intr3').html(instructions[langSelect][5]);
		$('#process2_intr4').html('&nbsp');
		$('#process2_intr5').html('&nbsp');
		updateTime(2);
		stateTime[stateVar] += 3;
	}, 5*waitTime);
	
	unlockButtonsAll();

	animationLock = false;
}


function stringToPrinter_intp(i, n){

	if(n < 3){
		setTimeout(function(){
			// Limpa os elementos
			clearArrowText(2);
			$('#text_1').html('');
			$('#text_2').html('');

			// Colore a string no kernel
			hello_color = colorCharacter(string_hi, n+5);
			$('#content_ram_string3').html(hello_color);

		}, i*waitTime);
		i++;
		
		setTimeout(function(){
			// Atualiza as intruções no processo 2
			process2_setState(n+1);
		}, i*waitTime);
		i++;
		
		setTimeout(function(){
			upArrowStyle(langStrings[langSelect][30], 0, 2);
			// Ressalta a string no kernel
			$('#content_ram_string3').css({'color': '#CC0000', 'border': '2px solid #CC0000'});
			process_setReady(2, fadeTime);
		}, i*waitTime);
		i++;
		
		setTimeout(function(){
			clearArrowText(2);
			// Abre interrupção
			$('#content_process_3_cpu').slideDown(fadeTime);
			//process_setRunning(3, fadeTime);
		}, i*waitTime);

		setTimeout(function(){
			// Coloca a letra no registro de dados
			$('#content_ram_reg').append(string_hi.charAt(n+5));
		}, i*waitTime);
		i++;
		
		setTimeout(function(){
			// Imprime a letra
			$('#content_printer_page').append(string_hi.charAt(n+5));
		}, i*waitTime);
		i++;
		
		setTimeout(function(){
			// Fecha interrupção
			$('#content_process_3_cpu').slideUp(fadeTime);
		}, i*waitTime);
		
		setTimeout(function(){
			// Remove ressalto
			$('#content_ram_string3').removeAttr('style');	
			process_setRunning(2, fadeTime);
			updateTime(7); // impressao mais troca de contexto
			stateTime[stateVar] += 7;
		}, i*waitTime);
		i++;

		n++;
		// Chama o pr�ximo ciclo
		stringToPrinter_intp(i, n);
	}

	else{
		setTimeout(function(){
			// Limpa os elementos
			clearArrowText(2);
			$('#text_1').html('');
			$('#text_2').html('');

			// Colore a string no kernel
			hello_color = colorCharacter(string_hi, n+6);
			$('#content_ram_string3').html(hello_color);

		}, i*waitTime);
		i++;
		
		setTimeout(function(){
			// Atualiza as intruções no processo 2
			process2_setState(n+1);
		}, i*waitTime);
		i++;

		setTimeout(function(){
			$('#printer_status').removeClass('content_printer_status_occupied');
			$('#printer_status').addClass('content_printer_status_idle');
			// Limpa os elementos
			clearArrowText(3);
		}, i*waitTime);
		i++;

		setTimeout(function(){
			// Ajusta os elementos
			upArrowStyle(langStrings[langSelect][30], 1, 2);
			$('#content_ram_string3').removeAttr('style');
			$('#process_status').removeClass('content_process_status_blocked');
			$('#process_status').addClass('content_process_status_running');
			$('#process1_intr3').css({'border': '2px solid #063', 'color': '#063'});

			// Limpa os elementos
			clearArrowText(1);
		}, i*waitTime);
		i++;
		
		setTimeout(function(){
			process2_setState(n+1);
		}, i*waitTime);

		setTimeout(function(){
			if(isRunning) {
				setTimeout(intp_state4, waitTime);
			}else{
				setTimeout(function(){ unlockButtons() },4*waitTime);
			}

			animationLock = false;
		}, i*waitTime);
	}
}