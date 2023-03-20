function verificarRespostas() {
  let acertos = 0; // Aqui estou declarando uma variável de valor 0. pq? PQ EU QUIS PORRA
  
  // Questão 1
  const resposta1 = document.querySelector('input[name="q1"]:checked').value;
  if (resposta1 === "b") {  // TA VENDO ESSA MERDA AQ? ISSO AQ É UMA ESTRUTURA CONDICIONAL
    acertos++; // E essa porra é um contador, é bem importante (e me salva muito), dê um olá ao contador! Ele com certeza te salvará depois.
  }
  
  // Questão 2
  const resposta2 = document.querySelector('input[name="q2"]:checked').value;
  if (resposta2 === "b") {
    acertos++;
  }
  
  // Questão 3
  const resposta3 = document.querySelector('input[name="q3"]:checked').value;
  if (resposta3 === "a") {
    acertos++;
  }
  
  alert(`Você acertou ${acertos} questões.`); //Retorno para o usuário.      
}