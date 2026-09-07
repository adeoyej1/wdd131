// Dynamically populate the current copyright year in <span id="currentyear">
const currentYearSpan = document.querySelector("#currentyear");
currentYearSpan.textContent = new Date().getFullYear();

// Dynamically populate the last modified date in <p id="lastModified">
const lastModifiedParagraph = document.querySelector("#lastModified");
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;