// Enhanced smooth animations and effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero animations
    initHeroAnimations();
    
    // Initialize service section animations
    initServiceAnimations();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize WhatsApp float
    initWhatsAppFloat();
    
    // Initialize scroll animations
    initScrollAnimations();
});

function initHeroAnimations() {
    const heroLogo = document.querySelector('.hero-logo');
    const brandName = document.querySelector('.brand-name');
    const heroLead = document.querySelector('.hero-subtitle .lead');
    const heroTagline = document.querySelector('.hero-subtitle .tagline');
    
    // Reset initial states
    if (heroLogo) heroLogo.style.opacity = '0';
    if (brandName) brandName.style.opacity = '0';
    if (heroLead) heroLead.style.opacity = '0';
    if (heroTagline) heroTagline.style.opacity = '0';
    
    // Sequential animation with delays
    setTimeout(() => {
        if (heroLogo) {
            heroLogo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroLogo.style.opacity = '1';
            heroLogo.style.transform = 'translateY(0)';
        }
    }, 300);
    
    setTimeout(() => {
        if (brandName) {
            brandName.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            brandName.style.opacity = '1';
            brandName.style.transform = 'translateY(0)';
        }
    }, 800);
    
    setTimeout(() => {
        if (heroLead) {
            heroLead.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroLead.style.opacity = '1';
            heroLead.style.transform = 'translateY(0)';
        }
    }, 1200);
    
    setTimeout(() => {
        if (heroTagline) {
            heroTagline.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroTagline.style.opacity = '1';
            heroTagline.style.transform = 'translateY(0)';
        }
    }, 1600);
}

function initServiceAnimations() {
    const serviceSections = document.querySelectorAll('.service-section');
    
    // Set alternating slide directions
    serviceSections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('slide-left');
        } else {
            section.classList.add('slide-right');
        }
    });
}

function initScrollAnimations() {
    const serviceSections = document.querySelectorAll('.service-section');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('service-visible');
                }, 150);
            }
        });
    }, observerOptions);

    // Observe service sections
    serviceSections.forEach(section => {
        observer.observe(section);
    });
}

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

function initWhatsAppFloat() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        let lastScrollTop = 0;
        let scrollTimeout;
        
        // Enhanced scroll behavior
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Clear previous timeout
            clearTimeout(scrollTimeout);
            
            // Show/hide based on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down - hide after delay
                scrollTimeout = setTimeout(() => {
                    whatsappFloat.classList.add('hidden');
                }, 150);
            } else {
                // Scrolling up - show immediately
                whatsappFloat.classList.remove('hidden');
            }
            
            // Always show when near bottom of page
            if (scrollTop + windowHeight >= documentHeight - 100) {
                whatsappFloat.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Add click animation
        whatsappFloat.addEventListener('click', function(e) {
            // Add click feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Enhanced performance with throttling
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

// Make scroll handlers more efficient
window.addEventListener('scroll', throttle(function() {
    // Any additional scroll handlers can go here
}, 100));

// Handle page visibility for better performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, reduce animations if needed
    } else {
        // Page is visible
    }
});

// Service page animations
function initServicePageAnimations() {
    const popInElements = document.querySelectorAll('.pop-in');
    
    const popInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('pop-in-visible');
                }, 200);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    popInElements.forEach(element => {
        popInObserver.observe(element);
    });
}

// Initialize on service pages
if (document.querySelector('.service-details-section')) {
    initServicePageAnimations();
}