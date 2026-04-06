import os

langs = ['de', 'fr', 'id', 'ja', 'pt', 'ru', 'tr', 'zh']

for lang in langs:
    filepath = f'js/game-navigation-{lang}.js'
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add Korean to language menu
    if 'data-lang="ko"' not in content:
        # Find a good place to insert (e.g. after ja or before en)
        if 'data-lang="ja"' in content:
            content = content.replace('data-lang="ja">🇯🇵 日本語</a>', 'data-lang="ja">🇯🇵 日本語</a>\n                            <a href="#" class="language-link" data-lang="ko">🇰🇷 한국어</a>')
        else:
            content = content.replace('data-lang="en">🇺🇸 English</a>', 'data-lang="en">🇺🇸 English</a>\n                            <a href="#" class="language-link" data-lang="ko">🇰🇷 한국어</a>')
            
    # 2. Add /ko/ to stripLangPrefix
    if "replace('/ko/', '/')" not in content:
        content = content.replace("replace('/ru/', '/')", "replace('/ko/', '/').replace('/ru/', '/')")
        
    # 3. Add /ko/ to switchLanguage English condition
    if "replace('/ko', '')" not in content:
        content = content.replace("replace('/ru', '')", "replace('/ko', '').replace('/ru', '')")
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated all navigation scripts to include Korean.")
