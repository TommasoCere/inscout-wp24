document.addEventListener("DOMContentLoaded", () => {
  //const registerButton = document.getElementById('registerButton');
  //registerButton.addEventListener('click', register);
  const gruppiList = document.getElementById("gruppoSelect");
  gruppiList.addEventListener("click", getGruppiList);
});

document.addEventListener("DOMContentLoaded", () => {
  const registrationButton = document.getElementById("registrationForm");
  registrationButton.addEventListener("submit", (event) => {
    event.preventDefault();
    register();
  });
});

function register() {
  // controllo che tutti i campi siano stati riempiti
  if (
    document.getElementById("username").value == "" ||
    document.getElementById("password").value == "" ||
    document.getElementById("email").value == "" ||
    document.getElementById("name").value == "" ||
    document.getElementById("surname").value == "" ||
    document.getElementById("brancaSelect").value == "" ||
    document.getElementById("gruppoSelect").value == ""
  ) {
    console.log("riempi tutti i campi");
    return;
  }

  var username = document.getElementById("username").value.toLowerCase().trim();
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value.toLowerCase().trim();
  var nome = document.getElementById("name").value;
  var cognome = document.getElementById("surname").value;
  var branca = document.getElementById("brancaSelect").value;
  var gruppo = document.getElementById("gruppoSelect").value;
  // devo dividere il gruppo in città e numero
  var tmp = gruppo.split(" ");
  var cittàGruppo = tmp.slice(0, tmp.length - 1).join(" ");
  var numeroGruppo = tmp[tmp.length - 1];

  // controllo che la mail sia valida
  if (!email.includes("@")) {
    console.log("email non valida");
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
  const url = "../../../db/actions/auth/register.php";
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      console.log(response);
      if (response.success) {
        
        window.location.href = "../login/login.html";
      } else {
        console.log(response.message);
      }
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.send(formData);
}

function getGruppiList() {
  fetch("../../../db/actions/user/getGruppi.php")
    .then((response) => response.json())
    .then((data) => {
      var select = document.getElementById("gruppoSelect");
      for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.text = data[i].citta + " " + data[i].numero;
        option.value = option.text;
        select.add(option);
      }
    });
}
