import re

with open('/tmp/qwen2api_dev.py', 'r') as f:
    dev = f.read()

with open('backend/services/auth_resolver.py', 'r') as f:
    new = f.read()

def extract_func(text, func_name):
    match = re.search(r'async def ' + func_name + r'\s*\(.*?\)(?:.|\n)*?(?=async def |\Z|class )', text)
    return match.group(0) if match else None

print("DEV REFRESH:")
print(extract_func(dev, 'refresh_token'))
print("\nNEW REFRESH:")
print(extract_func(new, 'refresh_token'))

print("DEV ACTIVATE:")
print(extract_func(dev, 'activate_account'))
print("\nNEW ACTIVATE:")
print(extract_func(new, 'activate_account'))

