function register() {
  var username = document.getElementById("username").value.toLowerCase().trim();
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value.toLowerCase().trim();
  var nome = "nome";
  var cognome = "cognome";
  var branca = "branca";
  var gruppo = document.getElementById("gruppo").value;
  // dividi la città dal numero es. "Alta valle del Tevere 1" -> "Alta valle del Tevere" e "1"
  var tmp = gruppo.split(" ");
  var cittàGruppo = tmp.slice(0, tmp.length - 1).join(" ");
  var numeroGruppo = tmp[tmp.length - 1];

  console.log("città: " + cittàGruppo);
  console.log("numero: " + numeroGruppo);

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
  console.log(url);
  xmlhttp.onreadystatechange = function () {
    // stampo la risposta del server
    console.log(this.responseText);
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      console.log(response);
      if (response.success) {
        window.location.href = "../login/index.html";
      } else {
        document.getElementById("error").innerHTML = response.error;
      }
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.send(formData);
}

function getGruppiList() {
  // devo ottenere la lista dei gruppi, la ottengo come json da getGruppi.php
  fetch("./getGruppi.php")
    .then((response) => response.json())
    .then((data) => {
      var select = document.getElementById("gruppo");
      for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.text = data[i].città + " " + data[i].numero;
        option.value = option.text;
        select.add(option);
      }
    });
}
