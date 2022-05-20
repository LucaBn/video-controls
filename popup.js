// Initialize button to trigger action
let daje = document.getElementById("daje");

// When the button is clicked make the magic happen
daje.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  // Get videos
  const videos = document.getElementsByTagName("video");

  // Add controls to videos
  for (let video of videos) {
    video.setAttribute("controls", true);
  }

  // Add CSS that make controls ALWAYS visible
  var styles = `video::-webkit-media-controls-panel{display:flex!important;opacity:1!important;z-index:99999!important;pointer-events:all!important;}`;
  var bonusCSS = document.createElement("style");
  bonusCSS.innerText = styles;
  document.head.appendChild(bonusCSS);
}
