// Undercover - Portuguese (PT-BR) Translation
const undercoverTranslations = {
    roles: {
        'Civilian': 'Civil',
        'Undercover': 'Infiltrado',
        'Mr. White': 'Sr. Branco'
    },
    categories: {
        'Food & Drink': 'Comida e Bebida',
        'Animals': 'Animais',
        'Objects': 'Objetos',
        'Jobs & Roles': 'Empregos e Funções',
        'Entertainment': 'Entretenimento',
        'Nature & Weather': 'Natureza e Clima',
        'Funny': 'Engraçado'
    },
    wordPairs: {
        'Food & Drink': [
            ['Pizza', 'Hambúrguer'],
            ['Café', 'Chá'],
            ['Refrigerante', 'Suco'],
            ['Sorvete', 'Gelato'],
            ['Pão', 'Bolo']
        ],
        'Animals': [
            ['Gato', 'Cachorro'],
            ['Leão', 'Tigre'],
            ['Passarinho', 'Pombo'],
            ['Peixe', 'Tubarão'],
            ['Coelho', 'Esquilo']
        ],
        'Objects': [
            ['Telefone', 'Tablet'],
            ['Cadeira', 'Sofá'],
            ['Livro', 'Revista'],
            ['Relógio', 'Despertador'],
            ['Caneta', 'Lápis']
        ],
        'Jobs & Roles': [
            ['Policial', 'Ladrão'],
            ['Médico', 'Enfermeiro'],
            ['Professor', 'Aluno'],
            ['Cozinheiro', 'Garçom'],
            ['Ator', 'Diretor']
        ],
        'Entertainment': [
            ['Filme', 'Série'],
            ['Música', 'Podcast'],
            ['Jogo de Vídeo', 'Aplicativo'],
            ['Teatro', 'Dança'],
            ['Livro', 'Audiolivro']
        ],
        'Nature & Weather': [
            ['Sol', 'Lua'],
            ['Chuva', 'Neve'],
            ['Montanha', 'Vale'],
            ['Rio', 'Lago'],
            ['Árvore', 'Flor']
        ],
        'Funny': [
            ['Gigante', 'Anão'],
            ['Herói', 'Vilão'],
            ['Zumbi', 'Vampiro'],
            ['Alienígena', 'Astronauta'],
            ['Robô', 'Cyborg']
        ]
    },
    messages: {
        'Too many undercover and Mr. White players!': 'Muitos jogadores infiltrados e Sr. Branco!',
        'Please enter both civilian and undercover words': 'Por favor, insira as palavras civil e infiltrado',
        'No word pairs available for the selected category!': 'Nenhum par de palavras disponível para a categoria selecionada!',
        'Blank Card': 'Cartão em Branco',
        'Eliminated': 'Eliminado',
        'Please select a player to eliminate!': 'Por favor, selecione um jogador para eliminar!',
        'Civilians win!': 'Civis vencem!',
        'All undercover players have been eliminated!': 'Todos os jogadores infiltrados foram eliminados!',
        'Undercover players win!': 'Jogadores infiltrados vencem!',
        'The last two players are both undercover!': 'Os dois últimos jogadores são ambos infiltrados!',
        'Undercover player wins!': 'Jogador infiltrado vence!',
        'They have successfully infiltrated to the end!': 'Ele se infiltrou com sucesso até o final!',
        'Mr. White wins!': 'Sr. Branco vence!',
        'Player': 'Jogador',
        'Role': 'Papel',
        'Word': 'Palavra',
        'Number of Players': 'Número de Jogadores',
        'Number of Undercover': 'Número de Infiltrados',
        'Number of Mr. White': 'Número de Sr. Branco',
        'Select Word Category': 'Selecionar Categoria de Palavras',
        'Start Game': 'Começar Jogo',
        'Next Round': 'Próxima Rodada',
        'Eliminate Player': 'Eliminar Jogador'
    }
};

if (typeof window !== 'undefined') {
    window.undercoverTranslations = undercoverTranslations;
}
