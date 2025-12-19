#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Update all language versions to include Russian links
"""

import os
import re
import sys
from pathlib import Path

# Fix console encoding for Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_DIR = Path("C:/Users/X/Documents/GitHub/partygames")
LANGUAGE_DIRS = [
    BASE_DIR / "zh",
    BASE_DIR / "de",
    BASE_DIR / "fr",
    BASE_DIR / "pt",
    BASE_DIR / "id"
]

def add_russian_hreflang(html_content):
    """Add Russian hreflang link if not present"""
    if '<link rel="alternate" hreflang="ru"' not in html_content:
        # Insert before x-default
        pattern = r'(<link rel="alternate" hreflang="id"[^>]*>)'
        replacement = r'\1\n    <link rel="alternate" hreflang="ru" href="https://www.bestpartygames.net/ru/">'
        html_content = re.sub(pattern, replacement, html_content)
    return html_content

def add_russian_nav_item(html_content):
    """Add Russian language option to navigation dropdown"""
    if '<li><a class="dropdown-item" href="/id/">' in html_content and \
       '<li><a class="dropdown-item" href="/ru/">' not in html_content:
        # Find the last language item in dropdown-menu
        pattern = r'(<li><a class="dropdown-item" href="/id/"[^>]*>[^<]*</a></li>)'
        replacement = r'\1\n                            <li><a class="dropdown-item" href="/ru/">🇷🇺 Русский</a></li>'
        html_content = re.sub(pattern, replacement, html_content)
    return html_content

def update_index_files():
    """Update index.html files in each language directory"""
    for lang_dir in LANGUAGE_DIRS:
        index_file = lang_dir / "index.html"

        if not index_file.exists():
            print(f"⚠️  {index_file} not found")
            continue

        try:
            with open(index_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # Add Russian hreflang
            content = add_russian_hreflang(content)

            # Add Russian nav item
            content = add_russian_nav_item(content)

            with open(index_file, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"✓ Updated {index_file}")
        except Exception as e:
            print(f"✗ Error updating {index_file}: {e}")

def update_game_files():
    """Update game HTML files in each language directory"""
    for lang_dir in LANGUAGE_DIRS:
        games_dir = lang_dir / "games"

        if not games_dir.exists():
            continue

        # Process all HTML files in games directories
        for html_file in games_dir.glob("*/*.html"):
            try:
                with open(html_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Check if Russian link already exists
                if '<li><a class="dropdown-item" href="/ru/">' not in content:
                    # Add Russian language option to dropdown
                    pattern = r'(<li><a class="dropdown-item" href="/id/"[^>]*>[^<]*</a></li>)'
                    replacement = r'\1\n                            <li><a class="dropdown-item" href="/ru/">🇷🇺 Русский</a></li>'
                    content = re.sub(pattern, replacement, content)

                    with open(html_file, 'w', encoding='utf-8') as f:
                        f.write(content)
            except Exception as e:
                print(f"⚠️  Error processing {html_file}: {e}")

if __name__ == "__main__":
    print("Updating all language versions with Russian links...\n")

    update_index_files()
    print("\nUpdating game files...")
    update_game_files()

    print("\n✅ All files updated with Russian language links!")
