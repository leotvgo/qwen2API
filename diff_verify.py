import re

with open('backend/legacy_qwen2api.py', 'r') as f:
    legacy = f.read()

with open('backend/services/qwen_client.py', 'r') as f:
    new = f.read()

def extract_func(text, func_name):
    match = re.search(r'async def ' + func_name + r'\s*\(.*?\)(?:.|\n)*?(?=async def |\Z|def )', text)
    return match.group(0) if match else None

print("LEGACY VERIFY:")
print(extract_func(legacy, 'verify_token'))
print("\nNEW VERIFY:")
print(extract_func(new, 'verify_token'))

