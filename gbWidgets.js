class DialGauge extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    //     return `<div id="${id}" class="gauge">
    //     <h1>${title}</h1>
    //     <div class="gauge__body">
    //       <div class="gauge__fill"></div>
    //       <div class="gauge__cover"></div>
    //     </div>
    //     <p>${text}</p>
    //   </div>`;

    // Create spans
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
    display = display ? display : `${Math.round(value * 100)}%`;
    gaugeCover.textContent = display;
    gaugeFill.style.transform = `rotate(${value / 2}turn)`;

    if (value >= 0.9) {
      // red for > 90%
      gaugeFill.style.backgroundColor = "#e50036";
    } else if (value >= 0.8) {
      // yellow for > 80%
      gaugeFill.style.backgroundColor = "#ece619";
    }

    style.textContent = `
      .dial-gauge * { box-sizing: border-box; }

      .dial-gauge {
        display:flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        color: #004033;
        background-color: #f4f4f4;
        border-radius: 5px;
        overflow: hidden;
        width: 100%;
        min-width: 120px;
        max-width: 150px;
        height: 125px;
        padding: 0 10px;
      }
      
      .dial-gauge h1 {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
        text-align: center;
        display: inline-block;
        width: 70%;
      }
      
      .dial-gauge p {
        font-size: 10px;
        margin: 0;
      }
      
      .dial-gauge label {
        margin: 0;
        text-align: center;
        width: 100%;
        font-size: 12px;
        line-height: 16px;
        color: #bbb;
      }
      
      .dial-gauge .gauge__body {
        width: 100%;
        height: 0;
        padding-bottom: 50%;
        background: #b4c0be;
        position: relative;
        border-top-left-radius: 100% 200%;
        border-top-right-radius: 100% 200%;
        overflow: hidden;
      }
      
      .dial-gauge .gauge__fill {
        position: absolute;
        top: 100%;
        left: 0;
        width: inherit;
        height: 100%;
        background: #59c273;
        transform-origin: center top;
        transform: rotate(0.25turn);
        transition: transform 0.2s ease-out;
      }
      
      .dial-gauge .gauge__cover {
        width: 75%;
        height: 150%;
        background-color: #f4f4f4;
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
