const apiKey = "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"

const models = [
  "openrouter/cypher-alpha:free",
  "tngtech/deepseek-r1t2-chimera:free",
  "mistralai/mistral-small-3.2-24b-instruct:free",
  "deepseek/deepseek-r1-0528-qwen3-8b:free",
  "deepseek/deepseek-r1-0528:free"
];

document.getElementById("close-btn").addEventListener("click", () => {
  try {
    window.parent.postMessage({ action: "closeStudyBuddy" }, "*");
  } catch (err) {
    console.error("Close message failed:", err);
  }
});

document.getElementById("ask-btn").addEventListener("click", async () => {
  const question = document.getElementById("question").value.trim();
  const responseBox = document.getElementById("response");

  if (!question) {
    responseBox.textContent = "⚠️ Please enter a question.";
    return;
  }

  responseBox.textContent = " Trying with available models...";

  for (let i = 0; i < models.length; i++) {
    const model = models[i];

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://openrouter.ai", 
          "X-Title": "StudyBuddy"
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: "You're a helpful assistant that explains code, math, and concepts simply for students." },
            { role: "user", content: question }
          ]
        })
      });

      const data = await res.json();

      if (res.ok && data.choices?.length > 0) {
        responseBox.textContent = `🤖 *Model: ${model}*\n\n${data.choices[0].message.content.trim()}`;
        return;
      } else {
        console.warn(`⚠️ Model ${model} failed:`, data?.error?.message || "No response");
      }

    } catch (err) {
      console.warn(`❌ Fetch error for ${model}:`, err.message);
    }
  }

  responseBox.textContent = "⚠️ All models failed or quota exceeded. Try again later.";
});
