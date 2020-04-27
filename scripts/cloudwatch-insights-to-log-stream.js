// ==UserScript==
// @name         AWS CloudWatch Logs Insights to Log Stream
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       mhlabs
// @match        https://*.console.aws.amazon.com/cloudwatch/*
// @grant        none
// ==/UserScript==

var region = location.href.split(".")[0].split("/")[2];

var MutationObserver = window.MutationObserver;
var observer = new MutationObserver(mutationHandler);
var obsConfig = {
  childList: true,
  attributes: true,
  subtree: true,
  attributeFilter: ["class"]
};

observer.observe(document, obsConfig);

function mutationHandler(mutationRecords) {
      mutationRecords.forEach(function(mutation) {
    if (
      mutation.type == "childList" &&
      typeof mutation.addedNodes == "object" &&
      mutation.addedNodes.length
    ) {
      for (var j = 0, l = mutation.addedNodes.length; j < l; ++j) {
        if (
          checkForCSS_Class(mutation.addedNodes[j].parentNode, "expanded-row")
        ) {
          var lambdaContainer = mutation.addedNodes[j];
          var reactid = lambdaContainer.getAttribute("data-reactid");
          if (!reactid) {
            continue;
          }
          var id = reactid.split("@")[0];
          var field = reactid.split("@")[1];
          if (field && !document.getElementById("cwlogs_" + id)) {
            var a = document.createElement("a");
            a.id = `cwlogs_${id}`;
            a.innerText = "See in log stream";
            a.href = `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logEventViewer:group=#log#;stream=#logStream#;start=#timestamp#`;
            a.target = "_blank";
            a.style = "position:absolute;right:0;";
            mutation.addedNodes[j].append(a);
          }
          var value = mutation.addedNodes[j].childNodes[1].innerText;
          if (field === "timestamp") {
            var startDate = new Date(parseInt(value));
            parseRow(field, id, startDate.toISOString(), "timestamp");
          }
          parseRow(field, id, value.split(":")[1], "log");
          parseRow(field, id, value, "logStream");
        }
      }
    }
  });
}

function parseRow(field, id, value, name) {
  if (field === name) {
    var link = document.getElementById("cwlogs_" + id);
    link.href = link.href.replace(`#${name}#`, value);
  }
}

function checkForCSS_Class(node, className) {
  //-- Only process element nodes
  if (node && node.nodeType === 1) {
    if (node.classList.contains(className)) {
      return true;
    }
    return false;
  }
}
