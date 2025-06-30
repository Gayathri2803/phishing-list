chrome.webNavigation.onCompleted.addListener(async ({ tabId, url }) => {
  try {
    // Fetch the phishing blacklist from your GitHub raw file
    const response = await fetch("https://raw.githubusercontent.com/Gayathri2803/phishing-list/main/phishing-list.json");
    const data = await response.json();
    
    const hostname = new URL(url).hostname;
    const isPhishing = data.blacklist.includes(hostname);

    if (isPhishing) {
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          window.location.href = chrome.runtime.getURL("warning.html");
        }
      });
    }
  } catch (err) {
    console.error("Error checking phishing list:", err);
  }
}, { url: [{ schemes: ["http", "https"] }] });
