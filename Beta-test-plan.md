# Beta Test Plan – DocRoadMap

## Équipe

- **Baptiste Perard**
- **Evan Labourdette**
- **Julia Tran**
- **Nadia Moulouad**

---

## 1. Contexte

DocRoadMap est une solution composée d'une application mobile et d'une extension web, toutes deux faciles, claires et intuitives, assistées par un chatbot basé sur **Llama 3.2**. Pour garantir la fiabilité, les données proviennent exclusivement de sources gouvernementales. L'application mobile et l'extension web peuvent être utilisées indépendamment ou conjointement pour tirer pleinement parti des avantages de la solution.

Notre solution inclut également :

- Un guide personnalisé pour effectuer vos démarches en fonction de votre situation personnelle.
- Des illustrations.
- Des rappels de dates critiques.
- Une interface multilingue.
- Deux chatbots uniques.
- Un respect rigoureux des critères d’accessibilité (**WCAG** et **RGAA**).
- D’autres fonctionnalités détaillées plus loin dans le document.

Le guide visuel, interactif et détaillé assiste l’utilisateur étape par étape dans toutes ses démarches. Il est généré et adapté à la démarche entreprise et à la situation personnelle via une série de questions/réponses.

Un des chatbots sera également présent afin d'assister les utilisateurs dans leurs questions sur les étapes de la procédure ou pour toute incompréhension liée aux démarches.

L’étape actuelle marque le passage à la **version bêta**, où l’objectif est de tester et valider les fonctionnalités essentielles avant un déploiement plus large axé vers l’intégration de Llama 3.2.

---

## 2. Objectifs

Le Beta Test Plan a pour but de :

✅ Vérifier la **stabilité et l’efficacité** des fonctionnalités critiques.

✅ S’assurer que l’**expérience utilisateur** est fluide et
intuitive.

✅ Tester l’**intégration et la pertinence** du chatbot avec l’intégration de Llama 3.2.

✅ Identifier les **bugs et points d’amélioration** avant le passage en production.

---

## 3. Fonctionnalités Clés pour la Bêta

Les tests porteront sur les fonctionnalités suivantes :

- **Authentification** : Connexion et déconnexion sécurisées.
- **Gestion du profil** : Accès et modification des informations personnelles.
- **Navigation en carrousel** : Présentation des étapes sous forme de cartes interactives.
- **Carte démarche individuelle** : Vision globale de toutes les étapes de la démarche, où chaque étape est cliquable pour accéder à ses détails spécifiques, avec une barre de progression permettant de visualiser l'avancement dans le parcours.
- **Chatbot IA (Mistral)** : Assistance pour répondre aux questions des utilisateurs sur les démarches.
- **Création et gestion des démarches** : Utilisation de l’intelligence artificielle pour permettre la création de démarches administratives personnalisées.
- **Accessibilité** : Vérification du respect des standards **WCAG/RGAA**.
- **Rappel**: Notification de deadlines pour les démarches en cours de l’utilisateur

---

## 4. Scénarios de Test

### 4.1 Connexion et Déconnexion

- **Utilisateur** : Tout utilisateur
- **Objectif** : Vérifier que l’authentification fonctionne correctement
- **Priorité** : Medium
- **Étapes** :
  1. Accéder à la page de connexion.
  2. Saisir un email et un mot de passe valides.
  3. Recevoir un mail de vérification.
  4. Cliquer sur le lien pour valider le profil.
  5. Se connecter et accéder au profil.
  6. Se déconnecter et vérifier le retour à l’écran d’accueil.
- ✅ **Résultat attendu** : Connexion/déconnexion sans bug, messages d’erreur clairs si les identifiants sont incorrects.

### 4.2 Création d’une démarche administrative

- **Utilisateur** : Utilisateur connecté
- **Objectif** : Vérifier que Mistral peut créer une démarche sans erreur
- **Priorité** : Very High
- **Étapes** :
  1. Accéder à l’interface de création de démarche (chatbot).
  2. Renseigner la démarche souhaitée (ex: Déclaration de Revenue).
  3. Répondre aux questions posées par l’IA et vérifier qu’elle cible bien la situation personnelle.
  4. Aller sur la page des démarches.
  5. Vérifier que la démarche a bien été ajoutée ainsi que ses étapes.
- ✅ **Résultat attendu** : La démarche est bien enregistrée et affichée dans l’application et correspond à la situation de l’utilisateur.

### 4.3 Navigation dans le Carrousel de Cartes

- **Utilisateur** : Utilisateur connecté
- **Objectif** : Vérifier l’affichage et la fluidité du carrousel
- **Priorité** : Medium
- **Étapes** :
  1. Ouvrir le menu home pour observer le carrousel.
  2. Naviguer entre les différentes procédures via le carrousel.
  3. Vérifier l’ajout de supports visuels (illustrations, icônes).
- ✅ **Résultat attendu** : Affichage fluide, pas de latence ni de crash.

### 4.4 Carte démarche individuelle

- **Utilisateur** : Utilisateur connecté
- **Objectif** : Vérifier la visualisation et l'interactivité de la carte de démarche
- **Priorité** : Medium
- **Étapes** :
  1. Accéder à la section affichant la carte de démarche individuelle
  2. Observer la présentation visuelle des différentes étapes de la démarche
  3. Cliquer sur chaque étape pour vérifier l'affichage des détails correspondants
  4. L’utilisateur peut valider les démarches et programmer ses propres deadlines/rappel
  5. Vérifier que la barre d'avancement reflète correctement la progression dans le parcours
     ✅ **Résultat attendu** : Affichage clair de toutes les étapes, fonctionnalité cliquable opérationnelle, barre de progression précise

