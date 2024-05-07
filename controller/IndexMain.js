import { errorPopup, isLogged } from '../app/utils/utils.js';

document.addEventListener('DOMContentLoaded', function() {
    var tokenCheck = new TokenCheck();
    tokenCheck.init();
});

function TokenCheck() {
    this.init = function() {
        var logged = isLogged();
        if (!logged) {
            errorPopup("error", "LOGIN", "Devi effettuare il login");
            window.location.href = "../app/auth/login/login.html";
        } else {
            window.location.href = "../app/home/home.html";
        }
    };
}