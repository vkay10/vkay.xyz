// The text we want to type out
const subtitleText = "Integrating Network States, Decentralized AI, and Cryptographic Primitives within Parallel Economies";

// Target the element where the text will appear
const dynamicSubtitle = document.getElementById('dynamic-subtitle');

// Create a cursor element for the typewriter effect
const cursorElement = document.createElement('span');
cursorElement.classList.add('blinking-cursor');
dynamicSubtitle.appendChild(cursorElement);

// The speed of typing
const typingSpeed = 65;
let ellipsisInterval;

// Function to add the typewriter effect
function typeWriterEffect(text, element, speed) {
    let index = 0;
    element.textContent = ''; // Reset content before typing

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            // After the full text is typed, add the dynamic "..." effect
            addEllipsis(element);
        }
    }
    type();
}

// Function to add "..." at the end dynamically, and repeat typewriter after 3 cycles
function addEllipsis(element) {
    let dots = 0;
    let cycleCount = 0;

    ellipsisInterval = setInterval(() => {
        if (dots < 3) {
            element.textContent += '.';
            dots++;
        } else {
            element.textContent = element.textContent.slice(0, -3); // Remove "..."
            dots = 0;
            cycleCount++;
        }

        // Once the ellipsis has cycled 3 times, clear the interval and restart typing
        if (cycleCount === 3) {
            clearInterval(ellipsisInterval); // Stop the ellipsis animation
            setTimeout(() => typeWriterEffect(subtitleText, element, typingSpeed), 1000); // Restart the typewriter effect
        }
    }, 500); // Speed of the ellipsis
}

// Call the typewriter effect when the page loads
window.onload = () => {
    typeWriterEffect(subtitleText, dynamicSubtitle, typingSpeed);
};

// script.js

// Detect scrolling and add the "scrolled" class when the user scrolls down
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const body = document.body;

    // Add the 'scrolled' class when the user scrolls down past 100px
    if (scrollPosition > 100) {
        body.classList.add('scrolled');
    } else {
        body.classList.remove('scrolled');
    }
});
