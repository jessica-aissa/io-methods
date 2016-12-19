/* ### GLOBAL VARIABLES ### */
var fadeTime = 800;			// Fade time for sliding and fading transitions
var waitTime = 1000;		// Waiting time for mini-state changing

var currentMethod = -1;		// Identifies the current method on display
var stateVar = 0;			// Identifies the macro-state for the current method
var prevStateVar = 0;		// Identifies the previous macro-state for the current method
var stateTime = [0,0,0,0];	// Time consumed in the current state/step;
var isRunning = false;		// If true, method must run to the end (run through all macro-states)
var maxState = 0;			// Maximum amount of states for each method
var animationLock = false;	// Locks buttons when animation is running
var langSelect = 0;			// Default portuguese
var stepOffset = [36, 41, 46];

var printerIsOccupied = false;

/* ### METHODS ### */

function setup(animationTime){
	// Setar strings
	$('#content_ram_string1').html("");
	$('#content_ram_string2').html("");
	
	var x = +currentMethod+1;
	$('#content_header_method').html(langStrings[langSelect][x]);
	
	// Mostrar conteúdo
	$('#content_arrow_top').show();
	/*$('#arrow_1v').show();
	$('#arrow_1a').show();
	$('#arrow_2v').show();
	$('#arrow_2a').show();
	$('#arrow_3v').show();
	$('#arrow_3a').show();
	$('#arrow_4v').show();
	$('#arrow_4a').show();*/
	
	// Mostrar blocos
	$('#content_header_method').slideDown(animationTime);
	$('#content_scheduler').slideDown(animationTime);
	$('#content_cpu').slideDown(animationTime);
	$('#content_ram').slideDown(animationTime);
	$('#content_printer').slideDown(animationTime);
	$('#content_help').slideDown(animationTime);
}

// Sets up a method
function setupMethod(method){
	stateTime = [0,0,0,0];
	// No method has been set. Has to load entire page
	if(currentMethod == -1){
		$(this).css('background-color','#E2E2E2');
		$('#intro_text').hide();
		
		setup(0);
		currentMethod = method.data.number;
		languageSet();
		switch(method.data.number){
			case '1':
				maxState = 4;
				break;
				
			case '2':
				maxState = 4;
				break;
				
			case '3':
				$('#content_dma').show();
				$('#content_arrow_bottom').show();
				maxState = 3;
				break;
				
			default:
				break;
		}
		
		stateSelect();
	}
	
	// A method has already been set and the page has been previously loaded
	else if(currentMethod != method.data.number){
		var c = confirm(langStrings[langSelect][16]);
		
		for(var i=1; i<=3; i++)
			$('#btnMethod'+i).css('background-color','');
		$(this).css('background-color','#E2E2E2');
		
		if(c == true){
			switch(method.data.number){
				case '1':
					$('#content_arrow_bottom').hide();
					$('#content_dma').slideUp(fadeTime);
					maxState = 4;
					break;
				case '2':
					$('#content_arrow_bottom').hide();
					$('#content_dma').slideUp(fadeTime);
					maxState = 4;
					break;
				case '3':
					$('#content_arrow_bottom').show();
					$('#content_dma').slideDown(fadeTime);
					maxState = 3;
					break;
				default:
					break;
			}
			
			prevStateVar = stateVar = 0;
			currentMethod = method.data.number;
			stateSelect();
		}
	}
}

// Sets up a state !! ADD HERE WHEN YOU CREATE MORE STATES
function stateSelect(){
	
	// Programmed
	if(currentMethod == 1){
		
		switch(stateVar){
			case 0:
				state0();
				break;
			case 1:
				prog_state1();
				break;
			case 2:
				prog_state2();
				break;
			case 3:
				prog_state3();
				break;
			case 4:
				prog_state4();
				break;
		}
	}
	
	if(currentMethod == 2){
		switch(stateVar){
			case 0:
				state0();
				break;
			case 1:
				intp_state1();
				break;
			case 2:
				intp_state2();
				break;
			case 3:
				intp_state3();
				break;
			case 4:
				intp_state4();
				break;
		}
	}
	
	if(currentMethod == 3){
		switch(stateVar){
			case 0:
				state0();
				break;
			case 1:
				dma_state1();
				break;
			case 2:
				dma_state2();
				break;
			case 3:
				dma_state3();
				break;
			case 4:
				dma_state4();
				break;
			case 5:
				dma_state5();
				break;
			case 6:
				dma_state6();
				break;
		}
	}
}