### 4.5 Chatbot AI Llama 3.2

- **Utilisateur** : Utilisateur connecté
- **Objectif** : Tester la fiabilité de Mistral sur les démarches administratives
- **Priorité** : High
- **Étapes** :
  1. Poser une question sur une démarche administrative.
  2. Vérifier la qualité et la clarté de la réponse.
- ✅ **Résultat attendu** : Réponse précise et adaptée à la demande.

### 4.6 Accessibilité sur des pages web

- **Utilisateur** : Utilisateur connecté
- **Objectif** : Vérifier que les pages web sont modifiées pour respecter la WCAG et la RGAA à partir de l’extension web
- **Priorité** : High
- **Étapes** :
  1. Se rendre sur une page web et activer l’extension web.
  2. Cliquer sur le bouton accessibilité.
  3. Cliquer ensuite sur le bouton “Rendre accessible la page web”.
  4. Vérifier que la page est compatible avec les appareils audio.
  5. Vérifier que le texte présent sur la page a été adapté : taille, espacement.
- ✅ **Résultat attendu** : La page web doit être modifiée, avec des textes plus gros, des descriptions ajoutées aux images et des descriptions pouvant être lues par les appareils audio.

### 4.7 Accessibilité sur l’application mobile

- **Utilisateur** : Utilisateur connecté
- **Objectif** : Vérifier que l’application mobile respecte les normes WCAG et RGAA, et s’adapte aux paramètres d’accessibilité personnels de l’utilisateur
- **Priorité** : High
- **Étapes** :
  1. Accéder aux paramètres d’accessibilité du téléphone (taille de police).
  2. Ouvrir l’application mobile DocRoadMap.
  3. Vérifier que :
     - La taille du texte s’ajuste correctement sans casser la mise en page.
     - Le contraste des couleurs respecte les standards WCAG (niveau AA minimum).
     - La compatibilité avec VoiceOver (iOS) ou TalkBack (Android) est assurée.
     - La navigation est claire et intuitive grâce aux assistances vocales.
     - La possibilité de changer de thème d’écran (mode clair/sombre) fonctionne sans altérer la lisibilité ou dégrader l’expérience utilisateur.
- ✅ **Résultat attendu** : L’application s’adapte aux paramètres d’accessibilité sans perte de fonctionnalités ou d’informations.

## 4.8 Rappel / Notification de deadlines

- **Utilisateur** : Utilisateur connecté
- **Objectif** : Vérifier le système de notification pour les échéances des démarches
- Priorité\*\* : Low
- **Étapes** :
  1. Accéder à la section des démarches en cours
  2. Pouvoir voir les notifications pour les deadlines approchantes
  3. Vérifier la présence et la clarté des rappels pour les démarches ayant des échéances
  4. Tester la réception des notifications à différents moments (J-7, J-3, J-1, etc.)
     ✅ Résultat attendu : Notifications claires et opportunes des deadlines, alerte visible pour l'utilisateur, information précise sur les délais restants.

---

## 5. Problèmes connus et limitations

### 🖥️ Environnement partagé pour l’IA

- Une **VM** plus puissante est nécessaire pour disposer d’un environnement partagé permettant de lancer et tester l’IA Llama 3.2. Actuellement les tests avec Llama 3.2 semblent concluants mais prennent trop de temps en environnement de développement local.

### ❓ Fiabilité de l’IA

- Malgré le RAG ou les prompts une IA générative peut faire des hallucinations (des erreurs) et ne pas répondre correctement aux différentes situations rencontrées.
- Question sur des démarches
- Génération des roadmaps
- Adapté les questions à la situation personnelles
- La récupération des bonnes sources de connaissance est aussi nécessaires dépendant de notre configuration du RAG pour permettre les réponses les plus adaptées possible de notre IA.

### ♿ Accessibilité

- Nos Informations sont encore incomplètes vis-à-vis de la mise en oeuvre des solutions d’accessibilité (recours possible à des logiciels de repérage d’erreurs d’accessibilité, usage d’IA pour modifier les ALT aux descriptions incomplètes sur les images des sites webs, etc.)

---

## 6. Critères de Validation

Une fonctionnalité est validée si :

✅ Elle fonctionne **sans crash ni bug critique**.

✅ L’**expérience utilisateur** est fluide et intuitive.

✅ Les tests de **performance et d’accessibilité** sont concluants.

✅ Les **retours des testeurs** confirment l’utilisabilité du service.

---

## 7. Deliverables & Format

📄 **Documentation** : Rapport de test détaillé.

📊 **Suivi du projet** : **Linear** sera utilisé pour le suivi des features, tests et bugs.

---

## 8. Résultats Attendus

✅ Confirmer la stabilité des fonctionnalités essentielles.

✅ Détecter et corriger les **bugs et incohérences UX/UI**.

✅ Améliorer l’**expérience utilisateur** grâce aux retours des testeurs.

✅ Établir une **base de référence** pour le suivi du projet.

✅ Valider **l’intégration de Llama 3.2** et la pertinence des réponses générées.

✅ Préparer la **transition vers la phase de test élargie** et l’optimisation finale.
