/*
    O array abaixo é preenchido com os nomes das páginas para serem 
    inseridos como um href na linkagem pra as respectivas páginas 
    no pop up de navegação entre as questões.
*/
const htmls = [
    'EQ7_Q1C.html',
    'EQ7_Q2C.html',
    'EQ7_Q3A.html',
    'EQ7_Q4A.html',
    'EQ7_Q5C.html',
    'EQ7_Q6C.html',
    'EQ7_Q7A.html',
    'EQ7_Q8B.html',
    'EQ7_Q9C.html',
    'EQ7_Q10A.html',
    'EQ7_Q11C.html',
    'EQ7_Q12B.html',
    'EQ7_Q13D.html',
    'EQ7_Q14B.html',
    'EQ7_Q15D.html',
    'EQ7_Q16D.html',
    'EQ7_Q17C.html',
    'EQ7_Q18C.html',
    'EQ7_Q19B.html',
    'EQ7_Q20D.html',
    'EQ7_Q21D.html',
    'EQ7_Q22C.html',
    'EQ7_Q23D.html',
    'EQ7_Q24B.html',
    'EQ7_Q25A.html',
    'EQ7_Q26A.html',
    'EQ7_Q27B.html',
    'EQ7_Q28C.html',
    'EQ7_Q29D.html',
    'EQ7_Q30B.html',
    'EQ7_Q31D.html',
    'EQ7_Q32C.html',
    'EQ7_Q33.html',
    'EQ7_Q34B.html',
    'EQ7_Q35D.html',
    'EQ7_Q36B.html',
    'EQ7_Q37A.html',
    'EQ7_Q38C.html',
    'EQ7_Q39D.html',
    'EQ7_Q40B.html',
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