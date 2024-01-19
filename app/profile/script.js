import { errorPopup, isLogged } from '../utils/utils.js';

document.addEventListener('DOMContentLoaded', ()=> {
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', login);
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', logout);
    const registrationButton = document.getElementById('registrationButton');
    registrationButton.addEventListener('click', registration);
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
}

function registration() {
}