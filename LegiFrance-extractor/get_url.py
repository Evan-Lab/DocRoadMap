from bs4 import BeautifulSoup


def find_article_id_in_html(article_name):
    """
    Find the ID of an article in an HTML content.

    Parameters:
    - html_content (str): The HTML content to search through.
    - article_name (str): The name of the article to find.

    Returns:
    - str: The ID of the article if found, otherwise a message indicating it was not found.
    """
    with open("data/ccp_urls.html", "r") as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, "html.parser")

    # Find all <a> tags that could contain the article
    potential_articles = soup.find_all(
        "a", class_="articleLink", text=lambda text: text and article_name in text
    )

    # Check if any articles matched the criteria
    if potential_articles:
        # Assuming the first match is the desired one
        article_id = potential_articles[0].get("id")
        return article_id if article_id else "Article ID not found."
    else:
        return "Article not found."
