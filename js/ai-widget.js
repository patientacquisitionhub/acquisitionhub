// ai-widget.js
(function () {
  const input = document.getElementById("ai-input");
  const sendBtn = document.getElementById("ai-send");
  const micBtn = document.getElementById("ai-mic");

  let recognition;
  let listening = false;

  // Check if browser supports speech recognition
  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
      input.value = event.results[0][0].transcript;
      listening = false;
    };

    recognition.onend = function () {
      listening = false;
    };
  }

  // Start/Stop microphone listening
  micBtn.onclick = function () {
    if (!recognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (listening) {
      recognition.stop();
      listening = false;
    } else {
      recognition.start();
      listening = true;
    }
  };

  // Handle send button click
  sendBtn.onclick = send;

  // Handle Enter key for sending
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });

  // Send input (replace with your API call)
  function send() {
    const text = input.value.trim();
    if (!text) return;

    alert("User asked: " + text);  // Replace with your actual API logic
    input.value = "";  // Clear input after sending
  }
})();
