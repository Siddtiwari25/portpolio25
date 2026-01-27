// ========== Mobile Menu Toggle ==========
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

// Toggle mobile menu
if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// ========== Scroll Sections Active Link ==========
const sections = document.querySelectorAll('section');
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky header
    header.classList.toggle('sticky', scrollY > 100);

    // Active section highlighting
    sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollY >= offset && scrollY < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
            sec.classList.add('show-animate');
        }
    });

    // Close mobile menu on scroll
    if (navbar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
}, { passive: true });

// ========== Skills Progress Bar Animation ==========
document.addEventListener("DOMContentLoaded", function() {
    const skillBars = document.querySelectorAll('.skills-content .progress .bar span');
    
    function showProgress() {
        skillBars.forEach(bar => {
            const parentProgress = bar.closest('.progress');
            const h3Element = parentProgress.querySelector('h3 span');
            if (h3Element) {
                const value = h3Element.textContent.replace('%', '');
                bar.style.width = value + '%';
            }
        });
    }

    // Intersection Observer for skills section
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    showProgress();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(skillsSection);
    }
});

// ========== Contact Form Submission ==========
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[placeholder="Full Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Email"]').value;
        const mobile = contactForm.querySelector('input[placeholder="Mobile Number"]').value;
        const subject = contactForm.querySelector('input[placeholder="Email Subject"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !mobile || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(mobile)) {
            alert('Please enter a valid mobile number');
            return;
        }

        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// ========== Smooth Scroll for all links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for actual page links
        if (href === '#' || !href) return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== Handle Orientation Change for Mobile ==========
window.addEventListener('orientationchange', function() {
    // Close mobile menu on orientation change
    if (menuIcon && navbar) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});

// ========== Keyboard Navigation Enhancement ==========
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});

// ========== Touch Detection and Optimization ==========
let isTouchDevice = false;

window.addEventListener('touchstart', function onFirstTouch() {
    isTouchDevice = true;
    document.body.classList.add('touch-device');
    window.removeEventListener('touchstart', onFirstTouch, false);
}, false);

// ========== Prevent body scroll when mobile menu is open ==========
const body = document.body;

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
}

// ========== Image Loading Optimization ==========
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// ========== Viewport Height Fix for Mobile Browsers ==========
// Fixes the issue where mobile browsers' address bar affects vh units
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);

// ========== Performance: Debounce Resize Events ==========
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced resize handler
const debouncedResize = debounce(() => {
    setVH();
    
    // Close mobile menu on resize if it's open
    if (window.innerWidth > 768 && navbar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
        body.style.overflow = '';
    }
}, 250);

window.addEventListener('resize', debouncedResize);

// ========== Prevent FOUC (Flash of Unstyled Content) ==========
document.documentElement.style.visibility = 'visible';

// ========== Add loading class to body on page load ==========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove any loading overlays if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// ========== Resume PDF Loading ==========
const resumeIframe = document.querySelector('.resume iframe');
if (resumeIframe) {
    resumeIframe.addEventListener('load', () => {
        console.log('Resume loaded successfully');
    });
    
    resumeIframe.addEventListener('error', () => {
        console.error('Error loading resume');
        // You could show a fallback message here
    });
}

// ========== Accessibility: Focus Management ==========
// Trap focus within mobile menu when it's open
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

if (navbar) {
    trapFocus(navbar);
}

// ========== Project Cards Touch Interaction on Mobile ==========
if (isTouchDevice) {
    const projectBoxes = document.querySelectorAll('.project-box');
    
    projectBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // Toggle project layer on mobile tap
            const layer = this.querySelector('.project-layer');
            if (layer) {
                layer.classList.toggle('active');
            }
        });
    });
}

// ========== Smooth Reveal Animation for Sections ==========
const scrollElements = document.querySelectorAll('.animate.scroll');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
}, { passive: true });

// ========== Network Status Detection ==========
window.addEventListener('online', () => {
    console.log('Back online');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    // You could show a notification to the user
});

// ========== Console Message ==========
console.log('%c Portfolio Website ', 'color: #00abf0; font-size: 20px; font-weight: bold;');
console.log('%c Designed by Siddharth Tiwari ', 'color: #ededed; font-size: 14px;');
console.log('%c Fully Responsive & Optimized for Mobile ', 'color: #00abf0; font-size: 12px;');

// ========== Service Worker Registration (Optional - for PWA) ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you create a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ========== Dark Mode Support (Optional Enhancement) ==========
// Check for saved user preference or system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// You can add dark mode toggle functionality here if needed
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load saved preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
