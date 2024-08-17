document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');

    // Function to calculate a random position for the logo
    function getRandomPosition(element) {
        const x = Math.floor(Math.random() * (window.innerWidth - element.clientWidth));
        const y = Math.floor(Math.random() * (window.innerHeight - element.clientHeight));
        return { x, y };
    }

    // Function to move the logo to a random position
    function moveLogo() {
        const position = getRandomPosition(logo);
        logo.style.left = `${position.x}px`;
        logo.style.top = `${position.y}px`;
    }

    // Initial position
    moveLogo();

    // Event listener for mouse hover
    logo.addEventListener('mouseover', () => {
        moveLogo();
    });

    // Event listener for mouse movement near the logo
    document.addEventListener('mousemove', (e) => {
        const logoRect = logo.getBoundingClientRect();
        const distanceX = Math.abs(e.clientX - (logoRect.left + logoRect.width / 2));
        const distanceY = Math.abs(e.clientY - (logoRect.top + logoRect.height / 2));

        if (distanceX < 100 && distanceY < 100) {
            moveLogo();
        }
    });
});
