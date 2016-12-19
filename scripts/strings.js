/* ### STRINGS ### */
var string_intp_en = "Interruption routine";
var string_intp_pt = "Rotina de interrupção";

var instructions = [];
var langStrings = [];

for(var i=0; i<2; i++)
	instructions[i] = [];
	
for(var i=0; i<50; i++)
	langStrings[i] = [];

instructions[0] = ['Instrução 1', 
				   'Instrução 2',
				   'Instrução 3',
				   'Instrução 4',
				   'Instrução 5',
				   'Instrução 6',
				   'Instrução 7',
				   'Instrução 8',
				   'Instrução 9',
				   'Instrução 10',
				   'Instrução 11',
				   'Instrução 12',
				   'Instrução 13',
				   'Abrir Impressora',
				   'Imprimir 0x00',
				   'Imprimir 0x01',
				   'Abrir DMA'];
	
instructions[1] = ['Instruction 1', 
				   'Instruction 2',
				   'Instruction 3',
				   'Instruction 4',
				   'Instruction 5',
				   'Instruction 6',
				   'Instruction 7',
				   'Instruction 8',
				   'Instruction 9',
				   'Instruction 10',
				   'Instruction 11',
				   'Instruction 12',
				   'Instruction 13',
				   'Open Printer',
				   'Print 0x00',
				   'Print 0x01',
				   'Open DMA'];

langStrings[0][0] = "Métodos de E/S";
langStrings[0][1] = "Método de E/S:";
langStrings[0][2] = "Programada";
langStrings[0][3] = "Interrupção";
langStrings[0][4] = "DMA";
langStrings[0][5] = "Controle:";
langStrings[0][6] = "Iniciar";
langStrings[0][7] = "Parar";
langStrings[0][8] = "Ajuda:";
langStrings[0][9] = '&bull; Aperte <strong>Iniciar</strong> para rodar o método inteiro.<br>'+
                		 '&bull; Aperte <strong>Parar</strong> para parar de rodar o método.<br>'+
                		 '&bull; Aperte <strong>Anterior</strong> para voltar um passo.<br>'+
                		 '&bull; Aperte <strong>Repetir</strong> para repetir um passo.<br>'+
                		 '&bull; Aperte <strong>Próximo</strong> para avançar um passo.<br>'+
                		 '&bull; Aperte <strong>Reiniciar</strong> para recarregar o método.<br>';
langStrings[0][10] = "Escalonador";
langStrings[0][11] = "Passo-a-passo"; 
langStrings[0][12] = "Impressora";
langStrings[0][13] = "Tempo de execução:"; 
langStrings[0][14] = "Idioma:";
langStrings[0][15] = "Selecione o método de E/S na barra de navegação à esquerda.";
langStrings[0][16] = "Você tem certeza que quer trocar de métodos? Você irá perder o progresso no método atual.";
langStrings[0][17] = "Selecione um método.";
langStrings[0][18] = "Obter impressora";
langStrings[0][19] = "Impressora obtida";
langStrings[0][20] = "Sim";
langStrings[0][21] = "Não";
langStrings[0][22] = "Pronto?";
langStrings[0][23] = "Espaço do Usuário:";
langStrings[0][24] = "Registro da Impressora:";
langStrings[0][25] = "Espaço do Núcleo:";
langStrings[0][26] = "Processo 1";
langStrings[0][27] = "Processo 2";
langStrings[0][28] = "Nenhum processo executando";
langStrings[0][29] = "Reiniciar";
langStrings[0][30] = "Interrupção";
langStrings[0][31] = "Ocupado";
langStrings[0][32] = "Disponível";
langStrings[0][33] = "Obter DMA";
langStrings[0][34] = "DMA obtido";
langStrings[0][35] = "Rotina de interrupção";
/* PROGRAMMED */
langStrings[0][36] = "<strong>Passo 0.</strong> Nesse exemplo, rodaremos dois processos. "+ 
					 "Cada processo quer printar uma única string na impressora. "+
					 "A impressora pode estar ociosa, ocupada ou bloqueada, dependendo da tarefa que está executando. Ela não tem um buffer. "+ 
					 "As strings são guardadas na memória.";
