/*
FINAL SCRIPT for Narmada Engineering
*/
// --- Set current year in footer ---
const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
currentYearSpan.textContent = new Date().getFullYear();
}
// --- Header scroll effect ---
const header = document.getElementById('home-header');
if (header) {
window.addEventListener('scroll', () => {
if (window.scrollY > 50) {
header.classList.add('scrolled');
} else {
header.classList.remove('scrolled');
}
});
}
// --- Back to Top button functionality ---
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
window.addEventListener('scroll', () => {
if (window.scrollY > 300) {
backToTopButton.classList.remove('hidden');
} else {
backToTopButton.classList.add('hidden');
}
});
backToTopButton.addEventListener('click', () => {
window.scrollTo({
top: 0,
behavior: 'smooth'
});
});
}
// --- Intersection Observer for fade-in-on-scroll animations ---
const animatedElements = document.querySelectorAll('.fade-in-section');
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('in-view');
observer.unobserve(entry.target); // Stop observing once animated
}
});
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible
animatedElements.forEach(element => {
observer.observe(element);
});
// --- Mobile Menu Toggle ---
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (menuButton && mobileMenu) {
menuButton.addEventListener('click', () => {
// This line adds or removes the 'hidden' class to show/hide the menu
mobileMenu.classList.toggle('hidden');
});
}

// --- NEW AUTOMATIC HERO SLIDER ---
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.getElementById('hero-slider-container');
    if (sliderContainer) {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        let slideInterval;

        const showSlide = (n) => {
            // इंडेक्स को संभालें
            if (n >= slides.length) {
                currentSlide = 0;
            } else if (n < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = n;
            }

            // सभी स्लाइड्स को छिपाएं और सही को दिखाएं
            slides.forEach((slide, index) => {
                if (index === currentSlide) {
                    slide.classList.remove('opacity-0');
                    slide.classList.add('opacity-100');
                } else {
                    slide.classList.remove('opacity-100');
                    slide.classList.add('opacity-0');
                }
            });

            // डॉट्स को अपडेट करें
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('bg-white');
                    dot.classList.remove('bg-white/50');
                } else {
                    dot.classList.remove('bg-white');
                    dot.classList.add('bg-white/50');
                }
            });
        };

        const nextSlide = () => {
            showSlide(currentSlide + 1);
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000); // 5 सेकंड
        };

        // डॉट्स पर क्लिक इवेंट्स
        dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.getAttribute('data-slide'));
                showSlide(slideIndex);
                resetInterval();
            });
        });

        // स्लाइडर शुरू करें
        showSlide(0); // पहली स्लाइड तुरंत दिखाएं
        slideInterval = setInterval(nextSlide, 5000); // ऑटो-स्लाइड शुरू करें
    }
});