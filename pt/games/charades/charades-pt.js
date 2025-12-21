// Charades Game - Portuguese (PT-BR) Translation
const charadesTranslations = {
    categories: {
        'animals': 'Animais ??',
        'actions': 'A��es ??',
        'objects': 'Objetos ??',
        'movies': 'Filmes ??',
        'funny': 'Engra�ado ??',
        'sports': 'Esportes ?',
        'professions': 'Profiss�es ??',
        'historical': 'Figuras Hist�ricas ??'
    },
    words: {
        animals: ['Elefante', 'Girafa', 'Pinguim', 'Le�o', 'Tigre', 'Cachorro', 'Gato', 'P�ssaro', 'Peixe', 'Urso', 'Zebra', 'Macaco', 'Crocodilo', 'Cobra', 'Aranha'],
        actions: ['Nadando', 'Dan�ando', 'Cozinhando', 'Pulando', 'Correndo', 'Dormindo', 'Comendo', 'Cantando', 'Dirigindo', 'Voando', 'Caminhando', 'Escrevendo', 'Lendo', 'Brincando', 'Rindo'],
        objects: ['Guarda-chuva', 'Telefone', 'Computador', 'Livro', 'Copo', 'Cadeira', 'Mesa', 'Porta', 'Janela', 'Cama', 'Sof�', 'Tapete', 'L�mpada', 'Chave', 'Moeda'],
        movies: ['Titanic', 'Avatar', 'Homem-Aranha', 'O Rei Le�o', 'Toy Story', 'Frozen', 'Jurassic Park', 'O Iluminado', 'Matrix', 'Jaws', 'E.T.', 'Singin in the Rain', 'Casablanca', 'Interestelar', 'Star Wars'],
        funny: ['Passar manteiga em um gato', 'Caminhar como um caranguejo', 'Ser um rob� quebrado', 'Ganhar na loteria', 'Ser uma �rvore ao vento', 'Estar muito frio', 'Estar muito quente', 'Ser invis�vel', 'Voar como Superman', 'Ser um astronauta na lua'],
        sports: ['Futebol', 'Basquete', 'T�nis', 'Nata��o', 'Corrida', 'Ciclismo', 'Gin�stica', 'Boxe', 'H�quei', 'V�lei', 'Golfe', 'Esqui', 'Patina��o', 'Surfe', 'Dan�a'],
        professions: ['Policiais', 'Enfermeira', 'Professor', 'Cozinheiro', 'Ator', 'Cantor', 'Jogador de Futebol', 'Astronauta', 'Dentista', 'Cabeleireiro', 'Mec�nico', 'Piloto', 'M�dico', 'Advogado', 'Vendedor'],
        historical: ['Napole�o', 'Cle�patra', 'Einstein', 'Mozart', 'Shakespeare', 'Hitler', 'Gandhi', 'Joana d\'Arc', 'Colombo', 'Arquimedes', 'Michelangelo', 'Newton', 'Darwin', 'Marie Curie', 'da Vinci']
    },
    messages: {
        'Not enough words available!': 'N�o h� palavras suficientes dispon�veis!',
        'Score:': 'Pontua��o:',
        'Final Score:': 'Pontua��o Final:',
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

