// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const contactForm = document.getElementById('contactForm');
const contactUsForm = document.getElementById('contactUsForm');
const heroContactForm = document.getElementById('heroContactForm');
const playButton = document.querySelector('.play-button');
const registerButton = document.querySelector('.btn-courses');

// EmailJS Configuration
(function() {
    emailjs.init("urgxZBrnlVREaaFgH");
})();

// Form Handling Functions
function showFormSuccess(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'form-notification success';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.remove();
    });
}

function showFormError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'form-notification error';
    notification.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        notification.remove();
    }, 8000);
    
    // Close button functionality
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.remove();
    });
}

// Hero Contact Form Handler
if (heroContactForm) {
    heroContactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('heroName').value;
        const phone = document.getElementById('heroPhone').value;
        const email = document.getElementById('heroEmail').value;
        
        // Basic validation
        if (!name || !phone || !email) {
            showFormError('אנא מלא את כל השדות הנדרשים');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';
        submitBtn.disabled = true;
        
        // Prepare email template parameters
        const templateParams = {
            from_name: name,
            from_phone: phone,
            from_email: email,
            message: `טופס הרשמה חדש מ-Hero Section:
שם: ${name}
טלפון: ${phone}
אימייל: ${email}
מקור: טופס ראשי באתר`,
            to_name: 'iSpeak Team'
        };
        
        // Send email using EmailJS
        emailjs.send('iSpeak-forms', 'template_t7799dc', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showFormSuccess('הטופס נשלח בהצלחה! נציג יצור איתך קשר בקרוב.');
                heroContactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                showFormError('שגיאה בשליחת הטופס. אנא נסה שוב או צור קשר בטלפון.');
            })
            .finally(function() {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Contact Us Form Handler
if (contactUsForm) {
    contactUsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('contactName').value;
        const phone = document.getElementById('contactPhone').value;
        const email = document.getElementById('contactEmail').value;
        
        // Basic validation
        if (!name || !phone) {
            showFormError('אנא מלא את השדות הנדרשים (שם וטלפון)');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';
        submitBtn.disabled = true;
        
        // Prepare email template parameters
        const templateParams = {
            from_name: name,
            from_phone: phone,
            from_email: email || 'לא צוין',
            message: `טופס יצירת קשר חדש:
שם: ${name}
טלפון: ${phone}
אימייל: ${email || 'לא צוין'}
מקור: טופס יצירת קשר`,
            to_name: 'iSpeak Team'
        };
        
        // Send email using EmailJS
        emailjs.send('iSpeak-forms', 'template_t7799dc', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showFormSuccess('הטופס נשלח בהצלחה! נציג יצור איתך קשר בקרוב.');
                contactUsForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                showFormError('שגיאה בשליחת הטופס. אנא נסה שוב או צור קשר בטלפון.');
            })
            .finally(function() {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}


// Dropdown functionality
const navItems = document.querySelectorAll('.nav-item');

// Mobile Menu Functionality
function toggleMobileMenu() {
    if (mobileMenu.style.display === 'flex') {
        mobileMenu.style.display = 'none';
    } else {
        mobileMenu.style.display = 'flex';
    }
}

// Event Listeners for Mobile Menu
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });
});

// Close mobile menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.style.display = 'none';
    }
});

// Dropdown functionality
navItems.forEach(item => {
    const dropdown = item.querySelector('.dropdown-menu');
    if (dropdown) {
        // Show dropdown on hover
        item.addEventListener('mouseenter', () => {
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.transform = 'translateY(0)';
        });
        
        // Hide dropdown on mouse leave
        item.addEventListener('mouseleave', () => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.transform = 'translateY(-10px)';
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.textContent = 'جاري الإرسال...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Show success message
            showNotification('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.', 'success');
            
            // Reset button
            submitButton.classList.remove('loading');
            submitButton.textContent = 'إرسال الطلب';
        }, 2000);
    });
}

// Video Play Button
if (playButton) {
    playButton.addEventListener('click', function() {
        // Simulate video play (replace with actual video functionality)
        showNotification('سيتم تشغيل الفيديو قريباً...', 'info');
    });
}

