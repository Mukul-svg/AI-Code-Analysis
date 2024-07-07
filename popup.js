document.getElementById("displayButton").addEventListener("click", function () {
  const codeInput = document.getElementById("codeInput").value;
  const codeDisplay = document.getElementById("codeDisplay");
  const loaderContainer = document.getElementById("loaderContainer"); // Loader container element

  codeDisplay.textContent = "";
  loaderContainer.style.display = "none";// hide loader initially

  // no loader when there's no codeInput
  if (!codeInput.trim()) {
    return; 
  }

  // Showing loader only while fetching data
  loaderContainer.style.display = "flex";

  // Escape HTML characters to prevent XSS attacks
  const escapedCode = codeInput
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const code = escapedCode;

  const requestData = {
    code: code,
  };

  fetch("https://ai-code-analysis.vercel.app/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      const analysis = data.analysis;
      codeDisplay.textContent = analysis.replace(/\*/g, "").replace(/#/g, "");
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      // Hiding loader after data is fetched
      loaderContainer.style.display = "none";
    });
});
