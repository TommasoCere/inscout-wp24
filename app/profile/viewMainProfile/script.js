import { errorPopup, isLogged } from '../../utils/utils.js';

function logout() {
    // controllo che non sia già loggato
    var logged = isLogged();
    if (logged.message == "Accesso consentito") {
        // logout
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../../../php/logout.php", false);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send();
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                // reindirizzo al login
                errorPopup('success', 'ATTENZIONE', response.message);
                window.location.href = '../../usr/login/index.html';
            } else {
                errorPopup('error', 'ATTENZIONE', response.message);
            }
        } else {
            errorPopup('error', 'ATTENZIONE', 'Errore di connessione');
        }
    } else {
        errorPopup('info', 'ATTENZIONE', logged.message);
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    var logged = isLogged();
    if (!logged.success) {
        errorPopup('info', 'ATTENZIONE', "Devi effettuare l'accesso");
        window.location.href = '../../usr/login/index.html';
        return;
    } else {
        // inserisco il bottone di logout
        var button = document.createElement('button');
        button.setAttribute('id', 'logout');
        button.setAttribute('class', 'btn btn-danger');
        button.addEventListener('click', logout);
        button.innerText = 'Logout';
        document.getElementById('logoutButton').appendChild(button);
    }

    // inserisco i dati nella pagina
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "userInfo.php", false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
            // iserisco i dati nella pagina
            document.getElementById('nome').innerHTML = response.nome;
            document.getElementById('cognome').innerHTML = response.cognome;
            document.getElementById('username').innerHTML = response.username;
        } else {
            errorPopup('error', 'ATTENZIONE', response.message);
        }
    } else {
        console.error("isLogged function error");
    }
});