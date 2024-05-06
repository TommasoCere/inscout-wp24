import { addHeaderFooter } from './utility.js';
import {  errorPopup, isLogged } from '../app/utils/utils.js';

addHeaderFooter();

document.addEventListener('DOMContentLoaded', function() {
    var tokenCheck = new TokenCheck();
    tokenCheck.init();
});

function TokenCheck() {
    this.init = function() {
        var logged = isLogged();
        if (!logged) {
            errorPopup("error", "LOGIN", "Devi effettuare il login");
            window.location.href = "../auth/login/login.html";
        }
    };
}