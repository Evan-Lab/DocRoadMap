import os
import uuid

from bs4 import BeautifulSoup
from llmax.llms import tokens


def generate_uuid():
    unique_id = str(uuid.uuid4())
    return unique_id


def write_article(file, title, link, content, id):
    my_token = tokens.count(title) + tokens.count(content)
    file.write(f"[Numéro] {title}\n")
    file.write(f"[url] {link}\n")
    file.write(f"[Contenu] {content}\n")
    file.write(f"[UUID] {id}\n")
    file.write(f"[Tokens] {my_token}\n\n")


def extract_article_data(article):
    base_url = "https://www.legifrance.gouv.fr"
    title_element = (
        article.find("p", class_="name-article").find("a")
        if article.find("p", class_="name-article")
        else None
    )
    content_element = article.find("div", class_="content")
    article_link = (
        f"{base_url}{article.find('a', href=True)['href']}"
        if article.find("a", href=True)
        else None
    )

    if title_element and content_element:
        title = title_element.text.strip()
        content = content_element.text.strip()
        return title, article_link, content
    else:
        return None, None, None


def decide_file_output(title, summary_found):
    if title == "Article":
        return "summary", True
    elif summary_found:
        return "after", summary_found
    else:
        return "before", summary_found


def process_articles(articles, summary_found, file_before, file_after):
    for article in articles:
        title, article_link, content = extract_article_data(article)
        if title:
            file_decision, summary_found = decide_file_output(title, summary_found)
            if file_decision == "summary":
                file_after.write("[Sommaire] ")
                file_after.write(f"{content}\n\n")
            elif file_decision == "after":
                id = generate_uuid()
                write_article(file_after, title, article_link, content, id)
            elif file_decision == "before":
                id = generate_uuid()
                write_article(file_before, title, article_link, content, id)
    return summary_found


def extract_articles_from_file(input_file):
    data_folder = "../data"

    with open(input_file, "r") as file:
        soup = BeautifulSoup(file, "html.parser")

    articles = soup.select("article")
    summary_preface = soup.find("div", class_="summary-preface")

    with open(
        os.path.join(data_folder, "CCAG_article_format1.md"), "w", encoding="utf-8"
    ) as file_before, open(
        os.path.join(data_folder, "CCAG_article_format2.md"), "w", encoding="utf-8"
    ) as file_after:
        if summary_preface:
            summary_content = summary_preface.find_all("p")[0].text.strip()
            file_before.write(f"[Préface] {summary_content}\n\n")

        process_articles(articles, False, file_before, file_after)