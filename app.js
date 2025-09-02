// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initActiveNavigation();
    initSmoothScrolling();
    initProjectCardAnimations();
    initCompleteProjectCardAnimations();
    initSkillCardAnimations();
    initSocialLinks();
    initNavbarScroll();
    
    // Initialize advanced features
    setTimeout(() => {
        initTypingAnimation();
        initParallaxEffect();
        initAccessibilityFeatures();
        initThemeHandling();
        initViewportFix();
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
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('nav-menu--open');
            navToggle.classList.remove('nav-toggle--open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('nav-menu--open');
            navToggle.classList.remove('nav-toggle--open');
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Don't unobserve to allow re-triggering if needed
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
    const cards = document.querySelectorAll('.card, .publication-card, .project-card, .venture-card, .complete-project-card');
    cards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe individual elements
    const elementsToAnimate = document.querySelectorAll('.hero-content, .section-header, .contact-item, .social-card');
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Enhanced project card interactions
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add click animation for project links
        const projectLink = card.querySelector('.project-link');
        if (projectLink) {
            projectLink.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            projectLink.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1.2) rotate(10deg)';
            });
        }
    });
}

// Complete project card animations
function initCompleteProjectCardAnimations() {
    const completeProjectCards = document.querySelectorAll('.complete-project-card');
    
    completeProjectCards.forEach(card => {
        const projectLink = card.querySelector('.complete-project-link');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.borderColor = 'var(--color-primary)';
            
            if (projectLink && !projectLink.classList.contains('disabled')) {
                projectLink.style.transform = 'scale(1.1) rotate(5deg)';
                projectLink.style.background = 'var(--color-primary)';
                projectLink.style.color = 'var(--color-btn-primary-text)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = '';
            
            if (projectLink && !projectLink.classList.contains('disabled')) {
                projectLink.style.transform = 'scale(1) rotate(0deg)';
                projectLink.style.background = '';
                projectLink.style.color = '';
            }
        });

        // Add staggered hover effects to status badges
        const statusBadge = card.querySelector('.project-status');
        if (statusBadge) {
            card.addEventListener('mouseenter', function() {
                setTimeout(() => {
                    statusBadge.style.transform = 'scale(1.05)';
                    statusBadge.style.transition = 'all 0.2s ease';
                }, 100);
            });
            
            card.addEventListener('mouseleave', function() {
                statusBadge.style.transform = 'scale(1)';
            });
        }

        // Add category badge hover effects
        const categoryBadge = card.querySelector('.complete-project-category');
        if (categoryBadge) {
            card.addEventListener('mouseenter', function() {
                setTimeout(() => {
                    categoryBadge.style.transform = 'translateX(4px)';
                    categoryBadge.style.transition = 'all 0.2s ease';
                }, 50);
            });
            
            card.addEventListener('mouseleave', function() {
                categoryBadge.style.transform = 'translateX(0)';
            });
        }
    });

    // Add click effects for complete project links
    const completeProjectLinks = document.querySelectorAll('.complete-project-link:not(.disabled)');
    completeProjectLinks.forEach(link => {
        link.addEventListener('mousedown', function(e) {
            e.stopPropagation();
            this.style.transform = 'scale(0.9)';
        });
        
        link.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
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
                categoryIcon.style.transform = 'scale(1.2) rotate(5deg)';
            }
            
            // Animate skill items with staggered effect
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'scale(1.05)';
                    item.style.transition = 'all 0.2s ease';
                }, index * 30);
            });
        });
        
        category.addEventListener('mouseleave', function() {
            if (categoryIcon) {
                categoryIcon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            skillItems.forEach(item => {
                item.style.transform = 'scale(1)';
            });
        });
    });

    // Individual skill item hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-4px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
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
            this.style.transform = 'translateY(-2px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contact social cards
    socialCards.forEach(card => {
        const icon = card.querySelector('i');
        
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Navbar background change on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.nav');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(252, 252, 249, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(252, 252, 249, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Utility function to add typing animation to hero text
function initTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    heroSubtitle.style.borderRight = '2px solid var(--color-primary)';
    
    let i = 0;
    const typeSpeed = 80;
    
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
    setTimeout(typeText, 1500);
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
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

// Performance optimization: Debounce scroll events
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

// Enhanced tag hover effects in hero section
function initTagAnimations() {
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Initialize tag animations after load
    initTagAnimations();
    
    // Remove any loading overlays
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
});

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navToggle && navMenu.classList.contains('nav-menu--open')) {
            navMenu.classList.remove('nav-menu--open');
            navToggle.classList.remove('nav-toggle--open');
        }
    }
});

// Add focus styles for accessibility
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
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.background = 'var(--color-primary)';
    skipLink.style.color = 'var(--color-btn-primary-text)';
    skipLink.style.padding = '8px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.borderRadius = '4px';
    skipLink.style.zIndex = '9999';
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Theme detection and handling
function initThemeHandling() {
    // Detect system theme preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for changes in system theme preference
    prefersDarkScheme.addEventListener('change', function(e) {
        console.log('Theme preference changed to:', e.matches ? 'dark' : 'light');
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

// Enhanced publication and project link interactions
function initPublicationLinks() {
    const publicationLinks = document.querySelectorAll('.publication-link');
    
    publicationLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.background = 'var(--color-primary)';
            this.style.color = 'var(--color-btn-primary-text)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'transparent';
            this.style.color = 'var(--color-primary)';
        });
    });
}

// Initialize publication links after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initPublicationLinks, 100);
});

// Add smooth reveal animations for cards
function initCardRevealAnimations() {
    const cards = document.querySelectorAll('.publication-card, .project-card, .venture-card, .complete-project-card');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
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

// Initialize card reveal animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initCardRevealAnimations, 200);
});

// Add click effects to buttons
function initButtonEffects() {
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
    });
}

// Initialize button effects
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
    });
});

// Project status badge animations
function initStatusBadgeAnimations() {
    const statusBadges = document.querySelectorAll('.project-status');
    
    statusBadges.forEach(badge => {
        // Add pulse animation for "In Development" status
        if (badge.classList.contains('status--warning')) {
            badge.style.animation = 'pulse 2s infinite';
        }
        
        // Add hover effects for all status badges
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'all 0.2s ease';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize status badge animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initStatusBadgeAnimations, 100);
});

// Add search functionality for projects (optional enhancement)
function initProjectSearch() {
    // This could be implemented as a future enhancement
    // For now, we'll add a simple filter by category functionality
    
    const completeProjectCards = document.querySelectorAll('.complete-project-card');
    
    // Add category-based filtering if needed in the future
    // This is a placeholder for potential search functionality
}

// Add enhanced scroll-triggered animations for the complete projects section
function initCompleteProjectsScrollAnimations() {
    const completeProjectsSection = document.querySelector('.complete-projects-section');
    const completeProjectCards = document.querySelectorAll('.complete-project-card');
    
    if (!completeProjectsSection) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate cards with staggered delay
                completeProjectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, index * 50);
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Initially hide all cards
    completeProjectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    observer.observe(completeProjectsSection);
}

// Initialize complete projects scroll animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initCompleteProjectsScrollAnimations, 300);
});