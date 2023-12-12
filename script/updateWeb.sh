#!/bin/bash

# Deve essere eseguito come superuser
if [ "$EUID" -ne 0 ]; then
    echo "Devi eseguire questo script come superuser."
    exit
fi

# Nome della repository Git
repository="inscout-wp24"

# Directory locale della repository (sostituisci con il percorso della tua repository)
repository_path="/home/tom/Progetto/inscout-wp24"

# Cambia la directory alla repository locale
cd "$repository_path"

username=$(cat /home/tom/Documenti/env/GitUser.env)
pwd=$(cat /home/tom/Documenti/env/GitPwd.env)

# Esegui il pull dalla repository remota
git pull https://$username:$pwd@github.com/TommasoCere/inscout-wp24

# Se è richiesto il merge, eseguilo
if [ -f "$repository_path/.git/MERGE_HEAD" ]; then
    git commit -a -m "Merge"
fi

# Sposoto i file nella directory www
cd /var/www/inscout.me
rm -r *
cp -r /home/tom/Progetto/inscout-wp24/www/* /var/www/inscout.me

cd /var/www/app.inscout.me
rm -r *
cp -r /home/tom/Progetto/inscout-wp24/app/* /var/www/app.inscout.me

echo "Pull completato per la repository $repository."
