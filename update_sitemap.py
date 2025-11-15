import xml.etree.ElementTree as ET
import re

# Read the current sitemap
with open('sitemap.xml', 'r', encoding='utf-8') as f:
    content = f.read()

# Register namespaces
namespaces = {
    'xhtml': 'http://www.w3.org/1999/xhtml',
    'image': 'http://www.google.com/schemas/sitemap-image/1.1'
}

for prefix, uri in namespaces.items():
    ET.register_namespace(prefix, uri)

# Parse the XML
tree = ET.parse('sitemap.xml')
root = tree.getroot()

# Remove the closing tag
content = content.replace('</urlset>', '')

# Iterate through existing entries to find patterns with PT
new_entries = []
for url_elem in list(root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url')):
    loc = url_elem.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text
    
    # If this is a Portuguese URL, create an Indonesian version
    if '/pt/' in loc:
        id_loc = loc.replace('/pt/', '/id/')
        lastmod = url_elem.find('{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod')
        changefreq = url_elem.find('{http://www.sitemaps.org/schemas/sitemap/0.9}changefreq')
        priority = url_elem.find('{http://www.sitemaps.org/schemas/sitemap/0.9}priority')
        
        new_entry = f'''    <url>
        <loc>{id_loc}</loc>
        <lastmod>{lastmod.text if lastmod is not None else '2025-11-15'}</lastmod>
        <changefreq>{changefreq.text if changefreq is not None else 'monthly'}</changefreq>
        <priority>{priority.text if priority is not None else '0.7'}</priority>
        <xhtml:link rel="alternate" hreflang="en" href="{loc.replace('/pt/', '/')}" />
        <xhtml:link rel="alternate" hreflang="pt" href="{loc}" />
        <xhtml:link rel="alternate" hreflang="id" href="{id_loc}" />
        <xhtml:link rel="alternate" hreflang="x-default" href="{loc.replace('/pt/', '/')}" />
    </url>
'''
        new_entries.append(new_entry)

# Also add hreflang="id" to existing Portuguese entries
updated_content = content

for url_elem in list(root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url')):
    loc = url_elem.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text
    
    if '/pt/' in loc:
        id_loc = loc.replace('/pt/', '/id/')
        # Find the xhtml:link entries
        old_pattern = f'        <xhtml:link rel="alternate" hreflang="x-default"'
        new_pattern = f'        <xhtml:link rel="alternate" hreflang="id" href="{id_loc}" />\n        <xhtml:link rel="alternate" hreflang="x-default"'
        
        updated_content = updated_content.replace(
            f'        <xhtml:link rel="alternate" hreflang="x-default" href="{loc.replace("/pt/", "/")}"',
            f'        <xhtml:link rel="alternate" hreflang="id" href="{id_loc}" />\n        <xhtml:link rel="alternate" hreflang="x-default" href="{loc.replace("/pt/", "/")}"'
        )

# Write back
with open('sitemap_new.xml', 'w', encoding='utf-8') as f:
    f.write(updated_content)
    for entry in new_entries:
        f.write(entry)
    f.write('</urlset>')

print(f"Created sitemap_new.xml with {len(new_entries)} new Indonesian entries")
