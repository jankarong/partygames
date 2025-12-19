#!/usr/bin/env python3
"""
Add Ezoic ad placements to all HTML pages in the project
"""

import os
import re
import glob

# Ad placements for different page types
AD_PLACEMENT_TOP = """
    <!-- Ezoic Ad Placement 111 - Top of Game Page -->
    <div class="container my-3">
        <div id="ezoic-pub-ad-placeholder-111"></div>
    </div>

"""

AD_PLACEMENT_MIDDLE = """
            <!-- Ezoic Ad Placement 112 - After Game Area -->
            <div class="my-4">
                <div id="ezoic-pub-ad-placeholder-112"></div>
            </div>

"""

AD_PLACEMENT_BOTTOM = """
    <!-- Ezoic Ad Placement 113 - Bottom of Game Page -->
    <div class="container my-4">
        <div id="ezoic-pub-ad-placeholder-113"></div>
    </div>

"""

AD_LOADING_SCRIPT = """
    <!-- Ezoic Ad Loading Script -->
    <script>
        // Load all Ezoic ad placements on page load
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof ezstandalone !== 'undefined' && ezstandalone.cmd) {
                ezstandalone.cmd.push(function() {
                    // Load all game page ad placements at once for better performance
                    ezstandalone.showAds(111, 112, 113);
                });
            }
        });
    </script>
"""

def check_has_ezoic_ads(content):
    """Check if file already has Ezoic ad placements"""
    return 'ezoic-pub-ad-placeholder-111' in content or 'ezoic-pub-ad-placeholder-101' in content

def add_ads_to_game_page(filepath):
    """Add Ezoic ad placements to a game page"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Skip if already has ads
        if check_has_ezoic_ads(content):
            print(f"[SKIP] Already has ads: {filepath}")
            return 'skip'

        modified = False

        # Add top ad after navigation comment or after <body>
        if '<!-- Enhanced Navigation will be inserted by JavaScript -->' in content:
            if AD_PLACEMENT_TOP.strip() not in content:
                content = content.replace(
                    '<!-- Enhanced Navigation will be inserted by JavaScript -->',
                    '<!-- Enhanced Navigation will be inserted by JavaScript -->' + AD_PLACEMENT_TOP,
                    1
                )
                modified = True
        elif '<body>' in content and AD_PLACEMENT_TOP.strip() not in content:
            content = content.replace(
                '<body>',
                '<body>' + AD_PLACEMENT_TOP,
                1
            )
            modified = True

        # Add middle ad before game rules or content sections
        if modified and AD_PLACEMENT_MIDDLE.strip() not in content:
            # Try to find common section markers
            patterns = [
                ('<!-- Game Rules Section -->', AD_PLACEMENT_MIDDLE + '            <!-- Game Rules Section -->'),
                ('<!-- Rules Section -->', AD_PLACEMENT_MIDDLE + '            <!-- Rules Section -->'),
                ('<!-- How to Play Section -->', AD_PLACEMENT_MIDDLE + '            <!-- How to Play Section -->'),
                ('<!-- FAQ Section -->', AD_PLACEMENT_MIDDLE + '            <!-- FAQ Section -->'),
            ]

            for pattern, replacement in patterns:
                if pattern in content:
                    content = content.replace(pattern, replacement, 1)
                    break

        # Add bottom ad before </body> closing scripts
        if modified and AD_PLACEMENT_BOTTOM.strip() not in content:
            # Find the main closing divs (usually </div>\n    </div>\n    </div>)
            # and insert ad after them
            pattern = r'(</div>\s*</div>\s*</div>\s*)\n\s*(<script src="https://cdn\.jsdelivr\.net)'
            if re.search(pattern, content):
                content = re.sub(
                    pattern,
                    r'\1\n' + AD_PLACEMENT_BOTTOM + r'\2',
                    content,
                    count=1
                )

        # Add loading script before </body>
        if modified and AD_LOADING_SCRIPT.strip() not in content:
            content = content.replace(
                '</body>',
                AD_LOADING_SCRIPT + '</body>',
                1
            )

        # Write back to file
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"[OK] Added ads to: {filepath}")
            return True
        else:
            print(f"[SKIP] No changes needed: {filepath}")
            return 'skip'

    except Exception as e:
        print(f"[ERROR] Processing {filepath}: {e}")
        return False

def main():
    # Get all game HTML files
    game_files = []

    # English games
    game_files.extend(glob.glob('games/**/*.html', recursive=True))

    # Multi-language games
    for lang in ['zh', 'de', 'fr', 'pt', 'id', 'ru']:
        game_files.extend(glob.glob(f'{lang}/games/**/*.html', recursive=True))

    # Filter out some files
    exclude_patterns = ['node_modules', '.git']
    filtered_files = [f for f in game_files if not any(p in f for p in exclude_patterns)]

    print(f"Found {len(filtered_files)} game HTML files to process\n")

    success_count = 0
    skip_count = 0
    error_count = 0

    for filepath in filtered_files:
        result = add_ads_to_game_page(filepath)
        if result is True:
            success_count += 1
        elif result == 'skip':
            skip_count += 1
        else:
            error_count += 1

    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  [OK] Successfully updated: {success_count} files")
    print(f"  [SKIP] Skipped: {skip_count} files")
    print(f"  [ERROR] Errors: {error_count} files")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
