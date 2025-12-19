#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to create Russian versions of game files
Translates HTML and JS files with Russian cultural adaptations
"""

import os
import re
import shutil
import sys
from pathlib import Path

# Fix console encoding for Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Base directories
BASE_DIR = Path("C:/Users/X/Documents/GitHub/partygames")
GAMES_DIR = BASE_DIR / "games"
RU_DIR = BASE_DIR / "ru/games"

# Translation mappings
TRANSLATION_MAP = {
    # HTML elements
    "Draw Card": "Вытянуть карту",
    "Click to draw your first card!": "Нажмите, чтобы вытянуть первую карту!",
    "Next": "Дальше",
    "New Game": "Новая игра",
    "Game Rules": "Правила игры",
    "Card Rules & Actions": "Правила карт и действия",
    "How to Play": "Как играть",
    "Game Setup": "Установка игры",
    "How to Play Kings Cup Drinking Game": "Как играть в Король чаши",
    "Kings Cup drinking game is a classic party drinking game": "Король чаши - это классическая игра для вечеринок",
    "Waterfall": "Водопад",
    "Everyone drinks": "Все пьют",
    "You": "Ты",
    "Me": "Я",
    "Floor": "Пол",
    "Touch the floor": "Коснись земли",
    "Guys": "Парни",
    "All boys drink": "Все парни пьют",
    "Girls": "Девочки",
    "All girls drink": "Все девочки пьют",
    "Heaven": "Рай",
    "Point up": "Указывай вверх",
    "Mate": "Напарник",
    "Pick a drinking buddy": "Выберите напарника",
    "Rhyme": "Рифма",
    "Take turns rhyming": "Рифмуйте по очереди",
    "Categories": "Категории",
    "Name items in a category": "Назовите предметы в категории",
    "Make Rule": "Создать правило",
    "Create a new game rule": "Создайте новое правило игры",
    "Questions": "Вопросы",
    "Only ask questions": "Только вопросы",
    "Kings Cup": "Король чаши",
    "Pour drink in cup": "Налейте напиток в чашку",
    "Cards Left": "Карт осталось",
    "Kings Drawn": "Королей вытянуто",
    "Empty": "Пусто",

    # Truth or Dare translations
    "Truth or Dare": "Правда или вызов",
    "Ask a question or give a dare": "Задайте вопрос или бросьте вызов",
    "Truth": "Правда",
    "Dare": "Вызов",
    "Skip": "Пропустить",

    # Mafia translations
    "Mafia": "Мафия",
    "Villager": "Житель",
    "Detective": "Детектив",
    "Doctor": "Доктор",
    "Player": "Игрок",
    "Vote": "Голос",

    # Magic 8 Ball translations
    "Magic 8 Ball": "Магический шар 8",
    "Shake the ball": "Встряхните шар",
    "Ask a question": "Задайте вопрос",
}

# Game list
GAMES = [
    "beernumber",
    "BottleMatchGame",
    "charades",
    "charades2",
    "findthespy",
    "hedbanzgame",
    "KingsCup",
    "lastshot",
    "liarsdice",
    "mafia",
    "magic8ball",
    "NeverHaveIEver",
    "numberguess",
    "sexdice",
    "TruthorDare",
    "undercover",
    "WhoIsMostLikely",
    "witchspoison",
    "WouldYouRather"
]

def translate_text(text):
    """Translate text using the translation map"""
    for eng, rus in TRANSLATION_MAP.items():
        if eng in text:
            text = text.replace(eng, rus)
    return text

def update_html_for_russian(html_content, game_name):
    """Update HTML content for Russian version"""
    # Change language attribute
    html_content = html_content.replace('lang="en"', 'lang="ru-RU"')

    # Update meta tags
    html_content = re.sub(
        r'<link rel="canonical" href="[^"]*">',
        f'<link rel="canonical" href="https://www.bestpartygames.net/ru/games/{game_name[0]}/{game_name}">',
        html_content
    )

    # Add Russian hreflang if not present
    if '<link rel="alternate" hreflang="ru"' not in html_content:
        hreflang_insertion = f'    <link rel="alternate" hreflang="ru" href="https://www.bestpartygames.net/ru/games/{game_name[0]}/{game_name}">\n    <link rel="alternate" hreflang="x-default"'
        html_content = html_content.replace(
            '    <link rel="alternate" hreflang="x-default"',
            hreflang_insertion,
            1
        )

    # Translate common elements
    html_content = translate_text(html_content)

    return html_content

def update_js_for_russian(js_content):
    """Update JavaScript content with Russian translations"""
    # Translate strings in the JS
    js_content = translate_text(js_content)
    return js_content

def create_russian_game_files():
    """Create Russian versions of all game files"""

    for game in GAMES:
        source_dir = GAMES_DIR / game
        dest_dir = RU_DIR / game

        if not source_dir.exists():
            print(f"⚠️  Skipping {game} - directory not found")
            continue

        print(f"Processing {game}...")

        # Find HTML and JS files (case-insensitive)
        html_files = list(source_dir.glob("*.html"))
        js_files = list(source_dir.glob("*.js"))

        # Process HTML files
        for html_file in html_files:
            try:
                with open(html_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Update for Russian
                content = update_html_for_russian(content, game)

                # Write to Russian version
                dest_file = dest_dir / html_file.name
                with open(dest_file, 'w', encoding='utf-8') as f:
                    f.write(content)

                print(f"  ✓ Created {html_file.name}")
            except Exception as e:
                print(f"  ✗ Error processing {html_file.name}: {e}")

        # Process JS files
        for js_file in js_files:
            try:
                with open(js_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Update for Russian
                content = update_js_for_russian(content)

                # Write to Russian version
                dest_file = dest_dir / js_file.name
                with open(dest_file, 'w', encoding='utf-8') as f:
                    f.write(content)

                print(f"  ✓ Created {js_file.name}")
            except Exception as e:
                print(f"  ✗ Error processing {js_file.name}: {e}")

if __name__ == "__main__":
    print("Creating Russian game files...")
    print(f"Source directory: {GAMES_DIR}")
    print(f"Destination directory: {RU_DIR}\n")

    create_russian_game_files()

    print("\n✅ Russian game files creation complete!")
