// ==UserScript==
// @name         gbWidgetExample
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Demo of gbWidgets
// @author       Rex Walters
// @match        https://example.com
// @grant        none
// @require      https://raw.githubusercontent.com/wrex/gbWidgets/main/gbWidgets.js
// ==/UserScript==

(function () {
  "use strict";

  const wrapper = document.createElement("div");
  document.body.appendChild(wrapper);

  wrapper.innerHTML = `
<style>
  section.container {
    --fill-color: purple;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style> 
<h1>Sample use of gbWidgets</h1>
<section class="container">
  <dial-gauge data-value="0.33" data-footer="147 total (<b>13</b> new)">Difficulty</dial-gauge>
  <dial-gauge
    data-value="0.63"
    data-display="147"
    data-footer="5 sessions, 493 reviews"
  >Reviews/day</dial-gauge>
  <bar-graph
    data-values="[247,115,69,250,6,2,0,1,3]"
    data-labels='["10s","20s","30s","1m","1.5m","2m","5m","10m",">10m"]'
  >Review Intervals</bar-graph>
</section>
  `;
})();
