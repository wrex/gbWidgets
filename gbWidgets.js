// Create custom <dial-gauge> element
//
// Sample HTML:
//
// <body>
//   <dial-gauge data-value="0.33"
//               data-display="19s"
//               data-footer="Elapsed"
//               >Seconds</dial-Gauge>
// </body>
//
// Sample CSS styling:
//
// <style>
//   dial-gauge {
//     --color: #004033;       /* Text elements */
//     --bg-color: #f4f4f4;    /* background */
//     --body-color: #b4c0be;  /* gauge background */
//     --fill-color: #59c273;  /* gauge fill color */
//     --warn-color: #ece619;  /* gauge fill > 80% */
//     --alert-color: #e50036; /* gauge fill > 80% */
// .   --font-family: "Open Sans", "Helvetica Neue",
//                    Helvetica, Arial, sans-serif;
//   }
// </style>
//
// (Default values shown)
export class DialGauge extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // <div class="dial-gauge">
    //   <h1>TEXTCONTENT</h1>
    //   <div class="gauge__body"></div>
    //   <div class="gauge__cover"></div>
    //   <p>FOOTER</p>
    // </div>

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "dial-gauge");

    const heading = document.createElement("h1");
    heading.innerHTML = this.innerHTML;

    const gaugeBody = document.createElement("div");
    gaugeBody.setAttribute("class", "gauge__body");
    const gaugeFill = document.createElement("div");
    gaugeFill.setAttribute("class", "gauge__fill");
    const gaugeCover = document.createElement("div");
    gaugeCover.setAttribute("class", "gauge__cover");
    gaugeBody.appendChild(gaugeFill);
    gaugeBody.appendChild(gaugeCover);

    const footer = document.createElement("p");
    footer.innerHTML = this.dataset.footer;

    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");

    // Use displayValue if passed, otherwise just "xx%"
    let display = this.dataset.display;
    let value = this.dataset.value ? parseFloat(this.dataset.value) : "0.25";
    value = value < 0 ? 0 : value;
    value = value > 1 ? 1 : value;
    display = display ? display : `${Math.round(value * 100)}%`;
    gaugeCover.innerHTML = display;
    gaugeFill.style.transform = `rotate(${value / 2}turn)`;

    if (value >= 0.9) {
      // red for > 90%
      gaugeFill.style.backgroundColor = "var(--alert-color, #e50036)";
    } else if (value >= 0.8) {
      // yellow for > 80%
      gaugeFill.style.backgroundColor = "var(--warn-color, #ece619)";
    }

    style.textContent = `
      :host {
        all: initial;
        font-family: var(--font-family, "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif);
        display: flex;
        /*contain: content;*/
        flex-direction: column;
        text-align: center;
        background-color: var(--bg-color, #f4f4f4);
        overflow: hidden;
        width: 100%;
        min-width: 120px;
        max-width: 150px;
        height: 125px;
        padding: 0 10px;
      }

      h1 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 5px;
        text-align: center;
        display: inline-block;
        width: 70%;
        color: var(--text-color, #004033);
      }
      
      p {
        font-size: 10px;
        margin: 5px 0 0 0;
        color: var(--text-color, #004033);
      }
      
      label {
        margin: 0;
        text-align: center;
        width: 100%;
        font-size: 12px;
        line-height: 16px;
        color: var(--text-color, #004033);
      }
      
      .gauge__body {
        width: 100%;
        height: 0;
        padding-bottom: 50%;
        background: var(--body-color, #b4c0be);
        position: relative;
        border-top-left-radius: 100% 200%;
        border-top-right-radius: 100% 200%;
        overflow: hidden;
      }
      
      .gauge__fill {
        position: absolute;
        top: 100%;
        left: 0;
        width: inherit;
        height: 100%;
        background: var(--fill-color, #59c273);
        transform-origin: center top;
        transform: rotate(0.25turn);
      }
      
      .gauge__cover {
        width: 75%;
        height: 150%;
        background-color: var(--bg-color, #f4f4f4);
        border-radius: 50%;
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translateX(-50%);
      
        /* Text */
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 25%;
        box-sizing: border-box;
        font-size: 25px;
        color: var(--text-color, #004033);
      }
      
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(heading);
    wrapper.appendChild(gaugeBody);
    wrapper.appendChild(footer);
  }
}

// Define the <dial-gauge> element
customElements.define("dial-gauge", DialGauge);

// Create custom <bar-graph> element
//
// Sample HTML:
//
// <body>
//   <bar-graph data-values="[147,93,24,78,62]"
//               data-labels='["A", "B", "C", "D", "E"]'
//               >Widgets</bar-graph>
// </body>
//
// Sample CSS styling:
//
// <style>
//   bar-graph {
//     --color: #004033;       /* Text elements */
//     --bg-color: #f4f4f4;    /* background */
//     --fill-color: #59c273;  /* bar fill color */
// .   --font-family: "Open Sans", "Helvetica Neue",
//                    Helvetica, Arial, sans-serif;
//   }
// </style>
//
// (Default values shown)
export class BarGraph extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Need the data-values for the CSS and elsewhere
    const values = JSON.parse(this.dataset.values ?? "[]");

    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");
    style.textContent = `
      :host {
        all: initial;
        font-family: var(--font-family, "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif);
        color: var(--text-color, #004033);
        background-color: var(--bg-color, #f4f4f4);
        height: 125px;
      }

      .bar-graph h1 {
        font-size: 18px;
        font-weight: 600;
        display: inline-block;
        text-align: center;
        width: 100%;
        margin: 0 0 5px;
        color: var(--text-color, #004033);
      }
      
      .chart {
        display: grid;
        grid-template-columns: repeat(${values.length}, 1fr);
        grid-template-rows: repeat(100, 1fr);
        grid-column-gap: 2px;
        height: 75px;
        min-width: 240px;
        width: 15%;
        padding: 5px;
      }
      
      .bar {
        border-radius: 0;
        transition: all 0.6s ease;
        background-color: var(--fill-color, #59c273);
        grid-row-start: 1;
        box-sizing: border-box;
        grid-row-end: 101;
        text-align: center;
        margin-top: auto;
      }
      
      .bar .bar-value {
        position: relative;
        top: -20px;
        font-size: 10px;
        color: var(--text-color, #004033);
      }
      
      .bar > label {
        display: block;
        width: 100%;
        position: absolute;
        bottom: -16px;
        font-size: 10px;
        margin: 0;
        padding: 0;
        text-align: center;
        color: var(--text-color, #004033);
      }
    `;
    shadow.appendChild(style);

    // <div class="bar-graph">...</div>
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "bar-graph");
    shadow.appendChild(wrapper);

    // add <h1> child
    const heading = document.createElement("h1");
    heading.innerHTML = this.innerHTML;
    wrapper.appendChild(heading);

    // add div.chart child
    const chart = document.createElement("div");
    chart.setAttribute("class", "chart");
    wrapper.appendChild(chart);

    // add div.bar children to chart for each value
    values.forEach((value) => {
      const bar = document.createElement("div");
      bar.setAttribute("class", "bar");
      chart.appendChild(bar);
    });

    // add span.bar-value, label, and height to each bar
    const bars = chart.querySelectorAll("div.bar");
    const labelDisplays = JSON.parse(this.dataset.labels ?? "[]");
    let i = 0;
    let maxValue = Math.max(...values);
    bars.forEach((bar) => {
      // add span.bar-value
      const span = document.createElement("span");
      span.setAttribute("class", "bar-value");
      span.innerHTML = values[i];
      bar.appendChild(span);

      // add label
      const label = document.createElement("label");
      label.innerHTML = labelDisplays[i] ?? "";
      bar.appendChild(label);

      // add styling for bar height
      bar.style.position = "relative";
      let percent = 100 * (values[i] / maxValue).toPrecision(5);
      bar.style.height = `${percent}%`;

      i += 1;
    });
  }
}

// Define the <bar-graph> element
customElements.define("bar-graph", BarGraph);
