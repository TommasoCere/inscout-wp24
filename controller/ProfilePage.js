import { addHeaderFooter } from './utility.js';

async function getFollower() {
    // DA PROVARE SE FUNZIONA !!!!!
    const response = await fetch("http://localhost/db/actions/getFollower.php", { method: "GET" });
    const users = await response.json();
    return users;
}

async function createFollowersList() {
    // DA PROVARE SE FUNZIONA !!!!!
    const feed = document.querySelector("#followers");
    const users = await getFollower();

    const template = feed.querySelector("template");
    for (let i=0; i<users.length; i++) {
        let user = users[i];
        let clone = template.content.cloneNode(true);
        //CAMBIA POI CON FOTO DB
        clone.querySelector("#followerLi img").src = "/static/img/user.jpg";
        clone.querySelector("#followerLi p").innerHTML = user.username;
        feed.appendChild(clone);
    }
}

async function getFollowing() {
    // DA PROVARE SE FUNZIONA !!!!!
    const response = await fetch("http://localhost/db/actions/getFollowing.php", { method: "GET" });
    const users = await response.json();
    return users;
}

async function createFollowingList() {
    // DA PROVARE SE FUNZIONA !!!!!
    const feed = document.querySelector("#following");
    const users = await getFollower();

    const template = feed.querySelector("template");
    for (let i=0; i<users.length; i++) {
        let user = users[i];
        let clone = template.content.cloneNode(true);
        //CAMBIA POI CON FOTO DB
        clone.querySelector("#followinfLi img").src = "/static/img/user.jpg";
        clone.querySelector("#followingLi p").innerHTML = user.username;
        feed.appendChild(clone);
    }
}

addHeaderFooter();