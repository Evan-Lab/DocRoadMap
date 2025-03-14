
# import os
# import json
# import time
# import hashlib
import requests
from bs4 import BeautifulSoup
from utils import save_json_content

url_folder_list = [
    ("https://www.service-public.fr/particuliers/vosdroits/F14128", "output/folder1"),
    ("https://www.service-public.fr/particuliers/vosdroits/F601", "output/garde_enfants"),
]

def scrape_article_content(url):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            print(f"Failed to retrieve {url}")
            return None
        soup = BeautifulSoup(response.text, "html.parser")
        
        tabs = []
        tab = {"tab-title": "", "chapitres": []}

        for chapitres_div in soup.find_all(lambda tag: tag.name == "div" and (tag.get("data-module") == "chapitres" or tag.get("data-toggle-scope-seeall") == "chapters")):
            for chapter_div in chapitres_div.find_all("div", class_="sp-chapter"):
                chapter = {}
                chapter_title_span = chapter_div.find("span", class_="sp-chapter-btn-text")
                if chapter_title_span:
                    chapter["chapter-title"] = chapter_title_span.get_text(strip=True)
                
                chapter_content_div = chapter_div.find("div", class_="sp-chapter-content")
                if chapter_content_div:
                    chapter["chapter-description"] = chapter_content_div.get_text(separator=" ", strip=True)
                
                if chapter:
                    tab["chapitres"].append(chapter)

        if tab["chapitres"]:
            tabs.append(tab)

        # retourn données en tant que dictionnaire avec la clé "tab"
        return {"tab": tabs}
    except requests.RequestException as e:
        print(f"Error scraping {url}: {e}")
        return None

def run_script_no_tabs():
    for url, folder in url_folder_list:
        print(f"Processing {url}")
        data = scrape_article_content(url)
        if data is not None:
            save_json_content(url, folder, data)

# if __name__ == "__main__":
#     while True:
#         run_script()
#         time.sleep(3600)