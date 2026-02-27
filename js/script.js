// Open and close the chatbot
const openChatBtn = document.getElementById('open-chat');
const closeChatBtn = document.getElementById('close-chat');
const chatbot = document.getElementById('chatbot');
const chatContent = document.getElementById('chat-content');
const chatInput = document.getElementById('chat-input');
const sendMessageBtn = document.getElementById('send-message');

// Show the chat when the button is clicked
openChatBtn.addEventListener('click', () => {
  chatbot.classList.add('open');
});

// Close the chat when the "X" button is clicked
closeChatBtn.addEventListener('click', () => {
  chatbot.classList.remove('open');
});

// Handle sending the message and interacting with the API
sendMessageBtn.addEventListener('click', async () => {
  const userMessage = chatInput.value;
  if (userMessage.trim() !== '') {
    // Display the user's message
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message', 'user-message');
    userMessageElement.textContent = userMessage;
    chatContent.appendChild(userMessageElement);

    // Clear the input field
    chatInput.value = '';
    chatContent.scrollTop = chatContent.scrollHeight;

    // Send the message to the API (replace the URL with your deployed API URL)
    try {
      const response = await fetch('https://pah-ai-server-production.up.railway.app/api/chat', {  // Replace with your Railway app URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage })
      });

      const data = await response.json();

      // Display the bot's response
      if (data.response) {
        const botResponse = document.createElement('div');
        botResponse.classList.add('message', 'bot-message');
        botResponse.textContent = data.response;
        chatContent.appendChild(botResponse);
      } else {
        const botResponse = document.createElement('div');
        botResponse.classList.add('message', 'bot-message');
        botResponse.textContent = 'Sorry, something went wrong!';
        chatContent.appendChild(botResponse);
      }

      chatContent.scrollTop = chatContent.scrollHeight;
    } catch (error) {
      console.error('Error:', error);
      const botResponse = document.createElement('div');
      botResponse.classList.add('message', 'bot-message');
      botResponse.textContent = 'Oops, an error occurred. Please try again.';
      chatContent.appendChild(botResponse);
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  }
});
