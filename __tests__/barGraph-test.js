/**
 * @jest-environment jsdom
 */

"use strict";

import DialGauge from "../gbWidgets.js";

describe("BarGraph", () => {
  it("Should render a div.bar-graph element", () => {
    const gauge = document.createElement("bar-graph");
    expect(gauge.shadowRoot.querySelector(".bar-graph")).not.toBeNull();
  });
});
