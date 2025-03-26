import requests
from bs4 import BeautifulSoup
from utils import save_json_content

# une liste a compléter avec les url des pages a scrapper et le dossier dans lequel on met son contenu quand on a fini.
url_folder_list = [
    ("https://www.service-public.fr/particuliers/vosdroits/F15913", "output/jachete_un_logement"),
    ("https://www.service-public.fr/particuliers/vosdroits/F34635", "output/je_pars_de_chez_mes_parents"),
    ("https://www.service-public.fr/particuliers/vosdroits/F17556", "output/recherche-emploi"),
    ("https://www.service-public.fr/particuliers/vosdroits/F1427", "output/acte_naissance")
]

def scrape_article_content(url):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            print(f"Failed to retrieve {url}")
            return None
        soup = BeautifulSoup(response.text, "html.parser")
        
        tabs = []
        tabpanel_elements = soup.find_all("div", role="tabpanel")
        
        if tabpanel_elements:
            for tabpanel in tabpanel_elements:
                tab = {"tab-title": None, "chapitres": []}
                for h2 in tabpanel.find_all("h2"):
                    tab["tab-title"] = h2.get_text(strip=True)
                
                for chapitres_div in tabpanel.find_all(lambda tag: tag.name == "div" and (tag.get("data-module") == "chapitres" or tag.get("data-toggle-scope-seeall") == "chapters")):
                    for chapter_div in chapitres_div.find_all("div", class_="sp-chapter"):
                        chapter = {}
                        chapter_title_span = chapter_div.find("span", class_="sp-chapter-btn-text")
                        if chapter_title_span:
                            chapter["chapter-title"] = chapter_title_span.get_text(strip=True)
                        
                        chapter_content_div = chapter_div.find("div", class_="sp-chapter-content")
                        if chapter_content_div:
                            # Vérifier si un div avec data-id = "parent-choice-tree" existe
                            choice_tree_div = chapter_content_div.find('div', attrs={"data-id": "parent-choice-tree"})
                            # print(choice_tree_div)
                            if choice_tree_div:
                                # on init un tableau de possibilités
                                possibilities = []
                                
                                # on trouve ts les titres
                                titles = choice_tree_div.find_all('h4', attrs={"data-immutable-choice-tree": "title"}) 
                                
                                # on trouve tt les contenus de résultat
                                contents = choice_tree_div.find_all('div', class_="choice-tree-item-content")
                                
                                # debugage
                                print(f"Found choice tree with {len(titles)} titles and {len(contents)} contents")
                                
                                # on crée objet pour chaque possibilité
                                for i in range(min(len(titles), len(contents))):
                                    possibility = {
                                        "possibility-title": titles[i].get_text(strip=True),
                                        "possibility-content": contents[i].get_text(separator=" ", strip=True)
                                    }
                                    possibilities.append(possibility)
                                
                                # on definie chapter-description comme un tableau de possibilités
                                if possibilities:
                                    chapter["chapter-description"] = {"possibilities": possibilities}
                                else:
                                    #si possibilité trouvée, reveretour au comportement par défaut
                                    chapter["chapter-description"] = chapter_content_div.get_text(separator=" ", strip=True)
                            else:
                                # Format texte standard (comportement actuel)
                                chapter["chapter-description"] = chapter_content_div.get_text(separator=" ", strip=True)
                      
                        if chapter:
                            tab["chapitres"].append(chapter)
                if tab["tab-title"] or tab["chapitres"]:
                    tabs.append(tab)
        return {"tab": tabs}
    except requests.RequestException as e:
        print(f"Error scraping {url}: {e}")
        return None

def run_script_with_tabs():
    for url, folder in url_folder_list:
        print(f"Processing {url}")
        data = scrape_article_content(url)
        if data is not None:
            save_json_content(url, folder, data)
