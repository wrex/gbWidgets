/**
 * @jest-environment jsdom
 */

"use strict";

import DialGauge from "../gbWidgets.js";

describe("BarGraph", () => {
  it("Should render a div.bar-graph element", () => {
    const graph = document.createElement("bar-graph");
    expect(graph.shadowRoot.querySelector(".bar-graph")).not.toBeNull();
  });

  it("Should include the innerHTML as a heading", () => {
    document.body.innerHTML = `<bar-graph>Heading Text</bar-graph>`;
    const graph = document.querySelector("bar-graph");
    const heading = graph.shadowRoot.querySelector("h1").textContent;
    expect(heading).toBe("Heading Text");
  });

  it("Should create an inner chart div", () => {
    document.body.innerHTML = `<bar-graph>Test</bar-graph>`;
    const graph = document.querySelector("bar-graph");
    expect(graph.shadowRoot.querySelector(".chart")).not.toBeNull();
  });

  it("Should create bars for each passed value", () => {
    document.body.innerHTML = `<bar-graph data-values='[1,2,3]'>Test</bar-graph>`;
    const graph = document.querySelector("bar-graph");
    const bars = graph.shadowRoot.querySelectorAll(".bar");
    expect(bars.length).toBe(3);
  });

  it("Should add span.bar-value to each bar", () => {
    document.body.innerHTML = `<bar-graph data-values='[1,2,3]'>Test</bar-graph>`;
    const graph = document.querySelector("bar-graph");
    const bars = graph.shadowRoot.querySelectorAll(".bar");
    expect(bars[0].querySelector(".bar-value").textContent).toBe("1");
    expect(bars[1].querySelector(".bar-value").textContent).toBe("2");
    expect(bars[2].querySelector(".bar-value").textContent).toBe("3");
  });

  it("Should add a label to each bar", () => {
    document.body.innerHTML = `<bar-graph data-values='[1,2,3]' data-display='["a", "b", "c"]'>Test</bar-graph>`;
    const graph = document.querySelector("bar-graph");
    const bars = graph.shadowRoot.querySelectorAll(".bar");
    expect(bars[0].querySelector("label").textContent).toBe("a");
    expect(bars[1].querySelector("label").textContent).toBe("b");
    expect(bars[2].querySelector("label").textContent).toBe("c");
  });
  // it("Should include ", () => {});
});
