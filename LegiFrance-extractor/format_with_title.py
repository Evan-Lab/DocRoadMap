def read_file_to_articles(filepath):
    with open(filepath, "r") as file:
        content = file.read()
    return content.strip().split("\n\n")


def parse_article_info(article):
    article_info = {}
    lines = article.strip().split("\n")
    for line in lines:
        if "[Numéro]" in line:
            article_info["numéro"] = line.split(" ")[-1]
        elif "[Contenu]" in line:
            article_info["contenu"] = line.split("[Contenu] ")[-1]
        elif "[UUID]" in line:
            article_info["uuid"] = line.split(" ")[-1]
        elif "[Tokens]" in line:
            article_info["tokens"] = line.split(" ")[-1]
        elif "[url]" in line:
            article_info["url"] = line.split(" ")[-1]
    return article_info


def find_article_title(numero_article, summary):
    for chapter, articles in summary.items():
        for article in articles:
            if numero_article in article:
                return chapter, article
    return None, None


def print_article_details(chapter, article_title, article_info):
    details = f"[Numéro] Article {article_info['numéro']}\n"
    details += f"[Chapitre] {chapter}\n"
    details += f"[Titre] {article_title}\n"
    details += f"[url] {article_info['url']}\n"
    details += f"[Contenu] {article_info['contenu']}\n"
    details += f"[UUID] {article_info['uuid']}\n"
    details += f"[Tokens] {article_info['tokens']}\n\n"
    return details


def process_articles(filepath, summary):
    articles = read_file_to_articles(filepath)
    article_dict = {
        article_info["numéro"]: article_info
        for article in articles
        if (article_info := parse_article_info(article))
    }
    processed_articles = set()

    with open("article_part_two_formatted.md", "w") as result_file:
        for numero_article, article_info in article_dict.items():
            if numero_article not in processed_articles:
                chapter, article_title = find_article_title(numero_article, summary)
                if article_title:
                    article_details = print_article_details(
                        chapter, article_title, article_info
                    )
                    result_file.write(article_details)
                    processed_articles.add(numero_article)
