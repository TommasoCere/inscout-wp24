function login() {
    var username = document.getElementById('username').value.toLowerCase().trim();
    var password = document.getElementById('password').value;
    
    const xmlhttp = new XMLHttpRequest();
    const url = 'login.php?username=' + username + '&password=' + password;
    console.log(url);
    xmlhttp.onreadystatechange = function() {
        // stampo la risposta del server
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response.success) {
                window.location.href = '../../home/index.html';
            } else {
                document.getElementById('error').innerHTML = response.error;
            }
        }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}
