import { addHeaderFooter } from './utility.js';

async function getFollower() {
    // DA PROVARE SE FUNZIONA !!!!!
    const response = await fetch("http://localhost/db/actions/getFollower.php", {
        method: "GET"
    });
    const users = await response.json();
    return users;
}

async function createFollowersList() {
    // DA PROVARE SE FUNZIONA !!!!!
    const feed = document.querySelector("#feed");
    const users = await getFollower();

    const template = feed.querySelector("template");
    for (let i=0; i<posts.length; i++) {
        let user = users[i];
        let clone = template.content.cloneNode(true);
        clone.querySelector("#profilePicture img").src = "/static/img/user.jpg";
        clone.querySelector("#username").innerHTML = user.username;
        feed.appendChild(clone);
    }
}

addHeaderFooter();