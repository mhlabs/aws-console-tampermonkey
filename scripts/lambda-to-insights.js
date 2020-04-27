// ==UserScript==
// @name         AWS Lambda to Logs Insights
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       mhlabs
// @match        https://*.console.aws.amazon.com/lambda/*
// @grant        none
// ==/UserScript==

var region = location.href.split(".")[0].split("/")[2];

(function() {
  "use strict";
  var functionName = (
    "/aws/lambda/" + location.href.split("/functions/")[1].split("?")[0]
  ).replace("/", "*2f");
  var lambdaContainer = document.getElementsByClassName("awsui-tabs-header")[0];
  if (lambdaContainer) {
    lambdaContainer.append(tamperLambda(functionName));
  }
})();

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
        if (checkForCSS_Class(mutation.addedNodes[j], "awsui-tabs-header")) {
          var lambdaContainer = mutation.addedNodes[j];
          if (lambdaContainer) {
            var functionName = (
              "/aws/lambda/" +
              location.href.split("/functions/")[1].split("?")[0]
            ).replace("/", "*2f");

            lambdaContainer.append(tamperLambda(functionName));
          }
        }
      }
    }
  });
}

function checkForCSS_Class(node, className) {
  //-- Only process element nodes
  if (node.nodeType === 1) {
    if (node.classList.contains(className)) {
      return true;
    }
    return false;
  }
}

function createLink(functionName) {
  var url =
    `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logs-insights:queryDetail=~(end~0~source~'` +
    functionName +
    "~start~-3600~timeType~'RELATIVE~unit~'seconds~editorString~'fields*20*40message*0a*7c*20filter*20*40message*20like*20*2fException*2f)";
  return url;
}

function tamperLambda(functionName) {
  var li = document.createElement("li");
  li.className = "awsui-tabs-tab";
  var a = document.createElement("a");
  a.className = "awsui-tabs-tab-link";
  a.innerHTML =
    '<span class="awsui-tabs-tab-label"><span>Logs Insights</span></span>';
  a.href = createLink(functionName);
  a.target = "_blank";

  li.append(a);
  return li;
}
