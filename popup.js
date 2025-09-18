document.getElementById('laymanify').onclick = async () => {
  const text = document.getElementById('postText').value.trim();
  const summaryDiv = document.getElementById('summary');
  summaryDiv.innerText = "Summarizing...";

  if (!text) {
    summaryDiv.innerText = "Please paste some text first.";
    return;
  }

  const summary = await summarizeText(text);
  summaryDiv.innerText = summary;
};

async function summarizeText(text) {
  const apiUrl = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
  const apiKey = "YOUR_HUGGINGFACE_API_KEY"; // Replace with your Hugging Face key

  // Prompt engineering for layman language
  const prompt = "Summarize this in simple, layman terms:\n" + text;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });
    const data = await response.json();
    return data[0]?.summary_text || "Summarization failed.";
  } catch (e) {
    return "Error: " + e.message;
  }
}
