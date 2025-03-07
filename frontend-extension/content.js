// // petite note: comment the code to hide accessibility button
// // if display is not working, thik about reloading the page.
// console.log("DocRoadMap Accessibility extension loaded!");

const generateAltText = img => {
  return "Generated alt text" // Replace with AI logic
}

const modifyPageForAccessibility = () => {
  document.querySelectorAll("img").forEach(img => {
    if (!img.hasAttribute("alt") || img.getAttribute("alt") === "") {
      img.setAttribute("alt", generateAltText(img))
    }
  })
}

const injectAccessibilityButton = () => {
  if (document.getElementById("accessibility-button")) {
    return
  }

  const button = document.createElement("button")
  button.id = "accessibility-button"
  button.innerText = "Improve Accessibility"
  button.style.position = "fixed"
  button.style.top = "500px" //addjust height of button
  button.style.right = "10px"
  button.style.zIndex = "1000"
  button.style.background = "blue"
  button.style.color = "white"
  button.style.padding = "10px"
  button.style.borderRadius = "5px"
  button.style.border = "none"
  button.style.cursor = "pointer"

  button.addEventListener("click", () => {
    modifyPageForAccessibility()
    console.log("Accessibility button clicked!")
  })

  document.body.appendChild(button)
}

//modifyPageForAccessibility();
window.addEventListener("load", injectAccessibilityButton)
