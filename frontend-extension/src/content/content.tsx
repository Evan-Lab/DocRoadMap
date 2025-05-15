import { createRoot } from "react-dom/client";
import App from "./InjectedComponent";
import "../i18n";

const shadowContainer = document.createElement("div");
document.body.appendChild(shadowContainer);

const shadowRoot = shadowContainer.attachShadow({ mode: "open" });

const reactRoot = document.createElement("div");
reactRoot.id = "react-root";
shadowRoot.appendChild(reactRoot);

const root = createRoot(reactRoot);
root.render(<App />);

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "logToken") {
    console.log("Token received in content script:", request.token);
  }
});
