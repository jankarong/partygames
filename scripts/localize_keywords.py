import os
import re

languages = ['', 'de', 'fr', 'id', 'ja', 'ko', 'pt', 'ru', 'tr', 'zh']
base_path = '/Users/janka/Documents/GitHub/partygames'

# Localized "Love Dice Online" brand names
brand_names = {
    'en': 'Love Dice Online',
    'de': 'Liebeswürfel Online',
    'fr': 'Dés d\'Amour en Ligne',
    'id': 'Dadu Cinta Online',
    'ja': 'ラブダイスオンライン',
    'ko': '러브 주사위 온라인',
    'pt': 'Dados de Amor Online',
    'ru': 'Кубики любви онлайн',
    'tr': 'Aşk Zarı Çevrimiçi',
    'zh': '爱情骰子在线'
}

# English "Love Dice Online" can be kept alongside or replaced. 
# The user said "关键词 变成 love dice online", so I will ensure "Love Dice Online" is present 
# but the primary display name is localized.

def process_file(filepath, lang):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Brand name to use for this language
    target_brand = brand_names.get(lang, brand_names['en'])
    
    # Replace "Love Dice Online Online" or "Love Dice Online在线" with the clean localized brand
    # This cleans up my previous messy replacements
    content = content.replace('Love Dice Online Online', target_brand)
    content = content.replace('Love Dice Online在线', target_brand)
    content = content.replace('Love Dice Online', target_brand)

    # For keywords, we can keep the English "love dice online" as requested by user earlier
    # but ensure the rest is localized.
    # Actually, the user says "其他语言关键词要他对应的语言啊", so I'll localize everything.

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for lang in languages:
    dir_path = os.path.join(base_path, lang, 'games/sexdice/')
    if not os.path.exists(dir_path):
        if lang == '':
            dir_path = os.path.join(base_path, 'games/sexdice/')
            l_code = 'en'
        else:
            continue
    else:
        l_code = lang
            
    for filename in os.listdir(dir_path):
        if filename.endswith(('.html', '.js', '.css')):
            file_path = os.path.join(dir_path, filename)
            process_file(file_path, l_code)
            print(f"Processed {file_path} for {l_code}")

print("Localized keyword replacement complete.")
