// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initActiveNavigation();
    initSmoothScrolling();
    initProjectCardAnimations();
    initSkillCardAnimations();
    initSocialLinks();
    initNavbarScroll();
    initTypewriterEffect();
    initParallaxEffects();
    initAccessibilityFeatures();
    initPerformanceOptimizations();
    
    // Initialize advanced features with delay
    setTimeout(() => {
        initAdvancedAnimations();
        initInteractiveElements();
        initCardRevealAnimations();
        initStatusBadgeAnimations();
    }, 100);
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    // Toggle mobile menu
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('nav-menu--open');
        navToggle.classList.toggle('nav-toggle--open');
        
        // Add animation class to body to prevent scrolling
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.remove('nav-menu--open');
            navToggle.classList.remove('nav-toggle--open');
            document.body.classList.remove('menu-open');
            
            // Get the target section and scroll to it
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('nav-menu--open');
            navToggle.classList.remove('nav-toggle--open');
            document.body.classList.remove('menu-open');
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('nav-menu--open')) {
            navMenu.classList.remove('nav-menu--open');
            navToggle.classList.remove('nav-toggle--open');
            document.body.classList.remove('menu-open');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for hero action buttons
    const heroButtons = document.querySelectorAll('.hero-actions .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle all internal links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link && link.getAttribute('href') !== '#') {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        }
    });
}

// Active navigation highlighting based on scroll position
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightActiveNav() {
        const scrollPosition = window.scrollY + 150;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('nav-link--active'));
        
        // Add active class to corresponding nav link
        if (currentSection) {
            const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('nav-link--active');
            }
        }
    }
    
    // Initial check
    highlightActiveNav();
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(highlightActiveNav, 10);
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.classList.add('animate-on-scroll');
        if (index % 2 === 0) {
            section.classList.add('animate-left');
        } else {
            section.classList.add('animate-right');
        }
        observer.observe(section);
    });

    // Observe cards with staggered animation
    const cards = document.querySelectorAll('.card, .publication-card, .project-card, .venture-card, .additional-project-card');
    cards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Enhanced project card interactions
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
            
            // Animate highlights
            const highlights = this.querySelectorAll('.highlight');
            highlights.forEach((highlight, index) => {
                setTimeout(() => {
                    highlight.style.transform = 'translateX(4px)';
                    highlight.style.transition = 'all 0.2s ease';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset highlights
            const highlights = this.querySelectorAll('.highlight');
            highlights.forEach(highlight => {
                highlight.style.transform = 'translateX(0)';
            });
        });

        // Add click animation for project links
        const projectLinks = card.querySelectorAll('.project-link, .hf-link');
        projectLinks.forEach(link => {
            link.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                this.style.transform = 'scale(0.95)';
            });
            
            link.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    });

    // Additional project cards
    const additionalProjectCards = document.querySelectorAll('.additional-project-card');
    
    additionalProjectCards.forEach(card => {
        const projectLinks = card.querySelectorAll('.additional-project-link');
        const statusBadge = card.querySelector('.project-status');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px)';
            this.style.borderColor = 'var(--color-primary)';
            
            // Animate status badge
            if (statusBadge) {
                setTimeout(() => {
                    statusBadge.style.transform = 'scale(1.05)';
                    statusBadge.style.transition = 'all 0.2s ease';
                }, 100);
            }
            
            // Animate project links
            projectLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'scale(1.1) rotate(5deg)';
                    link.style.background = 'var(--color-primary)';
                    link.style.color = 'var(--color-btn-primary-text)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = '';
            
            if (statusBadge) {
                statusBadge.style.transform = 'scale(1)';
            }
            
            projectLinks.forEach(link => {
                link.style.transform = 'scale(1) rotate(0deg)';
                link.style.background = '';
                link.style.color = '';
            });
        });
    });
}

// Enhanced skill card interactions
function initSkillCardAnimations() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const skillItems = category.querySelectorAll('.skill-item');
        const categoryIcon = category.querySelector('.skill-category-title i');
        
        category.addEventListener('mouseenter', function() {
            // Animate category icon
            if (categoryIcon) {
                categoryIcon.style.transform = 'scale(1.2) rotate(10deg)';
            }
            
            // Animate skill items with staggered effect
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'scale(1.05) translateY(-2px)';
                    item.style.transition = 'all 0.2s ease';
                }, index * 30);
            });
        });
        
        category.addEventListener('mouseleave', function() {
            if (categoryIcon) {
                categoryIcon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            skillItems.forEach(item => {
                item.style.transform = 'scale(1) translateY(0)';
            });
        });
    });

    // Individual skill item hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'var(--color-primary)';
            this.style.color = 'var(--color-btn-primary-text)';
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-md)';
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.color = '';
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '';
            this.style.zIndex = '1';
        });
    });
}

