import { addHeaderFooter } from './utility.js';
import {  errorPopup, isLogged } from '../app/utils/utils.js';

//Pronod nome e cognome dell'utente e lo inserisco nel DOM con id "nameSurname"
document.addEventListener('DOMContentLoaded', function() {
    var tokenCheck = new TokenCheck();
    tokenCheck.init();
    var userInfo = new UserInfo();
    userInfo.init();
});

function TokenCheck() {
    this.init = function() {
        var logged = isLogged();
        if (logged.success == false) {
            errorPopup("error", "LOGIN", logged.message);
            window.location.href = "../auth/login/login.html";
        }
    };
}

function UserInfo() {
    this.init = function() {
        const xmlhttp = new XMLHttpRequest();
        const url = '../../db/actions/user/getLoggedUserInfo.php';
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                if (response.success) {
                    document.getElementById('nameSurname').innerHTML = response.nome + ' ' + response.cognome;
                    document.getElementById('place').innerHTML = response.branca + ', ' + response.cittaGruppo;
                    if (response.fotoProfilo != "") {
                        var path = response.fotoProfilo.replace('../', 'http://localhost/');
                        document.getElementById('avatar').src = path;
                    }
                } else {
                    errorPopup('error', 'ATTENZIONE', response.message);
                }
            }
        };
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
    };
}

document.getElementById('saveProfileImage').addEventListener('click', saveProfileImage);

function saveProfileImage() {
    const xmlhttp = new XMLHttpRequest();
    const url = './../../db/actions/user/saveProfileImage.php';
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    // controllo che sia stato inserito un file
    if (!fileField.files[0]) {
        errorPopup('error', 'ATTENZIONE', 'Inserisci un file');
        return;
    } else {
        // controllo che il file sia un'immagine
        if (!fileField.files[0].type.match('image.*')) {
            errorPopup('error', 'ATTENZIONE', 'Il file inserito non è un\'immagine');
            return;
        }
    }
    formData.append('file', fileField.files[0]);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.success) {
                var path = response.path.replace('../', 'http://localhost/');
                document.getElementById('avatar').src = path;
                var modal = document.getElementById('profileImageModal');
                var modalInstance = bootstrap.Modal.getInstance(modal);
                modalInstance.hide();
            } else {
                errorPopup('error', 'ATTENZIONE', response.message);
            }
        }
    };
    xmlhttp.open('POST', url, true);
    xmlhttp.send(formData);
}

// quando clicco nel modal profileImageModal devo aggiornare l'immagine del presente nel modal con quella attuale
document.getElementById('profileImageModal').addEventListener('show.bs.modal', function() {
    var path = document.getElementById('avatar').src;
    document.getElementById('zoomAvatar').src = path;
});

async function getFollower() {
    // DA PROVARE SE FUNZIONA !!!!!
    const response = await fetch("http://localhost/db/actions/user/getFollower.php", { method: "GET" });
    const users = await response.json();
    return users;
}

async function createFollowersList() {
    // DA PROVARE SE FUNZIONA !!!!!
    const feed = document.querySelector("#followers");
    const users = await getFollower();

    const template = feed.querySelector("template");
    for (let i=0; i<users.length; i++) {
        let user = users[i];
        let clone = template.content.cloneNode(true);
        //CAMBIA POI CON FOTO DB
        clone.querySelector("#followerLi img").src = "/static/img/user.jpg";
        clone.querySelector("#followerLi p").innerHTML = user.username;
        feed.appendChild(clone);
    }
}

async function getFollowing() {
    // DA PROVARE SE FUNZIONA !!!!!
    const response = await fetch("http://localhost/db/actions/user//getFollowing.php", { method: "GET" });
    const users = await response.json();
    return users;
}

async function createFollowingList() {
    // DA PROVARE SE FUNZIONA !!!!!
    const feed = document.querySelector("#following");
    const users = await getFollower();

    const template = feed.querySelector("template");
    for (let i=0; i<users.length; i++) {
        let user = users[i];
        let clone = template.content.cloneNode(true);
        //CAMBIA POI CON FOTO DB
        clone.querySelector("#followinfLi img").src = "/static/img/user.jpg";
        clone.querySelector("#followingLi p").innerHTML = user.username;
        feed.appendChild(clone);
    }
}

addHeaderFooter();