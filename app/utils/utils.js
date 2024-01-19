// utils.js
"use strict";
export function errorPopup(theme, title, message) {
  var notification = window.createNotification({
    closeOnClick: true,
    displayCloseButton: "Display close button",
    positionClass: "nfc-top-right",
    showDuration: 3000,
    theme: theme,
  });
  notification({
    title: title,
    message: message,
  });
}

export function isLogged() {
  console.log("isLogged function");
  // controllo il token con validator.php
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../../php/request/validator.php", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);
    console.log("isLogged function response: " + response);
    return response;
  } else {
    console.error("isLogged function error");
    return false;
  }
}