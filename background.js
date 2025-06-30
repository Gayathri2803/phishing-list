chrome.webNavigation.onCompleted.addListener(async ({ tabId, url }) => {
  try {
    console.log("Navigation event detected:", url);

    const response = await fetch("https://raw.githubusercontent.com/Gayathri2803/phishing-list/main/phishing-list.json");
    const data = await response.json();
    console.log("Fetched phishing list:", data);

    const hostname = new URL(url).hostname;
    console.log("Checking hostname:", hostname);

    const isPhishing = data.blacklist.includes(hostname);
    console.log("Is phishing site?", isPhishing);

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
