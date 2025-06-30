chrome.webNavigation.onCompleted.addListener(async ({ tabId, url }) => {
  const response = await fetch("https://raw.githubusercontent.com/Gayathri2803/phishing-list/main/phishing-list.json");
  const data = await response.json();
  const isPhishing = data.blacklist.includes(new URL(url).hostname);

  if (isPhishing) {
    chrome.scripting.executeScript({
      target: { tabId },
      function: () => {
        window.location.href = chrome.runtime.getURL("warning.html");
      }
    });
  }
}, { url: [{ schemes: ["http", "https"] }] });
