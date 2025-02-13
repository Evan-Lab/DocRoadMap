//might need to deleate it later

import React, { useEffect } from "react";

const generateAltText = (img: HTMLImageElement) => {
  return "Descriptive image content"; // a remplacer par un txt generé par une IA
};

const modifyPageForAccessibility = () => {
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("alt") || img.getAttribute("alt") === "") {
      img.setAttribute("alt", generateAltText(img));
    }
  });
};

const AccessibilityButton = () => {
  useEffect(() => {
    window.onload = () => {
      modifyPageForAccessibility();
    };
  }, []);

  return (
    <button
      style={{
        top: "10px",
        right: "10px",
        zIndex: 1000,
        background: "blue",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
      onClick={() => {
        console.log("Button clicked");
        modifyPageForAccessibility();
      }}
    >
      Improve Accessibility
    </button>
  );
};

export default AccessibilityButton;