// Register Button - Scroll to Contact Form
if (registerButton) {
    registerButton.addEventListener('click', function(e) {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Courses Button - Scroll to Courses Section
const coursesButton = document.querySelector('.btn-courses');
if (coursesButton) {
    coursesButton.addEventListener('click', function(e) {
        e.preventDefault();
        const coursesSection = document.getElementById('courses');
        if (coursesSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = coursesSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Additional event listener for all buttons with "להרשמה" text
document.addEventListener('DOMContentLoaded', function() {
    const registerButtons = document.querySelectorAll('.btn-courses');
    registerButtons.forEach(button => {
        if (button.textContent.includes('להרשמה')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = contactSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
});

// Course registration buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    const courseButtons = document.querySelectorAll('.course-card .btn');
    courseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Course cards functionality
document.addEventListener('DOMContentLoaded', function() {
    // Course card hover effects
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});



// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-right: 0.5rem;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;
document.head.appendChild(style);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .course-card, .stat-item, .about-content, .contact-content');
    animateElements.forEach(el => observer.observe(el));
});

// Statistics Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current).toLocaleString() + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when statistics section is visible
const statsSection = document.querySelector('.statistics');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Course Card Hover Effects
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Feature Card Hover Effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#e2e8f0';
        }
    });
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            emailInput.style.borderColor = '#ef4444';
            showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
        }
    }
    
    // Phone validation
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput && phoneInput.value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            isValid = false;
            phoneInput.style.borderColor = '#ef4444';
            showNotification('يرجى إدخال رقم هاتف صحيح', 'error');
        }
    }
    
    return isValid;
}

// Add form validation to contact form
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            showNotification('يرجى ملء جميع الحقول المطلوبة بشكل صحيح', 'error');
        }
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && mobileMenu.style.display === 'flex') {
        mobileMenu.style.display = 'none';
    }
});

// Accessibility: Focus management for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    });
}

// Initialize focus trap for mobile menu
if (mobileMenu) {
    trapFocus(mobileMenu);
}

// Performance: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
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

// Enhanced Data Management and Session Handling
class DataManager {
    constructor() {
        this.storageKey = 'iSpeakData';
        this.init();
    }

    init() {
        this.loadData();
        this.setupAutoSave();
    }

    loadData() {
        try {
            const savedData = localStorage.getItem(this.storageKey);
            if (savedData) {
                this.data = JSON.parse(savedData);
            } else {
                this.data = this.getDefaultData();
            }
        } catch (error) {
            console.error('Error loading data:', error);
            this.data = this.getDefaultData();
        }
    }

    getDefaultData() {
        return {
            userPreferences: {
                language: 'he',
                theme: 'light',
                notifications: true,
                autoSave: true
            },
            studyProgress: {
                totalStudyTime: 0,
                completedLessons: 0,
                currentStreak: 0,
                lastStudyDate: null
            },
            courseHistory: [],
            achievements: []
        };
    }

    saveData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    setupAutoSave() {
        // Auto-save every 30 seconds
        setInterval(() => {
            if (this.data.userPreferences.autoSave) {
                this.saveData();
            }
        }, 30000);
    }

    updateProgress(lessonId, timeSpent, completed = false) {
        if (!this.data.studyProgress.lessons) {
            this.data.studyProgress.lessons = {};
        }

        if (!this.data.studyProgress.lessons[lessonId]) {
            this.data.studyProgress.lessons[lessonId] = {
                timeSpent: 0,
                completed: false,
                lastAccessed: new Date().toISOString()
            };
        }

        this.data.studyProgress.lessons[lessonId].timeSpent += timeSpent;
        this.data.studyProgress.lessons[lessonId].lastAccessed = new Date().toISOString();
        
        if (completed) {
            this.data.studyProgress.lessons[lessonId].completed = true;
            this.data.studyProgress.completedLessons++;
        }

        this.data.studyProgress.totalStudyTime += timeSpent;
        this.saveData();
    }

    getProgress(lessonId) {
        return this.data.studyProgress.lessons?.[lessonId] || null;
    }

