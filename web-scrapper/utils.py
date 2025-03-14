# refacto le code, mettre celui que les autres fichiers ont en commun ici.

import os
import json
import hashlib
from bs4 import BeautifulSoup

def save_json_content(url, folder, data):
    # crée dossier sauvegarde si nécessaire
    os.makedirs(folder, exist_ok=True)
    filename = os.path.join(folder, hashlib.md5(url.encode()).hexdigest() + ".json")
    #nregistre json avec la clé "url" & les autres données (tab)
    with open(filename, "w", encoding="utf-8") as file:
        json.dump({"url": url, **data}, file, indent=4, ensure_ascii=False)
    print(f"Saved content from {url} to {filename}")
