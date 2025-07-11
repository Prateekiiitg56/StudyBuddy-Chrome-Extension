chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "togglePanel") {
    const existing = document.getElementById("studybuddy-panel");
    if (existing) {
      existing.remove();
    } else {
      const iframe = document.createElement("iframe");
      iframe.src = chrome.runtime.getURL("panel.html");
      iframe.id = "studybuddy-panel";
      iframe.style.position = "fixed";
      iframe.style.top = "50px";
      iframe.style.left = "0";
      iframe.style.width = "400px";
      iframe.style.height = "400px";
      iframe.style.border = "none";
      iframe.style.zIndex = "999999";
      iframe.style.boxShadow = "2px 2px 12px rgba(0,0,0,0.3)";
      document.body.appendChild(iframe);
    }
  }
});

window.addEventListener("message", (event) => {
  if (event.data.action === "closeStudyBuddy") {
    const panel = document.getElementById("studybuddy-panel");
    if (panel) panel.remove();
  }
});

