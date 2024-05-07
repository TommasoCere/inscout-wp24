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
        if (logged.message == false) {
            errorPopup("error", "LOGIN", logged.message);
            window.location.href = "../auth/login/login.html";
        }
    };
}

function UserInfo() {
    this.init = function() {
        const xmlhttp = new XMLHttpRequest();
        const url = '../../../db/getUserInfo.php';
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                if (response.success) {
                    console.log(response);
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
    const url = '../../../db/saveProfileImage.php';
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
                console.log(response);
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

addHeaderFooter();