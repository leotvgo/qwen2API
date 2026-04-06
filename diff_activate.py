import re

with open('backend/legacy_qwen2api.py', 'r') as f:
    legacy = f.read()

with open('backend/services/auth_resolver.py', 'r') as f:
    new = f.read()

def extract_func(text, func_name):
    match = re.search(r'async def ' + func_name + r'\s*\(.*?\)(?:.|\n)*?(?=async def |\Z)', text)
    return match.group(0) if match else None

print("LEGACY ACTIVATE:")
print(extract_func(legacy, 'activate_account'))
print("\nNEW ACTIVATE:")
print(extract_func(new, 'activate_account'))

