// Sex Dice - Portuguese (PT-BR) Translation
const sexDiceTranslations = {
    defaultActions: ['Beijar', 'Mordiscar', 'Acariciar', 'Massagear', 'Lamber', 'Soprar', 'Acariciar', 'Tocar', 'Provocar'],
    defaultWheres: ['Pescoço', 'Orelhas', 'Lábios', 'Peito', 'Costas', 'Coxas', 'Cintura', 'Ombros', 'Braços Internos'],
    defaultTimes: ['5 segundos', '10 segundos', '15 segundos', '20 segundos', '25 segundos', '30 segundos'],
    messages: {
        'Rolling...': 'Girando...',
        'for': 'por',
        'New Option': 'Nova Opção',
        'Customize': 'Personalizar',
        'Roll the Dice': 'Rolar os Dados',
        'Action': 'Ação',
        'Where': 'Onde',
        'Time': 'Tempo',
        'Add Custom Option': 'Adicionar Opção Personalizada',
        'Remove': 'Remover',
        'Save': 'Salvar',
        'Cancel': 'Cancelar'
    }
};

if (typeof window !== 'undefined') {
    window.sexDiceTranslations = sexDiceTranslations;
}
