import { addHeaderFooter, getUserInfo, like, checkLike, isLogged, loadComments } from './utility.js';


async function getExploreAll() {
    const response = await fetch("../../db/actions/user/getExploreAll.php", {
        method: "GET"
    });
    const posts = await response.json();
    return posts;
}

async function createFeed() {
    const feed = document.querySelector("#exploreAll");
    const users = await getExploreAll();
  
   const template = feed.querySelector("template");
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let clone = template.content.cloneNode(true);
        clone.querySelector("#exploreAllImg img").src = user.profilePicturePath;
        clone.querySelector("#exploreAllName p").innerHTML = user.username;
        let likeBtn = clone.querySelector("#exploreAllName button");
        feed.appendChild(clone);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createFeed();
});

addHeaderFooter();