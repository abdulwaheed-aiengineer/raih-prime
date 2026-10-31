import urllib.request
import re
import json

url = 'https://drive.google.com/drive/folders/1_aYqqyanTIIk41W9ffAXSzeNwoGMH0Mx'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print(f"HTML len: {len(html)}")
        with open("sample_folder.html", "w", encoding="utf-8") as f:
            f.write(html)
        print("Wrote sample_folder.html")
except Exception as e:
    print(f"Error: {e}")
