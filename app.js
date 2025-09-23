// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initActiveNavigation();
    initSmoothScrolling();
    initProjectCardAnimations();
    initAdditionalProjectCardAnimations();
    initSkillCardAnimations();
    initSocialLinks();
    initNavbarScroll();
    initPublicationCardAnimations();
    initVentureCardAnimations();
    initContactCardAnimations();
    
    // Initialize advanced features
    setTimeout(() => {
        initTypingAnimation();
        initParallaxEffect();
        initAccessibilityFeatures();
        initThemeHandling();
        initViewportFix();
        initCardRevealAnimations();
        initTagAnimations();
    }, 100);
    
    // Set initial loading state
    document.body.classList.add('loaded');
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
        
        // Add aria attributes for accessibility
        const isOpen = navMenu.classList.contains('nav-menu--open');
        navToggle.setAttribute('aria-expanded', isOpen);
        navMenu.setAttribute('aria-hidden', !isOpen);
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('nav-menu--open');
            navToggle.classList.remove('nav-toggle--open');
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('nav-menu--open');
            navToggle.classList.remove('nav-toggle--open');
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
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
}

// Active navigation highlighting based on scroll position
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightActiveNav() {
        const scrollPosition = window.scrollY + 150; // Offset for better UX
        
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
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('animate-on-scroll');
        observer.observe(header);
    });

    // Observe cards with staggered animation
    const cards = document.querySelectorAll('.card, .publication-card, .project-card, .venture-card, .additional-project-card');
    cards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe individual elements
    const elementsToAnimate = document.querySelectorAll('.hero-content, .contact-item, .social-card');
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Enhanced project card interactions
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const projectLink = card.querySelector('.project-link');
        const techTags = card.querySelectorAll('.tech-tag');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
            
            // Animate tech tags with staggered effect
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.05)';
                    tag.style.transition = 'all 0.2s ease';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset tech tags
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
            });
        });

        // Enhanced project link interactions
        if (projectLink) {
            projectLink.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                this.style.transform = 'scale(0.9)';
            });
            
            projectLink.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1.3) rotate(15deg)';
            });
            
            projectLink.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });
}

// Additional project card animations
function initAdditionalProjectCardAnimations() {
    const additionalProjectCards = document.querySelectorAll('.additional-project-card');
    
    additionalProjectCards.forEach(card => {
        const projectLink = card.querySelector('.additional-project-link');
        const statusBadge = card.querySelector('.project-status');
        const categoryBadge = card.querySelector('.additional-project-category');
        
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
            
            // Animate category badge
            if (categoryBadge) {
                setTimeout(() => {
                    categoryBadge.style.transform = 'translateX(4px)';
                    categoryBadge.style.transition = 'all 0.2s ease';
                }, 150);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = '';
            
            if (statusBadge) {
                statusBadge.style.transform = 'scale(1)';
            }
            
            if (categoryBadge) {
                categoryBadge.style.transform = 'translateX(0)';
            }
        });

        // Project link interactions
        if (projectLink) {
            projectLink.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                this.style.transform = 'scale(0.9)';
            });
            
            projectLink.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1.1) rotate(10deg)';
            });
            
            projectLink.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        }
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
                categoryIcon.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
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
            this.style.transform = 'scale(1.1) translateY(-4px)';
            this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = 'none';
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
            this.style.transform = 'translateY(-4px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        link.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-4px) scale(0.95)';
        });
        
        link.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-4px) scale(1)';
        });
    });
    
    // Contact social cards
    socialCards.forEach(card => {
        const icon = card.querySelector('i');
        
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(15deg)';
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

// Publication card animations
function initPublicationCardAnimations() {
    const publicationCards = document.querySelectorAll('.publication-card');
    
    publicationCards.forEach(card => {
        const publicationLink = card.querySelector('.publication-link');
        const repoButton = card.querySelector('.btn');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.03)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Enhanced publication link interactions
        if (publicationLink) {
            publicationLink.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(15deg)';
                this.style.transition = 'all 0.2s ease';
            });
            
            publicationLink.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        }
        
        // Repository button animations
        if (repoButton) {
            repoButton.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
                this.style.transition = 'all 0.2s ease';
            });
            
            repoButton.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
    });
}

// Venture card animations
function initVentureCardAnimations() {
    const ventureCards = document.querySelectorAll('.venture-card');
    
    ventureCards.forEach(card => {
        const ventureButton = card.querySelector('.btn');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        if (ventureButton) {
            ventureButton.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
                this.style.transition = 'all 0.2s ease';
            });
            
            ventureButton.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
    });
}

