import requests
from bs4 import BeautifulSoup


def extract_links_from_url(url: str) -> list:
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    links = soup.find_all("a")
    extracted_links = []

    for link in links:
        href = link.get("href")
        if href is not None:
            extracted_links.append(href)
    return extracted_links


def extract_content_html_from_url(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    content = str(soup)
    return content
