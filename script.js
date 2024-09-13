// script.js

// Typewriter Effect for Subtitle
const subtitles = [
    "Integrating Network States, Decentralized AI, and Cryptographic Primitives within Parallel Economies",
    "Empowering Human-Machine Collaboration through Decentralized Governance",
    "Revolutionizing Socio-Economic Paradigms with Autonomous AI Agents"
];

// Target the element where the text will appear
const dynamicSubtitle = document.getElementById('dynamic-subtitle');

// Create a cursor element for the typewriter effect
const cursorElement = document.createElement('span');
cursorElement.classList.add('blinking-cursor');
dynamicSubtitle.appendChild(cursorElement);

// Configuration for the typewriter effect
const typingSpeed = 40;    // milliseconds per character
const deletingSpeed = 20;    // milliseconds per character
const pauseDuration = 2500;  // milliseconds to wait before deleting

let currentSubtitleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

// Function to handle typing and deleting
function typeWriter() {
    const currentSubtitle = subtitles[currentSubtitleIndex];
    
    if (isDeleting) {
        // Deleting mode
        dynamicSubtitle.textContent = currentSubtitle.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex === 0) {
            isDeleting = false;
            currentSubtitleIndex = (currentSubtitleIndex + 1) % subtitles.length;
            setTimeout(typeWriter, 500); // Pause before typing next subtitle
        } else {
            setTimeout(typeWriter, deletingSpeed);
        }
    } else {
        // Typing mode
        dynamicSubtitle.textContent = currentSubtitle.substring(0, currentCharIndex + 1);
        currentCharIndex++;

        if (currentCharIndex === currentSubtitle.length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseDuration);
        } else {
            setTimeout(typeWriter, typingSpeed);
        }
    }

    // Re-append the cursor after updating the text
    dynamicSubtitle.appendChild(cursorElement);
}

// Initialize the typewriter effect when the page loads
window.onload = () => {
    typeWriter();

    // Load theme preference on page load
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Check if music was playing
    if (localStorage.getItem('isMusicPlaying') === 'true') {
        const audio = document.getElementById('backgroundMusic');
        const playButton = document.getElementById('playButton');
        const playIcon = playButton.querySelector('i');
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    }

    // Initialize Animated Text
    initializeAnimatedText();
};

// Toggle Music Function
function toggleMusic() {
    var audio = document.getElementById('backgroundMusic');
    var playButton = document.getElementById('playButton');
    var playIcon = playButton.querySelector('i'); // Get the icon inside the button

    if (audio.paused) {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');  // Change icon to 'pause'
        localStorage.setItem('isMusicPlaying', 'true');
    } else {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');  // Change icon back to 'play'
        localStorage.setItem('isMusicPlaying', 'false');
    }
}

// Countdown Timer
document.addEventListener("DOMContentLoaded", function() {
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
});

// Debounce Function to Optimize Scroll Events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Dynamic Black Section Opacity Based on Scroll
document.addEventListener("DOMContentLoaded", function() {
    const blackSection = document.querySelector('.black-section');

    // Function to update background opacity based on scroll position
    function updateBackgroundOpacity() {
        const scrollPosition = window.scrollY + window.innerHeight; // Bottom of the viewport
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

    // Attach the debounced scroll event listener
    window.addEventListener('scroll', debounce(updateBackgroundOpacity));
    window.addEventListener('resize', debounce(updateBackgroundOpacity)); // Adjusts on window resize
});

// Image Fade Out on Scroll (Optional Enhancement)
document.addEventListener("DOMContentLoaded", function() {
    const lainImage = document.querySelector('main img');
    window.addEventListener('scroll', debounce(function() {
        const scrollThreshold = window.innerHeight / 2; // Adjust this value as needed

        // Fade out the image when the user scrolls past half the viewport height
        if (window.scrollY > scrollThreshold) {
            lainImage.style.opacity = 0;
        } else {
            lainImage.style.opacity = 1;
        }
    }));
});