// Contact card animations
function initContactCardAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const icon = item.querySelector('i');
        
        item.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
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
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.scrollY;
        
        if (currentScrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScrollTop;
    });
}

// Typing animation for hero subtitle
function initTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    heroSubtitle.style.borderRight = '2px solid var(--color-primary)';
    heroSubtitle.style.opacity = '1'; // Override the CSS animation
    
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
            }, 1000);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeText, 2000);
}

// Parallax effect for hero section
function initParallaxEffect() {
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
        if (!ticking && window.innerWidth > 768) { // Only on desktop
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Enhanced tag hover effects in hero section
function initTagAnimations() {
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach((tag, index) => {
        // Staggered initial animation
        tag.style.animationDelay = `${1 + (index * 0.1)}s`;
        
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
        
        tag.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(1.02)';
        });
        
        tag.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
    });
}

// Card reveal animations
function initCardRevealAnimations() {
    const cards = document.querySelectorAll('.publication-card, .project-card, .venture-card, .additional-project-card');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-reveal');
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        revealObserver.observe(card);
    });
}

// Performance optimization: Debounce function
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

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navToggle && navMenu.classList.contains('nav-menu--open')) {
            navMenu.classList.remove('nav-menu--open');
            navToggle.classList.remove('nav-toggle--open');
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        }
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse interaction
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for accessibility
function initAccessibilityFeatures() {
    // Enhanced focus indicators
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            if (document.body.classList.contains('keyboard-navigation')) {
                this.style.outline = '2px solid var(--color-primary)';
                this.style.outlineOffset = '2px';
            }
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
        padding: 8px 12px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
        font-weight: 500;
        transition: top 0.2s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels to interactive elements
    const projectLinks = document.querySelectorAll('.project-link, .additional-project-link');
    projectLinks.forEach(link => {
        const projectTitle = link.closest('.project-card, .additional-project-card')?.querySelector('.project-title, .additional-project-title')?.textContent;
        if (projectTitle) {
            link.setAttribute('aria-label', `View ${projectTitle} on GitHub`);
        }
    });
    
    // Add ARIA labels to social links
    const socialLinks = document.querySelectorAll('.social-link, .social-card');
    socialLinks.forEach(link => {
        const platform = link.href?.includes('github') ? 'GitHub' : 
                         link.href?.includes('linkedin') ? 'LinkedIn' : 
                         link.href?.includes('mailto') ? 'Email' : 'Social';
        link.setAttribute('aria-label', `Visit ${platform} profile`);
    });
}

// Theme detection and handling
function initThemeHandling() {
    // Detect system theme preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateNavbarForTheme(isDark) {
        const navbar = document.querySelector('.nav');
        if (navbar) {
            if (isDark) {
                navbar.style.background = 'rgba(0, 0, 0, 0.98)';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
            }
        }
    }
    
    // Initial setup
    updateNavbarForTheme(prefersDarkScheme.matches);
    
    // Listen for changes in system theme preference
    prefersDarkScheme.addEventListener('change', function(e) {
        updateNavbarForTheme(e.matches);
    });
}

// Add viewport height fix for mobile browsers
function initViewportFix() {
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    
    // Debounce resize events
    const debouncedSetViewportHeight = debounce(setViewportHeight, 250);
    window.addEventListener('resize', debouncedSetViewportHeight);
    window.addEventListener('orientationchange', debouncedSetViewportHeight);
}

// Add click effects to buttons
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
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
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);

// Initialize button effects after DOM load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initButtonEffects, 100);
});

// Add error handling for failed external links
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.host + '"])');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
        
        // Add security attributes
        if (!link.getAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor loading performance
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
    
    // Monitor scroll performance
    let scrolling = false;
    window.addEventListener('scroll', function() {
        if (!scrolling) {
            window.requestAnimationFrame(function() {
                scrolling = false;
            });
            scrolling = true;
        }
    });
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    initPerformanceMonitoring();
}

// Smooth page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Initialize everything when page is fully loaded
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
    
    // Initialize tag animations after load
    initTagAnimations();
});

// Service Worker registration (for future PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration can be added here for PWA support
    });
}

// Add lazy loading for images (if any are added later)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Add smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@1.4.10/src/smoothscroll.js';
    document.head.appendChild(script);
}