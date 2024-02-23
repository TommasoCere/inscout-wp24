let stories = document.querySelectorAll('header .img-story');
let users = document.querySelectorAll('header .img-story p');

// stampa users
for (let i = 0; i < users.length; i++) {
    console.log(users[i].innerHTML);
}