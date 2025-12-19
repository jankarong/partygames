#!/usr/bin/env python3
"""
Add Ezoic scripts to all HTML files in the project
"""

import os
import glob

# Ezoic scripts to add
EZOIC_SCRIPTS = """    <!-- Ezoic Privacy Scripts - Must load first -->
    <script data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js"></script>
    <script data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js"></script>

    <!-- Ezoic Header Script -->
    <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
    <script>
        window.ezstandalone = window.ezstandalone || {};
        ezstandalone.cmd = ezstandalone.cmd || [];
    </script>

"""

def add_ezoic_to_file(filepath):
    """Add Ezoic scripts to a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if Ezoic scripts already exist
        if 'ezoic/sa.min.js' in content or 'gatekeeperconsent.com' in content:
            print(f"[SKIP] Already has Ezoic: {filepath}")
            return 'skip'

        # Find <head> tag and add scripts right after it
        head_tag = '<head>'
        if head_tag not in content:
            print(f"[WARN] No <head> tag found in {filepath}")
            return False

        # Insert Ezoic scripts after <head> tag
        new_content = content.replace(head_tag, head_tag + '\n' + EZOIC_SCRIPTS, 1)

        # Write back to file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"[OK] Added Ezoic scripts to: {filepath}")
        return True

    except Exception as e:
        print(f"[ERROR] Processing {filepath}: {e}")
        return False

def main():
    # Get all HTML files in the project
    html_files = glob.glob('**/*.html', recursive=True)

    # Exclude certain files
    exclude_patterns = [
        'node_modules',
        '.git',
        'yandex_',  # Yandex verification file
        'floating-ad-example.html',  # Example file
        'styles/components/',  # Component examples
    ]

    filtered_files = []
    for file in html_files:
        if not any(pattern in file for pattern in exclude_patterns):
            filtered_files.append(file)

    print(f"Found {len(filtered_files)} HTML files to process\n")

    success_count = 0
    skip_count = 0
    error_count = 0

    for filepath in filtered_files:
        result = add_ezoic_to_file(filepath)
        if result is True:
            success_count += 1
        elif result == 'skip':
            skip_count += 1
        else:
            error_count += 1

    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  [OK] Successfully updated: {success_count} files")
    print(f"  [SKIP] Skipped (already had Ezoic): {skip_count} files")
    print(f"  [ERROR] Errors: {error_count} files")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
