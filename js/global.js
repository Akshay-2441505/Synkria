// Global JavaScript for EduConnect Platform

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Global Variables
let isLoaded = false;
let currentUser = {
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    notifications: 3
};

// Preloader Animation
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const logoIcon = preloader.querySelector('.logo-animation i');
    const logoText = preloader.querySelector('.logo-animation span');
    const loadingProgress = preloader.querySelector('.loading-progress');
    
    // Animate logo
    gsap.timeline()
        .from(logoIcon, {
            duration: 1,
            scale: 0,
            rotation: 360,
            ease: "back.out(1.7)"
        })
        .from(logoText, {
            duration: 0.8,
            opacity: 0,
            y: 20,
            ease: "power2.out"
        }, "-=0.5")
        .to(loadingProgress, {
            duration: 2,
            width: "100%",
            ease: "power2.inOut"
        }, "-=0.3");
    
    // Hide preloader after loading
    setTimeout(() => {
        gsap.to(preloader, {
            duration: 0.8,
            opacity: 0,
            ease: "power2.inOut",
            onComplete: () => {
                preloader.style.display = 'none';
                isLoaded = true;
                initPageAnimations();
            }
        });
    }, 3000);
}

// Navigation Scroll Effect
function initNavigation() {
    const navbar = document.getElementById('mainNavbar');
    
    // Navbar scroll effect
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: {
            className: "scrolled",
            targets: navbar
        }
    });
    
    // Mobile menu animation
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            navbarToggler.classList.toggle('collapsed');
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: target,
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
        
        // Animate particle
        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
        });
        
        gsap.to(particle, {
            duration: Math.random() * 20 + 10,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            repeat: -1,
            ease: "none"
        });
        
        gsap.to(particle, {
            duration: Math.random() * 3 + 2,
            opacity: Math.random() * 0.5 + 0.2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });
    }
}

// Floating Shapes Animation
function animateFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    
    shapes.forEach((shape, index) => {
        gsap.to(shape, {
            duration: Math.random() * 10 + 15,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            rotation: Math.random() * 360,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.5
        });
        
        gsap.to(shape, {
            duration: Math.random() * 5 + 3,
            scale: Math.random() * 0.5 + 0.8,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.3
        });
    });
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => {
                gsap.to(counter, {
                    duration: 2,
                    innerHTML: target,
                    snap: { innerHTML: 1 },
                    ease: "power2.out",
                    onUpdate: function() {
                        counter.innerHTML = Math.ceil(counter.innerHTML).toLocaleString();
                    }
                });
            }
        });
    });
}

// Text Animation Effects
function initTextAnimations() {
    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        const words = title.innerHTML.split(' ');
        title.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
        
        ScrollTrigger.create({
            trigger: title,
            start: "top 80%",
            onEnter: () => {
                gsap.from(title.querySelectorAll('.word'), {
                    duration: 0.8,
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                });
            }
        });
    });
}

// Card Hover Effects
function initCardEffects() {
    const cards = document.querySelectorAll('.feature-card, .news-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -10,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                scale: 1,
                boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
                ease: "power2.out"
            });
        });
    });
}

// Button Hover Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.05,
                ease: "back.out(1.7)"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                ease: "back.out(1.7)"
            });
        });
        
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                transform: scale(0);
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            gsap.to(ripple, {
                duration: 0.6,
                scale: 1,
                opacity: 0,
                ease: "power2.out",
                onComplete: () => ripple.remove()
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Fade in animations
    gsap.utils.toArray('[data-aos]').forEach(element => {
        const animation = element.getAttribute('data-aos');
        const delay = element.getAttribute('data-aos-delay') || 0;
        
        let animationProps = {};
        
        switch (animation) {
            case 'fade-up':
                animationProps = { y: 50, opacity: 0 };
                break;
            case 'fade-down':
                animationProps = { y: -50, opacity: 0 };
                break;
            case 'fade-left':
                animationProps = { x: -50, opacity: 0 };
                break;
            case 'fade-right':
                animationProps = { x: 50, opacity: 0 };
                break;
            default:
                animationProps = { opacity: 0 };
        }
        
        gsap.from(element, {
            ...animationProps,
            duration: 1,
            delay: delay / 1000,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background, .floating-shapes');
    
    parallaxElements.forEach(element => {
        gsap.to(element, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        padding: 1rem 1.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        border-left: 4px solid ${type === 'success' ? '#43e97b' : type === 'error' ? '#ff5f56' : '#667eea'};
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    gsap.from(notification, {
        duration: 0.5,
        x: 100,
        opacity: 0,
        ease: "back.out(1.7)"
    });
    
    // Auto remove
    setTimeout(() => {
        gsap.to(notification, {
            duration: 0.3,
            x: 100,
            opacity: 0,
            ease: "power2.in",
            onComplete: () => notification.remove()
        });
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        gsap.to(notification, {
            duration: 0.3,
            x: 100,
            opacity: 0,
            ease: "power2.in",
            onComplete: () => notification.remove()
        });
    });
}

// Loading States
function showLoading(element) {
    const loader = document.createElement('div');
    loader.className = 'loading-spinner';
    loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    loader.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5rem;
        color: #667eea;
    `;
    
    element.style.position = 'relative';
    element.appendChild(loader);
    
    return loader;
}

function hideLoading(loader) {
    if (loader && loader.parentNode) {
        gsap.to(loader, {
            duration: 0.3,
            opacity: 0,
            scale: 0,
            ease: "power2.in",
            onComplete: () => loader.remove()
        });
    }
}

// Utility Functions
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

// Initialize Page Animations
function initPageAnimations() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
    
    // Initialize all animations except particles (handled by homepage)
    animateCounters();
    initTextAnimations();
    initCardEffects();
    initButtonEffects();
    initScrollAnimations();
    initParallaxEffects();
    // createParticles(); // Removed to avoid conflicts with homepage
    animateFloatingShapes();
}

// Responsive Utilities
function handleResize() {
    // Recalculate ScrollTrigger positions
    ScrollTrigger.refresh();
    
    // Recreate particles for new screen size
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        createParticles();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initNavigation();
});

window.addEventListener('resize', debounce(handleResize, 250));

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(script);
}

// Export global functions
window.EduConnect = {
    showNotification,
    showLoading,
    hideLoading,
    currentUser,
    debounce,
    throttle
};

