// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initActiveNavigation();
    initScrollAnimations();
    initProjectCardAnimations();
    initFlagshipCardAnimations();
    initSkillCardAnimations();
    initSocialLinks();
    initNavbarScroll();
    initPublicationLinks();
    initContactAnimations();
    initTagAnimations();
    
    // Initialize advanced features
    setTimeout(() => {
        initTypingAnimation();
        initParallaxEffect();
        initAccessibilityFeatures();
        initThemeHandling();
        initViewportFix();
        initButtonEffects();
        initCardRevealAnimations();
        initPerformanceOptimizations();
    }, 100);
    
    console.log('🚀 Mohd Ibrahim Afridi Portfolio - Initialized successfully!');
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

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('nav-menu--open')) {
            navMenu.classList.remove('nav-menu--open');
            navToggle.classList.remove('nav-toggle--open');
        }
    });
}

// Smooth scrolling for all internal navigation
function initSmoothScrolling() {
    // Handle all internal navigation links
    document.addEventListener('click', function(e) {
        // Check if clicked element or its parent is a link with href starting with #
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (!href || href === '#' || href.length <= 1) return;
        
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.nav')?.offsetHeight || 64;
            const targetPosition = targetElement.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
            });
        }
    });
    
    // Specific handlers for navigation links and buttons
    const allInternalLinks = document.querySelectorAll('a[href^="#"]');
    allInternalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || href.length <= 1) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav')?.offsetHeight || 64;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
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
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe individual elements
    const elementsToAnimate = document.querySelectorAll('.hero-content, .section-header');
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
        const categoryTag = card.querySelector('.project-category-tag');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
            
            // Animate category tag
            if (categoryTag) {
                categoryTag.style.transform = 'translateX(4px)';
                categoryTag.style.transition = 'all 0.2s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            if (categoryTag) {
                categoryTag.style.transform = 'translateX(0)';
            }
        });

        // Enhanced project link interactions
        if (projectLink) {
            projectLink.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(10deg)';
                this.style.background = 'var(--color-primary)';
                this.style.color = 'var(--color-btn-primary-text)';
            });
            
            projectLink.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.background = '';
                this.style.color = '';
            });
        }
    });
}

// Flagship project card animations
function initFlagshipCardAnimations() {
    const flagshipCards = document.querySelectorAll('.flagship-card');
    
    flagshipCards.forEach(card => {
        const projectLink = card.querySelector('.project-link');
        const highlights = card.querySelectorAll('.highlight');
        const category = card.querySelector('.project-category');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
            
            // Animate highlights with stagger
            highlights.forEach((highlight, index) => {
                setTimeout(() => {
                    highlight.style.transform = 'translateX(4px)';
                    highlight.style.transition = 'all 0.2s ease';
                }, index * 50);
            });
            
            // Animate category
            if (category) {
                setTimeout(() => {
                    category.style.transform = 'scale(1.05)';
                    category.style.transition = 'all 0.2s ease';
                }, 100);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            highlights.forEach(highlight => {
                highlight.style.transform = 'translateX(0)';
            });
            
            if (category) {
                category.style.transform = 'scale(1)';
            }
        });

        // Enhanced project link interactions
        if (projectLink) {
            projectLink.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(10deg)';
                this.style.background = 'var(--color-primary)';
                this.style.color = 'var(--color-btn-primary-text)';
            });
            
            projectLink.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.background = '';
                this.style.color = '';
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

// Publication link interactions
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

// Contact section animations - Updated for new structure
function initContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    const contactAvailability = document.querySelector('.contact-availability');
    
    // Animate contact items
    contactItems.forEach(item => {
        const icon = item.querySelector('i');
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
            this.style.background = 'var(--color-secondary)';
            
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.background = '';
            
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Animate availability section
    if (contactAvailability) {
        contactAvailability.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        contactAvailability.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Tag animations in hero section
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

// Navbar background change on scroll - Updated for black/white theme
function initNavbarScroll() {
    const navbar = document.querySelector('.nav');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (window.scrollY > 50) {
            if (isDarkMode) {
                navbar.style.background = 'rgba(31, 33, 33, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 2px 20px rgba(255,255,255,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            }
        } else {
            if (isDarkMode) {
                navbar.style.background = 'rgba(31, 33, 33, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = 'none';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
}

// Typing animation for hero subtitle
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

// Button effects
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

// Card reveal animations
function initCardRevealAnimations() {
    const cards = document.querySelectorAll('.publication-card, .flagship-card, .project-card, .venture-card, .skill-category');
    
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

// Performance optimizations
function initPerformanceOptimizations() {
    // Preload critical resources
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
    
    // Lazy load images if any are added in the future
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
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
    
    // Announce section changes for screen readers
    const sections = document.querySelectorAll('section[id]');
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    let currentSection = '';
    window.addEventListener('scroll', debounce(function() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (currentSection !== sectionId) {
                    currentSection = sectionId;
                    const sectionTitle = section.querySelector('h2, h1');
                    if (sectionTitle) {
                        announcer.textContent = `Now viewing ${sectionTitle.textContent} section`;
                    }
                }
            }
        });
    }, 1000));
}

// Theme detection and handling - Updated for black/white nav
function initThemeHandling() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for changes in system theme preference
    prefersDarkScheme.addEventListener('change', function(e) {
        updateThemeSpecificElements(e.matches);
        updateNavbarTheme(e.matches);
    });
    
    // Initial theme setup
    updateThemeSpecificElements(prefersDarkScheme.matches);
    updateNavbarTheme(prefersDarkScheme.matches);
}

function updateThemeSpecificElements(isDark) {
    // Update any elements that need theme-specific handling
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (isDark) {
            card.style.setProperty('--shadow-color', 'rgba(255, 255, 255, 0.1)');
        } else {
            card.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
        }
    });
}

function updateNavbarTheme(isDark) {
    const navbar = document.querySelector('.nav');
    if (!navbar) return;
    
    if (isDark) {
        navbar.style.background = 'rgba(31, 33, 33, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
    }
}

// Viewport height fix for mobile browsers
function initViewportFix() {
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    
    const debouncedSetViewportHeight = debounce(setViewportHeight, 250);
    window.addEventListener('resize', debouncedSetViewportHeight);
    window.addEventListener('orientationchange', debouncedSetViewportHeight);
}

// Utility function: Debounce
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

// Enhanced loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
    
    // Remove any loading overlays
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
    
    // Initialize performance monitoring
    if ('performance' in window) {
        const navigationTiming = performance.getEntriesByType('navigation')[0];
        if (navigationTiming) {
            console.log(`Page load time: ${navigationTiming.loadEventEnd - navigationTiming.loadEventStart}ms`);
        }
    }
});