function colorCharacter(string, index){
    var istr = string.substr(0,index);
    var estr = string.substr(index+1,string.length);
    var changed = '<span class="change">' + string.charAt(index) + '</span>';
    return istr.concat(changed).concat(estr);
}

function languageSet(){
	if(animationLock == false){
		$('#header').html(langStrings[langSelect][0]);
		$('#nav_block_method').html(langStrings[langSelect][1]);
		$('#btnMethod1').html(langStrings[langSelect][2]);
		$('#btnMethod2').html(langStrings[langSelect][3]);
		$('#btnMethod3').html(langStrings[langSelect][4]);
		$('#nav_block_control').html(langStrings[langSelect][5]);
		$('#btnStart').html(langStrings[langSelect][6]);
		$('#btnStop').html(langStrings[langSelect][7]);
		$('#btnReload').html(langStrings[langSelect][29]);
		$('#nav_block_help').html(langStrings[langSelect][8]);
		$('#nav_block_help_content').html(langStrings[langSelect][9]);
		$('#intro_text').html(langStrings[langSelect][15]);
		$('#content_scheduler_header').html(langStrings[langSelect][10]);
		$('#content_help_header').html(langStrings[langSelect][11]);
		$('#content_printer_title').html(langStrings[langSelect][12]);
		$('#time_lapse').html(langStrings[langSelect][13]);
		$('#programmed_time_id').html(langStrings[langSelect][2]);
		$('#interrupt_time_id').html(langStrings[langSelect][3]);
		$('#dma_time_id').html(langStrings[langSelect][4]);
		$('#language').html(langStrings[langSelect][14]);
		$('#user_space').html(langStrings[langSelect][23]);
		$('#printer_reg').html(langStrings[langSelect][24]);
		$('#kernel_space').html(langStrings[langSelect][25]);
		$('#process_1').html(langStrings[langSelect][26]);
		$('#process_2').html(langStrings[langSelect][27]);
		$('#process_3').html(langStrings[langSelect][30]);
		$('#process_1_cpu').html(langStrings[langSelect][26]);
		$('#process_2_cpu').html(langStrings[langSelect][27]);
		$('#process_3_cpu').html(langStrings[langSelect][30]);
		$('#content_cpu_text').html(langStrings[langSelect][28]);
		$('#content_dma_content').html(langStrings[langSelect][32]);
		$('#process3_intr3').html(langStrings[langSelect][35]);
		
		// Seta o header do método
		if(currentMethod != -1){
			var x = +currentMethod+1;
			$('#content_header_method').html(langStrings[langSelect][x]);
			$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);		
		}
	}
	
	
}

// Seta o estilo da seta para cima
function downArrowStyle(string, val){
	$('#text_'+val).html(string);
	$('#text_'+val).show();
	$('#text_'+val).css({'color': '#7C1D1D'});
	$('#arrow_'+val+'v').css({'background': '#7C1D1D'});
	$('#arrow_'+val+'a').css({'border-top-color': '#7C1D1D'});
}

// Seta o estilo da seta para baixo
function upArrowStyle(string, color, val){
	// Red
	if(color == 0){
		$('#text_'+val).css({'color': '#7C1D1D'});
		$('#arrow_'+val+'v').css({'background': '#7C1D1D'});
		$('#arrow_'+val+'a').css({'border-top-color': '#7C1D1D'});
	}
	// Green
	if(color == 1){
		$('#text_'+val).css({'color': '#063'});
		$('#arrow_'+val+'v').css({'background': '#063'});
		$('#arrow_'+val+'a').css({'border-top-color': '#063'});
	}
	$('#text_'+val).html(string);
	$('#text_'+val).show();
}