    getOverallProgress() {
        const lessons = this.data.studyProgress.lessons || {};
        const totalLessons = Object.keys(lessons).length;
        const completedLessons = Object.values(lessons).filter(lesson => lesson.completed).length;
        
        return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    }
}

// Enhanced UI Interactions and Animations
class UIManager {
    constructor() {
        this.init();
    }

    init() {
        this.initSmoothScrolling();
        this.initParallaxEffects();
        this.initInteractiveElements();
        this.initThemeToggle();
    }

    initSmoothScrolling() {
        // Enhanced smooth scrolling with easing
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initParallaxEffects() {
        // Simple parallax effect for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    initInteractiveElements() {
        // Enhanced hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('.card, .course-card, .feature-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    initThemeToggle() {
        // Theme toggle functionality
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update theme toggle button
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = newTheme === 'light' ? 
                '<i class="fas fa-moon"></i>' : 
                '<i class="fas fa-sun"></i>';
        }
    }
}

// Enhanced Authentication and Session Management
class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupAuthListeners();
    }

    checkAuthStatus() {
        const token = localStorage.getItem('studentToken');
        const userData = localStorage.getItem('studentData');
        
        if (token && userData) {
            try {
                this.currentUser = JSON.parse(userData);
                this.isAuthenticated = true;
                this.updateUIForAuthenticatedUser();
            } catch (error) {
                console.error('Error parsing user data:', error);
                this.logout();
            }
        }
    }

    setupAuthListeners() {
        // Listen for storage changes (e.g., from other tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === 'studentToken' || e.key === 'studentData') {
                this.checkAuthStatus();
            }
        });
    }

    updateUIForAuthenticatedUser() {
        // Update UI elements for authenticated users
        const authElements = document.querySelectorAll('.auth-required');
        const guestElements = document.querySelectorAll('.guest-only');
        
        authElements.forEach(el => el.style.display = 'block');
        guestElements.forEach(el => el.style.display = 'none');
        
        // Update user-specific content
        if (this.currentUser) {
            const userNameElements = document.querySelectorAll('.user-name');
            userNameElements.forEach(el => {
                el.textContent = this.currentUser.fullName || this.currentUser.username;
            });
        }
    }

    logout() {
        localStorage.removeItem('studentToken');
        localStorage.removeItem('studentData');
        this.isAuthenticated = false;
        this.currentUser = null;
        
        // Redirect to login page
        if (window.location.pathname.includes('dashboard')) {
            window.location.href = 'auth.html';
        }
    }
}

