@echo off

rem Récupérer le nom de la branche courante
for /f "tokens=*" %%a in ('git rev-parse --abbrev-ref HEAD') do set current_branch=%%a

echo Branche actuelle: %current_branch%
echo.

:branch_choice
set /p target_branch="Sur quelle branche souhaitez-vous pousser? (1: STAGING, 2: MAIN): "

if "%target_branch%"=="1" (
    set branch_name=staging
) else if "%target_branch%"=="2" (
    set branch_name=main
) else (
    echo Option non valide. Veuillez choisir 1 pour STAGING ou 2 pour MAIN.
    goto branch_choice
)

echo Vous avez choisi de pousser sur la branche: %branch_name%
echo.

rem Générer le sitemap automatiquement
echo Generation du sitemap...
node .\scripts\generate-sitemap.js

rem Afficher l'état actuel
git status

rem Demander un message de commit
set /p commit_message="Entrez votre message de commit : "

rem Ajouter tous les fichiers (nouveaux, modifiés, supprimés)
git add -A

rem Créer un commit avec le message fourni
git commit -m "%commit_message%"

rem Pousser les changements vers le dépôt distant
git push origin %branch_name%

echo Changements committés et poussés avec succès sur la branche %branch_name%!
pause