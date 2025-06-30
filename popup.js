document.getElementById("reportBtn").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  alert(`Thank you! Reporting: ${tab.url}`);
});