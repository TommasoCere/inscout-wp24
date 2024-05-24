import { addHeaderFooter, getUserInfo, like, checkLike, isLogged, loadComments, createFeed } from './utility.js';


async function getFeed() {
    const response = await fetch("../../db/actions/user/getFeed.php", {
        method: "GET"
    });
    const posts = await response.json();
    return posts;
}

function TokenCheck() {
    var logged = isLogged();
    if (logged == false) {
        console.log("Non sei loggato");
        window.location.href = "../auth/login/login.html";
    }
}


document.addEventListener('DOMContentLoaded', function() {
    TokenCheck();
});
addHeaderFooter();
createFeed(await getFeed());