// Advanced Features and Utilities
class AdvancedFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.initOfflineSupport();
        this.initKeyboardShortcuts();
        this.initStudyTimer();
    }

    initOfflineSupport() {
        // Check if service worker is supported
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }

        // Offline/online status handling
        window.addEventListener('online', () => {
            showNotification('החיבור לאינטרנט חודש', 'success');
        });

        window.addEventListener('offline', () => {
            showNotification('אין חיבור לאינטרנט. הפונקציות הזמינות במצב לא מקוון', 'warning');
        });
    }

    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K: Quick search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openQuickSearch();
            }
            
            // Ctrl/Cmd + /: Toggle help
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                this.toggleHelp();
            }
            
            // Escape: Close modals/dropdowns
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    initVoiceCommands() {
        // Voice command support disabled - no longer needed
        return;
    }

    addVoiceCommandButton(recognition) {
        // Voice command button removed - no longer needed
        return;
    }

    startVoiceRecognition(recognition) {
        recognition.start();
        showNotification('מקשיב...', 'info');
        
        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            this.processVoiceCommand(command);
        };
        
        recognition.onerror = (event) => {
            showNotification('שגיאה בזיהוי קולי', 'error');
        };
    }

    processVoiceCommand(command) {
        if (command.includes('דף הבית') || command.includes('home')) {
            window.location.href = 'iSpeak-website.html';
        } else if (command.includes('לוח בקרה') || command.includes('dashboard')) {
            window.location.href = 'comprehensive-student-dashboard.html';
        } else if (command.includes('התנתק') || command.includes('logout')) {
            window.authManager.logout();
        } else {
            showNotification(`פקודה לא מוכרת: ${command}`, 'warning');
        }
    }

    initStudyTimer() {
        // Study session timer
        this.studyTimer = {
            isRunning: false,
            startTime: null,
            totalTime: 0,
            interval: null
        };

        // Add study timer UI if on dashboard
        if (document.querySelector('.dashboard-container')) {
            this.createStudyTimerUI();
        }
    }

    createStudyTimerUI() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && !document.querySelector('.study-timer')) {
            const timerDiv = document.createElement('div');
            timerDiv.className = 'study-timer';
            timerDiv.innerHTML = `
                <div class="timer-display">
                    <span class="timer-label">זמן לימוד</span>
                    <span class="timer-time">00:00:00</span>
                </div>
                <div class="timer-controls">
                    <button class="timer-start" data-action="start">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="timer-pause" data-action="pause" style="display: none;">
                        <i class="fas fa-pause"></i>
                    </button>
                    <button class="timer-stop" data-action="stop">
                        <i class="fas fa-stop"></i>
                    </button>
                </div>
            `;

            sidebar.appendChild(timerDiv);
            this.bindTimerEvents();
        }
    }

    bindTimerEvents() {
        const timerControls = document.querySelectorAll('.timer-controls button');
        timerControls.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.dataset.action;
                this.handleTimerAction(action);
            });
        });
    }

    handleTimerAction(action) {
        switch(action) {
            case 'start':
                this.startStudyTimer();
                break;
            case 'pause':
                this.pauseStudyTimer();
                break;
            case 'stop':
                this.stopStudyTimer();
                break;
        }
    }

    startStudyTimer() {
        if (!this.studyTimer.isRunning) {
            this.studyTimer.isRunning = true;
            this.studyTimer.startTime = Date.now();
            
            this.studyTimer.interval = setInterval(() => {
                this.updateTimerDisplay();
            }, 1000);

            // Update UI
            document.querySelector('.timer-start').style.display = 'none';
            document.querySelector('.timer-pause').style.display = 'inline-block';
        }
    }

    pauseStudyTimer() {
        if (this.studyTimer.isRunning) {
            this.studyTimer.isRunning = false;
            clearInterval(this.studyTimer.interval);
            
            // Update UI
            document.querySelector('.timer-start').style.display = 'inline-block';
            document.querySelector('.timer-pause').style.display = 'none';
        }
    }

    stopStudyTimer() {
        this.studyTimer.isRunning = false;
        clearInterval(this.studyTimer.interval);
        
        // Save study session
        if (this.studyTimer.totalTime > 0) {
            window.dataManager.updateProgress('study-session', this.studyTimer.totalTime);
            showNotification(`סשן לימודים הסתיים! זמן כולל: ${this.formatTime(this.studyTimer.totalTime)}`, 'success');
        }
        
        // Reset timer
        this.studyTimer.totalTime = 0;
        this.updateTimerDisplay();
        
        // Update UI
        document.querySelector('.timer-start').style.display = 'inline-block';
        document.querySelector('.timer-pause').style.display = 'none';
    }

    updateTimerDisplay() {
        if (this.studyTimer.isRunning) {
            this.studyTimer.totalTime = Date.now() - this.studyTimer.startTime;
        }
        
        const timeDisplay = document.querySelector('.timer-time');
        if (timeDisplay) {
            timeDisplay.textContent = this.formatTime(this.studyTimer.totalTime);
        }
    }

    formatTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    }

    openQuickSearch() {
        // Quick search functionality
        showNotification('פונקציית חיפוש מהיר תהיה זמינה בקרוב', 'info');
    }

    toggleHelp() {
        // Help system toggle
        showNotification('מערכת העזרה תהיה זמינה בקרוב', 'info');
    }

    closeAllModals() {
        // Close all open modals and dropdowns
        document.querySelectorAll('.modal, .dropdown-menu, .language-dropdown').forEach(el => {
            el.classList.remove('show');
        });
    }
}

