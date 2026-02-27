// Open and close the chatbot
const openChatBtn = document.getElementById('open-chat');
const closeChatBtn = document.getElementById('close-chat');
const chatbot = document.getElementById('chatbot');
const chatContent = document.getElementById('chat-content');
const chatInput = document.getElementById('chat-input');
const sendMessageBtn = document.getElementById('send-message');

// Open chat when 'open-chat' button is clicked
openChatBtn.addEventListener('click', () => {
  chatbot.classList.add('open');
});

// Close chat when 'close-chat' button is clicked
closeChatBtn.addEventListener('click', () => {
  chatbot.classList.remove('open');
});

// Handle sending user messages and receiving bot responses
sendMessageBtn.addEventListener('click', async () => {
  const userMessage = chatInput.value;
  if (userMessage.trim() !== '') {
    // Display user message in chat
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'user-message');
    userMessageElement.textContent = userMessage;
    chatContent.appendChild(userMessageElement);

    chatInput.value = ''; // Clear the input field
    chatContent.scrollTop = chatContent.scrollHeight; // Scroll to bottom

    // Send the user message to the backend (your Railway API URL)
    try {
      const response = await fetch("https://pah-ai-server-production.up.railway.app/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userMessage }),
      });

      const data = await response.json();

      // Display bot response
      const botResponseElement = document.createElement('div');
      botResponseElement.classList.add('message', 'bot-message');
      if (data.response) {
        botResponseElement.textContent = data.response; // Bot's response from API
      } else {
        botResponseElement.textContent = "Sorry, there was an error. Please try again."; // Error message
      }
      chatContent.appendChild(botResponseElement);

      // Scroll to bottom after bot reply
      chatContent.scrollTop = chatContent.scrollHeight;
    } catch (error) {
      // Handle network or API errors
      const errorElement = document.createElement('div');
      errorElement.classList.add('message', 'bot-message');
      errorElement.textContent = "Error: Unable to communicate with the server. Please try again later.";
      chatContent.appendChild(errorElement);
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  }
});
