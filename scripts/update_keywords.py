import os
import re

languages = ['', 'de', 'fr', 'id', 'ja', 'ko', 'pt', 'ru', 'tr', 'zh']
base_path = '/Users/janka/Documents/GitHub/partygames'

# Priority order: most specific first
replacements = [
    (r'Sex Dice Online', 'Love Dice Online'),
    (r'sex dice online', 'love dice online'),
    (r'Sex Dice', 'Love Dice Online'),
    (r'sex dice', 'love dice'),
    (r'sexy dice', 'love dice'),
    (r'Sexy Dice', 'Love Dice Online'),
    (r'sexdice', 'lovedice'),
]

localized_names = {
    'de': ['Sex-Würfel', 'Erotik-Würfel'],
    'fr': ['Dés Coquins', 'Dés de Sexe'],
    'id': ['Dadu Sex', 'Dadu Dewasa'],
    'ja': ['セクシーサイコロ', '大人用サイコロ'],
    'ko': ['섹스 주사위', '성인용 주사위'],
    'pt': ['Dados de Sexo', 'Dados Eróticos'],
    'ru': ['Секс-кубики', 'Эротические кубики'],
    'tr': ['Seks Zarı', 'Erotik Zar'],
    'zh': ['情侣骰子', '性感骰子', '成人骰子']
}

def process_file(filepath, lang):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Generic replacements with regex to avoid double matching
    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    # Localized name replacements
    if lang in localized_names:
        for name in localized_names[lang]:
            content = content.replace(name, 'Love Dice Online')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for lang in languages:
    dir_path = os.path.join(base_path, lang, 'games/sexdice/')
    if not os.path.exists(dir_path):
        if lang == '':
            dir_path = os.path.join(base_path, 'games/sexdice/')
        else:
            continue
            
    for filename in os.listdir(dir_path):
        if filename.endswith(('.html', '.js', '.css')):
            file_path = os.path.join(dir_path, filename)
            process_file(file_path, lang)
            print(f"Processed {file_path}")

print("Keyword replacement complete.")
