import re

with open("sample_folder.html", "r", encoding="utf-8") as f:
    html = f.read()

# Test regex patterns
pattern1 = re.findall(r'aria-label="([^"]+\.(?:png|jpg|jpeg|webp))[^"]*".*?ssk=[\'"]5:auSv138:([a-zA-Z0-9_-]+)-0-16[\'"]', html, re.DOTALL)
print(f"Pattern 1 matches: {len(pattern1)}")
for name, fid in pattern1:
    print(f"  {name} -> {fid}")

# Alternatively, search blocks
pattern2 = re.findall(r'<div class="JxSEve" aria-label="([^"]+)"[^>]+ssk=[\'"]5:auSv138:([a-zA-Z0-9_-]+)-0-16[\'"]', html)
print(f"Pattern 2 matches: {len(pattern2)}")
for name, fid in pattern2:
    print(f"  {name} -> {fid}")