// Accessibility Enhancements
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.initSkipLinks();
        this.initFocusIndicators();
        this.initScreenReaderSupport();
        this.initHighContrastMode();
    }

    initSkipLinks() {
        // Add skip links for keyboard navigation
        if (!document.querySelector('.skip-links')) {
            const skipLinks = document.createElement('div');
            skipLinks.className = 'skip-links';
            skipLinks.innerHTML = `
                <a href="#main-content" class="skip-link">דלג לתוכן הראשי</a>
                <a href="#navigation" class="skip-link">דלג לניווט</a>
            `;
            
            document.body.insertBefore(skipLinks, document.body.firstChild);
        }
    }

    initFocusIndicators() {
        // Enhanced focus indicators
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    initScreenReaderSupport() {
        // Add ARIA labels and descriptions
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
        interactiveElements.forEach(element => {
            if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
                const icon = element.querySelector('i');
                if (icon) {
                    const iconClass = icon.className;
                    if (iconClass.includes('fa-home')) {
                        element.setAttribute('aria-label', 'דף הבית');
                    } else if (iconClass.includes('fa-user')) {
                        element.setAttribute('aria-label', 'פרופיל משתמש');
                    } else if (iconClass.includes('fa-cog')) {
                        element.setAttribute('aria-label', 'הגדרות');
                    }
                }
            }
        });
    }

    initHighContrastMode() {
        // High contrast mode toggle
        const highContrastToggle = document.querySelector('.high-contrast-toggle');
        if (highContrastToggle) {
            highContrastToggle.addEventListener('click', () => {
                this.toggleHighContrast();
            });
        }
    }

    toggleHighContrast() {
        document.body.classList.toggle('high-contrast');
        const isEnabled = document.body.classList.contains('high-contrast');
        localStorage.setItem('highContrast', isEnabled);
        
        showNotification(
            isEnabled ? 'מצב ניגודיות גבוהה מופעל' : 'מצב ניגודיות גבוהה כבוי',
            'info'
        );
    }
}

// Performance Optimizations
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.initLazyLoading();
        this.initImageOptimization();
        this.initCodeSplitting();
        this.initCaching();
    }

    initLazyLoading() {
        // Enhanced lazy loading for images and components
        if ('IntersectionObserver' in window) {
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        
                        if (element.tagName === 'IMG' && element.dataset.src) {
                            element.src = element.dataset.src;
                            element.classList.remove('lazy');
                        } else if (element.classList.contains('lazy-component')) {
                            this.loadComponent(element);
                        }
                        
                        lazyObserver.unobserve(element);
                    }
                });
            }, { threshold: 0.1 });

            // Observe lazy elements
            document.querySelectorAll('img[data-src], .lazy-component').forEach(el => {
                lazyObserver.observe(el);
            });
        }
    }

    initImageOptimization() {
        // WebP support detection and fallback
        const webpSupported = this.checkWebPSupport();
        if (webpSupported) {
            document.querySelectorAll('img[data-webp]').forEach(img => {
                img.src = img.dataset.webp;
            });
        }
    }

    checkWebPSupport() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    initCodeSplitting() {
        // Dynamic import for non-critical features
        if (document.querySelector('.advanced-features')) {
            this.loadAdvancedFeatures();
        }
    }

    async loadAdvancedFeatures() {
        try {
            // Load advanced features on demand
            const module = await import('./advanced-features.js');
            module.init();
        } catch (error) {
            console.log('Advanced features not available');
        }
    }

    initCaching() {
        // Simple caching for API responses
        this.cache = new Map();
        
        // Cache cleanup every 5 minutes
        setInterval(() => {
            const now = Date.now();
            for (const [key, value] of this.cache.entries()) {
                if (now - value.timestamp > 300000) { // 5 minutes
                    this.cache.delete(key);
                }
            }
        }, 300000);
    }

    getCachedData(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < 300000) {
            return cached.data;
        }
        return null;
    }

    setCachedData(key, data) {
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
    }
}

// Initialize all managers
document.addEventListener('DOMContentLoaded', () => {
    // Initialize data manager
    window.dataManager = new DataManager();
    
    // Initialize UI manager
    window.uiManager = new UIManager();
    
    // Initialize auth manager
    window.authManager = new AuthManager();
    
    // Initialize advanced features
    window.advancedFeatures = new AdvancedFeatures();
    
    // Initialize accessibility manager
    window.accessibilityManager = new AccessibilityManager();
    
    // Initialize performance manager
    window.performanceManager = new PerformanceManager();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
    
    // Load high contrast setting
    const highContrast = localStorage.getItem('highContrast');
    if (highContrast === 'true') {
        document.body.classList.add('high-contrast');
    }
});