// Limpa o estilo das setas
function clearArrowText(val){
	$('#text_'+val).removeAttr('style');
	$('#text_'+val).addClass('arrow_text');
	$('#arrow_'+val+'v').removeAttr('style');
	$('#arrow_'+val+'v').addClass('arrow_base arrow_vD');
	$('#arrow_'+val+'a').removeAttr('style');
	$('#arrow_'+val+'a').addClass('arrow_base arrow_aD');
}

/* ### PROCESSES ### */
function process_setBlocked(id, animationTime){
	$('#content_process_'+id+'_cpu').slideDown(animationTime);
	$('#content_process_'+id+'_sqd').slideUp(animationTime);
	$('#content_process_'+id+'_sqd_status').toggleClass("content_process_status_ready content_process_status_blocked", false);
	$('#content_process_'+id+'_sqd_status').toggleClass("content_process_status_blocked", true);
}

function process_setBlockedSqd(id, animationTime){
	$('#content_process_'+id+'_cpu').slideUp(animationTime);
	$('#content_process_'+id+'_sqd').slideDown(animationTime);
	$('#content_process_'+id+'_sqd_status').toggleClass("content_process_status_ready content_process_status_blocked", false);
	$('#content_process_'+id+'_sqd_status').toggleClass("content_process_status_blocked", true);
}

function process_setReady(id, animationTime){
	$('#content_process_'+id+'_cpu').slideUp(animationTime);
	$('#content_process_'+id+'_sqd').slideDown(animationTime);
	$('#content_process_'+id+'_sqd_status').toggleClass("content_process_status_ready content_process_status_blocked", false);
	$('#content_process_'+id+'_sqd_status').toggleClass("content_process_status_ready", true);
}

function process_setRunning(id, animationTime){
	$('#content_process_'+id+'_cpu').slideDown(animationTime);
	$('#content_process_'+id+'_sqd').slideUp(animationTime);
}

function interruption_setRunning(val, animationTime){
	if(val == 0)
		$('#content_interruption_cpu').slideUp(animationTime);
	
	if(val == 1)
		$('#content_interruption_cpu').slideDown(animationTime);
}

/* ### BUTTONS ### */
function start(){
	state0();
	if(currentMethod != -1 && stateVar == 0 && animationLock == false){
		$(this).prop("disabled",true); // #btnStart
		$("#btnBack").prop("disabled",true);
		$("#btnForward").prop("disabled",true);
		$("#btnRepeat").prop("disabled",true);
		
		isRunning = true;

		stateVar++;
		stateSelect();
	}
	
	if(currentMethod == -1){
		alert(langStrings[langSelect][17]);
	}
}

function stop(){

	if(currentMethod != -1){
		isRunning = false;
	}
}

function back(){
	
	if(currentMethod != -1 && animationLock == false && stateVar > 0){
		$("#btnStart").prop("disabled",true);
		$("#btnStop").prop("disabled",true);

		updateTime(-(stateTime[stateVar] + stateTime[prevStateVar]));
		prevStateVar = stateVar;
		stateVar--;
		
		if(stateVar < 0)
			stateVar = 0;
	    
	    stateSelect();
	    isRunning = false;
	}
}

function repeat(){
	
	if(currentMethod != -1 && animationLock == false){
		$("#btnStart").prop("disabled",false);
		$("#btnStop").prop("disabled",false);

		updateTime(-(stateTime[stateVar]));
	    stateSelect();
	    isRunning = false;
	}
}

