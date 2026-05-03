
import datetime

languages = ['en', 'zh', 'de', 'fr', 'pt', 'id', 'ja', 'ko', 'ru', 'tr']
base_path = "games/custom-dice-online/customdice.html"
today = datetime.date.today().strftime('%Y-%m-%d')

entries = []

for lang in languages:
    if lang == 'en':
        loc = f"https://www.bestpartygames.net/{base_path}"
    else:
        loc = f"https://www.bestpartygames.net/{lang}/{base_path}"
    
    entry = f"    <url>\n        <loc>{loc}</loc>\n        <lastmod>{today}</lastmod>\n        <changefreq>monthly</changefreq>\n        <priority>0.8</priority>\n"
    
    for link_lang in languages:
        if link_lang == 'en':
            link_loc = f"https://www.bestpartygames.net/{base_path}"
        else:
            link_loc = f"https://www.bestpartygames.net/{link_lang}/{base_path}"
        entry += f'        <xhtml:link rel="alternate" hreflang="{link_lang}" href="{link_loc}" />\n'
    
    # Add x-default
    entry += f'        <xhtml:link rel="alternate" hreflang="x-default" href="https://www.bestpartygames.net/{base_path}" />\n'
    
    # Add image if possible
    entry += f'        <image:image>\n            <image:loc>https://www.bestpartygames.net/games/custom-dice-online/logo.png</image:loc>\n            <image:title>Custom Dice Online</image:title>\n        </image:image>\n'
    
    entry += "    </url>"
    entries.append(entry)

# Read existing sitemap
with open('sitemap.xml', 'r', encoding='utf-8') as f:
    content = f.read()

# Insert before closing </urlset>
if '</urlset>' in content:
    new_content = content.replace('</urlset>', '\n'.join(entries) + '\n</urlset>')
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully added 10 entries to sitemap.xml")
else:
    print("Error: </urlset> not found in sitemap.xml")
