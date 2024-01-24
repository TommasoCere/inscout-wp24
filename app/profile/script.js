import { errorPopup, isLogged } from '../utils/utils.js';

document.addEventListener('DOMContentLoaded', ()=> {
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', login);
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', logout);
    const registrationButton = document.getElementById('registrationButton');
    registrationButton.addEventListener('click', registration);
    const testButton = document.getElementById('testButton');
    testButton.addEventListener('click', test);
});

function login() {
    // controllo che non sia già loggato
    var logged = isLogged();
    if (logged.message == "Accesso consentito") {
        errorPopup('info', 'ATTENZIONE', 'Sei già loggato!');
    } else {
        errorPopup('info', 'ATTENZIONE', logged.message);
        // reinidirizzo al login
        window.location.href = '../usr/login/index.html';
    }
}

function logout() {
    // controllo che non sia già loggato
    var logged = isLogged();
    if (logged.message == "Accesso consentito") {
        // logout
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../../php/logout.php", false);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send();
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                // reindirizzo al login
                errorPopup('success', 'ATTENZIONE', response.message);
                window.location.href = '../usr/login/index.html';
            } else {
                errorPopup('error', 'ATTENZIONE', response.message);
            }
        } else {
            errorPopup('error', 'ATTENZIONE', 'Errore di connessione');
        }
    } else {
        errorPopup('info', 'ATTENZIONE', logged.message);
        // reinidirizzo al login
        // window.location.href = '../usr/login/index.html';
    }
}

function registration() {
    // controllo che non sia già loggato
    var logged = isLogged();
    if (logged.message == "Accesso consentito") {
        errorPopup('info', 'ATTENZIONE', 'Sei già loggato!');
    } else {
        errorPopup('info', 'ATTENZIONE', logged.message);
        // reinidirizzo al login
        window.location.href = '../usr/register/index.html';
    }
}

function test() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "userInfo.php", false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
            errorPopup('success', 'ATTENZIONE', response.message);
            // iserisco i dati nella pagina
            document.getElementById('nome').innerHTML = response.nome;
            document.getElementById('cognome').innerHTML = response.cognome;
            document.getElementById('email').innerHTML = response.email;
            document.getElementById('citta').innerHTML = response.cittaGruppo;
        } else {
            errorPopup('error', 'ATTENZIONE', response.message);
        }
    } else {
        console.error("isLogged function error");
    }
}