// Review Content Functionality
document.addEventListener('DOMContentLoaded', () => {
    const reviewContents = document.querySelectorAll('.review-content');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    let currentIndex = 0;
    const totalReviews = reviewContents.length;
    
    function showReview(index) {
        // Hide all review contents and dots
        reviewContents.forEach(content => content.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current review content and dot
        if (reviewContents[index]) {
            reviewContents[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
    
    function nextReview() {
        currentIndex = (currentIndex + 1) % totalReviews;
        showReview(currentIndex);
    }
    
    function prevReview() {
        currentIndex = (currentIndex - 1 + totalReviews) % totalReviews;
        showReview(currentIndex);
    }
    
    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextReview);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevReview);
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showReview(currentIndex);
        });
    });
    
    // Auto-advance reviews every 6 seconds (slower for reading)
    setInterval(nextReview, 6000);
});

// Language Switching System
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'he';
        this.languages = {
            'en': { name: 'English', flag: '🇺🇸', dir: 'ltr' },
            'ar': { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
            'he': { name: 'עברית', flag: '🇮🇱', dir: 'rtl' }
        };
        this.init();
    }

    init() {
        this.createLanguageSelector();
        this.applyLanguage(this.currentLanguage);
    }

    createLanguageSelector() {
        // Create language selector if it doesn't exist
        if (!document.querySelector('.language-selector')) {
            const header = document.querySelector('.header');
            if (header) {
                const languageSelector = document.createElement('div');
                languageSelector.className = 'language-selector';
                languageSelector.innerHTML = `
                    <button class="language-btn" aria-label="Change Language">
                        <i class="fas fa-globe"></i>
                    </button>
                    <div class="language-dropdown">
                        ${Object.entries(this.languages).map(([code, lang]) => `
                            <button class="language-option ${code === this.currentLanguage ? 'active' : ''}" 
                                    data-lang="${code}">
                                <span class="flag">${lang.flag}</span>
                                <span class="name">${lang.name}</span>
                            </button>
                        `).join('')}
                    </div>
                `;
                
                // Insert before the mobile menu toggle
                const mobileToggle = header.querySelector('.mobile-menu-toggle');
                if (mobileToggle) {
                    header.insertBefore(languageSelector, mobileToggle);
                } else {
                    header.appendChild(languageSelector);
                }

                this.bindLanguageEvents();
            }
        }
    }

    bindLanguageEvents() {
        const languageBtn = document.querySelector('.language-btn');
        const languageDropdown = document.querySelector('.language-dropdown');
        const languageOptions = document.querySelectorAll('.language-option');

        if (languageBtn && languageDropdown) {
            languageBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                languageDropdown.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                languageDropdown.classList.remove('show');
            });

            languageOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const langCode = option.dataset.lang;
                    this.changeLanguage(langCode);
                    languageDropdown.classList.remove('show');
                });
            });
        }
    }

    changeLanguage(langCode) {
        if (this.languages[langCode]) {
            this.currentLanguage = langCode;
            localStorage.setItem('language', langCode);
            this.applyLanguage(langCode);
            this.updateLanguageSelector();
        }
    }

    applyLanguage(langCode) {
        const lang = this.languages[langCode];
        if (lang) {
            document.documentElement.lang = langCode;
            document.documentElement.dir = lang.dir;
            document.body.style.direction = lang.dir;
            document.body.style.textAlign = lang.dir === 'rtl' ? 'right' : 'left';
        }
    }

    updateLanguageSelector() {
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.lang === this.currentLanguage);
        });
    }
}

// Enhanced Dashboard Functionality
class DashboardManager {
    constructor() {
        this.init();
    }

    init() {
        this.initCharts();
        this.initProgressTracking();
        this.initNotifications();
        this.initQuickActions();
    }

