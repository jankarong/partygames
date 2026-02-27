const dirtyParanoiaQuestions = [
  { mode: "Aquecimento", text: "Quem aqui passa mais vibe de flerte sem perceber?" },
  { mode: "Aquecimento", text: "Quem mandaria a primeira mensagem arriscada de madrugada?" },
  { mode: "Aquecimento", text: "Quem parece calmo, mas e o mais ousado no fundo?" },
  { mode: "Aquecimento", text: "Quem seria o crush mais perigoso deste grupo?" },
  { mode: "Aquecimento", text: "Quem fica vermelho mais rapido com pergunta pessoal?" },
  { mode: "Picante", text: "Quem paga de inocente em publico, mas no privado e intenso?" },
  { mode: "Picante", text: "Quem enviaria a mensagem mais atrevida depois da meia-noite?" },
  { mode: "Picante", text: "Quem toparia roleplay primeiro?" },
  { mode: "Picante", text: "Quem transformaria um date comum em noite caotica?" },
  { mode: "Picante", text: "Quem tem mais presenca nos momentos intimos?" },
  { mode: "Picante", text: "Quem aumenta o nivel da rodada so para provocar?" },
  { mode: "Picante", text: "Quem guarda a memoria mais apimentada em segredo?" },
  { mode: "Picante", text: "Quem desestabiliza so com o olhar?" },
  { mode: "Picante", text: "Quem parece quieto, mas e o mais corajoso?" },
  { mode: "Picante", text: "Quem planejaria a noite mais inesquecivel?" },
  { mode: "Caos", text: "Quem quebraria as regras do grupo primeiro?" },
  { mode: "Caos", text: "Quem poderia ter duas pessoas afim ao mesmo tempo?" },
  { mode: "Caos", text: "Quem sumiria uma semana e voltaria super flertando?" },
  { mode: "Caos", text: "Quem soltaria um segredo sem querer?" },
  { mode: "Caos", text: "Quem fala « tanto faz », mas se importa muito?" },
  { mode: "Caos", text: "Quem e mais dificil de resistir no fim da noite?" },
  { mode: "Caos", text: "Quem transformaria este jogo em historia real?" },
  { mode: "Caos", text: "Quem causaria caos com um unico audio?" },
  { mode: "Caos", text: "Quem seria a maior tentacao da rodada?" },
  { mode: "Caos", text: "Quem diz « so mais um » e vira caos total?" },
  { mode: "Aquecimento", text: "Quem tem o melhor poker face em situacao tensa?" },
  { mode: "Aquecimento", text: "Quem entra mais facil na pilha do grupo?" },
  { mode: "Aquecimento", text: "Quem deixaria escapar o proprio crush?" },
  { mode: "Aquecimento", text: "Quem transforma piada em tensao de verdade?" },
  { mode: "Aquecimento", text: "Quem segura melhor o ritmo da roda?" },
  { mode: "Picante", text: "Quem tem o lado surpresa mais forte?" },
  { mode: "Picante", text: "Quem faria o primeiro movimento primeiro?" },
  { mode: "Picante", text: "Quem sente ciume e disfarca melhor?" },
  { mode: "Picante", text: "Quem quebra as proprias regras de namoro?" },
  { mode: "Picante", text: "Quem tem o olhar mais intenso aqui?" },
  { mode: "Picante", text: "Quem se apaixona pela pessoa errada mais facil?" },
  { mode: "Picante", text: "Quem comeca o flerte na festa?" },
  { mode: "Picante", text: "Quem guarda segredo por mais tempo?" },
  { mode: "Picante", text: "Quem faria a pergunta mais pesada da noite?" },
  { mode: "Picante", text: "Quem flerta so para testar reacoes?" },
  { mode: "Caos", text: "Quem criaria triangulo amoroso sem querer?" },
  { mode: "Caos", text: "Quem some e volta com fofoca grande?" },
  { mode: "Caos", text: "Quem mandaria mensagem para ex as 2 da manha?" },
  { mode: "Caos", text: "Quem postaria algo privado por acidente?" },
  { mode: "Caos", text: "Quem viraria o crush surpresa do grupo?" },
  { mode: "Caos", text: "Quem transformaria a rodada em confissao coletiva?" },
  { mode: "Caos", text: "Quem dividiria a mesa com uma frase so?" },
  { mode: "Caos", text: "Quem termina a noite com as melhores historias?" },
  { mode: "Caos", text: "Quem transforma rumor pequeno em drama gigante?" },
  { mode: "Caos", text: "Quem seria apontado mais vezes hoje?" }
];

let currentIndex = 0;
function renderQuestion() {
  const q = dirtyParanoiaQuestions[currentIndex];
  document.getElementById("questionNumber").textContent = `Pergunta ${currentIndex + 1} de ${dirtyParanoiaQuestions.length}`;
  document.getElementById("questionText").textContent = q.text;
  document.getElementById("questionMode").textContent = q.mode;
}
function nextQuestion() { currentIndex = (currentIndex + 1) % dirtyParanoiaQuestions.length; renderQuestion(); }
function previousQuestion() { currentIndex = (currentIndex - 1 + dirtyParanoiaQuestions.length) % dirtyParanoiaQuestions.length; renderQuestion(); }
function randomQuestion() { currentIndex = Math.floor(Math.random() * dirtyParanoiaQuestions.length); renderQuestion(); }
document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
  document.getElementById("prevBtn").addEventListener("click", previousQuestion);
  document.getElementById("randomBtn").addEventListener("click", randomQuestion);
});