// Enhanced venture card animations
function initVentureCardAnimations() {
    const ventureCards = document.querySelectorAll('.venture-card');
    
    ventureCards.forEach(card => {
        const title = card.querySelector('.venture-title');
        const amazonButton = card.querySelector('.btn');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            
            if (title) {
                title.style.color = 'var(--color-primary)';
                title.style.transition = 'color 0.3s ease';
            }
            
            if (amazonButton) {
                amazonButton.style.transform = 'scale(1.05)';
                amazonButton.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            
            if (title) {
                title.style.color = '';
            }
            
            if (amazonButton) {
                amazonButton.style.transform = 'scale(1)';
            }
        });
    });
}

// Initialize venture card animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initVentureCardAnimations, 150);
});

// Add error handling for failed external links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="http"]');
    if (link) {
        // Add visual feedback for external links
        link.style.opacity = '0.7';
        setTimeout(() => {
            link.style.opacity = '1';
        }, 200);
    }
});

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Handle arrow keys for navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentSection = sections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        });
        
        if (currentSection) {
            const currentIndex = sections.indexOf(currentSection);
            let nextIndex;
            
            if (e.key === 'ArrowDown') {
                nextIndex = currentIndex + 1;
            } else {
                nextIndex = currentIndex - 1;
            }
            
            if (nextIndex >= 0 && nextIndex < sections.length) {
                e.preventDefault();
                const nextSection = sections[nextIndex];
                const navHeight = document.querySelector('.nav')?.offsetHeight || 64;
                window.scrollTo({
                    top: nextSection.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        }
    }
});

// Add staggered card animations
function initStaggeredCardAnimations() {
    const cardGroups = {
        'skills': document.querySelectorAll('.skill-category'),
        'publications': document.querySelectorAll('.publication-card'),
        'flagship': document.querySelectorAll('.flagship-card'),
        'projects': document.querySelectorAll('.project-card'),
        'ventures': document.querySelectorAll('.venture-card')
    };
    
    Object.keys(cardGroups).forEach(groupName => {
        const cards = cardGroups[groupName];
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(card);
        });
    });
}

// Initialize staggered animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initStaggeredCardAnimations, 200);
});

// Add visibility API handling for performance optimization
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause any intensive operations when page is hidden
        document.querySelectorAll('*').forEach(el => {
            if (el.style.animation && el.style.animationPlayState !== 'paused') {
                el.style.animationPlayState = 'paused';
            }
        });
    } else {
        // Resume operations when page becomes visible
        document.querySelectorAll('*').forEach(el => {
            if (el.style.animation && el.style.animationPlayState === 'paused') {
                el.style.animationPlayState = 'running';
            }
        });
    }
});

// Add error handling for failed requests
window.addEventListener('error', function(e) {
    console.warn('Resource failed to load:', e.filename || e.target?.src || e.target?.href);
});

window.addEventListener('unhandledrejection', function(e) {
    console.warn('Unhandled promise rejection:', e.reason);
});