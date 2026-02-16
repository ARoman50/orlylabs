// Main Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // Initialize navigation scroll effect
    initNavigation();

    // Initialize smooth scrolling
    initSmoothScrolling();

    // Initialize WhatsApp float
    initWhatsAppFloat();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize service cards
    initServiceCards();

    // Initialize lazy loading
    initLazyLoading();
});

// Navigation Scroll Effect
function initNavigation() {
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('mainNav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL
                history.pushState(null, null, targetId);
                
                // Update active nav link
                updateActiveNavLink();
            }
        });
    });
}

// Enhanced WhatsApp Float
function initWhatsAppFloat() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        let lastScrollTop = 0;
        let isVisible = true;
        
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Hide when scrolling down, show when scrolling up
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                if (isVisible) {
                    whatsappFloat.style.transform = 'translateY(100px)';
                    isVisible = false;
                }
            } else if (scrollTop < lastScrollTop) {
                if (!isVisible) {
                    whatsappFloat.style.transform = 'translateY(0)';
                    isVisible = true;
                }
            }
            
            lastScrollTop = scrollTop;
        }, 100));
        
        // Add click analytics
        whatsappFloat.addEventListener('click', function() {
            // You can add Google Analytics or other tracking here
            console.log('WhatsApp contact initiated');
        });
    }
}

// Service Cards Interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
        
        // Keyboard navigation
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent)';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Lazy Loading
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Form Handling (if you add a contact form later)
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Add your form submission logic here
            // For example, using Fetch API to submit to your Flask backend
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                // Your submission logic here
                console.log('Form submitted:', Object.fromEntries(formData));
                
                // Show success message
                alert('Thank you! Your message has been sent.');
                contactForm.reset();
                
            } catch (error) {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
            }
        });
    }
}

// Performance optimizations
window.addEventListener('load', function() {
    // Remove loading state if you have one
    document.body.classList.remove('loading');
    
    // Initialize any deferred content
    setTimeout(() => {
        // Additional post-load initializations
    }, 100);
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    updateActiveNavLink();
});