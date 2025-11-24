// Function to handle the auto-slide and navigation logic
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    // Home page has 3 main slides now
    const numSlides = 3; 
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    
    // Set a fast autoslide interval (3000ms = 3 seconds)
    const AUTO_SLIDE_INTERVAL = 3000; 
    let currentSlide = 0;
    let slideTimer;

    // Sets the opacity and active dot class
    function updateSlider(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('opacity-100', 'z-10');
            slide.classList.add('opacity-0');
            if (i === index) {
                slide.classList.add('opacity-100', 'z-10');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.remove('bg-white', 'w-8');
            dot.classList.add('bg-white/50', 'w-3');
            if (i === index) {
                // Active dot style: solid white and wider
                dot.classList.remove('bg-white/50', 'w-3');
                dot.classList.add('bg-white', 'w-8');
            }
        });
    }

    // Handles moving to the next slide
    function nextSlide() {
        // Adjust slides.length to numSlides (3) if you want specific count
        currentSlide = (currentSlide + 1) % numSlides; 
        updateSlider(currentSlide);
        resetTimer();
    }
    
    // Handles moving to the previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + numSlides) % numSlides;
        updateSlider(currentSlide);
        resetTimer();
    }
    
    // Resets the auto-slide timer
    function resetTimer() {
        clearTimeout(slideTimer);
        slideTimer = setTimeout(nextSlide, AUTO_SLIDE_INTERVAL);
    }

    // Event listeners for navigation
    if (nextButton) nextButton.addEventListener('click', nextSlide);
    if (prevButton) prevButton.addEventListener('click', prevSlide);

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.slide);
            currentSlide = index;
            updateSlider(currentSlide);
            resetTimer();
        });
    });

    // Initialize the slider if slides exist
    if (slides.length > 0) {
        updateSlider(currentSlide);
        resetTimer(); 
    }
}

// Mobile Menu Toggle Logic
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Change icon from bars to close, or vice versa
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }
}

// Back to Top Button Logic
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Footer Year Logic
function setFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}


// Run all initializations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initMobileMenu();
    initBackToTop();
    setFooterYear();
});