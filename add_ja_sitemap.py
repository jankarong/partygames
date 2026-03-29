import xml.etree.ElementTree as ET
import os

# Register namespaces
ET.register_namespace('', "http://www.sitemaps.org/schemas/sitemap/0.9")
ET.register_namespace('xhtml', "http://www.w3.org/1999/xhtml")
ET.register_namespace('image', "http://www.google.com/schemas/sitemap-image/1.1")

# Namespaces for parsing
ns = {
    'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9',
    'xhtml': 'http://www.w3.org/1999/xhtml',
    'image': 'http://www.google.com/schemas/sitemap-image/1.1'
}

sitemap_path = 'sitemap.xml'
tree = ET.parse(sitemap_path)
root = tree.getroot()

# Languages already in the sitemap
langs = ['en', 'zh', 'de', 'fr', 'pt', 'id', 'ru', 'tr']
all_langs = langs + ['ja']

# Helper to build a localized URL from an English one
def get_localized_url(en_url, lang):
    if lang == 'en':
        return en_url
    return en_url.replace('https://www.bestpartygames.net/', f'https://www.bestpartygames.net/{lang}/')

# 1. Update existing <url> blocks to include hreflang="ja"
for url_elem in root.findall('sm:url', ns):
    loc_elem = url_elem.find('sm:loc', ns)
    if loc_elem is None: continue
    loc = loc_elem.text
    
    # Base URL (remove lang prefix)
    base_url = loc
    for l in langs:
        if f'/{l}/' in loc:
            base_url = loc.replace(f'/{l}/', '/')
            break
    
    ja_url = get_localized_url(base_url, 'ja')
    
    # Find the last xhtml:link to insert after, or just at the end
    links = url_elem.findall('xhtml:link', ns)
    # Check if 'ja' link already exists
    has_ja = any(l.get('hreflang') == 'ja' for l in links)
    
    if not has_ja:
        # Create the 'ja' alternate link
        new_link = ET.Element('{http://www.w3.org/1999/xhtml}link', {
            'rel': 'alternate',
            'hreflang': 'ja',
            'href': ja_url
        })
        # Try to insert it before 'x-default' or at the end
        inserted = False
        for i, link in enumerate(list(url_elem)):
            if link.get('hreflang') == 'x-default':
                url_elem.insert(i, new_link)
                inserted = True
                break
        if not inserted:
            url_elem.append(new_link)

# 2. Add full <url> entries for Japanese versions of all games
# Let's collect all current unique English URLs to duplicate for JA
en_urls = set()
for url_elem in root.findall('sm:url', ns):
    loc_elem = url_elem.find('sm:loc', ns)
    if loc_elem is None: continue
    loc = loc_elem.text
    
    # If it's an English URL (no lang prefix in middle of path)
    # Actually, let's just use English entries as templates
    if not any(f'/{l}/' in loc for l in langs) and 'bestpartygames.net/games/' in loc:
        en_urls.add(loc)

# Create new JA entries
new_ja_entries = []
for en_url in sorted(en_urls):
    # Skip if JA entry already exists (though we know it doesn't from previous search)
    ja_loc = get_localized_url(en_url, 'ja')
    
    # Create the element
    url_elem = ET.Element('{http://www.sitemaps.org/schemas/sitemap/0.9}url')
    
    loc_node = ET.SubElement(url_elem, '{http://www.sitemaps.org/schemas/sitemap/0.9}loc')
    loc_node.text = ja_loc
    
    lastmod = ET.SubElement(url_elem, '{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod')
    lastmod.text = '2026-03-29' # Use today's date
    
    changefreq = ET.SubElement(url_elem, '{http://www.sitemaps.org/schemas/sitemap/0.9}changefreq')
    changefreq.text = 'monthly'
    
    priority = ET.SubElement(url_elem, '{http://www.sitemaps.org/schemas/sitemap/0.9}priority')
    priority.text = '0.7'
    
    # Add alternate links for ALL languages
    for lang in all_langs:
        link = ET.Element('{http://www.w3.org/1999/xhtml}link', {
            'rel': 'alternate',
            'hreflang': lang,
            'href': get_localized_url(en_url, lang)
        })
        url_elem.append(link)
    
    # Add x-default
    link = ET.Element('{http://www.w3.org/1999/xhtml}link', {
        'rel': 'alternate',
        'hreflang': 'x-default',
        'href': en_url
    })
    url_elem.append(link)
    
    new_ja_entries.append(url_elem)

# Append new JA entries to root
for entry in new_ja_entries:
    root.append(entry)

# Write out
tree.write('sitemap_updated.xml', encoding='utf-8', xml_declaration=True)

print(f"Added 'ja' alternate links to existing entries and created {len(new_ja_entries)} new Japanese URL entries.")
