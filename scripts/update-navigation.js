#!/usr/bin/env node

/**
 * Batch update script to add enhanced navigation to all game pages
 * Run with: node scripts/update-navigation.js
 */

const fs = require('fs');
const path = require('path');

const gamesDir = './games';
const navigationScriptPath = '../../js/game-navigation.js';

// Find all HTML files in games directory
function findGameHTMLFiles(dir) {
    const files = [];

    function walkDir(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                walkDir(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.html')) {
                files.push(fullPath);
            }
        }
    }

    walkDir(dir);
    return files;
}

// Update single HTML file
function updateHTMLFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;

        // Replace old home icon with comment
        if (content.includes('<a href="../../index.html" class="home-icon">')) {
            content = content.replace(
                /<a href="\.\.\/\.\.\/index\.html" class="home-icon"><i class="fas fa-home"><\/i><\/a>/g,
                '<!-- Enhanced Navigation will be inserted by JavaScript -->'
            );
            updated = true;
        }

        // Add navigation script if not present
        if (!content.includes('game-navigation.js')) {
            // Find the last script tag before </body>
            const bodyCloseIndex = content.lastIndexOf('</body>');
            if (bodyCloseIndex !== -1) {
                const beforeBody = content.substring(0, bodyCloseIndex);
                const afterBody = content.substring(bodyCloseIndex);

                // Find last script tag
                const lastScriptMatch = beforeBody.match(/<script[^>]*><\/script>|<script[^>]*src="[^"]*"><\/script>/g);
                if (lastScriptMatch) {
                    const lastScript = lastScriptMatch[lastScriptMatch.length - 1];
                    const lastScriptIndex = beforeBody.lastIndexOf(lastScript);
                    const insertPoint = lastScriptIndex + lastScript.length;

                    content = beforeBody.substring(0, insertPoint) +
                        '\n    <script src="' + navigationScriptPath + '"></script>' +
                        beforeBody.substring(insertPoint) +
                        afterBody;
                    updated = true;
                }
            }
        }

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated: ${filePath}`);
            return true;
        } else {
            console.log(`⏭️  Skipped: ${filePath} (already updated or no changes needed)`);
            return false;
        }

    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Main execution
function main() {
    console.log('🚀 Starting navigation system update...\n');

    if (!fs.existsSync(gamesDir)) {
        console.error('❌ Games directory not found:', gamesDir);
        process.exit(1);
    }

    const htmlFiles = findGameHTMLFiles(gamesDir);
    console.log(`📁 Found ${htmlFiles.length} HTML files\n`);

    let updatedCount = 0;

    for (const file of htmlFiles) {
        if (updateHTMLFile(file)) {
            updatedCount++;
        }
    }

    console.log('\n🎉 Update complete!');
    console.log(`📊 Updated ${updatedCount} out of ${htmlFiles.length} files`);

    if (updatedCount > 0) {
        console.log('\n✨ Enhanced navigation features added:');
        console.log('   • 🎯 Floating navigation menu (top-right)');
        console.log('   • 🚀 Quick access bar (bottom)');
        console.log('   • 🎪 Smart game recommendations');
        console.log('   • 📱 Mobile-optimized design');
        console.log('\n💡 Visit any game page to see the new navigation system!');
    }
}

// Run script
if (require.main === module) {
    main();
}

module.exports = { updateHTMLFile, findGameHTMLFiles }; 