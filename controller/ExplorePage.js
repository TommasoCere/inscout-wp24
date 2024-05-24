import { addHeaderFooter, getUserInfo, like, checkLike, isLogged, loadComments } from './utility.js';


async function getExploreAll() {
    const response = await fetch("../../db/actions/user/getExploreAll.php", {
        method: "GET"
    });
    const posts = await response.json();
    return posts;
}

async function getExplorerResearch() {
    const search = document.getElementById('ricerca').value;
    console.log(search);
    const response = await fetch("../../db/actions/user/getExplorerResearch.php?stringaRicerca="+search, {
        method: "GET"
    });
    const posts = await response.json();
    return posts;
}

async function createFeed() {
    const feed = document.getElementById("exploreAll");
    const users = await getExploreAll();
    const template = feed.querySelector("template");
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let clone = template.content.cloneNode(true);
        if(user.profilePicturePath == null || user.profilePicturePath == "") {
            user.profilePicturePath = "../../static/img/user.jpg";
        }else{
            clone.querySelector("#exploreAllImg img").src = user.profilePicturePath;
        }
        clone.querySelector("#exploreAllName a").innerHTML = user.username;
        clone.querySelector("#exploreAllName a").href="../../app/profile/profile.html?user="+user.username;
        feed.appendChild(clone);
    }
}

async function createFeedResearch() {
    const feed = document.getElementById("exploreAll");
    feed.innerHTML = "<template> <li class='mt-3 p-2 ps-4 mx-auto user-tag rounded-4' style='width: 9.6cm'> <div class='row align-items-center'> <div class='col-3' id='exploreAllImg'> <img src='/static/img/user.jpg' class='img-fluid rounded-circle' alt=''> </div> <div class='col-9' id='exploreAllName'> <p class='h4 text-start mb-2'> <a href='app/profile/profile.html'>cippa.lippa</a> </p> </div> </div>          </li> </template>";
    const users = await getExplorerResearch();
    const template = feed.querySelector("template");
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let clone = template.content.cloneNode(true);
        clone.querySelector("#exploreAllImg img").src = user.profilePicturePath;
        clone.querySelector("#exploreAllName a").innerHTML =user.username;
        clone.querySelector("#exploreAllName a").href="../../app/profile/profile.html?user="+user.username;
        feed.appendChild(clone);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createFeed();
});

//event listerner for search button
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    createFeedResearch();
});

addHeaderFooter();