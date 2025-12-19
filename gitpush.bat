@echo off
chcp 65001 >nul

rem Recuperer le nom de la branche courante
for /f "tokens=*" %%a in ('git rev-parse --abbrev-ref HEAD') do set currentbranch=%%a
echo Branche actuelle: %currentbranch%
echo.

:branchchoice
set /p targetbranch=Sur quelle branche souhaitez-vous pousser? (1: STAGING, 2: MAIN): 
if "%targetbranch%"=="1" (
    set branchname=staging
) else if "%targetbranch%"=="2" (
    set branchname=main
) else (
    echo Option non valide. Veuillez choisir 1 pour STAGING ou 2 pour MAIN.
    goto branchchoice
)

echo Vous avez choisi de pousser sur la branche: %branchname%
echo.

rem Si on n'est pas sur la bonne branche, proposer de checkout
if not "%currentbranch%"=="%branchname%" (
    echo ATTENTION: Vous etes sur la branche %currentbranch% mais voulez pousser sur %branchname%
    echo Changement de branche vers %branchname%...
    git checkout %branchname%
    if errorlevel 1 (
        echo Erreur lors du changement de branche.
        pause
        exit /b 1
    )
)

rem Generer le sitemap automatiquement
echo Generation du sitemap...
node ./sitemap.js

rem Afficher l'etat actuel
git status
echo.

:commitmsg
set "commitmessage="
set /p commitmessage=Entrez votre message de commit: 
if "%commitmessage%"=="" (
    echo ERREUR: Le message de commit ne peut pas etre vide!
    goto commitmsg
)

rem Ajouter tous les fichiers
echo.
echo Ajout des fichiers...
git add -A

rem Creer un commit
echo Creation du commit...
git commit -m "%commitmessage%"
if errorlevel 1 (
    echo ERREUR: Echec du commit.
    pause
    exit /b 1
)

rem Pousser vers GitHub
echo Envoi vers GitHub...
git push origin %branchname%
if errorlevel 1 (
    echo ERREUR: Echec du push.
    pause
    exit /b 1
)

echo.
echo Changements commites et pousses avec succes sur la branche %branchname%!
pause
