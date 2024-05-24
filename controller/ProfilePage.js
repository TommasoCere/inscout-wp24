import { addHeaderFooter, isLogged, createFeed, cleanTemplateList, showToast } from './utility.js';




//Pronod nome e cognome dell'utente e lo inserisco nel DOM con id "nameSurname"
document.addEventListener("DOMContentLoaded", async function () {
  const user = new URLSearchParams(window.location.search).get("user");
  
  if (user == null) {
    document.querySelector("#follow").classList.add("d-none");
     // aggiungo un listener al pulsante saveMedals
    document.querySelector("#save").addEventListener("click", saveMedals);
  }
  else{
    document.querySelector("#settings").classList.add("d-none");
    document.querySelector("#addMedal").classList.add("d-none");
    document.querySelector("#save").classList.add("d-none");
  }
  TokenCheck();
  addHeaderFooter();
  await LoadUserInfo(user);
  await loadMedals(user, 5, "medalsContainer");
  await createFeed(await getUserPosts(user));
  createFollowers(user);
  createFollowing(user);
  

  document.getElementById("BadgeModal").addEventListener("show.bs.modal", function () {
  loadMedals(user, 0, "medalsContainerModal");
  });
 
  document.getElementById("saveProfileImage").addEventListener("click", saveProfileImage);
  // quando clicco nel modal settingsModal devo aggiornare l'immagine del presente nel modal con quella attuale
  document.getElementById("settingsModal").addEventListener("show.bs.modal", function () {
  var path = document.getElementById("avatar").src;
  document.getElementById("zoomAvatar").src = path;
  // aggiungo un listener per il pulsante deleteProfile
  document.getElementById("deleteProfile").addEventListener("click", deleteProfile);
  // aggiungo un listener al pulsante logout
  document.getElementById("logout").addEventListener("click", logout);
  });

  


});




function TokenCheck() {
  var logged = isLogged();
  if (logged.success == false) {
    
    window.location.href = "../auth/login/login.html";
  }
}

async function getUserPosts(user){
  let url;
  if(user == null){
    url = "../../db/actions/user/getUserPosts.php";
  }
  else {
    url = "../../db/actions/user/getUserPosts.php?user=" + user;
  }
  const response = await fetch(url, {
    method: "GET"
  });
  const posts = await response.json();
  return posts;
}

/**
 * shows the user info in the profile page
 * @param {*} user the user to load the info from, null if the user is the logged one
 */
