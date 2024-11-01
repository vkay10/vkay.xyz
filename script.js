const textElement = document.getElementById('dynamic-text');
const message = "You are about to enter the digital egregore of the HMN...\nAre you ready to proceed?";
let index = 0;

// Typing effect for initial message
function typeText() {
    if (index < message.length) {
        textElement.innerHTML += message.charAt(index);
        index++;
        setTimeout(typeText, 25); 
    }
}

typeText(); // Start typing effect

// Boot-up messages displayed below the terminal after user input
const bootMessages = [
    "Initializing HMN protocols...",
    "Establishing connection to digital egregore...",
    "Verifying user identity...",
    "Connection successful.",
    "Redirecting to the network..."
];

const bootupContainer = document.getElementById('bootup-sequence');

// Function to show boot-up messages sequentially
function showBootMessages() {
    let bootIndex = 0;

    function displayMessage() {
        if (bootIndex < bootMessages.length) {
            const messageLine = document.createElement('div');
            messageLine.textContent = bootMessages[bootIndex];
            bootupContainer.appendChild(messageLine);
            bootIndex++;
            setTimeout(displayMessage, 1400); // Delay for next message
        } else {
            // Redirect after the last message
            setTimeout(() => {
                window.location.href = 'finalpage.html';
            }, 1400);
        }
    }

    displayMessage();
}

// Handle user input to start boot-up sequence without further confirmation
const userInput = document.getElementById('user-input');
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        userInput.disabled = true; // Disable further input
        setTimeout(showBootMessages, 500); // Start boot-up sequence after a short delay
    }
});
