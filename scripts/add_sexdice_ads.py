import os
import re

ad_code = """
        <!-- CPM Ad -->
        <div class="ad-container" style="text-align: center; margin: 20px 0;">
            <script async="async" data-cfasync="false" src="https://pl29199478.profitablecpmratenetwork.com/1df601ac779740f132fda243dd2df14a/invoke.js"></script>
            <div id="container-1df601ac779740f132fda243dd2df14a"></div>
        </div>
"""

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'container-1df601ac779740f132fda243dd2df14a' in content:
        print(f"Ad already exists in {filepath}")
        return

    # Try different markers
    markers = [
        '<section id="result" class="result"></section>',
        '<div class="result" id="result"></div>'
    ]
    
    found = False
    for marker in markers:
        if marker in content:
            new_content = content.replace(marker, marker + ad_code)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Added ad to {filepath}")
            found = True
            break
    
    if not found:
        print(f"Marker not found in {filepath}")

# Find all sexdice.html files
base_dir = '/Users/janka/Documents/GitHub/partygames'
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file == 'sexdice.html':
            process_file(os.path.join(root, file))
