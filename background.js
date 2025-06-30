chrome.webNavigation.onCompleted.addListener(async ({ tabId, url }) => {
  console.log("Nav:", url);
  try {
    const res = await fetch("https://raw.githubusercontent.com/Gayathri2803/phishing-list/main/phishing-list.json");
    const data = await res.json();
    console.log("List:", data);

    const host = new URL(url).hostname;
    console.log("Host:", host);

    if (data.blacklist.includes(host)) {
      console.log("🚨 Phishing detected:", host);
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => window.location.href = chrome.runtime.getURL("warning.html")
      });
    }
  } catch (e) {
    console.error("Error:", e);
  }
}, { url: [{ schemes: ["http","https"] }] });
