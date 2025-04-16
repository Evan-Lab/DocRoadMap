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
reactRoot.id = 'react-root'; // Optional: Set an ID for the React root element
// reactRoot.style.position = 'fixed'; // Optional: Set position to fixed
// reactRoot.style.right = '50px'; // Optional: Set right position
// reactRoot.style.bottom = '50px'; // Optional: Set bottom position
// // reactRoot.style.width = '300px'; // Optional: Set width
// // reactRoot.style.height = '300px'; // Optional: Set height
// reactRoot.style.zIndex = '9999'; // Optional: Set z-index to ensure it appears above other elements
// reactRoot.style.backgroundColor = '#a50404'; // Optional: Set background color
shadowRoot.appendChild(reactRoot);

const root = createRoot(reactRoot);
root.render(< App/>);

