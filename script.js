// ==UserScript==
// @name         AWS SSO Account Alert
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.console.aws.amazon.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var role = document.getElementById('awsc-login-display-name-user').innerHTML.split('_')[1];
    var account = document.getElementById('awsc-login-display-name-account').innerHTML;

    var container = document.getElementById('nav-menu-right');
    var elem = document.createElement('span');
    elem.className = "nav-elt mh-account";
    elem.innerHTML = "<b>Account: " + account + "<br/>Role: " + role + "</b>";

    container.prepend(elem);
    var style = document.createElement('style');
    var bgColor = intToRGB(hashCode(account));
    style.innerHTML =
        '.mh-account {' +
        'color: ' + getContrastYIQ(bgColor) + ' !important;' +
        'background-color: #' + bgColor + ' !important;' +
        'text-shadow: 0 0 0 #000;'
        '}';

    var scriptTag = document.querySelector('script');

    scriptTag.parentNode.insertBefore(style, scriptTag);
})();

function getContrastYIQ(hexcolor){
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? 'black' : 'white';
}

function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}
