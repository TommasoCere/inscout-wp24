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
                window.location.href = '../../home/index.html';
            } else {
                document.getElementById('error').innerHTML = response.error;
            }
        }
    };
    xmlhttp.open('POST', url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}
