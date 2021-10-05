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

  it("Should display an explicit data-display", () => {
    document.body.innerHTML = `<dial-gauge data-display="Display Text"></dial-gauge>`;
    const gauge = document.querySelector("dial-gauge");

    const display = gauge.shadowRoot.querySelector(".gauge__cover").innerHTML;
    expect(display).toBe("Display Text");
  });

  it("Should display a percentage if no data-display", () => {
    document.body.innerHTML = `<dial-gauge data-value="0.34"></dial-gauge>`;
    const gauge = document.querySelector("dial-gauge");

    const display = gauge.shadowRoot.querySelector(".gauge__cover").innerHTML;
    expect(display).toBe("34%");
  });

  it("Should rotate the fill according to data-value", () => {
    document.body.innerHTML = `<dial-gauge data-value="0.34"></dial-gauge>`;
    const gauge = document.querySelector("dial-gauge");

    const styles = window.getComputedStyle(
      gauge.shadowRoot.querySelector(".gauge__fill")
    );
    // 34% means turn the rectangle 0.34/2 turns
    expect(styles.getPropertyValue("transform")).toBe("rotate(0.17turn)");
  });

  it("Should default to 0% if no data-value", () => {
    document.body.innerHTML = `<dial-gauge></dial-gauge>`;
    const gauge = document.querySelector("dial-gauge");

    const display = gauge.shadowRoot.querySelector(".gauge__cover").innerHTML;
    expect(display).toBe("0%");
  });

  it("Should display 0% if data-value < 0", () => {
    document.body.innerHTML = `<dial-gauge data-value="-0.15"></dial-gauge>`;
    const gauge = document.querySelector("dial-gauge");

    const display = gauge.shadowRoot.querySelector(".gauge__cover").innerHTML;
    expect(display).toBe("0%");
  });

  it("Should display 100% if data-value > 1", () => {
    document.body.innerHTML = `<dial-gauge data-value="1.005"></dial-gauge>`;
    const gauge = document.querySelector("dial-gauge");

    const display = gauge.shadowRoot.querySelector(".gauge__cover").innerHTML;
    expect(display).toBe("100%");
  });

  // it("Should have default styles", () => {});

  // it("Should accept css variables for theming", () => {});
});
