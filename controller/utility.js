export function addHeaderFooter() {
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
};

export function resetEventListener(oldButton, fun) {
    const newButton = oldButton.cloneNode(true);
    oldButton.parentNode.replaceChild(newButton, oldButton);
    newButton.addEventListener("click", fun);
    return newButton;
}

export function isLogged() {
    var xhr = new XMLHttpRequest();
    var url = window.location.href;
    url = url.split("/");
    url = url[0] + "//" + url[2];
    url = url + "/db/actions/auth/validator.php";
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      return response.message == "Accesso consentito";
    } else {
      console.error("isLogged function error");
      return false;
    }
  }

export async function getUserInfo(username) {
    const response = await fetch("http://localhost/db/actions/user/getUserInfo.php?user=" + username, {
        method: "GET"
    });
    const userInfo = await response.json();
    return userInfo;
}

export async function like(post_id, toAdd, likeButton_id, likes_id) {
    const request = toAdd ? "http://localhost/db/actions/user/like.php" : "http://localhost/db/actions/user/unlike.php";
    await fetch(request, {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "postId": post_id,
        })
    });
    const parent = document.getElementsByName(post_id)[0];
    const likeButton = parent.querySelector(likeButton_id);
    const likes = parent.querySelector(likes_id);
    if (toAdd) {
        likes.innerHTML = parseInt(likes.innerHTML) + 1;
        likeButton.classList.add("liked");
    } else {
        likes.innerHTML = parseInt(likes.innerHTML) - 1;
        likeButton.classList.remove("liked");
    }
    const fun = function() { like(post_id, !toAdd, likeButton_id, likes_id); };
    resetEventListener(likeButton, fun);
}

export async function checkLike(post_id) {
    const response = await fetch("http://localhost/db/actions/user/checkLike.php?postId=" + post_id, {
        method: "GET"
    });

    const result = await response.json();

    if (result.message == "Like exists") {
        return true;
    } else {
        return false;
    }     
}
