// ==UserScript==
// @name         AWS Links
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       mhlabs
// @match        https://*.console.aws.amazon.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var region = "eu-west-1";
    var baseUrl = "https://"+region+".console.aws.amazon.com";

    var awsLinks = [
        { "name": "Lambda", "url": baseUrl + "/lambda/home?region="+region+"#/functions" },
        { "name": "DynamoDb", "url": baseUrl + "/dynamodb/home?region="+region+"#" },
        { "name": "CloudWatch", "url": baseUrl + "/cloudwatch/home?region="+region+"#logsV2:logs-insights" },
        { "name": "CodePipeline", "url": baseUrl + "/codesuite/codepipeline/pipelines?region="+region+"" },
        { "name": "CloudFormation", "url": baseUrl + "/cloudformation/home?region="+region+"#/stacks?filteringText=&filteringStatus=active&viewNested=true&hideStacks=false&stackId=" },
        { "name": "API Gateway", "url": baseUrl + "/apigateway/main/apis?region="+region+"" },
        { "name": "Cognito", "url": baseUrl + "/cognito/home?region="+region+"#" },
        { "name": "Step Functions", "url": baseUrl + "/states/home?region="+region+"#/statemachines" }
    ];
    var container = document.querySelector("button[data-testid='aws-services-list-button']");
    var elem = document.createElement("span");
    elem.className = "nav-elt mh-awslink";

    var sortedLinks = awsLinks.sort((a, b) => (a.name > b.name) ? 1 : -1)

    sortedLinks.forEach(function(awsLink) {
      elem.innerHTML += "<a href='" + awsLink.url + "'>" + awsLink.name + "</a> | "
    });
    container.parentNode.insertBefore(elem, container.nextSibling);

    var style = document.createElement("style");
    style.innerHTML = `.mh-awslink a {
        padding: 8px !important;
        color: white !important;
        font-size: 12px;
        display: inline-block;
        vertical-align: middle;
        text-decoration: none;
      }
      mh-awslink a:hover {
        text-decoration: underline;
      }`;
    var scriptTag = document.querySelector("script");
    scriptTag.parentNode.insertBefore(style, scriptTag);
})();

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