langStrings[0][37] = "<strong>Passo 1.</strong> A CPU começará a executar as instruções do Processo 1 sequencialmente. "+ 
					 "Para imprimir uma string, a CPU deve primeiro adquirir a impressora. "+
					 "Para tanto, o processo faz uma <strong>system call</strong>. "+ 
					 "A impressora está ocupado pelo <strong>Processo 1</strong> e se outro processo tentar adquiri-la, a system call irá falhar.";
langStrings[0][38] = "<strong>Passo 2.</strong> Após adquirir a impressora, o processo deve agora imprimir a string por uma system call. "+
					 "A primeira coisa que o SO faz é copiar a string para o espaço de memória do núcleo, onde é mais facilmente acessada. "+
					 "Ele então checa se a impressora está disponível (ela pode estar imprimindo outra string do mesmo processo). "+ 
					 "Se sim, começa o processo de impressão.";
langStrings[0][39] = "<strong>Passo 3.</strong> Para começar a impressão, o SO copia, caractere a caractere, a string no registrador de dados da impressora. "+
					 "Nesse caso, consideramos que a impressora está mapeada na memória, ou seja, o registrador de dados é um outro endereço na RAM que a impressora acessa. "+
					 "Enquanto a impressora opera, a CPU fica constantemente checando seu estado. "+
					 "Ela fica bloqueada até a impressora finalizar a impressão.";
langStrings[0][40] = "<strong>Passo 4.</strong> Assim que a impressora terminar, o processo é desbloqueado. "+ 
					 "O processo executa até o fim e o escalonador se encarrega de carregar o próximo processo (<strong>Processo 2</strong>).";
/* INTERRUPTION */ 
langStrings[0][41] = "<strong>Passo 0.</strong> Nesse exemplo, rodaremos dois processos. "+
	                 "Cada processo quer printar uma única string na impressora. "+
					 "A impressora pode estar ociosa, ocupada ou bloqueada, dependendo da tarefa que está executando. Ela não tem um buffer. "+
					 "As strings são guardadas na memória.";
langStrings[0][42] = "<strong>Passo 1.</strong> A CPU começará a executar as instruções do Processo 1 sequencialmente. "+
					 "Para imprimir uma string, a CPU deve primeiro adquirir a impressora. "+
					 "Para tanto, o processo faz uma <strong>system call</strong>. "+
					 "A impressora está ocupado pelo <strong>Processo 1</strong> e se outro processo tentar adquiri-la, a system call irá falhar.";
langStrings[0][43] = "<strong>Passo 2.</strong> Após adquirir a impressora, o processo deve agora imprimir a string por uma system call. "+
					 "A primeira coisa que o SO faz é copiar a string para o espaço de memória do núcleo, onde é mais facilmente acessada. "+
					 "Ele então checa se a impressora está disponível (ela pode estar imprimindo outra string do mesmo processo). "+
					 "Se sim, começa o processo de impressão.";
langStrings[0][44] = "<strong>Passo 3.</strong> Para começar a impressão, o SO copia, caractere a caractere, a string no registrador de dados da impressora. "+
					 "Nesse caso, consideramos que a impressora está mapeada na memória, ou seja, o registrador de dados é um outro endereço na RAM que a impressora acessa. "+
					 "Enquanto a impressora opera, o escalonador colocou outro processo (Processo 2) para executar na CPU. "+
					 "O Processo 1 fica bloqueado fora da CPU até a impressora finalizar a impressão.";
langStrings[0][45] = "<strong>Passo 4.</strong> Assim que a impressora terminar, ela envia uma interrupção avisando que acabou. "+
					 "O Processo 1 é desbloqueado e o escalonador se encarrega de colocá-lo para executar. Quando ele terminar, o Processo 2 é carregado, e assim em diante";
					 
/* DMA */
langStrings[0][46] = "<strong>Passo 0.</strong> Nesse exemplo, rodaremos dois processos. "+
	                 "Cada processo quer printar uma única string na impressora. "+
					 "A impressora pode estar ociosa, ocupada ou bloqueada, dependendo da tarefa que está executando. Ela não tem um buffer. "+
					 "As strings são guardadas na memória.";
