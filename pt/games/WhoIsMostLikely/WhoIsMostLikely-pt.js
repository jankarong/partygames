const questions = [
    "...dançar em cima de uma mesa em uma festa",
    "...beijar alguém no primeiro encontro",
    "...cantar alto em público",
    "...roubar lanches à meia-noite",
    "...ligar bêbado para o ex",
    "...se perder enquanto viaja",
    "...dormir em um cinema e roncar",
    "...postar muitas selfies nas redes sociais",
    "...contar uma história embaraçosa em uma festa",
    "...soltar um pum na frente de amigos e culpar outra pessoa",
    "...pegar o buquê em um casamento",
    "...tentar um desafio perigoso em uma festa",
    "...usar roupas descombinadas em público",
    "...cantar no karaokê até perder a voz",
    "...chorar na frente de amigos",
    "...flertar com um estranho em uma festa",
    "...esquecer o passaporte enquanto viaja",
    "...ficar até mais tarde em uma festa",
    "...derramar um segredo na frente de amigos",
    "...tentar dançar mas falhar miseravelmente",
    "...tropeçar em público",
    "...começar a falar sobre filosofia quando bêbado",
    "...se gabar de suas conquistas",
    "...experimentar comida estranha em uma festa",
    "...comprar souvenirs inúteis enquanto viaja",
    "...perder a noção do tempo em uma festa",
    "...revelar uma verdade constrangedora na frente de amigos",
    "...imitar uma celebridade",
    "...usar suas roupas do avesso em público",
    "...começar a cantar quando bêbado",
    "...compartilhar um sonho estranho com amigos",
    "...tentar um jogo perigoso em uma festa",
    "...se perder e não encontrar o hotel enquanto viaja",
    "...festejar até o amanhecer",
    "...derramar um segredo embaraçoso",
    "...tentar dançar mas falhar hilariantemente",
    "...tropeçar em público e fingir que não aconteceu",
    "...começar a contar piadas quando bêbado",
    "...exibir sua roupa nova para os amigos",
    "...experimentar comida bizarra em uma festa",
    "...compartilhar um sonho estranho com amigos",
    "...tentar um jogo arriscado em uma festa",
    "...festejar até o sol nascer",
    "...enviar acidentalmente uma mensagem para a pessoa errada",
    "...tirar as fotos mais embaraçosas em uma festa",
    "...esquecer o nome de alguém logo depois de conhecer",
    "...curtir acidentalmente uma postagem antiga de alguém nas redes sociais",
    "...fazer a comida mais apimentada ser seu prato especial",
    "...combinar roupas acidentalmente com outra pessoa",
    "...criar os movimentos de dança mais malucos em uma festa"
];

let usedQuestions = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = 'Iniciar Jogo';
    nextQuestionBtn.addEventListener('click', nextQuestion);
});

function nextQuestion() {
    // Change button text to "Next Question" after first click
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    nextQuestionBtn.textContent = 'Próxima Pergunta';

    // Get a random unused question
    let availableQuestions = questions.filter(q => !usedQuestions.has(q));
    if (availableQuestions.length === 0) {
        usedQuestions.clear();
        availableQuestions = questions;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const currentQuestion = availableQuestions[randomIndex];
    usedQuestions.add(currentQuestion);

    // Display the question
    document.getElementById('questionText').textContent = currentQuestion;
}
