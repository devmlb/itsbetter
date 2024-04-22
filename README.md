
# ItsBetter

ItsBetter est une extension pour le navigateur Chrome (théoriquement tous les navigateurs basés sur chromium, mais ils ne sont pas testés) qui modifie l'apparence du [site Itslearning](https://itslearning.com/index.aspx), utilisé pour faire fonctionner de nombreux ENT. Cette extension a pour but d'apporter de la cohérence et de la praticité à l'interface.

## Installer l'extension

À venir...

## Contribuer au développement

### Charger la dernière version de l'extension à partir des sources

1.  Clonez le repo en entrant `git clone https://github.com/devmlb/itsbetter.git` dans un terminal ou avec l'application [GitHub Desktop](https://desktop.github.com/) 
2.  Accédez au [gestionnaire d'extensions de Chrome](chrome://extensions/)
3.  Activez le mode développeur en cliquant sur le bouton en haut à droite
4.  Cliquez sur `Charger l'extension non empaquetée` et sélectionnez le dossier où vous avez cloné le repo
5.  Félicitations ! L'extension est maintenant installée et active

### Faire des modifications

#### Ajouter des mods

 1. Créez les fichiers CSS et JS qui feront fonctionner votre mod dans le répertoire `mods/`
 2. Ajoutez un élément dans le fichier `available-mods.json` selon la structure suivante :
 
```json
[
	...
	{
		"id": "mod-float-perso-menu",
		"title": "Menu personnel flottant",
		"desc": "Transforme le menu personnel en menu flottant et unifie son apparence",
		"frame": "main",
		"default-state": true,
		"files": ["/mods/float-perso-menu.css"],
		"matches": ["https://*.itslearning.com/*"],
		"version": "v1.0",
		"hidden": false
	},
	...
]
```
- `id` : identifiant **unique** utilisé par le script de l'extension pour identifier votre mod
- `title` : titre de votre mod affiché dans le popup de l'extension
- `desc` : description de votre mod affichée dans le popup de l'extension
- `frame` : `main` pour que vos fichiers soient injectés dans la frame principale uniquement ou `all` pour qu'ils soient injectés dans toutes les frames (iframes)
- `default-state` : `true` pour que votre mod soit activé par défaut quand l'utilisateur installe l'extension ou la met à jour, ou au contraire `false`
- `files` : liste des chemins des fichiers CSS et/ou JS mélangés nécessaires pour faire fonctionner votre mod ; un chemin est de la forme `/mods/votre-fichier`  
*Note : le `/` initial n'est pas obligatoire*
- Facultatif *(non implémenté pour l'instant)* `matches` : la ou les URL pour lesquelles votre mod sera appliqué
- `version` : la version de votre mod affichée dans le popup de l'extension
- `hidden` : `true` pour que votre mod soit affiché dans le popup de l'extension, ou au contraire `false`

 3. Actualisez l'extension (**à chaque modification du fichier `available-mods.json`**) dans le [gestionnaire d'extensions de Chrome](chrome://extensions/) avec le bouton `Mettre à jour`
 4.  Modifiez vos fichiers de mods (une actualisation de la page suffit pour que les nouvelles modifications apparaissent)  
*Note 1 : vous pouvez vous aider des outils de développement (`Ctrl+Maj+i`) pour comprendre le fonctionnement interne d'Itslearning et repérer les classes/id des éléments que vous souhaitez modifier  
Note 2 : les fichiers injectés ne sont pour l'instant pas prioritaires dans l'ordre de chargement des ressources par le navigateur, il sera donc très souvent nécessaire d'ajouter `!important` dans vos règles CSS pour remplacer celles d'Itslearning*

#### Modifier le fonctionnement interne

Après avoir lu la [documentation du fonctionnement de l'extension](https://github.com/devmlb/itsbetter/wiki/Accueil), vous pouvez apporter des modifications pour l'améliorer. Une actualisation de l'extension dans le [gestionnaire d'extensions de Chrome](chrome://extensions/) avec le bouton `Mettre à jour` est **nécessaire à chaque changement, sauf pour les fichiers du popup**.

### Soumettre les modifications

 1. Créez une nouvelle branche dans le repo et poussez-y vos modifications
 2. Soumettez une pull request et attendez la réponse 
 3. Bravo, vous avez réussi ! :)