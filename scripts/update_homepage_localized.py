import os

languages = ['de', 'fr', 'id', 'ja', 'ko', 'pt', 'ru', 'tr', 'zh']
base_path = '/Users/janka/Documents/GitHub/partygames'

brand_names = {
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

def update_homepage_cards(lang):
    index_path = os.path.join(base_path, lang, 'index.html')
    if not os.path.exists(index_path):
        return

    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    target_brand = brand_names[lang]
    
    # Replace "Love Dice Online" in the card title and alt text
    content = content.replace('<h5 class="card-title">Love Dice Online</h5>', f'<h5 class="card-title">{target_brand}</h5>')
    content = content.replace('alt="Love Dice Online"', f'alt="{target_brand}"')

    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated card in {lang}/index.html")

for lang in languages:
    update_homepage_cards(lang)