// Enhanced social link interactions
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    const socialCards = document.querySelectorAll('.social-card');
    
    // Hero social links
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.1)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        link.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        link.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-4px) scale(1.1)';
        });
    });
    
    // Contact social cards
    socialCards.forEach(card => {
        const icon = card.querySelector('i');
        
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Navbar background change on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.nav');
    
    if (!navbar) return;
    
    let lastScrollY = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(var(--color-background-rgb, 252, 252, 249), 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.background = 'rgba(var(--color-background-rgb, 252, 252, 249), 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll (only on mobile)
        if (window.innerWidth <= 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

// Typewriter effect for hero subtitle
function initTypewriterEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    heroSubtitle.style.borderRight = '2px solid var(--color-primary)';
    heroSubtitle.style.animation = 'blink 1s infinite';
    
    let i = 0;
    const typeSpeed = 60;
    
    function typeText() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeText, typeSpeed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroSubtitle.style.borderRight = 'none';
                heroSubtitle.style.animation = 'none';
            }, 1000);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeText, 1500);
}

// Parallax effects
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Advanced animations
function initAdvancedAnimations() {
    // Staggered animation for tags
    const tags = document.querySelectorAll('.tag');
    tags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('fade-in-up');
        
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Publication card enhancements
    const publicationCards = document.querySelectorAll('.publication-card');
    publicationCards.forEach(card => {
        const links = card.querySelectorAll('.publication-link');
        
        card.addEventListener('mouseenter', function() {
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'scale(1.1) rotate(5deg)';
                    link.style.background = 'var(--color-primary)';
                    link.style.color = 'var(--color-btn-primary-text)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            links.forEach(link => {
                link.style.transform = 'scale(1) rotate(0deg)';
                link.style.background = '';
                link.style.color = '';
            });
        });
    });
    
    // Venture card icon animations
    const ventureIcons = document.querySelectorAll('.venture-icon');
    ventureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const iconElement = this.querySelector('i');
            if (iconElement) {
                iconElement.style.transform = 'scale(1.2) rotate(10deg)';
                iconElement.style.transition = 'all 0.3s ease';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            const iconElement = this.querySelector('i');
            if (iconElement) {
                iconElement.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Interactive elements
function initInteractiveElements() {
    // Button click effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Contact item animations
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Card reveal animations
function initCardRevealAnimations() {
    const cards = document.querySelectorAll('.publication-card, .project-card, .venture-card, .additional-project-card, .skill-category');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(card);
    });
}

// Status badge animations
function initStatusBadgeAnimations() {
    const statusBadges = document.querySelectorAll('.project-status');
    
    statusBadges.forEach(badge => {
        // Add pulse animation for warning status
        if (badge.classList.contains('status--warning')) {
            badge.style.animation = 'pulse 2s infinite';
        }
        
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'all 0.2s ease';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Accessibility features
function initAccessibilityFeatures() {
    // Enhanced focus indicators
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.project-card, .publication-card, .venture-card');
    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('a');
                if (link) link.click();
            }
        });
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Debounce function
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Optimized scroll handler
    const optimizedScrollHandler = debounce(function() {
        // Handle scroll-dependent operations here
        const scrollY = window.scrollY;
        
        // Update progress indicator if needed
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollPercent = (scrollY / documentHeight) * 100;
        
        // You could add a progress bar here if desired
    }, 10);
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // Lazy loading for images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Viewport height fix for mobile
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    
    const debouncedSetViewportHeight = debounce(setViewportHeight, 250);
    window.addEventListener('resize', debouncedSetViewportHeight);
    window.addEventListener('orientationchange', debouncedSetViewportHeight);
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes blink {
            0%, 50% { border-color: var(--color-primary); }
            51%, 100% { border-color: transparent; }
        }
        
        .menu-open {
            overflow: hidden;
        }
        
        .nav {
            transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove any loading overlays
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
    
    // Initialize any remaining animations
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Console message for developers
console.log(`
🚀 Portfolio Website for Mohd Ibrahim Afridi
   Independent AI/ML Engineer & Entrepreneur
   
   Features:
   ✅ Responsive Design
   ✅ Smooth Animations  
   ✅ Accessibility Features
   ✅ Performance Optimized
   ✅ Interactive Elements
   ✅ Working Navigation
   ✅ External Links
   
   Contact: mohdibrahimafridi.ai@gmail.com
   GitHub: https://github.com/mohdibrahimai
`);

// Export functions for potential testing or external use
window.portfolioFunctions = {
    initNavigation,
    initScrollAnimations,
    initProjectCardAnimations,
    initSkillCardAnimations,
    initSocialLinks
};