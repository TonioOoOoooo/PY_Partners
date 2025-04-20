@echo off
rem Script d'automatisation Git pour votre projet

rem Afficher l'état actuel
git status

rem Demander un message de commit
set /p commit_message="Entrez votre message de commit : "

rem Ajouter tous les fichiers modifiés
git add -u

rem Demander si l'utilisateur veut ajouter les nouveaux fichiers
set /p add_new="Voulez-vous ajouter les nouveaux fichiers? (o/n) "

if "%add_new%"=="o" (
  git add .
)

rem Créer un commit avec le message fourni
git commit -m "%commit_message%"

rem Pousser les changements vers le dépôt distant
git push origin main

echo Changements commités et poussés avec succès!