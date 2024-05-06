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
                } else {
                    errorPopup('error', 'ATTENZIONE', response.message);
                }
            }
        };
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
    };
}

addHeaderFooter();