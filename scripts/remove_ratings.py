import os
import re

languages = ['', 'de', 'fr', 'id', 'ja', 'ko', 'pt', 'ru', 'tr', 'zh']
base_path = '/Users/janka/Documents/GitHub/partygames'

# Rating terms to remove
rating_terms = [
    r'19금\s*',
    r'18\+\s*',
    r'19\+\s*',
    r'Adult\s*',
    r'成人\s*',
    r'Erotik\s*',
    r'亲密\s*',
    r'Coquins\s*',
    r'Dewasa\s*',
    r'성인용\s*',
    r'Eróticos\s*',
    r'Эротические\s*',
    r'Erotik\s*'
]

def remove_ratings(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove rating prefixes from titles and headings
    for term in rating_terms:
        # Match case-insensitively and remove
        content = re.sub(term, '', content, flags=re.IGNORECASE)

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
            remove_ratings(file_path)
            print(f"Removed ratings from {file_path}")

print("Rating terms removal complete.")
