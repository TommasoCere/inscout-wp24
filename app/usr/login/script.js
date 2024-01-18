import { errorPopup } from '../../utils/utils.js';

document.addEventListener('DOMContentLoaded', ()=> {
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', login);
});

function login() {
    var username = document.getElementById('username').value.toLowerCase().trim();
    var password = document.getElementById('password').value;
    
    const xmlhttp = new XMLHttpRequest();
    const url = 'login.php';
    const params = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.success) {
                setToken(response.token);
                window.location.href = '../../home/index.html';
            } else {
                errorPopup('error', 'ATTENZIONE', response.message);
            }
        }
    };
    xmlhttp.open('POST', url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}
