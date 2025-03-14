const fs = require('fs');
const path = require('path');

// List of languages to process
const languages = ['zh', 'es', 'fr', 'de', 'it', 'ko', 'pt', 'ru'];

// Function to read a JSON file
function readJsonFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        }
        return {};
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return {};
    }
}

// Get English translation as reference
const enTranslationPath = path.join(__dirname, 'locales', 'en', 'translation.json');
const enTranslation = readJsonFile(enTranslationPath);

if (!enTranslation || Object.keys(enTranslation).length === 0) {
    console.error('Error: English translation file is missing or empty!');
    process.exit(1);
}

// Process each language
languages.forEach(lang => {
    const langDir = path.join(__dirname, 'locales', lang);

    // Skip if language directory doesn't exist
    if (!fs.existsSync(langDir)) {
        console.log(`Directory for ${lang} doesn't exist. Skipping.`);
        return;
    }

    // Path to translation.json
    const translationPath = path.join(langDir, 'translation.json');

    // Read all available JSON files
    const common = readJsonFile(path.join(langDir, 'common.json'));
    const gamesContent = readJsonFile(path.join(langDir, 'games.json'));
    const footerContent = readJsonFile(path.join(langDir, 'footer.json'));
    const currentTranslation = readJsonFile(translationPath);

    // Create a new translation object with the correct structure based on English reference
    const newTranslation = {
        nav: common.nav || {},
        hero: common.hero || {},
        games: {
            // Basic game properties
            players: common.games?.players || enTranslation.games.players,
            playNow: common.games?.playNow || enTranslation.games.playNow,

            // Specific game entries
            magic8ball: gamesContent.magic8ball || {},
            truthOrDare: gamesContent.truthOrDare || {},
            neverHaveIEver: gamesContent.neverHaveIEver || {},
            whoIsMostLikely: gamesContent.whoIsMostLikely || {},
            wouldYouRather: gamesContent.wouldYouRather || {},
            mafia: gamesContent.mafia || {},
            undercover: gamesContent.undercover || {},
            guessNumber: gamesContent.guessNumber || {},
            charades: gamesContent.charades || {},
            hedbanz: gamesContent.hedbanz || {},
            sexDice: gamesContent.sexDice || {},
            comingSoon: gamesContent.comingSoon || {}
        },
        footer: footerContent || {},

        // Add feedback and theList translations
        feedback: currentTranslation.feedback || {
            pageTitle: enTranslation.feedback.pageTitle
        },
        theList: currentTranslation.theList || {
            pageTitle: enTranslation.theList.pageTitle,
            mainTitle: enTranslation.theList.mainTitle,
            game1: enTranslation.theList.game1,
            game2: enTranslation.theList.game2,
            game3: enTranslation.theList.game3,
            game4: enTranslation.theList.game4,
            game5: enTranslation.theList.game5,
            game6: enTranslation.theList.game6,
            game7: enTranslation.theList.game7,
            game8: enTranslation.theList.game8,
            game9: enTranslation.theList.game9,
            game10: enTranslation.theList.game10,
            safetyTitle: enTranslation.theList.safetyTitle,
            safetyTip1: enTranslation.theList.safetyTip1,
            safetyTip2: enTranslation.theList.safetyTip2,
            safetyTip3: enTranslation.theList.safetyTip3,
            safetyTip4: enTranslation.theList.safetyTip4,
            safetyTip5: enTranslation.theList.safetyTip5
        }
    };

    // Write the new translation.json
    fs.writeFileSync(translationPath, JSON.stringify(newTranslation, null, 4), 'utf8');
    console.log(`Fixed translation.json for ${lang}`);
});

console.log('Translation files fixed successfully!'); 