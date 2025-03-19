const emojis = ['🌸', '💙', '💝', '💖', '💕', '💗', '🫶', '💘', '💓'];

// Initialize images array
let images = [];

// Get all images from memory-images div
function getAllImages() {
    const memoryImages = document.querySelectorAll('#memory-images img');
    return Array.from(memoryImages).map(img => img.src);
}

// Load images when document is ready
document.addEventListener('DOMContentLoaded', function() {
    images = getAllImages();
    
    // Set initial button states
    const noBtn = document.querySelector('.no-btn');
    const yesBtn = document.querySelector('.yes-btn');
    noBtn.style.width = window.getComputedStyle(yesBtn).width;
    noBtn.style.height = window.getComputedStyle(yesBtn).height;
});

function createFloatingElement(isPersistent = false) {
    const element = document.createElement('div');
    
    // Use images more frequently (70% chance)
    if (images.length > 0 && Math.random() < 0.7) {
        element.className = 'floating-image';
        const img = document.createElement('img');
        img.src = images[Math.floor(Math.random() * images.length)];
        img.loading = "lazy";
        element.appendChild(img);
    } else {
        element.className = 'flower';
        element.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    }
    
    // Randomize size between 40px and 100px
    const size = Math.random() * (100 - 40) + 40;
    element.style.width = size + 'px';
    element.style.height = size + 'px';
    
    // Random position
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.animationDelay = Math.random() * 5 + 's';
    
    document.getElementById('flowers').appendChild(element);
    
    if (!isPersistent) {
        setTimeout(() => element.remove(), 6000);
    }
}

const noTexts = [
    "Are you sure?", "Really sure?", "Think again!", "Last chance!", 
    "Surely not?", "You might regret this!", "Give it another thought!", 
    "Are you absolutely sure?", "This could be a mistake!", "Have a heart!",
    "Don't be so cold!", "Change your mind!", "Wouldn't you reconsider?",
    "Is that your final answer?", "You're breaking my heart!", "Please say yes!",
    "I'm begging you!", "Don't do this to me!", "Please reconsider!",
    "You're making me sad!", "Think about it!", "Just say yes!",
    "Pretty please!", "I'll be the best!", "Don't let me down!",
    "You know you want to!", "Come on, say yes!", "You can't resist!",
    "One more chance!", "I promise to be good!", "Don't break my heart!",
    "You're better than this!", "I believe in us!", "Just give me a chance!",
    "Please don't go!", "Stay with me!", "Make me happy!",
    "You're the one!", "We're perfect together!", "Don't let love go!",
    "Say yes instead!", "Change your destiny!", "Make the right choice!",
    "You won't regret it!", "Think about our future!", "Give love a chance!",
    "Listen to your heart!", "Follow your heart!", "Choose happiness!",
    "Make it happen!", "Dreams come true!", "Love conquers all!",
    "Say yes to love!", "Open your heart!", "Let's be together!"
];

let currentIndex = 0;
let buttonSize = 24; // Initial font size to match CSS
const maxSize = 100; // Maximum font size
const sizeIncrement = 2; // How much to grow each time

function changeText() {
    const noBtn = document.querySelector('.no-btn');
    const yesBtn = document.querySelector('.yes-btn');
    
    // Get yes button height
    const yesHeight = yesBtn.offsetHeight;
    
    // Add persistent elements on each "No" click
    for(let i = 0; i < 10; i++) {
        setTimeout(() => createFloatingElement(true), i * 100);
    }
    
    // Increment size with a maximum limit
    buttonSize = Math.min(buttonSize + sizeIncrement, maxSize);
    
    // Calculate sizes based on text length
    const text = noTexts[currentIndex % noTexts.length];
    const textLength = text.length;
    const fontSize = Math.min(buttonSize * 0.3, 24); // Reduced max font size
    const buttonWidth = Math.max(200, Math.min(textLength * fontSize * 0.7, 600)); // Adjust width based on text
    
    // Apply new styles
    noBtn.style.fontSize = fontSize + 'px';
    noBtn.style.width = buttonWidth + 'px';
    noBtn.style.height = Math.max(yesHeight, 70) + 'px';
    noBtn.style.padding = '15px 30px';
    
    // Change text
    noBtn.textContent = text;
    currentIndex++;
    
    // Ensure the Yes button stays on top
    document.querySelector('.yes-btn').style.zIndex = '1000';
}

function accepted() {
    alert('Thank you for saying Yes! 💝');
    document.querySelector('.content').innerHTML = '<h1 style="color: #4F94CD;">💝 Thank you for accepting! 💝</h1>';
    
    // Clear all existing flowers before celebration
    document.getElementById('flowers').innerHTML = '';
    
    // Add temporary celebration elements
    for(let i = 0; i < 50; i++) {
        setTimeout(createFloatingElement, i * 100);
    }
}

// Regular floating elements that disappear
setInterval(() => createFloatingElement(false), 300);
