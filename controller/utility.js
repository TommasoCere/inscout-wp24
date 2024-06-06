export function addHeaderFooter() {
  // adds the header and footer to the page
  fetch("./../base/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("header").innerHTML = data;
    });

  fetch("./../base/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("footer").innerHTML = data;
    });
}

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
  const response = await fetch("./../../db/actions/user/getUserInfo.php?user=" + username, {
    method: "GET",
  });
  const userInfo = await response.json();
  return userInfo;
}

export async function getComments(post_id) {
  const response = await fetch("./../../db/actions/user/getComments.php?postId=" + post_id, {
    method: "GET",
  });
  const comments = await response.json();
  return comments;
}

export async function loadComments(post_id) {
  const commentModal = document.querySelector("#commentModal");
  const comments = await getComments(post_id);
  const template = commentModal.querySelector("template");
  const commentList = commentModal.querySelector("#comments");

  cleanTemplateList(commentList);

  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];
    let clone = template.content.cloneNode(true);
    clone.querySelector("img").src = comment.profilePicturePath == null ? "/static/img/user.jpg" : comment.profilePicturePath;
    clone.querySelector("#username").innerHTML = comment.authorUsername;
    clone.querySelector("#text").innerHTML = comment.text;
    commentList.appendChild(clone);
  }

  const commentBtn = commentModal.querySelector("#submitComment");

  resetEventListener(commentBtn, function () {
    submitComment(post_id);
  });
}

export function cleanTemplateList(list) {
  while (list.getElementsByTagName("li").length > 0) {
    list.removeChild(list.lastChild);
  }
}

async function submitComment(post_id) {
  const modalFooter = document.querySelector("#commentModal .modal-footer");
  const content = modalFooter.querySelector("input").value;
  console.log(modalFooter.querySelector("input").value);
  modalFooter.querySelector("input").value = "";
  await fetch("./../../db/actions/user/uploadComment.php", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: post_id,
      content: content,
    }),
  });
  cleanTemplateList(document.querySelector("#commentModal ul"));
  loadComments(post_id);
}

export async function like(post_id, toAdd, likeButton_id, likes_id) {
  const request = toAdd ? "./../../db/actions/user/like.php" : "./../../db/actions/user/unlike.php";
  await fetch(request, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: post_id,
    }),
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
  const fun = function () {
    like(post_id, !toAdd, likeButton_id, likes_id);
  };
  resetEventListener(likeButton, fun);
}

export async function checkLike(post_id) {
  const response = await fetch("./../../db/actions/user/checkLike.php?postId=" + post_id, {
    method: "GET",
  });

  const result = await response.json();

  if (result.message == "Like exists") {
    return true;
  } else {
    return false;
  }
}

export async function checkFollow(username) {
  const response = await fetch("./../../db/actions/user/checkFollow.php?followed=" + username, {
    method: "GET",
  });

  const result = await response.json();

  if (result.message == "follow exists") {
    return true;
  } else {
    return false;
  }
}

export async function follow(username, followButtonId) {
  await fetch("./../../db/actions/user/follow.php", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      followed: username,
    }),
  });

  const followButton = document.querySelector("#" + followButtonId);
  followButton.innerHTML = "Non seguire più";
  followButton.classList.remove("follow");
  followButton.classList.add("unfollow");
  resetEventListener(followButton, function () {
    unfollow(username, followButtonId);
  });
}



export async function unfollow(username, followButtonId) {
  await fetch("./../../db/actions/user/unfollow.php", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      followed: username,
    }),
  });

  const followButton = document.querySelector("#" + followButtonId);
  followButton.innerHTML = "Segui";
  followButton.classList.remove("unfollow");
  followButton.classList.add("follow");
  resetEventListener(followButton, function () {
    follow(username, followButtonId);
  });
}


export async function createFeed(posts) {
  const feed = document.querySelector("#feed");

  const template = feed.querySelector("template");
  var userInfo;
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let clone = template.content.cloneNode(true);
    clone.querySelector("#postHeader img").src = post.authorProfilePicturePath == "" ? "/static/img/user.jpg" : post.authorProfilePicturePath;
    clone.querySelector("#postHeader img").alt = "foto profilo di " + post.authorUsername;
    clone.querySelector("#postHeader p").innerHTML = post.authorUsername;
    clone.querySelector("#postBody img").src = post.picturePath == null ? "/static/img/user.jpg" : post.picturePath;
    clone.querySelector("#likeNumber").innerHTML = post.nLikes;
    clone.querySelector("#description").innerHTML = post.text;
    clone.querySelector("a").href = "./../profile/profile.html?user=" + post.authorUsername;
    clone.querySelector("li").setAttribute("name", post.id);
    let likeBtn = clone.querySelector("#likeButton");
    let commentBtn = clone.querySelector("#commentButton");
    const liked = await checkLike(post.id);
    if (liked) {
      likeBtn.classList.add("liked");
    }
    likeBtn.addEventListener("click", function () {
      like(post.id, !liked, ".like-btn", "#likeNumber");
    });
    commentBtn.addEventListener("click", function () {
      loadComments(post.id);
    });
    feed.appendChild(clone);
  }
}

export async function sendEmail(userEmail, username, subject, text1, text2, textButton, linkButton, color) {
  const xmlhttp = new XMLHttpRequest();
  const url = "../../../db/actions/auth/sendEmail.php";
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      if (response.success) {
        return true;
      } else {
        console.log(response.message);
        return false;
      }
    }
  };
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(
    "userEmail=" +
      userEmail +
      "&username=" +
      username +
      "&subject=" +
      subject +
      "&text1=" +
      text1 +
      "&text2=" +
      text2 +
      "&textButton=" +
      textButton +
      "&linkButton=" +
      linkButton +
      "&color=" +
      color
  );
}

export function showToast( message ) {
  const toastContent = document.getElementById('liveToast');
  const toastBody = document.getElementById('toast-body');

  // Aggiorna il contenuto del toast
  toastBody.textContent = message;
  toastContent.className = `toast text-white border-0 align-items-center ${message}`;

  const toast = new bootstrap.Toast(toastContent);

  // Mostra il toast
  toast.show();

  // Nascondi il toast dopo 5 secondi
  setTimeout(() => {
    toast.hide();
  }, 5000);

}