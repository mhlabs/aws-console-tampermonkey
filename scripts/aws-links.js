// ==UserScript==
// @name         AWS Links
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Show your favorite resources in the nav-bar
// @author       mhlabs
// @match        https://*.console.aws.amazon.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  var container = document.querySelector("button[data-testid='aws-services-list-button']");
  var elem = document.createElement("span");
  elem.className = "nav-elt mh-awslink";

  setTimeout(function() {
      addLinks(elem);
  }, 2000);

 container.parentNode.insertBefore(elem, container.nextSibling);

  var style = document.createElement("style");
  style.innerHTML = `a.mh-awslink {
      padding: 1px 5px;
      margin: 1px;
      color: white !important;
      font-size: 12px;
      display: inline-block;
      vertical-align: middle;
      text-decoration: none;
      background-color: #162640;
      border: 1px outset #354762;
    }
    a.mh-awslink:hover {background-color: DarkSlateGrey;}
    .mh-awslink i {margin: 0 auto;}`;
  var scriptTag = document.querySelector("script");
  scriptTag.parentNode.insertBefore(style, scriptTag);
})();

function addLinks(elem) {
  elem.innerHTML = "";
  var favoritesContainer = document.querySelector("[data-testid='favorites-container']");
  var links = favoritesContainer.querySelectorAll("a");
  links.forEach(function(link) {
      var href = link.href;
      var name = link.querySelector("span").innerHTML;
      var icon = link.querySelector("i");
      elem.innerHTML += "<a href='" +href + "' title='"+name+"' class='mh-awslink'>" + icon.outerHTML + "<em style='font-size: 0.8em;'>" + name + "</em></a>"
  });
  // reload every 15 seconds
  setTimeout(function() { addLinks(elem) }, 15000);
}

function insertAfter(referenceNode, newNode) {
referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
