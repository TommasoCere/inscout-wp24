import { addHeaderFooter, isLogged } from './utility.js';

//Pronod nome e cognome dell'utente e lo inserisco nel DOM con id "nameSurname"
document.addEventListener("DOMContentLoaded", function () {
  var tokenCheck = new TokenCheck();
  tokenCheck.init();
  var userInfo = new UserInfo();
  userInfo.init();
  var medaglie = new Medaglie();
  medaglie.init(function () {
    medaglie.renderMedals("medalsContainer", 5);
  });
});

function TokenCheck() {
  this.init = function () {
    var logged = isLogged();
    if (logged.success == false) {
      console.log(logged.message);
      window.location.href = "../auth/login/login.html";
    }
  };
}

function UserInfo() {
  this.init = function () {
    const xmlhttp = new XMLHttpRequest();
    const url = "../../db/actions/user/getLoggedUserInfo.php";
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        if (response.success) {
          document.getElementById("nameSurname").innerHTML = response.nome + " " + response.cognome;
          document.getElementById("place").innerHTML = response.branca + ", " + response.cittaGruppo;
          if (response.fotoProfilo != "") {
            var path = response.fotoProfilo.replace("../", "http://localhost/");
            document.getElementById("avatar").src = path;
          }
        } else {
          console.log(response.message);
        }
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  };
}

function Medaglie() {
  this.medals = [];
  this.init = function (callback) {
    const self = this;
    const xmlhttp = new XMLHttpRequest();
    const url = "../../db/actions/user/getMedaglie.php";
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        if (response.success) {
          self.medals = response.medaglie;
          console.log(self.medals);
          if (callback) {
            callback();
          }
        } else {
          console.log(self.response.message);
        }
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  };
  this.getNumMedals = function (num) {
    if (num > this.medals.length) {
      return this.medals;
    } else {
      return this.medals.slice(0, num);
    }
  };
  this.getAllMedals = function () {
    return this.medals;
  };
  this.renderMedals = function (idContainer, num) {
    if (num == 0) {
      var tmpMedals = this.getAllMedals();
    } else {
      var tmpMedals = this.getNumMedals(num);
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
  };
}

// controllo quando viene aperto il modal BadgeModal
document.getElementById("BadgeModal").addEventListener("show.bs.modal", function () {
  // inserico le medaglie nel form
  var medaglie = new Medaglie();
  medaglie.init(function () {
    medaglie.renderMedals("medalsContainerModal", 0);
  });
});

// aggiungo un listener al pulsante saveMedals
document.querySelector("#saveMedals").addEventListener("click", saveMedals);

function saveMedals() {
  // salvo la medaglia inserita nel form
  const xmlhttp = new XMLHttpRequest();
  const url = "../../db/actions/user/addMedaglia.php";
  const formData = new FormData();
  const medalName = document.getElementById("medalName").value;
  if (medalName == "") {
    console.log("Inserisci un nome per la medaglia");
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
        console.log(response.message);
      }
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.send(formData);
}

document.getElementById("saveProfileImage").addEventListener("click", saveProfileImage);

function saveProfileImage() {
  const xmlhttp = new XMLHttpRequest();
  const url = "./../../db/actions/user/saveProfileImage.php";
  const formData = new FormData();
  const fileField = document.querySelector('input[type="file"]');
  // controllo che sia stato inserito un file
  if (!fileField.files[0]) {
    console.log("Inserisci un file");
    return;
  } else {
    // controllo che il file sia un'immagine
    if (!fileField.files[0].type.match("image.*")) {
      console.log("Il file inserito non è un'immagine");
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
        console.log(response.message);
      }
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.send(formData);
}

// quando clicco nel modal settingsModal devo aggiornare l'immagine del presente nel modal con quella attuale
document.getElementById("settingsModal").addEventListener("show.bs.modal", function () {
  var path = document.getElementById("avatar").src;
  document.getElementById("zoomAvatar").src = path;
});

// aggiungo un listener per il pulsante deleteProfile
document.getElementById("deleteProfile").addEventListener("click", deleteProfile);

function deleteProfile() {
  const xmlhttp = new XMLHttpRequest();
  const url = "../../db/actions/auth/deleteProfile.php";
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      if (response.success) {
        window.location.href = "../auth/login/login.html";
      } else {
        console.log(response.message);
      }
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  // chiamo il logout
  //logout();
}

// aggiungo un listener al pulsante logout
document.getElementById("logout").addEventListener("click", logout);

function logout() {
  const xmlhttp = new XMLHttpRequest();
  const url = "../../db/actions/auth/logout.php";
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      if (response.success) {
        window.location.href = "../auth/login/login.html";
      } else {
        console.log(response.message);
      }
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}


// FOLLOWINF FOLLOWERS SECTION

async function getFollower() {
  const response = await fetch("../../db/actions/user/getFollower.php", {
      method: "GET"
  });
  const users = await response.json();
  return users;
}

async function createFollowers() {
  const feed = document.querySelector("#followers");
  const users = await getFollower();

  const template = feed.querySelector("template");
  var userInfo
  for (let i=0; i<posts.length; i++) {
      let user = users[i];
      let clone = template.content.cloneNode(true);
      clone.querySelector("#followerLi img").src = user.fotoProfilo == null ? "../../static/img/user.jpg" : userInfo.fotoProfilo;
      clone.querySelector("#followerLi p").innerHTML = user.username;
      feed.appendChild(clone);
  }
}

async function getFollowing() {
  const response = await fetch("../../db/actions/user/getFollower.php", {
      method: "GET"
  });
  const users = await response.json();
  return users;
}
  
async function createFollowing() {
    const feed = document.querySelector("#following");
    const users = await getFollowing();
  
    const template = feed.querySelector("template");
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let clone = template.content.cloneNode(true);
      console.log(user.fotoProfilo);
      console.log(user.username);
      clone.querySelector("#followingLi img").src = user.fotoProfilo;
      clone.querySelector("#followingLi p").innerHTML = user.username;
      feed.appendChild(clone);
    }
  
  // Initialize the Bootstrap modal after script loading
  const modal = document.getElementById('following');
  const modalInstance = new bootstrap.Modal(modal);
}