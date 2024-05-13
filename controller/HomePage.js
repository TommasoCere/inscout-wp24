import { addHeaderFooter, getUserInfo, like, checkLike } from './utility.js';
import { errorPopup, isLogged } from '../app/utils/utils.js';


async function getFeed() {
    const response = await fetch("../../db/actions/user/getFeed.php", {
        method: "GET"
    });
    const posts = await response.json();
    return posts;
}

async function createFeed() {
    const feed = document.querySelector("#feed");
    const posts = await getFeed();

    const template = feed.querySelector("template");
    var userInfo
    for (let i=0; i<posts.length; i++) {
        userInfo = await getUserInfo(posts[i].authorUsername);
        let post = posts[i];
        let clone = template.content.cloneNode(true);
        clone.querySelector("#postHeader img").src = userInfo.fotoProfilo == null ? "/static/img/user.jpg" : userInfo.fotoProfilo;
        clone.querySelector("#postHeader p").innerHTML = userInfo.username;
        clone.querySelector("#postBody img").src = post.picturePath == null ? "/static/img/user.jpg" : post.picturePath;
        clone.querySelector("#likeNumber").innerHTML = post.nLikes;
        clone.querySelector("#description").innerHTML = post.text;
        clone.querySelector("li").setAttribute("name", post.id);
        let likeBtn = clone.querySelector("#likeButton");
        const liked = await checkLike(post.id);
        if (liked) {
            likeBtn.classList.add("liked");
        }
        likeBtn.addEventListener("click", function() { like(post.id, !liked, ".like-btn", "#likeNumber"); });
        feed.appendChild(clone);
    }
}



function TokenCheck() {
    var logged = isLogged();
    if (logged == false) {
        errorPopup("error", "LOGIN", logged.message);
        window.location.href = "../auth/login/login.html";
    }
}


document.addEventListener('DOMContentLoaded', function() {
    TokenCheck();
});
addHeaderFooter();
createFeed();