function forward(){

	if(currentMethod != -1 && animationLock == false){
		$("#btnStart").prop("disabled",true);
		$("#btnStop").prop("disabled",true);

		prevStateVar = stateVar;
		stateVar++;
		if(stateVar > maxState){
			var answer = confirm("Method has finished! Would you like to reset?");
			if(answer) {
				unlockButtonsAll();
				stateVar = 0;
				switch (+currentMethod){
					case 1:
						$('#programmed_time').text('0');
						break;
					case 2:
						$('#interrupt_time').text('0');
						break;
					case 3:
						$('#dma_time').text('0');
						break;
				}
				state0();
			}
			return;
		}

	    stateSelect();
	    isRunning = false;
	}else{
		alert("Method not set");
	}
}

function reset(){

	if(currentMethod != -1) {
		$("#btnStart").prop("disabled", false);
		$("#btnStop").prop("disabled", false);
		$("#btnBack").prop("disabled", false);
		$("#btnRepeat").prop("disabled", false);
		$("#btnForward").prop("disabled", false);

		isRunning = 0;
		stateVar = 0;
		switch (+currentMethod){
			case 1:
				string = $('#programmed_time').text("0");
				break;
			case 2:
				string = $('#interrupt_time').text("0");
				break;
			case 3:
				string = $('#dma_time').text("0");
				break;
		}
		state0();
	}
}

function lockButtons(){
	$('#btnMethod1').prop("disabled", true);
	$('#btnMethod2').prop("disabled", true);
	$('#btnMethod3').prop("disabled", true);

	$("#btnStart").prop("disabled", true);
	$("#btnBack").prop("disabled", true);
	$("#btnRepeat").prop("disabled", true);
	$("#btnForward").prop("disabled", true);
	$("#btnReload").prop("disabled", true);
	if(!isRunning)
		$("#btnStop").prop("disabled", true);
}

function unlockButtons(){
	$('#btnMethod1').prop("disabled", false);
	$('#btnMethod2').prop("disabled", false);
	$('#btnMethod3').prop("disabled", false);

	$("#btnReload").prop("disabled", false);
	if(isRunning){
		$("#btnStart").prop("disabled", false);
		$("#btnStop").prop("disabled", false);
	}else{
		$("#btnBack").prop("disabled", false);
		$("#btnRepeat").prop("disabled", false);
		$("#btnForward").prop("disabled", false);
	}
}

function unlockButtonsAll(){
	$('#btnMethod1').prop("disabled", false);
	$('#btnMethod2').prop("disabled", false);
	$('#btnMethod3').prop("disabled", false);

	$("#btnReload").prop("disabled", false);
	$("#btnStart").prop("disabled", false);
	$("#btnStop").prop("disabled", false);
	$("#btnBack").prop("disabled", false);
	$("#btnRepeat").prop("disabled", false);
	$("#btnForward").prop("disabled", false);
}

// STATE 0
function state0(){
	stateVar = 0;
	// help box
	$('#content_help_content').html(langStrings[langSelect][stepOffset[currentMethod-1]+stateVar]);

	// printer
	$('#content_printer_page').html(string_empty);
	$('#printer_status').removeClass().addClass('content_printer_status content_printer_status_idle');
	$('#text_1').html('');
	$('#text_2').html('');
	clearArrowText(2);

	// RAM
	$('#content_ram_string1').html(string_empty);
	$('#content_ram_string2').html("");
	$('#content_ram_reg').html(string_empty);
	$('#content_ram_string3').html(string_empty);
	
	$('#content_process_3_sqd').hide();
	$('#content_process_3_cpu').hide();
	
	// DMA
	$('#content_dma_content').css({'border': '2px solid #063', 'color': '#063'});
	if(prevStateVar == 1){
		process_setReady(1, fadeTime);
	}
	else{
		process_setReady(1, 0);
		process_setReady(2, 0);
	}
}

