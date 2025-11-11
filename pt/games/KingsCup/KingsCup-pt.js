// Kings Cup - Portuguese (PT-BR) Translation
const kingsCupTranslations = {
    cardRules: {
        'A': {
            name: 'Ás - Aceitar',
            description: 'Começa uma nova rodada de Waterfall'
        },
        '2': {
            name: 'Dois - Você',
            description: 'Escolha alguém para beber!'
        },
        '3': {
            name: 'Três - Eu',
            description: 'Você bebe! Tome um gole!'
        },
        '4': {
            name: 'Quatro - Chão',
            description: 'Todos devem tocar o chão agora! Último a tocar bebe!'
        },
        '5': {
            name: 'Cinco - Homens',
            description: 'Todos os homens bebem juntos!'
        },
        '6': {
            name: 'Seis - Mulheres',
            description: 'Todas as mulheres bebem juntas!'
        },
        '7': {
            name: 'Sete - Céu',
            description: 'Todos apontem para o céu! Último a apontar bebe!'
        },
        '8': {
            name: 'Oito - Parceiro',
            description: 'Escolha seu parceiro de bebida! Quando você beber, ele bebe também!'
        },
        '9': {
            name: 'Nove - Rima',
            description: 'Comece com uma palavra! Todos se revezam rimando. Sem repetições!'
        },
        '10': {
            name: 'Dez - Categorias',
            description: 'Escolha uma categoria! Todos nomeiam itens. Sem repetições!'
        },
        'J': {
            name: 'Valete - Criar Regra',
            description: 'Crie uma regra que todos devem seguir!'
        },
        'Q': {
            name: 'Dama - Perguntas',
            description: 'Você só pode fazer perguntas! Quem responder bebe!'
        },
        'K': {
            name: 'Rei - Copa do Rei',
            description: 'Despeje sua bebida na Copa do Rei!'
        }
    },
    messages: {
        'Waterfall': 'Cachoeira - Todos começam a beber! Sigam no sentido horário até a pessoa antes de você parar.',
        'Draw a Card': 'Tirar uma Carta',
        'Game Over!': 'Fim de Jogo!',
        'All 4 Kings have been drawn!': 'Todos os 4 Reis foram tirados!',
        'The final King must drink the Kings Cup!': 'O Rei final deve beber a Copa do Rei!',
        'Thanks for playing!': 'Obrigado por jogar!',
        'King #': 'Rei #',
        'Current King': 'Rei Atual',
        'Click to draw your first card!': 'Clique para tirar sua primeira carta!',
        'Click to draw a card (or press Space)': 'Clique para tirar uma carta (ou pressione Espaço)',
        'Draw next card (or press Space)': 'Tire a próxima carta (ou pressione Espaço)',
        'Start a new game (or press R)': 'Começar um novo jogo (ou pressione R)',
        'New Game': 'Novo Jogo'
    }
};

if (typeof window !== 'undefined') {
    window.kingsCupTranslations = kingsCupTranslations;
}
