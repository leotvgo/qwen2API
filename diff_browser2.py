import re

with open('backend/legacy_qwen2api.py', 'r') as f:
    legacy = f.read()

with open('backend/core/browser_engine.py', 'r') as f:
    new = f.read()

def extract_func(text, func_name):
    match = re.search(r'async def ' + func_name + r'\s*\(.*?\)(?:.|\n)*?(?=async def |\Z|class )', text)
    return match.group(0) if match else None

print("LEGACY BROWSER:")
print(extract_func(legacy, '_new_browser'))
print("\nNEW BROWSER:")
print(extract_func(new, '_new_browser'))

