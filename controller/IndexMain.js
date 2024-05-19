document.addEventListener("DOMContentLoaded", function () {
  var tokenCheck = new TokenCheck();
  tokenCheck.init();
});

function TokenCheck() {
  this.init = function () {
    var logged = isLogged();
    if (!logged) {
      window.location.href = "../app/auth/login/login.html";
    } else {
      window.location.href = "../app/home/home.html";
    }
  };
}