async function LoadUserInfo(user) {
  const xmlhttp = new XMLHttpRequest();
  let url;
  if(user == null){
    url = "../../db/actions/user/getLoggedUserInfo.php";
  }
  else {
    url = "../../db/actions/user/getUserInfo.php?user=" + user;
  }
  
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      document.getElementById("nameSurname").innerHTML = response.name + " " + response.surname;
      document.getElementById("place").innerHTML = response.section + ", " + response.groupCity + " " + response.groupNumber;
      if (response.profilePicturePath != "") {
        var path = response.profilePicturePath.replace("../", "http://localhost/");
        document.getElementById("avatar").src = path;
      }
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

async function loadMedals(user, num, idContainer) {
  let url;
  let medals = [];
  if(user == null){
    url = "../../db/actions/user/getMedaglie.php";
  }
  else {
    url = "../../db/actions/user/getMedaglie.php?user=" + user;
  }

  const response = await fetch(url, {
    method: "GET"
  });
  medals = await response.json();
  medals = medals.medaglie;

  if (num == 0) {
    var tmpMedals = medals;
  } else {
    var tmpMedals = medals.slice(0, num);
  }
  var medalsContainer = document.getElementById(idContainer);
  for (var i = 0; i < tmpMedals.length; i++) {
    const medalDiv = document.createElement("div");
    medalDiv.classList.add("col-4", "text-center", "mb-2");

    const medalImg = document.createElement("img");
    medalImg.classList.add("img-fluid", "col-3");
    medalImg.src = "../../static/img/medal-icon.png";
    medalImg.alt = "medal-icon";

    const medalName = document.createElement("p");
    medalName.classList.add("h5", "fs-6");
    medalName.textContent = tmpMedals[i]["title"];

    medalDiv.appendChild(medalImg);
    medalDiv.appendChild(medalName);
    medalsContainer.appendChild(medalDiv);
  }
}




function saveMedals() {
  // salvo la medaglia inserita nel form
  const xmlhttp = new XMLHttpRequest();
  const url = "../../db/actions/user/addMedaglia.php";
  const formData = new FormData();
  const medalName = document.getElementById("medalName").value;
  if (medalName == "") {
    showToast("Inserisci un nome per la medaglia");
    return;
  }
  formData.append("titolo", medalName);
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      if (response.success) {
        // resetto il campo medalName
        document.getElementById("medalName").value = "";
        window.location.reload();
      } else {
        showToast(response.message);
      }
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.send(formData);
}



function saveProfileImage() {
  const xmlhttp = new XMLHttpRequest();
  const url = "./../../db/actions/user/saveProfileImage.php";
  const formData = new FormData();
  const fileField = document.querySelector('input[type="file"]');
  // controllo che sia stato inserito un file
  if (!fileField.files[0]) {
    showToast("Inserisci un file");
    return;
  } else {
    // controllo che il file sia un'immagine
    if (!fileField.files[0].type.match("image.*")) {
      showToast("Il file inserito non è un'immagine");
      return;
    }
  }
  formData.append("file", fileField.files[0]);
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      if (response.success) {
        var path = response.path.replace("../", "http://localhost/");
        document.getElementById("avatar").src = path;
        var modal = document.getElementById("settingsModal");
        var modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
        window.location.reload();
      } else {
        showToast(response.message);
      }
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.send(formData);
}





function deleteProfile() {
  const xmlhttp = new XMLHttpRequest();
  const url = "../../db/actions/auth/deleteProfile.php";
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      if (response.success) {
        window.location.href = "../auth/login/login.html";
      } else {
        
      }
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  logout();
}



function logout() {
  const xmlhttp = new XMLHttpRequest();
  const url = "../../db/actions/auth/logout.php";
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      if (response.success) {
        window.location.href = "../auth/login/login.html";
      } else {
        showToast(response.message);
      }
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}



// FOLLOWINF FOLLOWERS SECTION

async function getFollower(user) {
  let url;
  if(user == null) {
    url = "../../db/actions/user/getFollower.php";
  } else {
    url = "../../db/actions/user/getFollower.php?user=" + user;
  }
  const response = await fetch(url, {
      method: "GET"
  });
  const users = await response.json();
  return users;
}

async function createFollowers(viewuser) {
  const feed = document.querySelector("#followers");
  const users = await getFollower(viewuser);
  cleanTemplateList(feed);
  document.getElementById("followersButtonP").innerHTML =users.length;
  const template = feed.querySelector("template");
  for (let i=0; i<users.length; i++) {
      let user = users[i];
      let clone = template.content.cloneNode(true);
      clone.querySelector("#followersImg img").src = user.profilePicturePath;
      clone.querySelector("#followersP a").innerHTML = user.username;
      clone.querySelector("#followersP a").href="../../app/profile/profile.html?user="+user.username;
      feed.appendChild(clone);
  }
}

async function getFollowing(user) {
  let url;
  if(user == null) {
    url = "../../db/actions/user/getFollowing.php";
  } else {
    url = "../../db/actions/user/getFollowing.php?user=" + user;
  }
  const response = await fetch(url, {
      method: "GET"
  });
  const users = await response.json();
  return users;
}

async function createFollowing(viewuser) {
    const feed = document.querySelector("#following");
    const users = await getFollowing(viewuser);
    cleanTemplateList(feed);
    document.getElementById("followingButtonP").innerHTML =users.length;
    const template = feed.querySelector("template");
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let clone = template.content.cloneNode(true);
      clone.querySelector("#followingImg img").src = user.profilePicturePath;
      clone.querySelector("#followingP a").innerHTML = user.username;
      clone.querySelector("#followingP a").href="../../app/profile/profile.html?user="+user.username;
      feed.appendChild(clone);
    }
}

