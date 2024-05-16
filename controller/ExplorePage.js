import { addHeaderFooter } from './utility.js';

async function getExploreAll() {
    // DA PROVARE SE FUNZIONA !!!!!
    const response = await fetch("http://localhost/db/actions/user/getExploreAll.php", { method: "GET" });
    const users = await response.json();
    return users;
}

async function createExploreAllList() {
    // DA PROVARE SE FUNZIONA !!!!!
    const feed = document.querySelector("#exploreAll");
    const users = await getExploreAll();

    const template = feed.querySelector("template");
    for (let i=0; i<users.length; i++) {
        let user = users[i];
        let clone = template.content.cloneNode(true);
        //CAMBIA POI CON FOTO DB
        clone.querySelector("#exploreAll img").src = "/static/img/user.jpg";
        clone.querySelector("#exploreAll p").innerHTML = user.username;
        feed.appendChild(clone);
    }
}

async function setExplorerResearch(event) {
    event.preventDefault(); // Previeni il comportamento predefinito del modulo di invio
    var stringa = document.getElementById('ricerca').value; // Ottieni il testo inserito nell'input
    try {
        // Invia la richiesta POST al server
        const response = await fetch("../..//db/actions/user/getExplorerResearch.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "stringa=" + encodeURIComponent(stringa)
        });

        // Verifica se la risposta è stata ricevuta correttamente
        if (!response.ok) {
            throw new Error('Errore nella richiesta');
        }

        // Estrai e analizza la risposta JSON
        const users = await response.json();

        // Elabora la risposta
        if (responseData.success) {
            console.log(responseData.message);
            // Puoi fare qualcosa con il messaggio di successo qui
            return users;
        } else {
            console.error(responseData.message);
            // Puoi fare qualcosa con il messaggio di errore qui
        }
    } catch (error) {
        console.error('Si è verificato un errore:', error.message);
        // Gestisci l'errore in modo adeguato
    }
}

async function getExplorerResearch() {
    // DA PROVARE SE FUNZIONA !!!!!
    const feed = document.querySelector("#exploreAll");
    stringa = document.querySelector("#ricerca").value;
    const users = await setExplorerResearch(stringa);

    const template = feed.querySelector("template");
    for (let i=0; i<users.length; i++) {
        let user = users[i];
        let clone = template.content.cloneNode(true);
        //CAMBIA POI CON FOTO DB
        clone.querySelector("#exploreAll img").src = "/static/img/user.jpg";
        clone.querySelector("#exploreAll p").innerHTML = user.username;
        feed.appendChild(clone);
    }
    
}

addHeaderFooter();