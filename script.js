const anschors = document.querySelectorAll('.menuLink')
for (const anchor of anschors) {
    anchor.addEventListener('click', (e) => {
        e.preventDefault()

        const blockId = anchor.getAttribute('href').substring(1)
        document.getElementById(blockId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

const slides = document.querySelectorAll('.slide');
const progressBarContainers = document.querySelectorAll('.progressBar');
let currentSlide = 0;
let maxSlide = slides.length - 1;
let autoScrollInterval;
let touchStartX;

slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${i * 100}%)`;
});

// Function to handle auto scroll
function autoScroll() {
    if (currentSlide === maxSlide) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    updateSlides();
}

// Start auto scroll
autoScrollInterval = setInterval(autoScroll, 6000);

// Logic for Next slide
const nextSlide = document.querySelector('#btnNext');
nextSlide.onclick = () => {
    clearInterval(autoScrollInterval); // Stop auto scroll when user interacts
    autoScrollInterval = setInterval(autoScroll, 6000); // Restart auto scroll
    if (currentSlide === maxSlide) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    updateSlides();
};

// Logic for Prev slide
const prevSlide = document.querySelector("#btnPrev");
prevSlide.onclick = () => {
    clearInterval(autoScrollInterval); // Stop auto scroll when user interacts
    autoScrollInterval = setInterval(autoScroll, 6000); // Restart auto scroll
    if (currentSlide === 0) {
        currentSlide = maxSlide;
    } else {
        currentSlide--;
    }
    updateSlides();
};

// Update slides and progress bar
function updateSlides() {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
    updateProgressBar();
}

// Progress bar logic
function updateProgressBar() {
    progressBarContainers.forEach((bar, index) => {
        if (index === currentSlide) {
            bar.style.width = '100%';
            bar.classList.add('active')
        } else {
            bar.style.width = '0';
            bar.classList.remove('active')
        }
    });
}

// Handle transition end for progress bar update
slides.forEach(slide => {
    slide.addEventListener('transitionend', updateProgressBar);
    // Pause auto scroll on hover or touch-and-hold
    slide.addEventListener('mouseenter', pauseAutoScroll);
    slide.addEventListener('mouseleave', resumeAutoScroll);
    slide.addEventListener('touchstart', handleTouchStart);
    slide.addEventListener('touchmove', handleTouchMove);
    slide.addEventListener('touchend', handleTouchEnd);

});

function pauseAutoScroll() {
    clearInterval(autoScrollInterval);
}

function resumeAutoScroll() {
    autoScrollInterval = setInterval(autoScroll, 6000);
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    if (!touchStartX) return;

    const touchEndX = event.touches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (deltaX > 50) {
        // Swipe right
        clearInterval(autoScrollInterval); // Stop auto-scroll
        if (currentSlide === 0) {
            currentSlide = maxSlide;
        } else {
            currentSlide--;
        }
        updateSlides();
        touchStartX = null;
    } else if (deltaX < -50) {
        // Swipe left
        clearInterval(autoScrollInterval); // Stop auto-scroll
        if (currentSlide === maxSlide) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        updateSlides();
        touchStartX = null;
    }
}

function handleTouchEnd() {
    touchStartX = null;
}

// Initial progress bar setup
updateProgressBar();

