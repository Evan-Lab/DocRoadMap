from articles_extractor import extract_articles_from_file
from downloader import download_legitFrance_articles
from format_with_title import process_articles
from md_additionner import md_additionner

summary = {
    "CHAPITRE 1ER : GÉNÉRALITÉS": [
        "Article 1er : Champ d'application",
        "Article 2 : Définitions",
        "Article 3 : Obligations générales des parties",
        "Article 4 : Pièces contractuelles",
        "Article 5 : Confidentialité - Protection des données personnelles - Mesures de sécurité",
        "Article 6 : Protection de la main-d'œuvre et conditions de travail",
        "Article 7 : Protection de l'environnement, sécurité et santé",
        "Article 8 : Réparation des dommages",
        "Article 9 : Assurances",
    ],
    "CHAPITRE 2 : PRIX ET RÈGLEMENT": [
        "Article 10 : Prix",
        "Article 11 : Précisions sur les modalités de règlement",
        "Article 12 : Règlement en cas de groupement d'opérateurs économiques ou de sous-traitance",
    ],
    "CHAPITRE 3 EXÉCUTION ET PÉRIMÈTRE DES PRESTATIONS": [
        "Article 13 : Engagements du maître d'œuvre",
        "Article 14 : Prestations supplémentaires ou modificatives",
        "Article 15 : Délai d'exécution",
        "Article 16 : Pénalités",
        "Article 17 : Primes",
        "Article 18 : Développement durable",
        "Article 19 : Moyens mis à la disposition du maître d'œuvre",
    ],
    "CHAPITRE 4 : CONSTATATION DE L'EXÉCUTION DES PRESTATIONS": [
        "Article 20 : Opérations de vérification",
        "Article 21 : Admission en l'état ou avec observations, ajournement, réfaction et rejet",
    ],
    "CHAPITRE 5 : UTILISATION DES RÉSULTATS": [
        "Article 22 : Définitions",
        "Article 23 : Régime des connaissances antérieures",
        "Article 24 : Régime des droits de propriété intellectuelle ou des droits de toute autre nature relatifs aux résultats",
    ],
    "CHAPITRE 6 : INTERRUPTION ET SUSPENSION DES PRESTATIONS - RÉSILIATION": [
        "Article 25 : Interruption et suspension des prestations",
        "Article 26 : Clause de réexamen",
        "Article 27 : Résiliation - Principes généraux",
        "Article 28 : Résiliation pour événements extérieurs au marché",
        "Article 29 : Résiliation pour événements liés au marché",
        "Article 30 : Résiliation pour faute du maître d'œuvre",
        "Article 31 : Résiliation pour motif d'intérêt général",
        "Article 32 : Décompte de résiliation",
        "Article 33 : Remise des prestations et des moyens matériels permettant l'exécution du marché",
        "Article 34 : Exécution des prestations aux frais et risques du maître d'œuvre",
    ],
    "CHAPITRE 7 : DIFFÉRENDS": [
        "Article 35 : Règlement des différends entre les parties"
    ],
}

if __name__ == "__main__":
    download_legitFrance_articles()
    extract_articles_from_file(
        "../data/legitFrance_articles_pages/JORFTEXT000043310778.html"
    )
    print("Extraction finished")
    process_articles("../data/CCAG_article_format2.md", summary)
    print("Processing finished")
    md_additionner(
        "../data/CCAG_article_format1.md",
        "article_part_two_formatted.md",
        "format_CCAG.md",
    )
    print("CCAG formatting end")
