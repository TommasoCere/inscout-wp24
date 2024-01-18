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