    initCharts() {
        // Enhanced chart configurations with better colors and animations
        if (typeof Chart !== 'undefined') {
            Chart.defaults.font.family = "'Inter', 'Segoe UI', sans-serif";
            Chart.defaults.color = '#6B7280';
            Chart.defaults.plugins.legend.labels.usePointStyle = true;
        }
    }

    initProgressTracking() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const fill = bar.querySelector('.progress-fill');
            if (fill) {
                const targetWidth = fill.dataset.progress || '0';
                this.animateProgress(fill, parseInt(targetWidth));
            }
        });
    }

    animateProgress(element, targetWidth) {
        let currentWidth = 0;
        const increment = targetWidth / 50;
        const timer = setInterval(() => {
            currentWidth += increment;
            if (currentWidth >= targetWidth) {
                currentWidth = targetWidth;
                clearInterval(timer);
            }
            element.style.width = currentWidth + '%';
        }, 20);
    }

    initNotifications() {
        // Enhanced notification system for dashboard
        this.showWelcomeNotification();
    }

    showWelcomeNotification() {
        const studentData = JSON.parse(localStorage.getItem('studentData') || '{}');
        if (studentData.fullName) {
            showNotification(`ברוך הבא, ${studentData.fullName}! התחלת את יום הלימודים שלך.`, 'success');
        }
    }

    initQuickActions() {
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = btn.dataset.action || btn.textContent.trim();
                this.handleQuickAction(action);
            });
        });
    }

    handleQuickAction(action) {
        switch(action) {
            case 'start-study':
                this.startStudySession();
                break;
            case 'view-progress':
                this.showProgressReport();
                break;
            case 'take-quiz':
                this.startQuiz();
                break;
            default:
                console.log(`Quick action: ${action}`);
        }
    }

    startStudySession() {
        showNotification('מתחיל סשן לימודים חדש...', 'info');
        // Add study session logic here
    }

    showProgressReport() {
        showNotification('טוען דוח התקדמות...', 'info');
        // Add progress report logic here
    }

    startQuiz() {
        showNotification('מתחיל מבחן...', 'info');
        // Add quiz logic here
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language manager
    window.languageManager = new LanguageManager();
    
    // Initialize dashboard manager if on dashboard page
    if (document.querySelector('.dashboard-container')) {
        window.dashboardManager = new DashboardManager();
    }
    
    // Enhanced mobile menu with better animations
    enhanceMobileMenu();
    
    // Initialize enhanced form validation
    initEnhancedFormValidation();
});

// Enhanced Mobile Menu
function enhanceMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        // Add slide animation
        mobileMenu.style.transition = 'transform 0.3s ease-in-out';
        mobileMenu.style.transform = 'translateX(100%)';
        
        // Enhanced toggle function
        window.toggleMobileMenu = function() {
            if (mobileMenu.style.transform === 'translateX(100%)') {
                mobileMenu.style.transform = 'translateX(0)';
                mobileMenu.style.display = 'flex';
            } else {
                mobileMenu.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                }, 300);
            }
        };
    }
}

// Enhanced Form Validation
function initEnhancedFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
            
            // Enhanced focus effects
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'שדה זה הוא חובה';
    }

    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'כתובת אימייל לא תקינה';
        }
    }

    // Phone validation
    if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'מספר טלפון לא תקין';
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }

    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: fadeIn 0.3s ease-in;
    `;
    
    field.parentElement.appendChild(errorDiv);
    field.style.borderColor = '#ef4444';
}

function clearFieldError(field) {
    const errorDiv = field.parentElement.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = '#e2e8f0';
}

// Console welcome message
console.log('🎓 iSpeak Website Loaded Successfully!');
console.log('📧 For support: info@ispeak.com');
console.log('📱 Mobile-friendly and RTL optimized');
console.log('🌍 Multi-language support enabled');
console.log('📊 Enhanced dashboard functionality loaded'); 

// Mobile Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (mobileMenuToggle && mobileMenuOverlay && mobileMenuClose) {
        // Open mobile menu
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });
        
        // Close mobile menu
        mobileMenuClose.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        });
        
        // Close mobile menu when clicking overlay
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close mobile menu when clicking on navigation links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}); 