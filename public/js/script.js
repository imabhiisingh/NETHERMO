// Set current year in footer (if an element with id 'current-year' exists)
const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Adjust scroll position for fixed header height (assuming header height is around 80px)
            const offset = 80;
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll visibility and background change
const header = document.getElementById('home-header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // If scrolled down more than 50px
            header.classList.add('scrolled'); // Add 'scrolled' class
        } else {
            header.classList.remove('scrolled'); // Remove 'scrolled' class
        }
    });
}


// Back to Top button functionality
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px down
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll animation
        });
    });
}

// Intersection Observer for scroll-reveal animations
const animateOnScrollElements = document.querySelectorAll('.animate-fade-in-section, .why-us-card, .service-card, .process-step, .contact-info-item'); // Select elements to animate
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view'); // Add 'in-view' class to trigger CSS transition
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, { threshold: 0.15 }); // Trigger when 15% of the element is visible

animateOnScrollElements.forEach(element => {
    observer.observe(element);
});


// Gemini API integration for contact form analysis
const analyzeButton = document.getElementById('analyze-button');
const messageTextarea = document.getElementById('message');
const resultDiv = document.getElementById('gemini-result');
const contactForm = document.getElementById('contact-form');

if (analyzeButton && messageTextarea && resultDiv && contactForm) {
    analyzeButton.addEventListener('click', async () => {
        const userMessage = messageTextarea.value;
        if (!userMessage.trim()) {
            resultDiv.innerHTML = `<p class="text-red-400">Please describe your project requirements in the message box first.</p>`;
            resultDiv.classList.remove('hidden');
            return;
        }

        resultDiv.classList.remove('hidden');
        resultDiv.innerHTML = `<div class="flex flex-col items-center justify-center"><div class="loader"></div><p class="mt-3 text-gray-300">Analyzing your request with AI...</p></div>`;
        analyzeButton.disabled = true;
        analyzeButton.classList.add('opacity-50', 'cursor-not-allowed');

        const prompt = `
            You are an expert engineering assistant for Narmada Engineering, a company specializing in heat exchangers.
            A potential customer has written the following message in a contact form.
            Your task is to analyze their message and provide helpful feedback.
            Our core services are: "Expert Retubing", "In-Situ Cleaning", and "Custom Manufacturing".
            Based on the customer's message below, please do the following:
            1. Identify and list the most relevant service(s) from our core services.
            2. Suggest two clear, concise clarifying questions we could ask the customer to better understand their needs.
            3. Format your response in simple HTML using the following structure:
                <h4 class="text-lg font-bold text-white mb-2">AI-Powered Analysis:</h4>
                <p class="text-gray-300 mb-3">Based on your message, here are our initial suggestions:</p>
                <h5 class="font-semibold text-blue-400 mb-2">Suggested Services:</h5>
                <ul class="list-disc list-inside mb-4 text-gray-300"><li>[Service 1]</li></ul>
                <h5 class="font-semibold text-blue-400 mb-2">Recommended Questions:</h5>
                <ul class="list-disc list-inside text-gray-300"><li>[Question 1]</li><li>[Question 2]</li></ul>
            Customer message: "${userMessage}"
        `;

        try {
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = ""; // Canvas will automatically provide the API key
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                resultDiv.innerHTML = text;
            } else {
                throw new Error("Invalid response structure from API.");
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            resultDiv.innerHTML = `<p class="text-red-400">Sorry, we couldn't analyze your request at this time. Please try again later.</p>`;
        } finally {
            analyzeButton.disabled = false;
            analyzeButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    });

    // Basic form submission handling (for demo purposes)
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Form submitted! (This is a demo, no actual data is sent)');
        // In a real application, you would send this data to a backend server.
        contactForm.reset(); // Clear the form
        resultDiv.classList.add('hidden'); // Hide AI analysis result
    });
}
