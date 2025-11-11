// Charades Game - Portuguese (PT-BR) Translation
const charadesTranslations = {
    categories: {
        'animals': 'Animais 🐘',
        'actions': 'Ações 🏃',
        'objects': 'Objetos 📱',
        'movies': 'Filmes 🎬',
        'funny': 'Engraçado 😂',
        'sports': 'Esportes ⚽',
        'professions': 'Profissões 💼',
        'historical': 'Figuras Históricas 📜'
    },
    words: {
        animals: ['Elefante', 'Girafa', 'Pinguim', 'Leão', 'Tigre', 'Cachorro', 'Gato', 'Pássaro', 'Peixe', 'Urso', 'Zebra', 'Macaco', 'Crocodilo', 'Cobra', 'Aranha'],
        actions: ['Nadando', 'Dançando', 'Cozinhando', 'Pulando', 'Correndo', 'Dormindo', 'Comendo', 'Cantando', 'Dirigindo', 'Voando', 'Caminhando', 'Escrevendo', 'Lendo', 'Brincando', 'Rindo'],
        objects: ['Guarda-chuva', 'Telefone', 'Computador', 'Livro', 'Copo', 'Cadeira', 'Mesa', 'Porta', 'Janela', 'Cama', 'Sofá', 'Tapete', 'Lâmpada', 'Chave', 'Moeda'],
        movies: ['Titanic', 'Avatar', 'Homem-Aranha', 'O Rei Leão', 'Toy Story', 'Frozen', 'Jurassic Park', 'O Iluminado', 'Matrix', 'Jaws', 'E.T.', 'Singin in the Rain', 'Casablanca', 'Interestelar', 'Star Wars'],
        funny: ['Passar manteiga em um gato', 'Caminhar como um caranguejo', 'Ser um robô quebrado', 'Ganhar na loteria', 'Ser uma árvore ao vento', 'Estar muito frio', 'Estar muito quente', 'Ser invisível', 'Voar como Superman', 'Ser um astronauta na lua'],
        sports: ['Futebol', 'Basquete', 'Tênis', 'Natação', 'Corrida', 'Ciclismo', 'Ginástica', 'Boxe', 'Hóquei', 'Vôlei', 'Golfe', 'Esqui', 'Patinação', 'Surfe', 'Dança'],
        professions: ['Policiais', 'Enfermeira', 'Professor', 'Cozinheiro', 'Ator', 'Cantor', 'Jogador de Futebol', 'Astronauta', 'Dentista', 'Cabeleireiro', 'Mecânico', 'Piloto', 'Médico', 'Advogado', 'Vendedor'],
        historical: ['Napoleão', 'Cleópatra', 'Einstein', 'Mozart', 'Shakespeare', 'Hitler', 'Gandhi', 'Joana d\'Arc', 'Colombo', 'Arquimedes', 'Michelangelo', 'Newton', 'Darwin', 'Marie Curie', 'da Vinci']
    },
    messages: {
        'Not enough words available!': 'Não há palavras suficientes disponíveis!',
        'Score:': 'Pontuação:',
        'Final Score:': 'Pontuação Final:',
        'Correct words:': 'Palavras corretas:',
        'Skipped words:': 'Palavras puladas:',
        'Correct!': 'Correto!',
        'Skipped': 'Pulada',
        'Time\'s up!': 'Tempo esgotado!',
        'Round': 'Rodada'
    }
};

// Export for use in HTML
if (typeof window !== 'undefined') {
    window.charadesTranslations = charadesTranslations;
}
