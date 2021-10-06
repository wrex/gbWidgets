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

  wrapper.innerHTML = `<h1>Hi Mom!</h1>`;
})();
