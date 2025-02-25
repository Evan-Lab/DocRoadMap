import os

from extractor import extract_content_html_from_url

folder_name = "../data/legitFrance_articles_pages"
if not os.path.exists(folder_name):
    os.makedirs(folder_name)


def download_legitFrance_articles():
    urls = [
        "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000043310341",
        "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000043310613",
        "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000043310421",
        "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000043310523",
        "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000043310689",
        "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000043310778",
    ]

    for url in urls:
        content = extract_content_html_from_url(url)
        file_name = url.split("/")[-1]
        file_path = os.path.join(folder_name, f"{file_name}.html")

        with open(file_path, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Content saved for {url} in {file_path}")
