let gameState = {
    players: [],
    currentPlayer: 0,
    civilianWord: '',
    undercoverWord: '',
    eliminatedPlayers: new Set(),
    selectedCategories: ['Aliments & Boissons', 'Animaux', 'Objets', 'Emplois & Rôles', 'Divertissement', 'Nature & Météo', 'Amusant'],
    premiumCategories: ['Sports & Fitness', 'Technologie & Digital', 'Voyage & Places', 'Relations', 'Marques & Entreprises', 'Personnages Historiques'],
    wordsByCategory: {
        'Aliments & Boissons': [
            ['Pizza', 'Hamburger'],
            ['Café', 'Thé'],
            ['Soda', 'Jus'],
            ['Pomme', 'Orange'],
            ['Barre de Chocolat', 'Barre Granola'],
            ['Sauce Piquante', 'Ketchup'],
            ['Muffin', 'Cupcake'],
            ['Pain', 'Toast'],
            ['Lait', 'Crème'],
            ['Crème Glacée', 'Gâteau'],
            ['Bacon', 'Jambon'],
            ['Soupe', 'Salade'],
            ['Biscuit', 'Brownie'],
            ['Espresso', 'Latte'],
            ['Sandwich', 'Wrap'],
            ['Pâtes', 'Riz'],
            ['Fromage', 'Beurre'],
            ['Ramen', 'Pho'],
            ['Eau', 'Soda'],
            ['Poulet', 'Poisson'],
            ['Banane', 'Raisin'],
            ['Yogurt', 'Pudding'],
            ['Donut', 'Bagel'],
            ['Miel', 'Sucre'],
            ['Steak', 'Porc'],
            ['Vin', 'Bière'],
            ['Céréales', 'Flocons d\'avoine'],
            ['Nouilles', 'Spaghetti'],
            ['Œuf', 'Omelette'],
            ['Cornichon', 'Olive']
        ],
        'Animaux': [
            ['Chat', 'Chien'],
            ['Lion', 'Tigre'],
            ['Chiot', 'Lapin'],
            ['Oiseau', 'Poisson'],
            ['Vache', 'Cheval'],
            ['Poisson Rouge', 'Guppy'],
            ['Paon', 'Dinde'],
            ['Loutre', 'Castor'],
            ['Souris', 'Rat'],
            ['Canard', 'Oie'],
            ['Ours', 'Loup'],
            ['Crabe', 'Homard'],
            ['Serpent', 'Lézard'],
            ['Chèvre', 'Mouton'],
            ['Aigle', 'Faucon'],
            ['Grenouille', 'Crapaud'],
            ['Singe', 'Singe'],
            ['Cerf', 'Élan'],
            ['Papillon', 'Papillon de Nuit'],
            ['Abeille', 'Guêpe'],
            ['Cochon', 'Sanglier'],
            ['Poule', 'Coq'],
            ['Éléphant', 'Rhinocéros'],
            ['Zèbre', 'Âne'],
            ['Baleine', 'Dauphin'],
            ['Requin', 'Raie'],
            ['Tortue', 'Tortue Terrestre'],
            ['Hibou', 'Corbeau'],
            ['Renard', 'Raton Laveur'],
            ['Écureuil', 'Tamia']
        ],
        'Objets': [
            ['Téléphone', 'Tablette'],
            ['Chaise', 'Canapé'],
            ['Livre', 'Magazine'],
            ['Stylo', 'Crayon'],
            ['Voiture', 'Bus'],
            ['Montre', 'Horloge'],
            ['Sac', 'Sac à Dos'],
            ['Tasse', 'Verre'],
            ['Clé', 'Serrure'],
            ['Chaussures', 'Bottes'],
            ['Chapeau', 'Casquette'],
            ['Caméra', 'Téléphone'],
            ['Lampe', 'Bougie'],
            ['Miroir', 'Fenêtre'],
            ['Assiette', 'Bol'],
            ['Cuillère', 'Fourchette'],
            ['Serviette', 'Tissu'],
            ['Oreiller', 'Couverture'],
            ['Télécommande', 'Manette'],
            ['Portefeuille', 'Bourse'],
            ['Bicyclette', 'Motocyclette'],
            ['Ordinateur', 'Ordinateur Portable'],
            ['Télévision', 'Moniteur'],
            ['Réfrigérateur', 'Congélateur'],
            ['Micro-ondes', 'Four'],
            ['Brosse', 'Peigne'],
            ['Couteau', 'Ciseaux'],
            ['Parapluie', 'Imperméable'],
            ['Bouteille', 'Canette'],
            ['Boîte', 'Sac']
        ],
        'Emplois & Rôles': [
            ['Professeur', 'Étudiant'],
            ['Médecin', 'Infirmière'],
            ['Chef', 'Serveur'],
            ['Police', 'Garde'],
            ['Conducteur', 'Pilote'],
            ['Chanteur', 'Danseur'],
            ['Écrivain', 'Éditeur'],
            ['Fermier', 'Jardinier'],
            ['Artiste', 'Designer'],
            ['Juge', 'Avocat'],
            ['Banquier', 'Caissier'],
            ['Acteur', 'Réalisateur'],
            ['Mécanicien', 'Ingénieur'],
            ['Directeur', 'Patron'],
            ['Commis', 'Secrétaire'],
            ['Soldat', 'Capitaine'],
            ['Dentiste', 'Thérapeute'],
            ['Barbier', 'Coiffeur'],
            ['Facteur', 'Livreur'],
            ['Nettoyeur', 'Concierge'],
            ['Bibliothécaire', 'Comptable'],
            ['Photographe', 'Mannequin'],
            ['Vendeur', 'Client'],
            ['Constructeur', 'Architecte'],
            ['Scientifique', 'Chercheur'],
            ['Musicien', 'Compositeur'],
            ['Journaliste', 'Reporter'],
            ['Comptable', 'Auditeur'],
            ['Traducteur', 'Interprète'],
            ['Entraîneur', 'Formateur']
        ],
        'Divertissement': [
            ['Film', 'Série Télévisée'],
            ['Musique', 'Chanson'],
            ['Jeu', 'Sport'],
            ['Fête', 'Danse'],
            ['Livre', 'Histoire'],
            ['Théâtre', 'Cinéma'],
            ['Concert', 'Spectacle'],
            ['Comédie', 'Drame'],
            ['Magie', 'Truc'],
            ['Dessin Animé', 'Anime'],
            ['Festival', 'Carnaval'],
            ['Quiz', 'Concours'],
            ['Loisir', 'Activité'],
            ['Blague', 'Farce'],
            ['Performance', 'Acte'],
            ['Radio', 'Podcast'],
            ['Karaoké', 'Chant'],
            ['Échecs', 'Dames'],
            ['Puzzle', 'Énigme'],
            ['Course', 'Courrier']
        ],
        'Nature & Météo': [
            ['Soleil', 'Lune'],
            ['Pluie', 'Neige'],
            ['Arbre', 'Fleur'],
            ['Montagne', 'Colline'],
            ['Océan', 'Lac'],
            ['Vent', 'Brise'],
            ['Nuage', 'Ciel'],
            ['Rivière', 'Ruisseau'],
            ['Plage', 'Désert'],
            ['Forêt', 'Jardin'],
            ['Rocher', 'Pierre'],
            ['Feu', 'Glace'],
            ['Étoile', 'Planète'],
            ['Vallée', 'Gorge'],
            ['Île', 'Côte'],
            ['Tonnerre', 'Éclair'],
            ['Brouillard', 'Brume'],
            ['Coucher de Soleil', 'Lever du Soleil'],
            ['Printemps', 'Été'],
            ['Hiver', 'Automne'],
            ['Herbe', 'Mousse'],
            ['Feuille', 'Branche'],
            ['Étang', 'Piscine'],
            ['Champ', 'Prairie'],
            ['Caverne', 'Tunnel'],
            ['Falaise', 'Crête'],
            ['Volcan', 'Tremblement de Terre'],
            ['Marée', 'Vague'],
            ['Sable', 'Terre'],
            ['Arc-en-ciel', 'Aurore']
        ],
        'Amusant': [
            ['Banane', 'Concombre'],
            ['Bain', 'Douche'],
            ['Ventre', 'Fesses'],
            ['Gâteau', 'Caca'],
            ['Bonbon', 'Médicament'],
            ['Préservatif', 'Ballon'],
            ['Péter', 'Roter'],
            ['Doigt', 'Orteil'],
            ['Cheveux', 'Fourrure'],
            ['Baiser', 'Gifle'],
            ['Rouge à Lèvres', 'Crayon'],
            ['Massage', 'Chatouille'],
            ['Lait', 'Sueur'],
            ['Moustache', 'Sourcil'],
            ['Mamelon', 'Nombril'],
            ['Nez', 'Fesses'],
            ['Pyjama', 'Sous-vêtement'],
            ['Culotte', 'Short'],
            ['Oreiller', 'Sein'],
            ['Savon', 'Shampoing'],
            ['Chaussettes', 'Gants'],
            ['Chandail', 'Soutien-gorge'],
            ['Papier Toilette', 'Serviette'],
            ['Brosse à Dents', 'Brosse à Cheveux'],
            ['Dentifrice', 'Crème'],
            ['Sous-vêtement', 'Bikini'],
            ['Lécher', 'Sucer'],
            ['Chatouille', 'Poke'],
            ['Gicler', 'Vaporiser'],
            ['Pincer', 'Pincer']
        ]
    }
};

