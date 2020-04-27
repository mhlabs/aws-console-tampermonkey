// ==UserScript==
// @name         AWS CloudWatch Logs to Logs Insights
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       mhlabs
// @match        https://*.console.aws.amazon.com/cloudwatch/*
// @grant        none
// ==/UserScript==

var region = location.href.split(".")[0].split("/")[2];

(function() {
  "use strict";
  try {
    var functionName = location.href
      .split("group=")[1]
      .split(";")[0]
      .replace("/", "*2f");

    var cloudWatchLogsContainer = document.getElementById(
      "gwt-debug-logStreamBreadCrumb"
    );
    var checkExist = setInterval(function() {
      if (document.getElementById("gwt-debug-logStreamBreadCrumb")) {
        clearInterval(checkExist);
        tamperCloudWatchLogs(functionName);
      }
    }, 100);
  } catch (err) {
    console.log(err);
  }
})();

function createLink(functionName) {
  var url =
    `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logs-insights:queryDetail=~(end~0~source~'` +
    functionName +
    "~start~-3600~timeType~'RELATIVE~unit~'seconds~editorString~'fields*20*40message*0a*7c*20filter*20*40message*20like*20*2fException*2f)";
  return url;
}

function tamperCloudWatchLogs(functionName) {
  var cloudWatchLogsContainer = document.getElementById(
    "gwt-debug-logStreamBreadCrumb"
  );
  cloudWatchLogsContainer.innerHTML +=
    ' / <a href="' +
    createLink(functionName) +
    '" target="_blank">Logs Insights</a>';
}
