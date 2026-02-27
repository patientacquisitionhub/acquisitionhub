// Create chat container
const container = document.createElement("div");
container.id = "agency-ai-chat";
document.body.appendChild(container);

// Example UI (very basic)
container.innerHTML = `
  <div style="position:fixed;bottom:20px;right:20px;width:300px;background:#fff;border:1px solid #ccc;padding:10px;">
    <div id="chatMessages" style="height:200px;overflow:auto;"></div>
    <input id="chatInput" type="text" placeholder="Type message..." style="width:70%;" />
    <button id="sendBtn">Send</button>
  </div>
`;

async function sendMessage(text) {
  const res = await fetch("https://your-agency-server.com/api/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ query: text })
  });

  const { response } = await res.json();
  return response;
}

function display(message, sender = "bot") {
  const msgDiv = document.createElement("div");
  msgDiv.innerText = (sender === "user" ? "You: " : "Bot: ") + message;
  document.getElementById("chatMessages").appendChild(msgDiv);
}

document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("chatInput");
  const text = input.value;

  if (!text) return;

  display(text, "user");

  const botReply = await sendMessage(text);
  display(botReply);

  input.value = "";
});