// Vérifier si l'utilisateur a accès premium
function hasPremiumAccess() {
    return localStorage.getItem('undercoverPremium') === 'true';
}

// Initialiser le jeu
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

function initializeGame() {
    const categories = Object.keys(gameState.wordsByCategory);
    const categorySelect = document.getElementById('categorySelect');

    if (categorySelect) {
        categorySelect.innerHTML = categories.map(cat =>
            `<option value="${cat}">${cat}</option>`
        ).join('');
    }

    document.getElementById('startGameBtn').addEventListener('click', startGame);
}

function startGame() {
    const playerCount = parseInt(document.getElementById('playerCount').value);
    const category = document.getElementById('categorySelect').value;

    if (!playerCount || playerCount < 3) {
        alert('Besoin d\'au moins 3 joueurs !');
        return;
    }

    const wordPair = gameState.wordsByCategory[category][
        Math.floor(Math.random() * gameState.wordsByCategory[category].length)
    ];

    gameState.civilianWord = wordPair[0];
    gameState.undercoverWord = wordPair[1];
    gameState.players = Array.from({length: playerCount}, (_, i) => ({
        id: i + 1,
        role: Math.random() < 1 / playerCount ? 'undercover' : 'civilian',
        word: Math.random() < 1 / playerCount ? gameState.undercoverWord : gameState.civilianWord,
        eliminated: false
    }));

    gameState.eliminatedPlayers.clear();
    gameState.currentPlayer = 0;

    // Masquer la configuration, afficher le jeu
    document.getElementById('setupScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';

    startTurn();
}

function startTurn() {
    if (gameState.currentPlayer < gameState.players.length) {
        const player = gameState.players[gameState.currentPlayer];
        const wordDisplay = document.getElementById('wordDisplay');
        const playerInfo = document.getElementById('playerInfo');

        playerInfo.textContent = `Joueur ${player.id}`;
        wordDisplay.textContent = player.word;
        wordDisplay.style.display = 'block';

        document.getElementById('nextButton').textContent = 'Joueur suivant';
        document.getElementById('nextButton').onclick = () => {
            wordDisplay.style.display = 'none';
            gameState.currentPlayer++;
            startTurn();
        };
    } else {
        // Tous les joueurs ont reçu leur mot
        showGameResults();
    }
}

function showGameResults() {
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';

    const resultText = document.getElementById('resultText');
    resultText.innerHTML = `
        <p>Mot Civil: <strong>${gameState.civilianWord}</strong></p>
        <p>Mot Espion: <strong>${gameState.undercoverWord}</strong></p>
        <p>Le jeu à été complété !</p>
    `;

    document.getElementById('playAgainButton').onclick = () => {
        document.getElementById('resultsScreen').style.display = 'none';
        document.getElementById('setupScreen').style.display = 'block';
    };
}

// Export pour les tests potentiels
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { gameState };
}
