import re
import json

with open("sample_folder.html", "r", encoding="utf-8") as f:
    html = f.read()

# Look for image extensions or file patterns
img_names = re.findall(r'[\w\-_\.]+\.(?:jpg|jpeg|png|webp)', html, re.I)
print("Image filenames found:", set(img_names))

# Google Drive folder pages usually embed an initial data array like window['_DRIVE_ivd'] or similar JS arrays
# Let's search for drive IDs or json arrays
matches = re.findall(r'(\[[^\[\]]*\.(?:jpg|jpeg|png|webp)[^\[\]]*\])', html, re.I)
print(f"Matches count with img ext: {len(matches)}")
for m in matches[:10]:
    print("Match snippet:", m[:200])

# Also look for file IDs (33 chars alphanumeric)
id_matches = re.findall(r'["\']([a-zA-Z0-9_-]{28,35})["\']', html)
print(f"Candidate IDs found: {len(id_matches)}")

# Search for patterns where filename and ID are close together
for fname in set(img_names):
    idx = html.find(fname)
    if idx != -1:
        snippet = html[max(0, idx-200): min(len(html), idx+300)]
        print(f"\n--- Context for {fname} ---")
        print(repr(snippet))
