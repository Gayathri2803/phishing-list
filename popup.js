document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("reportBtn");

  button.addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (tab && tab.url) {
        alert(`Thank you! Reporting:\n${tab.url}`);
      }
    } catch (error) {
      console.error("Error reporting site:", error);
    }
  });
});
