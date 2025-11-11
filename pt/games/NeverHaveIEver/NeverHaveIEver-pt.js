const statements = [
    "Nunca eu nunca beijei alguém no primeiro encontro",
    "Nunca eu nunca tive uma queda pelo parceiro de um amigo",
    "Nunca eu nunca enviei uma mensagem para a pessoa errada",
    "Nunca eu nunca fingi estar doente para cancelar planos",
    "Nunca eu nunca tive um caso de uma noite",
    "Nunca eu nunca menti sobre minha idade",
    "Nunca eu nunca tive um relacionamento secreto",
    "Nunca eu nunca colei em uma prova",
    "Nunca eu nunca fui pego em uma mentira",
    "Nunca eu nunca tive uma queda por um professor ou chefe",
    "Nunca eu nunca nadei pelado",
    "Nunca eu nunca tive um sonho romântico com alguém que conheço",
    "Nunca eu nunca flertei para conseguir desconto ou coisas grátis",
    "Nunca eu nunca tive uma queda pelo ex de um amigo",
    "Nunca eu nunca bisbilhotei o celular de outra pessoa",
    "Nunca eu nunca menti sobre meu status de relacionamento",
    "Nunca eu nunca tive uma queda por uma celebridade",
    "Nunca eu nunca enviei uma foto picante",
    "Nunca eu nunca tive uma queda por um colega de trabalho",
    "Nunca eu nunca tive uma conta falsa em redes sociais",
    "Nunca eu nunca tive uma queda pelo irmão de um amigo",
    "Nunca eu nunca menti sobre meu emprego ou salário",
    "Nunca eu nunca tive uma queda por um vizinho",
    "Nunca eu nunca tive uma queda por um melhor amigo",
    "Nunca eu nunca tive uma queda por um estranho",
    "Nunca eu nunca tive uma queda pelo parceiro de uma celebridade",
    "Nunca eu nunca tive uma queda pelo pai ou mãe de um amigo",
    "Nunca eu nunca tive uma queda pelo assistente de um professor",
    "Nunca eu nunca tive uma queda pela paixão de um amigo",
    "Nunca eu nunca tive uma queda pelo amigo de um amigo",
    "Nunca eu nunca dormi na aula",
    "Nunca eu nunca cantei em público",
    "Nunca eu nunca passei a noite acordado",
    "Nunca eu nunca roubei a comida do meu colega de quarto",
    "Nunca eu nunca esqueci um guarda-chuva em um dia chuvoso",
    "Nunca eu nunca matei aula para jogar videogame",
    "Nunca eu nunca dormi durante um filme no cinema",
    "Nunca eu nunca usei roupas do avesso em público",
    "Nunca eu nunca soltei um pum alto em público",
    "Nunca eu nunca me atrasei para um encontro",
    "Nunca eu nunca cantei no chuveiro",
    "Nunca eu nunca tropecei em público",
    "Nunca eu nunca passei a noite toda jogando",
    "Nunca eu nunca derramei café no meu teclado",
    "Nunca eu nunca disse algo embaraçoso com o microfone ainda ligado",
    "Nunca eu nunca fiz uma compra por impulso online",
    "Nunca eu nunca fingi fazer exercícios",
    "Nunca eu nunca coloquei lixo na lixeira errada",
    "Nunca eu nunca tive meu celular tocando no pior momento",
    "Nunca eu nunca deixei documentos importantes na impressora",
    "Nunca eu nunca fingi estar solteiro nas redes sociais",
    "Nunca eu nunca fingi estar doente para pular algo",
    "Nunca eu nunca fingi entender o que alguém estava dizendo",
    "Nunca eu nunca estraguei roupas na máquina de lavar",
    "Nunca eu nunca perdi meu ponto dormindo no transporte público",
    "Nunca eu nunca confundi datas importantes",
    "Nunca eu nunca chamei alguém pelo nome errado"
];

let usedStatements = [];

document.addEventListener('DOMContentLoaded', () => {
    const statementElement = document.getElementById('statement');
    const nextButton = document.getElementById('nextBtn');
    const resetButton = document.getElementById('resetBtn');

    function getRandomStatement() {
        if (statements.length === usedStatements.length) {
            return 'Fim de jogo! Clique em Resetar para jogar novamente.';
        }

        let availableStatements = statements.filter(statement => !usedStatements.includes(statement));
        let randomIndex = Math.floor(Math.random() * availableStatements.length);
        let selectedStatement = availableStatements[randomIndex];
        usedStatements.push(selectedStatement);
        return selectedStatement;
    }

    nextButton.addEventListener('click', () => {
        const newStatement = getRandomStatement();
        statementElement.textContent = newStatement;
        if (nextButton.textContent === 'Iniciar') {
            nextButton.textContent = 'Próximo';
        }
        if (usedStatements.length === statements.length) {
            nextButton.disabled = true;
        }
    });
});
