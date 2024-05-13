import { addHeaderFooter } from './utility.js';

async function getExploreAll() {
    // DA PROVARE SE FUNZIONA !!!!!
    const response = await fetch("http://localhost/db/actions/getExploreAll.php", { method: "GET" });
    const users = await response.json();
    return users;
}

async function getExplorerResearch() {
    // DA PROVARE SE FUNZIONA !!!!!
    // COME PASSIAMO IL NOME DA CERCARE ????
    const response = await fetch("http://localhost/db/actions/getExplorerResearch.php", { method: "GET" });
    const users = await response.json();
    return users;
}

async function createExploreAllList() {
    // DA PROVARE SE FUNZIONA !!!!!
    // DOVREBBERE ANDARE BENE PER TUTTI E DUE
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

addHeaderFooter();