/* Declarando var. para armazenar o Id da página e perguntas respondidas (gabarito do usuário). */
let idPagina = ''
let perguntasRespondidas = ''

/* Armazenando o ID da página. */
idPagina = document.querySelector('Body').id
/* 
    Verifica alternativa selecionada e retorna a mesma. 
*/
function alternativaSelecionada(){

    for(item of document.querySelectorAll(`Input[Name=${idPagina}]`)){
        if(item.checked)
            return item.value     
    }
}

/* 
    Quando a página carregar... 
*/
addEventListener('load', () => {
    if(!sessionStorage.getItem('comecoProva'))
        this.sessionStorage.setItem('comecoProva', Date.parse(new Date()))

    /* 
        Verificando a existência de uma sessão
        para salvar as respostas do usuário. 
        Se existir...
    */
    if(sessionStorage.getItem('gabaritoUsuario')){
        /* 
            Armazenando o gabarito do usuário em uma variável (perguntasRespondidas).
            Obs: ele vem em uma string, ex: Q1:A, Q2:B, Q3:C.. 
        */
        perguntasRespondidas = sessionStorage.getItem('gabaritoUsuario')

        /*
            Pegamos a variavel perguntasRespondidas e com o método 'split'
            convertemos para um array.
            É válido ressaltar que o split vai separar utilizando como 
            ponto de referência os espaços (se você der um console.log na 
            var. perguntasRespondidas verá que todos os id's das paginas 
            e as alternativas se encontram todas em uma string, porém
            separadas por um espaço.) que se encontram na variável.
        */
        for(perguntaR of perguntasRespondidas.split(" ")){

            /* 
                Com o gabarito do usuário já 'divido', acessamos o array
                cujo o índice for 0 (inicial) e nele se encontra o ID da 
                página, logo comparamos com o ID da página pego posteriormente
                (linha 8) com uma condicional.
            */
            if(perguntaR.split(":")[0] == idPagina){

                /*
                    Se a condição for verdadeira, então marcamos a alternativa
                    já selecionada anteriormente pelo usuário.
                    Ou seja, realizamos uma série de eventos (laços e 
                    condicionais) para marcarmos a alternativa já selecionada pelo
                    usuário posteriormente.
                */
                document.querySelector(`Input[Value=${perguntaR.split(":")[1]}]`).checked = true;

            }

        }

    }
    /* 
        Senão, criamos um sessionStorage 
        para armazenamos o gabarito do usuário 
        ao decorrer.
    */
    else
        sessionStorage.setItem('gabaritoUsuario', '')
})

/* 
    Quando a página mudar/sofrer alteração... 
*/
addEventListener('change', () => {

    /* Armazenando a alternativa selecionada pelo usuário. */
    let altUsuario = alternativaSelecionada()
    /* Passando o gabarito do usuário como array para uma variável. */
    let historicoPerguntas = perguntasRespondidas.split(" ")
    /* 
        Armazenando 'false' para indicar que não 
        realizamos nenhuma alteração em uma pergunta 
        já respondida. 
    */
    let alteracaoQuestao = false

    /* para cada pergunta do gabarito do usuário...  */
    for(pergunta of historicoPerguntas){

        /* Se o ID da pergunta em questão for igual ao id da página */
        if(pergunta.split(":")[0] == idPagina){

            /* Atribuímos o índice do array desta pergunta em questão. */
            let i = historicoPerguntas.indexOf(pergunta)
            /* e após isso, atribuímos um valor a essa questão. */
            historicoPerguntas[i] = `${idPagina}:${altUsuario}`

            /* como a questão foi alterada, então mudamos a 'alteracaoQuestao'. */
            alteracaoQuestao = true
        }

    }

    /* 
        Se a questão não tiver sido alterada, 
        então devemos salvar a resposta na variável 'historicoPerguntas'.  
    */
    if(!alteracaoQuestao){

        /* 
            Se estiver vazio, quer dizer que o usuário não 
            respondeu nada, então, fica vazia.
        */
        if(historicoPerguntas[0] == "")
            historicoPerguntas[0] = `${idPagina}:${altUsuario}`
        /*
            Caso contrário, ele respondeu, então salvamos
            na variável 'historicoPerguntas'.
        */
        else
            historicoPerguntas.push(`${idPagina}:${altUsuario}`) 

    }

    /* 
        Após isso convertemos o array 
        para uma string.
        Ex ANTES de converter (entrada): Q1:A, Q2:B, Q3:C,...
        Ex DEPOIS de converter (saída): Q1:A Q2:B Q3:C...
    */
    historicoPerguntas = historicoPerguntas.join(" ")

    /* 
        Depois informados que na sessionStorage 
        onde nos encontramos (gabaritoUsuario)
        ele irá armazenar o valor da string 
        recebida (historicoPerguntas). 
    */
    this.sessionStorage.setItem('gabaritoUsuario', historicoPerguntas)
})

