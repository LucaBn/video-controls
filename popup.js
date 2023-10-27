// Initialize button to trigger action
const actionButton = document.getElementById("daje");

// When the button is clicked make the magic happen
actionButton.addEventListener("click", async () => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  chrome.scripting.executeScript({
    target: { tabId: activeTab.id },
    function: addControlsToVideos,
  });
});

// The body of this function will be executed as a content script inside the current page
const addControlsToVideos = () => {
  // Get videos
  const videoElements = document.getElementsByTagName("video");

  // Add controls to videos
  for (let video of videoElements) {
    video.setAttribute("controls", true);
  }

  // Add CSS that make controls ALWAYS visible
  const cssStyles = `video::-webkit-media-controls-panel{display:flex!important;opacity:1!important;z-index:99999!important;pointer-events:all!important;}`;
  const customCSS = document.createElement("style");
  customCSS.innerText = cssStyles;
  document.head.appendChild(customCSS);
};
