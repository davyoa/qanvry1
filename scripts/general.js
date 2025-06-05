// Create and append the popup form
const createPopupForm = () => {
    const popup = document.createElement('div');
    popup.style = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: 20px;
        box-sizing: border-box;
        overflow-y: auto;
    `;
    popup.innerHTML = `
        <div class="contact-form-section">
            <h2>Ready to Get Started?</h2>
            <p>Your email address will not be published. Required fields are marked *</p>
            
            <form class="contact-form" id="contactForm">
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Your Name *</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Your Email *</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="phone">Your Phone Number *</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="service">Service Needed</label>
                        <select id="service" name="service">
                            <option value="">Select a service</option>
                            <option value="data-analysis">Data Analysis</option>
                            <option value="web-development">Web Development</option>
                            <option value="graphics-design">Graphics Design</option>
                            <option value="digital-marketing">Digital Marketing</option>
                            <option value="consulting">Consulting</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="message">Message *</label>
                    <textarea id="message" name="message" placeholder="Tell us about your project..." required></textarea>
                </div>
                
                <button type="submit" class="submit-btn">
                    <i class="fas fa-paper-plane"></i>
                    Send Message
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(popup);

    // Close popup when clicking outside the content
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.remove();
        }
    });
};

// Add navbar content to the header tag
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector("header");
    if (header) {
        header.innerHTML = `
            <div class="container">
                <nav class="nav">
                    <a href="#" class="logo">QANVRY</a>
                    <ul class="nav-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="/pages/about.html">About Us</a></li>
                        <li><a href="/pages/services.html">Our Services</a></li>
                        <li><a href="/pages/contact.html">Contact</a></li>
                    </ul>
                    <button class="cta-button" id="getStarted">Get Started</button>
                    <div class="mobile-menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </div>
        `;
    }

    // Add event listener to the "Get Started" button
    document.getElementById('getStarted').addEventListener('click', (e) => {
        e.preventDefault();
        createPopupForm();
    });

});



// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    });
}

// Intersection Observer for scroll reveal and counter animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            // Trigger counter animation when stats section is visible
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
        }
    });
});

// Observe all scroll-reveal elements
document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click animation to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});



