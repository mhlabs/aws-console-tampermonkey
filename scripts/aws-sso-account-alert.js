// ==UserScript==
// @name         AWS SSO Account Alert
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display AWS account and assumed role in a colour coded fashion!
// @author       mhlabs
// @match        https://*.console.aws.amazon.com/*
// @grant        none
// ==/UserScript==

(function() {
  "use strict";
  var role = document
    .getElementById("nav-usernameMenu")
    .innerHTML.split("_")[1];
  var account = document.querySelector("span[data-testid='aws-my-account-details']")
    .innerText;
  var container = document.querySelector("button[data-testid='awsc-phd__bell-icon']");
  var elem = document.createElement("span");
  elem.className = "nav-elt mh-account";
  elem.innerHTML = `<strong>Account:</strong> ${account} | <strong>Role:</strong> ${role}`;

  container.prepend(elem);
  var style = document.createElement("style");
  var bgColor = intToRGB(hashCode(account));
  style.innerHTML = `.mh-account {
        padding: 4px !important;
        color: ${getContrastYIQ(bgColor)} !important;
        background-color: #${bgColor} !important;
        text-shadow: 0 0 0 #000;
        }`;

  var scriptTag = document.querySelector("script");

  scriptTag.parentNode.insertBefore(style, scriptTag);
})();

function getContrastYIQ(hexcolor) {
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}