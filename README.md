# Système de mise à jour

Cette branche, déployée grâce à Github Pages, joue en quelque sorte le rôle d'API. L'extension fait des requêtes à `https://devmlb.github.io/itsbetter/` pour obtenir le fichier `release.json` et connaître la dernière version disponible ainsi que les notes de version.

### Procédure à suivre à chaque nouvelle publication

1. Mettre à jour la version dans `manifest.json`
2. Mettre à jour la version dans `release.json` et ajouter le résumé des modifications