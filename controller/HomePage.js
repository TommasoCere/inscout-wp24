
// adds the header and footer to the page
fetch('http://localhost/app/base/header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('header').innerHTML = data;
    });

fetch('http://localhost/app/base/footer.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('footer').innerHTML = data;
    });
