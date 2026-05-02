import os
import re

languages = ['', 'de', 'fr', 'id', 'ja', 'ko', 'pt', 'ru', 'tr', 'zh']
base_path = '/Users/janka/Documents/GitHub/partygames'

# Mild localized options
mild_options = {
    'en': {
        'actions': ["Kiss", "Whisper to", "Caress", "Massage", "Gaze at", "Hold hands with", "Hug", "Tickle", "Stroke"],
        'wheres': ["Neck", "Ears", "Lips", "Cheek", "Back", "Hands", "Forehead", "Shoulders", "Nose"]
    },
    'de': {
        'actions': ["Küssen", "Flüstern", "Streicheln", "Massieren", "Ansehen", "Händchen halten", "Umfarmen", "Kitzeln", "Liebkosen"],
        'wheres': ["Nacken", "Ohren", "Lippen", "Wange", "Rücken", "Hände", "Stirn", "Schultern", "Nase"]
    },
    'fr': {
        'actions': ["Embrasser", "Chuchoter", "Caresser", "Masser", "Regarder", "Tenir la main", "Serrer dans ses bras", "Chatouiller", "Effleurer"],
        'wheres': ["Cou", "Oreilles", "Lèvres", "Joue", "Dos", "Mains", "Front", "Épaules", "Nez"]
    },
    'id': {
        'actions': ["Cium", "Bisikkan", "Bela", "Pijat", "Tatap", "Bergandengan tangan", "Peluk", "Gelitik", "Usap"],
        'wheres': ["Leher", "Telinga", "Bibir", "Pipi", "Punggung", "Tangan", "Dahi", "Bahu", "Hidung"]
    },
    'ja': {
        'actions': ["キスする", "囁く", "愛撫する", "マッサージする", "見つめる", "手を繋ぐ", "抱きしめる", "くすぐる", "撫でる"],
        'wheres': ["首", "耳", "唇", "頬", "背中", "手", "おでこ", "肩", "鼻"]
    },
    'ko': {
        'actions': ["키스하기", "속삭이기", "애무하기", "마사지하기", "바라보기", "손잡기", "안아주기", "간지럽히기", "쓰다듬기"],
        'wheres': ["목", "귀", "입술", "볼", "등", "손", "이마", "어깨", "코"]
    },
    'pt': {
        'actions': ["Beijar", "Sussurrar", "Acariciar", "Massagear", "Olhar nos olhos", "Dar as mãos", "Abraçar", "Fazer cócegas", "Afeição"],
        'wheres': ["Pescoço", "Orelhas", "Lábios", "Bochecha", "Costas", "Mãos", "Testa", "Ombros", "Nariz"]
    },
    'ru': {
        'actions': ["Поцеловать", "Шептать", "Ласкать", "Массировать", "Смотреть в глаза", "Держаться за руки", "Обнять", "Щекотать", "Погладить"],
        'wheres': ["Шея", "Уши", "Губы", "Щека", "Спина", "Руки", "Лоб", "Плечи", "Нос"]
    },
    'tr': {
        'actions': ["Öpmek", "Fısıldamak", "Okşamak", "Masaj yapmak", "Bakışmak", "El ele tutuşmak", "Sarılmak", "Gıdıklamak", "Sıvazlamak"],
        'wheres': ["Boyun", "Kulaklar", "Dudaklar", "Yanak", "Sırt", "Eller", "Alın", "Omuzlar", "Burun"]
    },
    'zh': {
        'actions': ["亲吻", "耳语", "爱抚", "按摩", "凝视", "牵手", "拥抱", "挠痒痒", "抚摸"],
        'wheres': ["脖子", "耳朵", "嘴唇", "脸颊", "背部", "手部", "额头", "肩膀", "鼻子"]
    }
}

def make_mild(filepath, lang):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    options = mild_options.get(lang, mild_options['en'])
    
    # Replace defaultActions array content
    # Look for const defaultActions = [ ... ];
    actions_str = '",\n    "'.join(options['actions'])
    actions_replacement = f'const defaultActions = [\n    "{actions_str}"\n];'
    content = re.sub(r'const defaultActions = \[[^\]]*\];', actions_replacement, content, flags=re.DOTALL)

    # Replace defaultWheres array content
    wheres_str = '",\n    "'.join(options['wheres'])
    wheres_replacement = f'const defaultWheres = [\n    "{wheres_str}"\n];'
    content = re.sub(r'const defaultWheres = \[[^\]]*\];', wheres_replacement, content, flags=re.DOTALL)

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
        if filename.endswith('.js'):
            file_path = os.path.join(dir_path, filename)
            make_mild(file_path, l_code)
            print(f"Made {file_path} mild for {l_code}")

print("Spicy terms replaced with mild ones.")
