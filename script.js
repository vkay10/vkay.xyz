// script.js
let SCENE;
let CAMERA;
let RENDERER;
let CONTROLS;
let COMPOSER;
let TIME = 10;

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

let sphere;
let intersectionSphere;

let INTERSECTED;

const HOVER_SCALE = 1.0; // Adjusted for hover effect
const NORMAL_SCALE = 0.8; // Smaller initial scale
let targetScale = NORMAL_SCALE;
const SCALE_SPEED = 0.1;

let targetHover = 0.0;

let isSphereHovered = false;
let previousMouseX = null;
let previousMouseY = null;
const ROTATION_SPEED = 0.01;

main();

function main() {
    init();
    animate();
}

function init() {
    initScene();
    initCamera();
    initRenderer();
    initComposer();
    initControls();
    initEventListeners();
    createObjects();
    document.querySelector('.canvas-container').appendChild(RENDERER.domElement);
}

function initScene() {
    SCENE = new THREE.Scene();
    initLights();
}

function initLights() {
    const point = new THREE.PointLight(0xffffff, 1, 0);
    point.position.set(0, 100, 50);
    SCENE.add(point);
}

function initCamera() {
    CAMERA = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    CAMERA.position.y = 100;
    CAMERA.position.z = 80;
}

function initRenderer() {
    RENDERER = new THREE.WebGLRenderer({ alpha: true });
    RENDERER.setPixelRatio(window.devicePixelRatio);
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    RENDERER.shadowMap.enabled = true;
    RENDERER.shadowMapSort = true;
    RENDERER.setClearColor(0x000000, 1.0); // Made background darker
}

function initComposer() {
    COMPOSER = new THREE.EffectComposer(RENDERER);
    COMPOSER.setSize(window.innerWidth, window.innerHeight);
    const renderPass = new THREE.RenderPass(SCENE, CAMERA);
    COMPOSER.addPass(renderPass);
    const bloomPass = new THREE.UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        1,
        0.1
    );
    bloomPass.renderToScreen = true;
    COMPOSER.addPass(bloomPass);
}

function initControls() {
    CONTROLS = new THREE.OrbitControls(CAMERA);
    CONTROLS.enableZoom = false;
    CONTROLS.minPolarAngle = Math.PI * 1 / 4;
    CONTROLS.maxPolarAngle = Math.PI * 3 / 4;
    CONTROLS.update();
}

function initEventListeners() {
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove, false);
    onWindowResize();
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    if (isSphereHovered) {
        if (previousMouseX === null || previousMouseY === null) {
            previousMouseX = event.clientX;
            previousMouseY = event.clientY;
            return;
        }

        let deltaX = event.clientX - previousMouseX;
        let deltaY = event.clientY - previousMouseY;

        sphere.rotation.y += deltaX * ROTATION_SPEED;
        sphere.rotation.x += deltaY * ROTATION_SPEED;

        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }
}

function onWindowResize() {
    CAMERA.aspect = window.innerWidth / window.innerHeight;
    CAMERA.updateProjectionMatrix();
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    COMPOSER.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    CONTROLS.update();
    TIME += 0.005;
    updateUniforms();
    checkIntersection();
    updateHoverEffect();
    render();
}

function updateUniforms() {
    SCENE.traverse(function(child) {
        if (child instanceof THREE.Mesh && child.material.type === 'ShaderMaterial') {
            child.material.uniforms.uTime.value = TIME;
            child.material.needsUpdate = true;
        }
    });
}

function render() {
    CAMERA.lookAt(SCENE.position);
    COMPOSER.render(SCENE, CAMERA);
}

function createObjects() {
    // Visible Sphere
    const geometry = new THREE.SphereBufferGeometry(15, 64, 64);
    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: TIME },
            uHover: { value: 0.0 },
            uColor: { value: new THREE.Color(0x00ff00) } // Initial green color
        },
        transparent: true,
        side: THREE.DoubleSide,
        vertexShader: document.getElementById('sphere-vertex-shader').textContent,
        fragmentShader: document.getElementById('sphere-fragment-shader').textContent
    });
    sphere = new THREE.Mesh(geometry, shaderMaterial);
    sphere.position.y += 10; // Moved sphere up
    sphere.scale.set(NORMAL_SCALE, NORMAL_SCALE, NORMAL_SCALE); // Set initial smaller scale
    SCENE.add(sphere);
    
    // Invisible Intersection Sphere
    const intersectionGeometry = new THREE.SphereBufferGeometry(35, 64, 64);
    const intersectionMaterial = new THREE.MeshBasicMaterial({ visible: false });
    intersectionSphere = new THREE.Mesh(intersectionGeometry, intersectionMaterial);
    intersectionSphere.position.y += 10; // Align with visible sphere
    SCENE.add(intersectionSphere);
}