langStrings[0][47] = "<strong>Passo 1.</strong> A CPU começará a executar as instruções do Processo 1 sequencialmente. "+
					 "Para imprimir uma string, a CPU deve primeiro chamar o DMA (Acesso Direto à Memória) para cuidar da impressão em seu lugar e então adquirir a impressora por meio dele. Para tanto, o processo faz uma <strong>system call</strong>. "+
					 "Assim, a CPU é capaz de rodar o <strong>Processo 2</strong> enquanto o DMA imprime os caracteres. "+
					 "A impressora fica ocupada pelo <strong>DMA</strong> e se outro processo tentar adquiri-la, a system call irá falhar.";
langStrings[0][48] = "<strong>Passo 2.</strong> Após adquirir a impressora, o DMA deve, agora, imprimir a string por uma system call. "+
					 "A primeira coisa que o SO faz é copiar a string para o espaço de memória do núcleo, onde é mais facilmente acessada. "+
					 "Ele então checa se a impressora está disponível (ela pode estar imprimindo outro caracter do DMA). "+
					 "Se sim, começa o processo de impressão. O DMA atua com <strong>espera ocupada</strong> na impressora.";
langStrings[0][49] = "<strong>Passo 3.</strong> Quando a impressora tiver terminado, o DMA avisa a CPU, por meio de um <strong>interrupção</strong>. "+
					 "A rotina de interrupção do DMA é chamada e em seguida o escalonador retorna o Processo 1 à CPU para que ele termine de executar. "+
					 "Quando estiver tiver terminado, o escalonador carrega o próximo processo, e assim em diante. ";

langStrings[1][0] = "I/O Methods";
langStrings[1][1] = "I/O method:";
langStrings[1][2] = "Programmed";
langStrings[1][3] = "Interrupt-driven";
langStrings[1][4] = "DMA";
langStrings[1][5] = "Control:";
langStrings[1][6] = "Start";
langStrings[1][7] = "Stop";
langStrings[1][8] = "Help:";
langStrings[1][9] = '&bull; Press <strong>Start</strong> to run the entire method.<br>'+
	                	 '&bull; Press <strong>Stop</strong> to stop running the entire method.<br>'+
	                	 '&bull; Press <strong>Back</strong> to go back a step.<br>'+
	                	 '&bull; Press <strong>Repeat</strong> to repeat the current step.<br>'+
	                	 '&bull; Press <strong>Next</strong> to go forward a step.<br>'+
	                	 '&bull; Press <strong>Reload</strong> to reload the current method.<br>';
langStrings[1][10] = "Scheduler";
langStrings[1][11] = "Step-by-step"; 
langStrings[1][12] = "Printer";
langStrings[1][13] = "Time-lapse:"; 
langStrings[1][14] = "Language:";
langStrings[1][15] = "Please select an I/O Method from the navigation bar to the left.";
langStrings[1][16] = "Are you sure you want to change methods? You will lose your progress on this current method.";
langStrings[1][17] = "Select a method.";
langStrings[1][18] = "Acquire printer";
langStrings[1][19] = "Printer acquired";
langStrings[1][20] = "Yes";
langStrings[1][21] = "No";
langStrings[1][22] = "Ready?";
langStrings[1][23] = "User Space:";
langStrings[1][24] = "Printer Register:";
langStrings[1][25] = "Kernel Space:";
langStrings[1][26] = "Process 1";
langStrings[1][27] = "Process 2";
langStrings[1][28] = "No processes running";
langStrings[1][29] = "Reload";
langStrings[1][30] = "Interruption";
langStrings[1][31] = "Occupied";
langStrings[1][32] = "Available";
langStrings[1][33] = "Acquire DMA";
langStrings[1][34] = "DMA acquired";
langStrings[1][35] = "Interruption routine";
/* PROGRAMMED */
langStrings[1][36] = "<strong>Step 0.</strong> In this example, we&#39ll be running two processes. "+ 
					"Each process wants to print a single string on the printer. "+
					"The printer can be idle, occupied and blocked, depending on what task it is executing. It doesn&#39t have a buffer. "+ 
					"The strings are stored in memory.";
langStrings[1][37] = "<strong>Step 1.</strong> The CPU will begin executing instructions from Process 1 sequentially. "+ 
					"To print a string, the CPU must first acquire the printer. "+
					"This is accomplished through a <strong>system call</strong>. "+ 
					"The printer is now occupied by <strong>Process 1</strong> and if another process tries to acquire it, the system call will fail.";
