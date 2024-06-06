# INSCOUT
## Un Social Network Scoutistico

Benvenuto in ScoutSocial, il social network dedicato agli appassionati di scouting!

## Descrizione del Progetto

Questo progetto è un social network sviluppato nell'ambito del corso di Tecnologie Web. Si tratta di una piattaforma pensata per gli amanti dello scouting, dove gli utenti possono connettersi, condividere esperienze scout, messaggiare e molto altro.

### Vai al sito: [inscout](https://inscout.me)

## Sviluppatori

- Annibalini Lorenzo
- Buda Francesco
- Ceredi Tommaso

## Caratteristiche Principali

- Profili utente personalizzati
- Feed per condividere foto e storie
- Massimo tre storie a settimana
- Sistema di medaglie per la fedelizzazione

## Tecnologie Utilizzate

- Frontend: HTML, CSS, JavaScript, Bootstrap
- Backend: Apache, Php
- Database: MySql
- Version Control: Git
- Hosting: Raspberry Pi 4 Model B 4GB

## Setup local development

- Installare XAMPP
- Clonare il repository nella cartella htdocs di XAMPP
- Avviare Apache
- Creare il file `conf.env` nella cartella `php` con il seguente contenuto:
- Eseguire il comando per installare JWT `composer require firebase/php-jwt`
- Eseguire il comando per installare SendGrid `composer require sendgrid/sendgrid`
- Controllare le autorizzazioni `sudo chmod 775 static` e `sudo chown -R www-data:www-data static`

```
DB_HOST=[server ip]
DB_USER=[db username]
DB_PASSWORD=[db password]
DB_NAME=[db name]
JWT_SECRET_TOKEN=[jwt secret]
SHA_SECRET_TOKEN=[sha secret]
```