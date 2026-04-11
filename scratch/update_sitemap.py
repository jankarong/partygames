import xml.etree.ElementTree as ET
import os

# Define namespace
ns = {
    'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9',
    'xhtml': 'http://www.w3.org/1999/xhtml'
}
ET.register_namespace('', ns['sm'])
ET.register_namespace('xhtml', ns['xhtml'])
ET.register_namespace('image', 'http://www.google.com/schemas/sitemap-image/1.1')

tree = ET.parse('sitemap.xml')
root = tree.getroot()

for url in root.findall('sm:url', ns):
    loc = url.find('sm:loc', ns).text
    
    # Skip if it already has ko
    if any(link.get('hreflang') == 'ko' for link in url.findall('xhtml:link', ns)):
        continue
    
    # We mainly care about game pages
    if '/games/' in loc:
        # Determine the base path after domain
        # Example: https://www.bestpartygames.net/games/TruthorDare/TruthOrDare
        # Base path: games/TruthorDare/TruthOrDare
        # Korean path: ko/games/TruthorDare/TruthOrDare
        
        parts = loc.split('.net/')
        if len(parts) > 1:
            raw_path = parts[1]
            # If it's already a localized path like 'ja/games/...', strip the lang
            if any(raw_path.startswith(l + '/') for l in ['zh', 'de', 'pt', 'id', 'ja', 'fr', 'ru', 'tr']):
                path_without_lang = raw_path[3:] if raw_path[2] == '/' else raw_path[4:] # handle 2 or 3 char lang codes
            else:
                path_without_lang = raw_path
            
            ko_url = f"https://www.bestpartygames.net/ko/{path_without_lang}"
            
            # Create the link element
            new_link = ET.Element('{http://www.w3.org/1999/xhtml}link', {
                'rel': 'alternate',
                'hreflang': 'ko',
                'href': ko_url
            })
            url.append(new_link)

# Save back
tree.write('sitemap_updated.xml', encoding='utf-8', xml_declaration=True)
