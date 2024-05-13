import { errorPopup, isLogged } from '../app/utils/utils.js';

document.addEventListener('DOMContentLoaded', ()=> {
    const loginButton = document.getElementById('loginForm');
    loginButton.addEventListener('submit', (event)=> {
        event.preventDefault();
        login();
    });
});

function login() {
    var username = document.getElementById('username').value.toLowerCase().trim();
    var password = document.getElementById('password').value;
    
    const xmlhttp = new XMLHttpRequest();
    const url = '../../../db/actions/auth/login.php';
    const params = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            if (response.success) {
                // reindirizzo alla home
                window.location.href = '../../home/home.html';
            } else {
                errorPopup('error', 'ATTENZIONE', response.message);
            }
        }
    };
    xmlhttp.open('POST', url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}
