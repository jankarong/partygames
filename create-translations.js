const fs = require('fs');
const path = require('path');

// List of languages to process
const languages = ['es', 'fr', 'de', 'it', 'ko', 'pt', 'ru'];

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

// Process each language
languages.forEach(lang => {
    const langDir = path.join(__dirname, 'locales', lang);

    // Skip if language directory doesn't exist
    if (!fs.existsSync(langDir)) {
        console.log(`Directory for ${lang} doesn't exist. Skipping.`);
        return;
    }

    // Always create or overwrite translation.json
    const translationPath = path.join(langDir, 'translation.json');

    // Read all available JSON files
    const common = readJsonFile(path.join(langDir, 'common.json'));
    const gamesContent = readJsonFile(path.join(langDir, 'games.json'));
    const footerContent = readJsonFile(path.join(langDir, 'footer.json'));

    // Create the merged translation object with the correct structure
    const merged = {
        nav: common.nav || {},
        hero: common.hero || {},
        games: {
            ...(common.games || {}), // Basic game properties like players, playNow
            ...gamesContent // Specific game entries
        },
        footer: footerContent // Footer content
    };

    // Write the merged JSON to translation.json
    fs.writeFileSync(translationPath, JSON.stringify(merged, null, 4), 'utf8');
    console.log(`Created translation.json for ${lang}`);
});

console.log('Translation files generation complete!'); 