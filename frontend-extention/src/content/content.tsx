import { createRoot } from 'react-dom/client'
// import React from 'react'
import App from './InjectedComponent' // Adjust the import path as necessary

const shadowContainer = document.createElement('div');
document.body.appendChild(shadowContainer);

const shadowRoot = shadowContainer.attachShadow({ mode: 'open' });

const reactRoot = document.createElement('div');
reactRoot.id = 'react-root'; // Optional: Set an ID for the React root element
// reactRoot.style.position = 'fixed'; // Optional: Set position to fixed
shadowRoot.appendChild(reactRoot);

const root = createRoot(reactRoot);
root.render(< App/>);

