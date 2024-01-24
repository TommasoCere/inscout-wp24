import { errorPopup } from '../../utils/utils.js';

document.addEventListener('DOMContentLoaded', ()=> {
  const loginButton = document.getElementById('registerButton');
  loginButton.addEventListener('click', register);
  const gruppiList = document.getElementById('gruppoSelect');
  gruppiList.addEventListener('click', getGruppiList);
});

function register() {

  // controllo che tutti i campi siano stati riempiti
  if (
    document.getElementById("username").value == "" ||
    document.getElementById("password").value == "" ||
    document.getElementById("email").value == "" ||
    document.getElementById("nome").value == "" ||
    document.getElementById("cognome").value == "" ||
    document.getElementById("branca").value == "" ||
    document.getElementById("gruppoSelect").value == ""
  ) {
    errorPopup("error", "ATTENZIONE", "Riempi tutti i campi!");
    return;
  }

  var username = document.getElementById("username").value.toLowerCase().trim();
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value.toLowerCase().trim();
  var nome = document.getElementById("nome").value;
  var cognome = document.getElementById("cognome").value;
  var branca = document.getElementById("branca").value;
  var gruppo = document.getElementById("gruppoSelect").value;
  // devo dividere il gruppo in città e numero
  var tmp = gruppo.split(" ");
  var cittàGruppo = tmp.slice(0, tmp.length - 1).join(" ");
  var numeroGruppo = tmp[tmp.length - 1];

  // controllo che la mail sia valida
  if (!email.includes("@")) {
    errorPopup("error", "ATTENZIONE", "Inserisci una mail valida!");
    return;
  }

  var formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("email", email);
  formData.append("nome", nome);
  formData.append("cognome", cognome);
  formData.append("branca", branca);
  formData.append("cittaGruppo", cittàGruppo);
  formData.append("numeroGruppo", numeroGruppo);

  const xmlhttp = new XMLHttpRequest();
  const url = "./register.php";
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      console.log(response);
      if (response.success) {
        errorPopup("success", "BENVENUTO", response.message);
        window.location.href = "../login/index.html";
      } else {
        errorPopup("error", "ATTENZIONE", response.message);
      }
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.send(formData);
}

function getGruppiList() {
  fetch("./getGruppi.php")
    .then((response) => response.json())
    .then((data) => {
      var select = document.getElementById("gruppoSelect");
      for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.text = data[i].città + " " + data[i].numero;
        option.value = option.text;
        select.add(option);
      }
    });
}