/*
    Salva os dados acerca do simulado
    quando o botão de finalizar for pressionado.
*/
function salvaResultadoSimulado(){
    /* 
        Declarando variáveis para 
        armazenar o gabarito correto e os 
        respectivos conteúdos (ou quase) 
        de cada questão.
    */
    let gabaritoOficial = ["Q1:C", "Q2:C", "Q3:A", "Q4:A", "Q5:C", "Q6:C", "Q7:A","Q8:B", "Q9:C", "Q10:A","Q11:C", 
    "Q12:B", "Q13:D","Q14:B", "Q15:D", "Q16:D","Q17:C", "Q18:C", "Q19:B","Q20:D", "Q21:D","Q22:C", "Q23:D","Q24:B", 
    "Q25:A", "Q26:A","Q27:B", "Q28:C", "Q29:D","Q30:B","Q31:D", "Q32:C","Q34:B", "Q35:D", "Q36:B", "Q37:A", "Q38:C", "Q39:D", "Q40:B"]

    /* 
        Declarando, respectivamente,
        os conteúdos que o usuário precisa estudar,
        o gabarito do usuário, total de perguntas 
        respondidas, total de acertos, e total 
        de erros. 
    */
	let gabaritoUsuario = []
	let totalRespondidas = []
	let totalAcertos = []
	let totalErros = []

    /* 
        Declarando, respectivamente,
        o tempo decorrido de prova e
        o total de perguntas não respondidas.
    */
	let tempoDecorrido = 0
	let totalNaoRespondidas = 40

    /* 
        Declranado, respectivamente
        os itens utilizados no cálculo da nota.
        do usuário
    */
    let formacaoGeral = 0
    let notaFinalFormacaoGeral = 0
    let componenteEspecifico = 0
    let notaFinalComponenteEspecifico = 0
    let notaFinal = 0

    /*
        verifica se a sessionStorage existe,
        se existir, é armazenado em duas 
        variáveis (gabaritoUsuario e
        totalRespondidas).
    */
	if(sessionStorage.getItem('gabaritoUsuario')){
		gabaritoUsuario = sessionStorage.getItem('gabaritoUsuario').split(" ")
		totalRespondidas = sessionStorage.getItem('gabaritoUsuario').split(" ")
	}
	
    /*
        verifica se o primeiro item
        do 'totalRespondidas' é diferente de
        zero, se for, ele realiza uma série de ações.
        caso contrário, 'totalRespondidas' é inicializada 
        novamente.
    */
	if(totalRespondidas[0] != ''){
        /*
            enquanto o 'i' for menor que o tamanho
            total do gabaritoUsuario, faça...
        */
		for (let i = 0; i < gabaritoUsuario.length; i++) {
			
            /* 
                Se a resposta estiver 
                no gabarito oficial, 
                então o usuário acertou...
            */
			if (gabaritoOficial.indexOf(gabaritoUsuario[i]) >=0 )
				totalAcertos.push(gabaritoUsuario[i]) /* Adiciona a resposta (Ex: Q1:E) a variável de respostas certas. */
			
            /* Realiza o oposto da instrução/verficação acima */
			if (gabaritoOficial.indexOf(gabaritoUsuario[i]) < 0)
				totalErros.push(gabaritoUsuario[i]) /* Adiciona a resposta (Ex: Q1:C) a variável de respostas erradas. */
		}

        /* 
            Enquanto 'i' for menor que que o tamanho total de 
            perguntas certas, faça...
        */
        for (let i = 0; i < totalAcertos.length; i++){
            let acertos = totalAcertos.join(' ')

            /* 
                Pega o número da questão e 
                verifica se é menor que 8,
                se for, então é uma questão 
                de formação geral, logo,
                somamos.
            */
            if (acertos.split(":")[i].split("Q")[1] <= 8)
                formacaoGeral += 12.5 /* soma a nota. */
            else if(acertos.split(":")[i].split("Q")[1] > 8) /* realiza o oposto da instrução acima */
                componenteEspecifico += 3.70 /* soma a nota. */
        }

        /* calcula o total de perguntas não respondidas. */
		totalNaoRespondidas = 40 - totalRespondidas.length

        /* Realiza o cálculo, final, da formaçãoGeral  */
        notaFinalFormacaoGeral = (formacaoGeral * 0.6).toPrecision(2)
        /* Realiza o cálculo, final, dos componentesEspecífico */
        notaFinalComponenteEspecifico = (componenteEspecifico * 0.85).toPrecision(2)
        /* E calcula a nota final realizando uma média ponderada da formacaoGeral e componenteEspecifico. */
        notaFinal = ((notaFinalFormacaoGeral * 0.25) + (notaFinalComponenteEspecifico * 0.75)).toPrecision(2)
	}
	else
		totalRespondidas = []

    /* Se o tamanho de totalErros, for diferente de 0, então... */
	if(totalErros.length != 0){
        /* Enquanto 'i' for menor que o tamanho de totalErros, faça... */
		for(let i = 0; i < totalErros.length; i++){
            /* pega o número (Ex: 1) da variável total erros. */
			let questao = totalErros[i].split(":")[0].split("Q")[1]
		}
	}
	
    /* Verifica se existe o momento em que a prova começou.*/
	if(sessionStorage.getItem("comecoProva")){
        /* Salva o tempo em que a prova foi iniciada. */
		let inicioProva = sessionStorage.getItem("comecoProva")
        /* Salva o tempo em que a prova acabou. */
        let finalProva = Date.parse(new Date())

        /* Realiza o calculo para obter o tempo de prova. */
		tempoDecorrido = (finalProva - inicioProva)/1000
	}

    /* Obtém a porcentagem de acerto. */
	var porcentagemAcerto = Math.round((totalAcertos.length / 40) * 100)

    /* Salva a data (dia/mes/ano) em que a prova foi realizada. */
	let data = new Date()
	let diaMesAno = String(data.getDate()).padStart(2, '0') + '/' + 
	String(data.getMonth() + 1).padStart(2, '0') + '/' + data.getFullYear() 

    if(totalRespondidas.length != 0){
        /* Se existir a nota final, então...  */
        if(localStorage.getItem('acertosUsuario')){
            /* 
                Salva os dados no localStorage 
                transformando em vetor e dps 
                converte para string. 
            */
            salvaDadosEvolucao(totalAcertos.length, 'acertosUsuario')
            salvaDadosEvolucao((totalErros.length+totalNaoRespondidas), 'errosUsuario')
            salvaDadosEvolucao(diaMesAno, 'dataSimulado')
            salvaDadosEvolucao(totalNaoRespondidas, 'perguntasNaoRespondidas')
            salvaDadosEvolucao(tempoDecorrido, 'tempoDecorrido')
            salvaDadosEvolucao(totalRespondidas.length, 'totalRespondida')
            salvaDadosEvolucao(porcentagemAcerto, 'porcentagensDeAcerto')
            salvaDadosEvolucao(formacaoGeral, 'formacaoGeral')
            salvaDadosEvolucao(componenteEspecifico, 'componenteEspecifico')
            salvaDadosEvolucao(notaFinalComponenteEspecifico, 'notaFinalComponenteEspecifico')
            salvaDadosEvolucao(notaFinalFormacaoGeral, 'notaFinalFormacaoGeral')
            salvaDadosEvolucao(notaFinal, 'notaFinal')
            /* Salva os dados em um localStorage */
            localStorage.setItem('gabaritoUsuario', gabaritoUsuario)
        }
        else{ /* Caso contrário, salva os dados no localStorage se for a primeira vez. */
            localStorage.setItem('acertosUsuario', totalAcertos.length)
            localStorage.setItem('errosUsuario', totalErros.length+totalNaoRespondidas)
            localStorage.setItem('dataSimulado', diaMesAno)
            localStorage.setItem('perguntasNaoRespondidas', totalNaoRespondidas)
            localStorage.setItem('tempoDecorrido', tempoDecorrido)
            localStorage.setItem('totalRespondida', totalRespondidas.length)
            localStorage.setItem('porcentagensDeAcerto', porcentagemAcerto)
            localStorage.setItem('formacaoGeral', formacaoGeral)
            localStorage.setItem('componenteEspecifico', componenteEspecifico)
            localStorage.setItem('notaFinalFormacaoGeral', notaFinalFormacaoGeral)
            localStorage.setItem('notaFinalComponenteEspecifico', notaFinalComponenteEspecifico)
            localStorage.setItem('notaFinal', notaFinal)
            localStorage.setItem('gabaritoUsuario', gabaritoUsuario)
            localStorage.setItem('recomendaConteudos', recomendaConteudos)
        }

        /* Limpa os sessionsStorage's. */
        sessionStorage.setItem('gabaritoUsuario', '')
        sessionStorage.setItem('paginasCorrigidas', '')

        /* Utilizado na página de estatísticas, p proibir uma possível trapaça. */
        sessionStorage.setItem('gabUsuAuxiliar', gabaritoUsuario.join(' '))
    }
        /* Limpa o sessionsStorage. */
        sessionStorage.setItem('comecoProva', '')

    /* Transporta para a página de resultado ao final de tudo. */
    window.location.href = 'Resultado.html'
}

/* 
    Salva os dados no localStorage como vetores, caso exista.
    Recebe o valor que vai armazenar e a chave do localStorage 
*/
function salvaDadosEvolucao(valorASerArmazenado, chaveLocalStorage){
	/* Recebe o localStorage e converte ele para vetor (array). */
    let vetor = localStorage.getItem(chaveLocalStorage).split(',')
	/* adiciona o último valor ao vetor. */
    vetor.push(valorASerArmazenado)
    /* transforma para string novamente. */
	vetor.join(' ')
    /* coloca a variável, com o ultimo valor armazenado no localStorage. */
	localStorage.setItem(chaveLocalStorage, vetor)
}
