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

// Function to add "..." at the end dynamically, and repeat typewriter after 5 cycles
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

        // Once the ellipsis has cycled 5 times, clear the interval and restart typing
        if (cycleCount === 5) {
            clearInterval(ellipsisInterval); // Stop the ellipsis animation
            setTimeout(() => typeWriterEffect(subtitleText, element, typingSpeed), 1000); // Restart the typewriter effect
        }
    }, 500); // Speed of the ellipsis
}

// Initialize the typewriter effect when the page loads
window.onload = () => {
    typeWriterEffect(subtitleText, dynamicSubtitle, typingSpeed);
};



document.addEventListener("DOMContentLoaded", function() {
    const blackSection = document.querySelector('.black-section');
    const timerElement = document.getElementById('timer'); // Ensure this element exists in your HTML for the countdown

    // Set the date we're counting down to
    var countDownDate = new Date("Oct 16, 2029 23:59:59").getTime();

    // Update the countdown every 1 second
    var countdownFunction = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes, and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the timer element
        timerElement.innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(countdownFunction);
            timerElement.innerHTML = "EXPIRED";
        }
    }, 1000);

    // Function to update background opacity based on scroll position
    function updateBackgroundOpacity() {
        const scrollPosition = window.scrollY + window.innerHeight; // Consider the bottom of the viewport for calculations
        const sectionTop = blackSection.offsetTop;
        const sectionHeight = blackSection.offsetHeight;

        // Define the start and end points for transitioning
        const startTransition = sectionTop - window.innerHeight; // Start transitioning 1 screen above the section
        const endTransition = sectionTop + sectionHeight; // End transitioning at the bottom of the section

        // Calculate the opacity based on the current scroll position
        if (scrollPosition > startTransition && scrollPosition < endTransition) {
            const distanceScrolled = scrollPosition - startTransition;
            const transitionRange = endTransition - startTransition;
            const opacity = Math.min(distanceScrolled / transitionRange, 1);
            blackSection.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        } else if (scrollPosition >= endTransition) {
            blackSection.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        } else {
            blackSection.style.backgroundColor = 'transparent';
        }
    }

    window.addEventListener('scroll', updateBackgroundOpacity);
    window.addEventListener('resize', updateBackgroundOpacity); // Adjusts on window resize
});



document.addEventListener("DOMContentLoaded", function() {
    const lainImage = document.querySelector('main img');
    window.addEventListener('scroll', function() {
        const scrollThreshold = window.innerHeight / 2; // Adjust this value as needed

        // Fade out the image when the user scrolls past half the viewport height
        if (window.scrollY > scrollThreshold) {
            lainImage.style.opacity = 0;
        } else {
            lainImage.style.opacity = 1;
        }
    });
});




