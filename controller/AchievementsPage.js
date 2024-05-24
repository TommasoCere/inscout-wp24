import { addHeaderFooter, cleanTemplateList } from './utility.js';

async function getAchievements() {
    const response = await fetch("../../db/actions/user/getFollowedAchievements.php", {
        method: "GET"
    });
    const achievements = await response.json();
    return achievements;
}

async function loadAchievements() {
    const achievements = await getAchievements();
    const achievementsList = document.querySelector("#achievementsList");
    const template = achievementsList.querySelector("template");
    cleanTemplateList(achievementsList);

    for (let i=0; i<achievements.length; i++) {
        let achievement = achievements[i];
        let clone = template.content.cloneNode(true);
        clone.querySelector("img").src = achievement.profilePicturePath == null ? "/static/img/user.jpg" : achievement.profilePicturePath;
        clone.querySelector("#username").innerHTML = achievement.username;
        clone.querySelector("#title").innerHTML = "ha vinto la medaglia \"" + achievement.title + "\"";
        achievementsList.appendChild(clone);
    }

}

loadAchievements();
addHeaderFooter();