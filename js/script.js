// Initialize Lucide icons
lucide.createIcons();

const input = document.getElementById('ai-search');
const sendBtn = document.getElementById('send-trigger');

// Simple interaction handling
const handleSearch = () => {
    const query = input.value.trim();
    if (query) {
        console.log('Searching for:', query);
        // Trigger visual feedback
        sendBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            sendBtn.style.transform = '';
            input.value = '';
        }, 150);
    }
};

sendBtn.addEventListener('click', handleSearch);

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
