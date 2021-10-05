/**
 * @jest-environment jsdom
 */

"use strict";

import DialGauge from "../gbWidgets.js";

describe("DialGauge", () => {
  it("Should render a div.dial-gauge element", () => {
    const gauge = document.createElement("dial-gauge");
    expect(gauge.shadowRoot.querySelector(".dial-gauge")).not.toBeNull();
  });

  it("Should include the innerHTML as a header", () => {
    // e.g. '<dial-gauge data-value="0.12" data-footer="Footer Text">Heading
    // Text</dial-gauge>'
    document.body.innerHTML = `<dial-gauge>Heading Text</dial-gauge>`;
    const gauge = document.querySelector("dial-gauge");

    const heading = gauge.shadowRoot.querySelector(".dial-gauge > h1");
    expect(heading.innerHTML).toBe("Heading Text");
  });

  it("Should include the data-footer attribute value as a <p>", () => {
    document.body.innerHTML = `<dial-gauge data-footer="Footer Text">Heading</dial-gauge>`;
    const gauge = document.querySelector("dial-gauge");

    const p = gauge.shadowRoot.querySelector(".dial-gauge > p");
    expect(p.innerHTML).toBe("Footer Text");
  });
});
