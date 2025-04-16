import { createRoot } from 'react-dom/client'
// import React from 'react'
import App from './components/InjectedComponent' // Adjust the import path as necessary

// 1. Create and append the shadow host to the body
const shadowContainer = document.createElement('div');
document.body.appendChild(shadowContainer);

// 2. Attach a shadow root to the host
const shadowRoot = shadowContainer.attachShadow({ mode: 'open' });

// 3. Create a React root element inside the shadow root
const reactRoot = document.createElement('div');
shadowRoot.appendChild(reactRoot);

const root = createRoot(reactRoot);
root.render(< App/>);

