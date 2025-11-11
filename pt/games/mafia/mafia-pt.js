// Mafia Game - Portuguese (PT-BR) Translation
const mafiaTranslations = {
    roles: {
        'Mafia': 'Máfia',
        'Villager': 'Aldeão',
        'Doctor': 'Médico',
        'Detective': 'Detetive'
    },
    roleDescriptions: {
        'Mafia': 'Elimine os aldeões sem ser pego',
        'Villager': 'Encontre e elimine a Máfia',
        'Doctor': 'Salve uma pessoa durante o jogo',
        'Detective': 'Investigue a identidade de um jogador a cada noite'
    },
    messages: {
        'Minimum 3 players required': 'Mínimo de 3 jogadores necessário',
        'Need at least 1 villager': 'Precisa de pelo menos 1 aldeão',
        'Need at least 1 mafia': 'Precisa de pelo menos 1 máfia',
        'open your eyes and make your selection.': 'abra seus olhos e faça sua seleção.',
        'is a Mafia member!': 'é um membro da Máfia!',
        'is not a Mafia member.': 'não é um membro da Máfia.',
        'was targeted by the Mafia.': 'foi alvo da Máfia.',
        'Last night, Player': 'Na última noite, Jogador',
        'was eliminated.': 'foi eliminado.',
        'No one was eliminated last night.': 'Ninguém foi eliminado na última noite.',
        'Alive': 'Vivo',
        'Dead': 'Morto',
        'Please select a player to vote for!': 'Por favor, selecione um jogador para votar!',
        'has been eliminated by vote!': 'foi eliminado por votação!',
        'Game Over!': 'Fim de Jogo!',
        'Win!': 'Vence!',
        'Mafia Team': 'Equipe Máfia',
        'Villager Team': 'Equipe Aldeões',
        'Night Phase': 'Fase Noturna',
        'Day Phase': 'Fase Diurna',
        'Voting': 'Votação',
        'Click to Vote': 'Clique para Votar',
        'Player': 'Jogador',
        'Role': 'Papel'
    }
};

if (typeof window !== 'undefined') {
    window.mafiaTranslations = mafiaTranslations;
}
