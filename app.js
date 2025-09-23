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
    
    // Initialize advanced features with smooth transitions
    setTimeout(() => {
        initTypingAnimation();
        initParallaxEffect();
        initAccessibilityFeatures();
        initThemeHandling();
        initViewportFix();
        initButtonEffects();
        initCardRevealAnimations();
        initPerformanceOptimizations();
        initStaggeredAnimations();
        initVentureCardAnimations();
    }, 100);
    
    console.log('🚀 Mohd Ibrahim Afridi Portfolio - Initialized with smooth animations!');
});

// Navigation functionality with smooth animations
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    // Toggle mobile menu with smooth animation
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = navMenu.classList.contains('nav-menu--open');
        
        if (!isOpen) {
            navMenu.classList.add('nav-menu--open');
            navToggle.classList.add('nav-toggle--open');
            navMenu.style.animation = 'slideDown 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
        } else {
            navMenu.style.animation = 'slideUp 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
            setTimeout(() => {
                navMenu.classList.remove('nav-menu--open');
                navToggle.classList.remove('nav-toggle--open');
            }, 250);
        }
    });

    // Close mobile menu when clicking on nav links with smooth transition
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('nav-menu--open')) {
                navMenu.style.animation = 'slideUp 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
                setTimeout(() => {
                    navMenu.classList.remove('nav-menu--open');
                    navToggle.classList.remove('nav-toggle--open');
                }, 250);
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('nav-menu--open')) {
                navMenu.style.animation = 'slideUp 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
                setTimeout(() => {
                    navMenu.classList.remove('nav-menu--open');
                    navToggle.classList.remove('nav-toggle--open');
                }, 250);
            }
        }
    });

    // Handle escape key with smooth animation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('nav-menu--open')) {
            navMenu.style.animation = 'slideUp 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
            setTimeout(() => {
                navMenu.classList.remove('nav-menu--open');
                navToggle.classList.remove('nav-toggle--open');
            }, 250);
        }
    });
}

// Enhanced smooth scrolling with easing - FIXED VERSION
function initSmoothScrolling() {
    // Custom smooth scroll function with easing
    function smoothScrollTo(targetPosition, duration = 800) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }

        function scrollAnimation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(scrollAnimation);
            }
        }

        requestAnimationFrame(scrollAnimation);
    }

    // Handle navigation links specifically
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav')?.offsetHeight || 70;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                smoothScrollTo(Math.max(0, targetPosition), 900);
                
                // Update active state immediately
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('nav-link--active');
                });
                this.classList.add('nav-link--active');
            }
        });
    });

    // Handle all other internal links (like buttons)
    const otherLinks = document.querySelectorAll('a[href^="#"]:not(.nav-link)');
    otherLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav')?.offsetHeight || 70;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                smoothScrollTo(Math.max(0, targetPosition), 900);
            }
        });
    });
}

// Active navigation highlighting with smooth transitions - FIXED VERSION
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightActiveNav() {
        const scrollPosition = window.scrollY + 200;
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Smoothly transition active states
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const isActive = linkHref === `#${currentSection}`;
            
            if (isActive && !link.classList.contains('nav-link--active')) {
                link.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
                link.classList.add('nav-link--active');
            } else if (!isActive && link.classList.contains('nav-link--active')) {
                link.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
                link.classList.remove('nav-link--active');
            }
        });
    }
    
    // Initial check
    setTimeout(highlightActiveNav, 100);
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(highlightActiveNav, 10);
    }, { passive: true });
}

