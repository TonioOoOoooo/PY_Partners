@echo off
rem Script d'automatisation Git pour votre projet

rem Afficher l'état actuel
git status

rem Demander un message de commit
set /p commit_message="Entrez votre message de commit : "

rem Ajouter tous les fichiers modifiés
git add -u

rem Demander si l'utilisateur veut ajouter les nouveaux fichiers images (sans les .old)
set /p add_new="Voulez-vous ajouter les nouveaux fichiers images? (o/n) "

if "%add_new%"=="o" (
  git add client/src/assets/*.jpg client/src/assets/*.png
)

rem Créer un commit avec le message fourni
git commit -m "%commit_message%"

rem Pousser les changements vers le dépôt distant
git push origin main

echo Changements commites et pousses avec succes!