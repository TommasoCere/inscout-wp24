function register() {
    var username = "username"
    var password = document.getElementById('password').value;
    var email = "abc@abc.it";
    var nome = "nome";
    var cognome = "cognome";
    var branca = "branca";
    var gruppo = "Cesena 11".trim();
    
    const xmlhttp = new XMLHttpRequest();
    const url = 'register.php?username=' + username + '&password=' + password + '&email=' + email + '&nome=' + nome + '&cognome=' + cognome + '&branca=' + branca + '&gruppo=' + gruppo;
    console.log(url);
    xmlhttp.onreadystatechange = function() {
        // stampo la risposta del server
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response.success) {
                window.location.href = '../login/index.html';
            } else {
                document.getElementById('error').innerHTML = response.error;
            }
        }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}