// Smooth scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections with staggered animations
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.classList.add('animate-on-scroll');
        section.style.animationDelay = `${index * 0.1}s`;
        if (index % 2 === 0) {
            section.classList.add('animate-left');
        } else {
            section.classList.add('animate-right');
        }
        observer.observe(section);
    });

    // Observe cards with enhanced staggered animation
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.05}s`;
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
        observer.observe(card);
    });

    // Observe individual elements
    const elementsToAnimate = document.querySelectorAll('.hero-content, .section-header');
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
        observer.observe(element);
    });
}

// Enhanced project card interactions with smooth animations
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const projectLink = card.querySelector('.project-link');
        const categoryTag = card.querySelector('.project-category-tag');
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Animate category tag with delay
            if (categoryTag) {
                setTimeout(() => {
                    categoryTag.style.transition = 'all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)';
                    categoryTag.style.transform = 'scale(1.05)';
                }, 50);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            if (categoryTag) {
                categoryTag.style.transform = 'scale(1)';
            }
        });

        // Enhanced project link interactions
        if (projectLink) {
            projectLink.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
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

// Enhanced flagship project card animations
function initFlagshipCardAnimations() {
    const flagshipCards = document.querySelectorAll('.flagship-card');
    
    flagshipCards.forEach(card => {
        const projectLink = card.querySelector('.project-link');
        const highlights = card.querySelectorAll('.highlight');
        const category = card.querySelector('.project-category');
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
            this.style.transform = 'translateY(-10px) scale(1.03)';
            
            // Animate highlights with smooth stagger
            highlights.forEach((highlight, index) => {
                setTimeout(() => {
                    highlight.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
                    highlight.style.transform = 'translateX(4px)';
                }, index * 40);
            });
            
            // Animate category with bounce effect
            if (category) {
                setTimeout(() => {
                    category.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    category.style.transform = 'scale(1.1)';
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

        // Enhanced project link interactions with smooth scaling
        if (projectLink) {
            projectLink.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                this.style.transform = 'scale(1.3) rotate(15deg)';
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

// Enhanced skill card interactions with wave animation
function initSkillCardAnimations() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const skillItems = category.querySelectorAll('.skill-item');
        const categoryIcon = category.querySelector('.skill-category-title i');
        
        category.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
            
            // Animate category icon with bounce
            if (categoryIcon) {
                categoryIcon.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                categoryIcon.style.transform = 'scale(1.2) rotate(10deg)';
            }
            
            // Wave animation for skill items
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
                    item.style.transform = 'scale(1.05) translateY(-2px)';
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

    // Individual skill item enhanced hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            this.style.transform = 'scale(1.1) translateY(-4px)';
            this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
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
    
    // Hero social links with bounce effect
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            this.style.transform = 'translateY(-4px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contact social cards with enhanced animations
    socialCards.forEach(card => {
        const icon = card.querySelector('i');
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
            this.style.transform = 'translateY(-4px) scale(1.02)';
            
            if (icon) {
                icon.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                icon.style.transform = 'scale(1.3) rotate(15deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Enhanced publication link interactions
function initPublicationLinks() {
    const publicationLinks = document.querySelectorAll('.publication-link');
    
    publicationLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            this.style.transform = 'scale(1.3) rotate(10deg)';
            this.style.background = 'var(--color-primary)';
            this.style.color = 'var(--color-btn-primary-text)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.background = 'transparent';
            this.style.color = 'var(--color-primary)';
        });
    });
}

// Enhanced contact section animations
function initContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    const contactAvailability = document.querySelector('.contact-availability');
    
    // Animate contact items with smooth scaling
    contactItems.forEach(item => {
        const icon = item.querySelector('i');
        
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
            this.style.transform = 'translateX(8px) scale(1.02)';
            this.style.background = 'var(--color-secondary)';
            
            if (icon) {
                icon.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.background = '';
            
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Animate availability section with gentle scaling
    if (contactAvailability) {
        contactAvailability.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
            this.style.transform = 'scale(1.02)';
        });
        
        contactAvailability.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Enhanced tag animations in hero section
function initTagAnimations() {
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Enhanced navbar scroll effects
function initNavbarScroll() {
    const navbar = document.querySelector('.nav');
    
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Smooth navbar background transition
        navbar.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
        
        if (currentScrollY > 50) {
            if (isDarkMode) {
                navbar.style.background = 'rgba(31, 33, 33, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
            }
        } else {
            if (isDarkMode) {
                navbar.style.background = 'rgba(31, 33, 33, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
            }
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

// Smooth typing animation for hero subtitle
function initTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    heroSubtitle.style.borderRight = '2px solid var(--color-primary)';
    heroSubtitle.style.animation = 'none';
    
    let i = 0;
    const typeSpeed = 60;
    
    function typeText() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeText, typeSpeed + Math.random() * 40);
        } else {
            // Smooth cursor fade out
            setTimeout(() => {
                heroSubtitle.style.transition = 'border-right 0.5s ease-out';
                heroSubtitle.style.borderRight = 'none';
            }, 1500);
        }
    }
    
    // Start typing animation after hero loads
    setTimeout(typeText, 2000);
}

// Smooth parallax effect for hero section
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
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// Enhanced button effects with smooth transitions
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
}

// Smooth card reveal animations
function initCardRevealAnimations() {
    const cards = document.querySelectorAll('.publication-card, .flagship-card, .project-card, .venture-card, .skill-category');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 50);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        revealObserver.observe(card);
    });
}

// Enhanced venture card animations
function initVentureCardAnimations() {
    const ventureCards = document.querySelectorAll('.venture-card');
    
    ventureCards.forEach(card => {
        const title = card.querySelector('.venture-title');
        const amazonButton = card.querySelector('.btn');
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            if (title) {
                title.style.transition = 'color 0.3s ease';
                title.style.color = 'var(--color-primary)';
            }
            
            if (amazonButton) {
                amazonButton.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
                amazonButton.style.transform = 'scale(1.05) translateY(-2px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            if (title) {
                title.style.color = '';
            }
            
            if (amazonButton) {
                amazonButton.style.transform = 'scale(1) translateY(0)';
            }
        });
    });
}

// Staggered animation initialization
function initStaggeredAnimations() {
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
                        entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 80);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';
            observer.observe(card);
        });
    });
}

// Performance optimizations with smooth transitions
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
    
    // Lazy load images with smooth fade-in
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.5s ease';
                        img.src = img.dataset.src;
                        img.onload = () => {
                            img.style.opacity = '1';
                            img.classList.remove('lazy');
                        };
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

// Enhanced accessibility features
function initAccessibilityFeatures() {
    // Smooth focus indicators
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.transition = 'all 0.2s ease';
            this.style.outline = '2px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Skip to main content link with smooth scroll
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
        transition: all 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Enhanced theme detection and handling
function initThemeHandling() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateTheme(isDark) {
        const navbar = document.querySelector('.nav');
        if (navbar) {
            navbar.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
            if (isDark) {
                navbar.style.background = 'rgba(31, 33, 33, 0.98)';
                navbar.style.borderTop = '3px solid var(--color-white)';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.borderTop = '3px solid var(--color-black)';
                navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.15)';
            }
        }
    }
    
    // Listen for theme changes
    prefersDarkScheme.addEventListener('change', function(e) {
        updateTheme(e.matches);
    });
    
    // Initial theme setup
    updateTheme(prefersDarkScheme.matches);
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

// Utility function: Enhanced Debounce
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
    
    // Trigger smooth initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s cubic-bezier(0.4, 0.0, 0.2, 1)';
    }
    
    // Remove loading overlays smoothly
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // Performance monitoring
    if ('performance' in window) {
        const navigationTiming = performance.getEntriesByType('navigation')[0];
        if (navigationTiming) {
            console.log(`✅ Page load time: ${Math.round(navigationTiming.loadEventEnd - navigationTiming.loadEventStart)}ms`);
        }
    }
});

// Enhanced keyboard navigation with smooth scrolling
document.addEventListener('keydown', function(e) {
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
                const navHeight = document.querySelector('.nav')?.offsetHeight || 70;
                
                // Smooth scroll to next section
                const targetPosition = nextSection.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        }
    }
});

// Add smooth visual feedback for external links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="http"]');
    if (link) {
        link.style.transition = 'opacity 0.2s ease';
        link.style.opacity = '0.7';
        setTimeout(() => {
            link.style.opacity = '1';
        }, 200);
    }
});

// Visibility API handling for performance optimization
document.addEventListener('visibilitychange', function() {
    const cards = document.querySelectorAll('.card, .btn, .nav-link');
    
    if (document.hidden) {
        // Pause animations when page is hidden
        cards.forEach(el => {
            if (el.style.animationPlayState !== 'paused') {
                el.style.animationPlayState = 'paused';
            }
        });
    } else {
        // Resume animations when page becomes visible
        cards.forEach(el => {
            if (el.style.animationPlayState === 'paused') {
                el.style.animationPlayState = 'running';
            }
        });
    }
});

// Error handling for failed requests
window.addEventListener('error', function(e) {
    console.warn('⚠️ Resource failed to load:', e.filename || e.target?.src || e.target?.href);
});

window.addEventListener('unhandledrejection', function(e) {
    console.warn('⚠️ Unhandled promise rejection:', e.reason);
});

// Final initialization message
console.log('🎨 All animations initialized with smooth transitions and proper contrast!');
console.log('📱 Navigation: BLACK topmost border, proper contrast, smooth mobile menu');
console.log('✨ Animations: Enhanced smoothness, proper easing, performance optimized');
console.log('🔧 Fixed: Navigation links now work with smooth scrolling!');