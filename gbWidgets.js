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
//     --fill-color: #59c273;  /* gauge meter */
//     --warn-color: #ece619;  /* gauge meter > 80% */
//     --alert-color: #e50036; /* gauge meter > 80% */
//   }
// </style>
//
// (Default color values shown)
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
    footer.innerHTML = this.getAttribute("data-footer");

    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");
    // console.log(style.isConnected);

    // Use displayValue if passed, otherwise just "xx%"
    let display = this.getAttribute("data-display");
    let value = this.getAttribute("data-value");
    value = value < 0 ? 0 : value;
    value = value > 1 ? 1 : value;
    display = display ? display : `${Math.round(value * 100)}%`;
    gaugeCover.textContent = display;
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
        display: flex;
        /*contain: content;*/
        flex-direction: column;
        text-align: center;
        color: var(--text-color, #004033);
        background-color: var(--bg-color, #f4f4f4);
        border-radius: 5px;
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
      }
      
      p {
        font-size: 10px;
        margin: 5px 0 0 0;
      }
      
      label {
        margin: 0;
        text-align: center;
        width: 100%;
        font-size: 12px;
        line-height: 16px;
        color: #bbb;
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
        transition: transform 0.2s ease-out;
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

// Define the new element
customElements.define("dial-gauge", DialGauge);

export class BarGraph extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
  }
}
