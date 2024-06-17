document.getElementById("displayButton").addEventListener("click", function () {
  const codeInput = document.getElementById("codeInput").value;
  const codeDisplay = document.getElementById("codeDisplay");

  // Escape HTML characters to prevent XSS attacks
  const escapedCode = codeInput
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const code = escapedCode;

  const requestData = {
    code: code,
  };

  fetch("http://localhost:3000/analyze", {
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
    });
});
