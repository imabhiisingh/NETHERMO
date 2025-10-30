/*
    NEW PROFESSIONAL SCRIPT for Narmada Engineering
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

// --- Basic Contact Form Submission (Demo) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send this data to a backend server
        // or a service like Formspree, Netlify Forms, or EmailJS.
        
        alert('Thank you for your message! We will get back to you soon. (This is a demo, no data was sent)');
        contactForm.reset(); // Clear the form
    });
}