langStrings[1][38] = "<strong>Step 2.</strong> After acquiring the printer, the process must now print the string through another system call. "+ 
					"The first thing the OS does is copy the string to kernel space, where it is more easily accessed. "+
					"It then checks to see if the printer is available (it might be printing another string from <strong>Process 1</strong>). "+ 
					"If it is, the OS begins the printing process.";
langStrings[1][39] = "<strong>Step 3.</strong> To start the printing process, the OS copies each character of the string to the printer's data register. "+ 
					 "In this case, we consider a memory-mapped printer, that is, its data register is a RAM address, accessed by the printer. "+
					 "While the printer is operating, the CPU is constantly checking its state. "+
					 "The CPU remains blocked until the printer is finished. ";
langStrings[1][40] = "<strong>Step 4.</strong> As the printer finishes, the process is unblocked. "+ 
					 "The process finishes and the scheduler then loads up the next process in line (<strong>Process 2</strong>).";
/* INTERRUPTION */
langStrings[1][41] = "<strong>Step 0.</strong> In this example, we&#39ll be running two processes. "+
					"Each process wants to print a single string on the printer. "+
					"The printer can be idle, occupied and blocked, depending on what task it is executing. It doesn&#39t have a buffer. "+
					"The strings are stored in memory.";
langStrings[1][42] = "<strong>Step 1.</strong> The CPU will begin executing instructions from Process 1 sequentially. "+
					"To print a string, the CPU must first acquire the printer. "+
					"This is accomplished through a <strong>system call</strong>. "+
					"The printer is now occupied by <strong>Process 1</strong> and if another process tries to acquire it, the system call will fail.";
langStrings[1][43] = "<strong>Step 2.</strong> After acquiring the printer, the process must now print the string through another system call. "+
					"The first thing the OS does is copy the string to kernel space, where it is more easily accessed. "+
					"It then checks to see if the printer is available (it might be printing another string from <strong>Process 1</strong>). "+
					"If it is, the OS begins the printing process.";
langStrings[1][44] = "<strong>Step 3.</strong> To start the printing process, the OS copies each character of the string to the printer's data register. "+
					"In this case, we consider a memory-mapped printer, that is, its data register is a RAM address, accessed by the printer. "+
					"While the printer is operating, the scheduler put another process to execute on CPU (Process 2). "+
					"Process 1 remains blocked until the printer is finished. ";
langStrings[1][45] = "<strong>Step 4.</strong> As the printer finishes, it sends an interruption to CPU. "+
					"The scheduler then loads up Process 1 again. When it finishes, Process 2 is loaded and so on.";
/* DMA */
langStrings[1][46] = "<strong>Step 0.</strong> In this example, we&#39ll be running two processes. "+
					"Each process wants to print a single string on the printer. "+
					"The printer can be idle, occupied and blocked, depending on what task it is executing. It doesn&#39t have a buffer. "+
					"The strings are stored in memory.";
langStrings[1][47] = "<strong>Step 1.</strong> The CPU will begin executing instructions from Process 1 sequentially. "+
					 "To print a string, the CPU must first call the DMA (Direct Memory Access) so it handles the printing process instead, and the DMA acquires the printer. "+
					 "This is accomplished through a <strong>system call</strong>. "+
					 "The printer is now occupied by <strong>DMA</strong> and if another process tries to acquire it, the system call will fail.";
langStrings[1][48] = "<strong>Step 2.</strong> After acquiring the printer, the DMA must now print the string through another system call. "+
					 "The first thing the OS does is copy the string to kernel space, where it is more easily accessed. "+
					 "It then checks to see if the printer is available (it might be printing another character from <strong>DMA</strong>). "+
					 "If it is, the printing process begins. The DMA operates with <strong>busy wait</strong> over the printer.";
langStrings[1][49] = "<strong>Step 3.</strong> When the printer is finished, the DMA issues an <strong>interruption</strong> to the CPU. "+
					 "The interruption routine for the DMA is loaded and then the scheduler loads up Process 1 so it can finish the execution. "+
					 "When Process 1 is finished, the scheduler loads up the next process, and so on. ";


var string_hello = "0x00: Hello!";
var string_hi = "0x01: Hi!";
var string_empty = "";