// Loop para imprimir a string em 0x00
function stringToPrinter(i, n){
	if(currentMethod == 3){
		var text1 = '#text_3';
		var text2 = '#text_4';
	}else{
		var text1 = '#text_1';
		var text2 = '#text_2';
	}
	if(n < 6){
		setTimeout(function(){
			// Limpa os elementos
			clearArrowText(2);
			clearArrowText(4);
			$(text1).html('');
			$(text2).html('');
			
			// Colore a string no kernel
			hello_color = colorCharacter(string_hello, n+5);
			$('#content_ram_string3').html(hello_color);
			
		}, i*waitTime);
		i++;
		
		setTimeout(function(){
			// Mensagem da CPU para a impressora
			if(currentMethod == 3){
				downArrowStyle(langStrings[langSelect][22], 3);
			}else{
				downArrowStyle(langStrings[langSelect][22], 1);
			}
			
			// Coloca a letra no registro de dados
			$('#content_ram_reg').append(string_hello.charAt(n+5));
		}, i*waitTime);
		i++;
		
		setTimeout(function(){
			// Imprime a letra
			$('#content_printer_page').append(string_hello.charAt(n+5));
			
			// Mensagem da impressora pra CPU
			if(currentMethod == 3){
				upArrowStyle(langStrings[langSelect][21], 0, 4);
			}else{
				upArrowStyle(langStrings[langSelect][21], 0, 2);
			}
			
			// Limpa os elementos
			if(currentMethod == 3){
				clearArrowText(3);
			}else{
				clearArrowText(1);
			}
			updateTime(4);
			stateTime[stateVar] += 4;
		}, i*waitTime);
		i++, n++;
		
		// Chama o próximo ciclo
		stringToPrinter(i, n);
	}
	
	else{
		setTimeout(function(){
			// Limpa os elementos
			if(currentMethod == 3){
				clearArrowText(4);
			} else{
				clearArrowText(2);
			}
			$(text1).html('');
			$(text2).html('');

			// Colore a string no kernel
			hello_color = colorCharacter(string_hello, n+6);
			$('#content_ram_string3').html(hello_color);
		}, i*waitTime);
		i++;

		setTimeout(function(){
			// Mensagem da CPU para a impressora
			if(currentMethod == 3){
				downArrowStyle(langStrings[langSelect][22], 3);
			}else{
				downArrowStyle(langStrings[langSelect][22], 1);
			}
		}, i*waitTime);
		i++;

		setTimeout(function(){
			$('#printer_status').removeClass('content_printer_status_occupied');
			$('#printer_status').addClass('content_printer_status_idle');
			// Mensagem da impressora para a CPU
			if(currentMethod == 3){
				upArrowStyle(langStrings[langSelect][20], 1, 4);
				// Limpa os elementos
				clearArrowText(3);
			}else {
				upArrowStyle(langStrings[langSelect][20], 1, 2);

				// Ajusta os elementos
				$('#content_ram_string3').removeAttr('style');
				$('#process_status').removeClass('content_process_status_blocked');
				$('#process_status').addClass('content_process_status_running');
				$('#process1_intr3').css({'border': '2px solid #063', 'color': '#063'});
				// Limpa os elementos
				clearArrowText(1);
			}
		}, i*waitTime);
		i++;
			
		animationLock = false;
		setTimeout(function(){
			if(isRunning) {
				if(currentMethod == 1)
					setTimeout(prog_state4, waitTime);
				if(currentMethod == 3)
					setTimeout(dma_state3, waitTime);
			}else{
				setTimeout(function(){ unlockButtons() },waitTime);
		}
			animationLock = false;
		}, i*waitTime);
	}
}

function updateTime(add){
	var string = '';
	switch (+currentMethod){
		case 1:
			string = $('#programmed_time').text();
			break;
		case 2:
			string = $('#interrupt_time').text();
			break;
		case 3:
			string = $('#dma_time').text();
			break;
	}

	string = +(+string+add);
	switch (+currentMethod){
		case 1:
			$('#programmed_time').text(string);
			break;
		case 2:
			$('#interrupt_time').text(string);
			break;
		case 3:
			$('#dma_time').text(string);
			break;
	}
}