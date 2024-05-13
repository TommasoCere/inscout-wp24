#!/bin/bash

# Deve essere eseguito come superuser
if [ "$EUID" -ne 0 ]; then
    echo "Devi eseguire questo script come superuser."
    exit
fi

# # Nome della repository Git
# repository="inscout-wp24"
# 
# # Directory locale della repository (sostituisci con il percorso della tua repository)
# repository_path="/home/tom/Documenti/inscout-wp24"
# 
# # Cambia la directory alla repository locale
# cd "$repository_path"
# 
# username=$(cat /home/tom/Documenti/env/GitUser.env)
# pwd=$(cat /home/tom/Documenti/env/GitPwd.env)
# 
# # Esegui il pull dalla repository remota
# git pull https://$username:$pwd@github.com/TommasoCere/inscout-wp24
# 
# # Se è richiesto il merge, eseguilo
# if [ -f "$repository_path/.git/MERGE_HEAD" ]; then
#     git commit -a -m "Merge"
# fi

# Sposoto i file nella directory www
cd /var/www/inscout.me
rm -rf ./*
cp -r /home/tom/Documenti/inscout-wp24/* /var/www/inscout.me

echo "Pull completato per la repository $repository."
