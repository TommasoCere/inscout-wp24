import { addHeaderFooter, getUserInfo, like } from './utility.js';


async function getFeed() {
    const response = await fetch("http://localhost/db/actions/getFeed.php", {
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
        clone.querySelector("#description").innerHTML = post.text;
        let likeBtn = clone.querySelector("#likeButton");
        likeBtn.addEventListener("click", function() { like(post.id, true, clone, "#likeButton", "#likeNumber"); });
        feed.appendChild(clone);
    }
}






addHeaderFooter();
createFeed();
