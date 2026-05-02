import os
import re

languages = ['de', 'fr', 'id', 'ja', 'ko', 'pt', 'ru', 'tr', 'zh']
base_path = '/Users/janka/Documents/GitHub/partygames'

card_templates = {
    'zh': {
        'title': 'Love Dice Online',
        'text': '用这个免费的浪漫 **love dice online** 游戏为你们的关系增添情趣。掷出有趣的动作、部位和时长。',
        'btn': '立即游戏'
    },
    'de': {
        'title': 'Love Dice Online',
        'text': 'Bringen Sie Schwung in Ihre Beziehung mit diesem kostenlosen romantischen **love dice online** Spiel.',
        'btn': 'Jetzt spielen'
    },
    'fr': {
        'title': 'Love Dice Online',
        'text': 'Pimentez votre relation avec ce jeu gratuit et romantique de **love dice online**.',
        'btn': 'Jouer maintenant'
    },
    'id': {
        'title': 'Love Dice Online',
        'text': 'Bumbui hubungan Anda dengan permainan **love dice online** romantis gratis ini.',
        'btn': 'Main Sekarang'
    },
    'ja': {
        'title': 'Love Dice Online',
        'text': 'この無料のロマンチックな **love dice online** ゲームで、二人の関係を盛り上げましょう。',
        'btn': '今すぐプレイ'
    },
    'ko': {
        'title': 'Love Dice Online',
        'text': '이 무료 로맨틱 **love dice online** 게임으로 관계에 활력을 불어넣으세요.',
        'btn': '지금 플레이'
    },
    'pt': {
        'title': 'Love Dice Online',
        'text': 'Dê um toque especial ao seu relacionamento com este jogo de **love dice online** romântico e gratuito.',
        'btn': 'Jogar Agora'
    },
    'ru': {
        'title': 'Love Dice Online',
        'text': 'Добавьте изюминку в свои отношения с помощью этой бесплатной романтической игры **love dice online**.',
        'btn': 'Играть сейчас'
    },
    'tr': {
        'title': 'Love Dice Online',
        'text': 'Bu ücretsiz romantik **love dice online** oyunuyla ilişkinize renk katın.',
        'btn': 'Şimdi Oyna'
    }
}

def add_card_to_index(lang):
    index_path = os.path.join(base_path, lang, 'index.html')
    if not os.path.exists(index_path):
        return

    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # If the card already exists (maybe under a different name), we should replace it or avoid double adding
    if 'sexdice.html' in content or 'lovedice.html' in content:
        print(f"Card already exists in {lang}/index.html, skipping or manual update needed.")
        return

    # Find the games section row
    # Usually starts with <div class="row g-4">
    insertion_point = content.find('<div class="row g-4">')
    if insertion_point == -1:
        print(f"Could not find insertion point in {lang}/index.html")
        return

    # Move past the opening tag
    insertion_point += len('<div class="row g-4">')
    
    data = card_templates[lang]
    card_html = f"""
                <!-- Love Dice Online -->
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="card game-card shadow-sm">
                        <div class="card-img-wrapper">
                            <img src="../games/sexdice/sexdicelogo.png" class="card-img-top" alt="{data['title']}"
                                loading="lazy">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{data['title']}</h5>
                            <p class="card-text">{data['text']}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">2 players</small>
                                <a href="/{lang}/games/sexdice/sexdice.html" class="btn btn-primary">{data['btn']}</a>
                            </div>
                        </div>
                    </div>
                </div>
"""
    
    new_content = content[:insertion_point] + card_html + content[insertion_point:]
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Added card to {lang}/index.html")

for lang in languages:
    add_card_to_index(lang)

print("Card additions complete.")
