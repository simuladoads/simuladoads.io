/*
    O array abaixo é preenchido com os nomes das páginas para serem 
    inseridos como um href na linkagem pra as respectivas páginas 
    no pop up de navegação entre as questões.
*/
const htmls = [
    'Q1C.html',
    'Q2C.html',
    'Q3A.html',
    'Q4A.html',
    'Q5C.html',
    'Q6C.html',
    'Q7A.html',
    'Q8B.html',
    'Q9C.html',
    'Q10A.html',
    'Q11C.html',
    'Q12B.html',
    'Q13D.html',
    'Q14B.html',
    'Q15D.html',
    'Q16D.html',
    'Q17C.html',
    'Q18C.html',
    'Q19B.html',
    'Q20D.html',
    'Q21D.html',
    'Q22C.html',
    'Q23D.html',
    'Q24B.html',
    'Q25A.html',
    'Q26A.html',
    'Q27B.html',
    'Q28C.html',
    'Q29D.html',
    'Q30B.html',
    'Q31D.html',
    'Q32C.html',
    'Q33.html',
    'Q34B.html',
    'Q35D.html',
    'Q36B.html',
    'Q37A.html',
    'Q38C.html',
    'Q39D.html',
    'Q40B.html',
]

// chama o método que cria o pop up no body do HTML
criarBotoes()

// variável para pegar o ID da div que vai se sobrepor o resto da página, na qual ficará o pop up
const container = document.getElementById('container-pop');

// váriável que vai pegar a div na qual vai ficar os botões da navegação
let botoes = document.getElementsByClassName('botoes');

/*
    função que vai abrir o pop up:
    Ele pega o contaneiner do pop up, que está com uma classe com display none,
    tira a classe 'container-pop' e adiciona a classe 'mostrar' que tem um display flex 
*/
function abrirPopUp(){
    container.classList.remove('container-pop');
    container.classList.add('mostrar')
} 

/*
    Função que vai fechar o pop up:
    Ele pega o contaneiner do pop up, que está com uma classe com display flex,
    tira a classe 'mostrar' e adiciona a classe 'container-pop' que tem um display none,
    fazendo ele voltar ao normal como era antes de ser aberto
*/

function fecharPopUp(){
    container.classList.remove('mostar')
    container.classList.add('container-pop')
}

/*
    Função para criar o pop up:
    Cria uma div com id e class = 'container-pop'
    Depois cria uma div com a class = 'pop-up'
    depois cria uma div com a class = 'botoes', e dentro dessa div coloco um h3 para o titulo do pop up,
    em seguida faço um for para criar os botões da navegação, colocando como href
    os elementos que estão dentro do array htmls
    Coloco um span 'X' que quando clicado vai chamar o métoddo fecharPopUp()
*/
function criarBotoes(){
    document.write('<div class="container-pop" id="container-pop">')
    document.write('<div class="popup">')
    document.write('<div class="botoes">')
    document.write('<h3>Navegação de Questões</h3>')
    for(let i = 0;i < htmls.length;i++){
        if(i <= 8){
            document.write('<a href = "'+htmls[i]+'" class="bt-pop">0'+ (i+1) +'</a>')
        }else{
            document.write('<a href= "'+htmls[i]+'" class="bt-pop">'+ (i+1) +'</a>')
        }
    }  
    document.write('</div><span class="fechar" onClick = "fecharPopUp()" >X</span></div></div>')
}