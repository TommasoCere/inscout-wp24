import { addHeaderFooter } from './utility.js';


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
    for (let i=0; i<posts.length; i++) {
        let post = posts[i];
        let clone = template.content.cloneNode(true);
        clone.querySelector("#postHeader img").src = "/static/img/user.jpg";
        clone.querySelector("#postHeader p").innerHTML = "Username";
        clone.querySelector("#postBody img").src = post.picturePath == null ? "/static/img/user.jpg" : post.picturePath;
        clone.querySelector("#description").innerHTML = post.text;
        feed.appendChild(clone);
    }
}




addHeaderFooter();
createFeed();
