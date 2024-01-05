function login() {
    var username = document.getElementById('username').value.toLowerCase().trim();
    var password = document.getElementById('password').value;

    const xmlhttp = new XMLHttpRequest();
    const url = 'login.php?username=' + username + '&password=' + password;
    xmlhttp.onreadystatechange = function() {
        // stampo la risposta del server
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.success) {
                window.location.href = 'index.php';
            } else {
                document.getElementById('error').innerHTML = response.error;
            }
        }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}