function checkIntersection() {
    raycaster.setFromCamera(mouse, CAMERA);
    const intersects = raycaster.intersectObjects([intersectionSphere], true);

    if (intersects.length > 0) {
        if (INTERSECTED !== sphere) {
            INTERSECTED = sphere;
            onSphereHover(true);
        }
        return;
    }

    if (INTERSECTED) {
        onSphereHover(false);
        INTERSECTED = null;
    }
}

function onSphereHover(isHovered) {
    isSphereHovered = isHovered;
    targetScale = isHovered ? HOVER_SCALE : NORMAL_SCALE;
    targetHover = isHovered ? 1.0 : 0.0;

    // Change color based on hover state
    if (isHovered) {
        sphere.material.uniforms.uColor.value.set(0xff0000); // Red color on hover
    } else {
        sphere.material.uniforms.uColor.value.set(0x00ff00); // Green color when not hovered
    }

    if (isHovered) {
        previousMouseX = null;
        previousMouseY = null;
        CONTROLS.enabled = false;
    } else {
        CONTROLS.enabled = true;
    }
}

function updateHoverEffect() {
    if (sphere.scale.x !== targetScale) {
        sphere.scale.x += (targetScale - sphere.scale.x) * SCALE_SPEED;
        sphere.scale.y += (targetScale - sphere.scale.y) * SCALE_SPEED;
        sphere.scale.z += (targetScale - sphere.scale.z) * SCALE_SPEED;
    }

    if (sphere.material.uniforms.uHover.value !== targetHover) {
        sphere.material.uniforms.uHover.value += (targetHover - sphere.material.uniforms.uHover.value) * SCALE_SPEED;
    }
}

// Terminal Functionality
document.addEventListener("DOMContentLoaded", () => {
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');

    const initialMessage = "You are about to enter the digital egregore of the HMN...\nAre you ready to proceed?";

    const bootupMessages = [
        "Initializing HMN protocols...",
        "Establishing connection to digital egregore...",
        "Verifying user identity...",
        "Connection successful.",
        "Redirecting to the network.."
    ];

    let currentStage = 'initial'; // 'initial', 'bootup', 'completed'
    let currentMessageIndex = 0;

    // Typewriter Effect Function
    function typeWriter(text, i, callback) {
        if (i < text.length) {
            terminalOutput.innerHTML += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(text, i, callback), 50);
        } else if (callback) {
            terminalOutput.innerHTML += "\n";
            callback();
        }
    }

    // Start the typewriter effect for the initial message
    typeWriter(initialMessage, 0, () => {
        terminalInput.focus();
    });

    // Handle user input
    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && currentStage === 'initial') {
            const userInput = terminalInput.value.trim();
            if (userInput !== "") {
                terminalOutput.innerHTML += "\n" + userInput;
                terminalInput.value = "";
                currentStage = 'bootup';
                terminalInput.disabled = true; // Disable input during bootup
                displayBootupMessage(currentMessageIndex);
            }
        }
    });

    // Display bootup messages sequentially
    function displayBootupMessage(index) {
        if (index < bootupMessages.length) {
            appendBootupMessage(bootupMessages[index], () => {
                // After a short delay, display the next message
                setTimeout(() => {
                    currentMessageIndex++;
                    displayBootupMessage(currentMessageIndex);
                }, 1000);
            });
        } else {
            currentStage = 'completed';
            // Optionally, redirect after completing bootup messages
            setTimeout(() => {
                window.location.href = "network.html"; // Replace with your desired page
            }, 1000);
        }
    }

    // Function to append bootup messages with typewriter effect in smaller text
    function appendBootupMessage(text, callback) {
        const bootupLine = document.createElement('div');
        bootupLine.classList.add('bootup-message');
        terminalOutput.appendChild(bootupLine);
        typeWriterToElement(text, bootupLine, 0, callback);
        scrollToBottom();
    }

    // Typewriter effect for a specific element
    function typeWriterToElement(text, element, i, callback) {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(() => typeWriterToElement(text, element, i, callback), 30);
        } else if (callback) {
            callback();
        }
    }

    // Function to scroll terminal to the bottom
    function scrollToBottom() {
        const terminal = document.getElementById('terminal');
        terminal.scrollTop = terminal.scrollHeight;
    }
});


