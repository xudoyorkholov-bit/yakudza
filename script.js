// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate stat counters when they come into view
            if (entry.target.classList.contains('stat-value')) {
                const target = parseFloat(entry.target.dataset.target);
                animateCounter(entry.target, target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe stat values
    document.querySelectorAll('.stat-value').forEach(stat => {
        observer.observe(stat);
    });
    
    // Observe cards for stagger animation
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Glitch effect enhancement
function enhanceGlitch() {
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        setInterval(() => {
            glitchElement.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff6b35,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #f7931e
            `;
            
            setTimeout(() => {
                glitchElement.style.textShadow = '0 0 20px rgba(255, 107, 53, 0.8)';
            }, 100);
        }, 3000);
    }
}

// Initialize glitch effect
document.addEventListener('DOMContentLoaded', enhanceGlitch);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 80);
        }, 1000);
    }
});

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #ff6b35;
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s infinite linear;
        `;
        hero.appendChild(particle);
    }
}

// CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .loaded .hero-content {
        animation: fadeInUp 1s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Tab functionality for detailed stats
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Gallery tab functionality
document.addEventListener('DOMContentLoaded', () => {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetGallery = tab.dataset.gallery;
            
            // Remove active class from all tabs
            galleryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Here you can add logic to switch gallery content
            // For now, we'll just show a simple animation
            const galleryGrid = document.querySelector('.gallery-grid');
            galleryGrid.style.opacity = '0';
            
            setTimeout(() => {
                galleryGrid.style.opacity = '1';
            }, 300);
        });
    });
});

// Contact form handling with backend integration
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Iltimos, barcha maydonlarni to\'ldiring!', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
            submitBtn.disabled = true;
            
            try {
                // Send to backend
                const response = await fetch('http://localhost:3001/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showNotification('Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error(result.error || 'Xabar yuborishda xatolik');
                }
            } catch (error) {
                console.error('Contact form error:', error);
                // Fallback to local storage if backend is not available
                const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                messages.push({
                    id: Date.now(),
                    name, email, subject, message,
                    date: new Date().toISOString(),
                    unread: true
                });
                localStorage.setItem('contactMessages', JSON.stringify(messages));
                
                showNotification('Xabaringiz saqlandi! Server ishlamayotgan bo\'lishi mumkin.', 'warning');
                contactForm.reset();
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Achievement cards animation on scroll
const achievementObserver = new IntersectionObserver((entries) => {
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

// Gallery items hover effect enhancement
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Click event for gallery items
        item.addEventListener('click', () => {
            // Here you can add lightbox functionality
            console.log('Gallery item clicked');
        });
    });
});

// Initialize achievement cards animation
document.addEventListener('DOMContentLoaded', () => {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        achievementObserver.observe(card);
    });
});

// Enhanced scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for different sections
    const aboutSection = document.querySelector('.about');
    const achievementsSection = document.querySelector('.achievements');
    
    if (aboutSection) {
        const aboutOffset = aboutSection.offsetTop;
        const aboutSpeed = (scrolled - aboutOffset) * 0.1;
        if (scrolled > aboutOffset - window.innerHeight) {
            aboutSection.style.backgroundPosition = `center ${aboutSpeed}px`;
        }
    }
    
    if (achievementsSection) {
        const achievementsOffset = achievementsSection.offsetTop;
        const achievementsSpeed = (scrolled - achievementsOffset) * 0.05;
        if (scrolled > achievementsOffset - window.innerHeight) {
            achievementsSection.style.backgroundPosition = `center ${achievementsSpeed}px`;
        }
    }
});

// Add loading states for better UX
function addLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('btn-primary')) {
                const originalText = this.textContent;
                this.textContent = 'Yuklanmoqda...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
}

// Initialize loading states
document.addEventListener('DOMContentLoaded', addLoadingStates);

// Add smooth reveal animations for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all major sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
        revealObserver.observe(section);
    });
});

// Add CSS for reveal animations
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stat-card:hover .stat-icon {
        animation: pulse 1s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .achievement-card:hover .achievement-icon {
        animation: bounce 0.6s ease;
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(revealStyle);
// Enhanced Gallery functionality
// Enhanced Gallery functionality
document.addEventListener('DOMContentLoaded', () => {
    // Gallery tab switching with smooth transitions
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryContents = document.querySelectorAll('.gallery-content');
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetGallery = tab.dataset.gallery;
            
            // Remove active class from all tabs and contents
            galleryTabs.forEach(t => t.classList.remove('active'));
            galleryContents.forEach(content => {
                content.classList.remove('active');
                content.style.opacity = '0';
            });
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show target content with animation
            setTimeout(() => {
                const targetContent = document.getElementById(targetGallery);
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.opacity = '1';
                }
            }, 300);
        });
    });
});

// Progress bar animations for stats page
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar, .skill-progress');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.dataset.width || '0%';
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// FAQ accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Enhanced contact form with validation
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form-main');
    
    if (contactForm) {
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
        });
        
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Bu maydon majburiy');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Email manzil noto\'g\'ri');
            return false;
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Telefon raqam noto\'g\'ri');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearErrors(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    // Validate all fields
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showNotification('Xabaringiz muvaffaqiyatli yuborildi!', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    } else {
        showNotification('Iltimos, barcha maydonlarni to\'g\'ri to\'ldiring!', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Enhanced image lazy loading with blur effect
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Create a new image to preload
                const newImg = new Image();
                newImg.onload = () => {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                };
                newImg.src = img.dataset.src;
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Video player functionality for gallery
function initializeVideoPlayers() {
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoTitle = item.querySelector('h3').textContent;
            showVideoModal(videoTitle);
        });
    });
}

function showVideoModal(title) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <div class="video-modal-header">
                <h3>${title}</h3>
                <button class="video-modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="video-player">
                <div class="video-placeholder">
                    <i class="fas fa-play"></i>
                    <p>Video player placeholder</p>
                </div>
            </div>
        </div>
        <div class="video-modal-overlay"></div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
    
    // Close functionality
    const closeBtn = modal.querySelector('.video-modal-close');
    const overlay = modal.querySelector('.video-modal-overlay');
    
    [closeBtn, overlay].forEach(element => {
        element.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
    });
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Restore body scroll when modal closes
    modal.addEventListener('transitionend', () => {
        if (!modal.classList.contains('show')) {
            document.body.style.overflow = '';
        }
    });
}

// Achievement cards stagger animation
function initializeAchievementAnimations() {
    const achievementCards = document.querySelectorAll('.achievement-card, .award-card, .major-achievement');
    
    const achievementObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    achievementCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        achievementObserver.observe(card);
    });
}

// Tournament timeline animations
function initializeTournamentAnimations() {
    const tournamentItems = document.querySelectorAll('.tournament-item');
    
    const tournamentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('slide-in');
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });
    
    tournamentItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        tournamentObserver.observe(item);
    });
}

// Social platform hover effects
function initializeSocialEffects() {
    const socialPlatforms = document.querySelectorAll('.social-platform');
    
    socialPlatforms.forEach(platform => {
        platform.addEventListener('mouseenter', () => {
            const icon = platform.querySelector('.platform-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        platform.addEventListener('mouseleave', () => {
            const icon = platform.querySelector('.platform-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateProgressBars();
    initializeFAQ();
    initializeContactForm();
    initializeLazyLoading();
    initializeVideoPlayers();
    initializeAchievementAnimations();
    initializeTournamentAnimations();
    initializeSocialEffects();
});

// Add CSS for new features
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    /* Form validation styles */
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ff4444;
        box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
    }
    
    .error-message {
        color: #ff4444;
        font-size: 0.8rem;
        margin-top: 5px;
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Notification styles */
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
        border: 1px solid rgba(255, 107, 53, 0.3);
        border-radius: 10px;
        padding: 20px;
        max-width: 400px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-color: #4CAF50;
    }
    
    .notification.error {
        border-color: #ff4444;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .notification.success .notification-content i {
        color: #4CAF50;
    }
    
    .notification.error .notification-content i {
        color: #ff4444;
    }
    
    .notification-content span {
        color: #ffffff;
        font-size: 0.9rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #cccccc;
        cursor: pointer;
        font-size: 1rem;
        padding: 5px;
        transition: color 0.3s ease;
    }
    
    .notification-close:hover {
        color: #ff6b35;
    }
    
    /* Video modal styles */
    .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .video-modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .video-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }
    
    .video-modal-content {
        position: relative;
        background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
        border-radius: 15px;
        border: 1px solid rgba(255, 107, 53, 0.3);
        max-width: 90%;
        max-height: 90%;
        width: 800px;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .video-modal.show .video-modal-content {
        transform: scale(1);
    }
    
    .video-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 25px;
        border-bottom: 1px solid rgba(255, 107, 53, 0.2);
    }
    
    .video-modal-header h3 {
        color: #ff6b35;
        font-size: 1.3rem;
        margin: 0;
    }
    
    .video-modal-close {
        background: none;
        border: none;
        color: #cccccc;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 5px;
        transition: color 0.3s ease;
    }
    
    .video-modal-close:hover {
        color: #ff6b35;
    }
    
    .video-player {
        padding: 25px;
    }
    
    .video-placeholder {
        background: #0a0a0a;
        border-radius: 10px;
        padding: 60px;
        text-align: center;
        color: #cccccc;
    }
    
    .video-placeholder i {
        font-size: 3rem;
        color: #ff6b35;
        margin-bottom: 15px;
    }
    
    /* Animation classes */
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: all 0.6s ease;
    }
    
    .slide-in {
        opacity: 1 !important;
        transform: translateX(0) !important;
        transition: all 0.5s ease;
    }
    
    /* Image loading effect */
    img {
        transition: opacity 0.3s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    /* Enhanced hover effects */
    .contact-card:hover .contact-icon {
        animation: bounce 0.6s ease;
    }
    
    .social-platform .platform-icon {
        transition: transform 0.3s ease;
    }
    
    /* Mobile responsive updates */
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
        
        .video-modal-content {
            width: 95%;
            margin: 20px;
        }
        
        .video-modal-header {
            padding: 15px 20px;
        }
        
        .video-player {
            padding: 20px;
        }
        
        .video-placeholder {
            padding: 40px 20px;
        }
    }
`;

document.head.appendChild(enhancedStyles);
// Enhanced Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (hamburger && navMenu) {
        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Admin panel access setup - MULTIPLE SELECTORS
    console.log('DOM yuklandi, admin access o\'rnatilmoqda...');
    
    // Try multiple selectors for logo
    const logoSelectors = ['.nav-logo', '.nav-logo h2', '.yakudza', 'h2'];
    let logoFound = false;
    
    logoSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element && !logoFound) {
                console.log(`Logo topildi: ${selector}`);
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Logo bosildi via', selector);
                    checkAdminAccess();
                });
                logoFound = true;
            }
        });
    });
    
    if (!logoFound) {
        console.log('Logo topilmadi! Manual setup...');
        // Fallback: add click to entire navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.addEventListener('click', (e) => {
                if (e.target.closest('.nav-logo') || e.target.textContent.includes('SHOXRUZ') || e.target.textContent.includes('YAKUDZA')) {
                    console.log('Logo bosildi via fallback');
                    checkAdminAccess();
                }
            });
        }
    }
    
    // Global click handler as ultimate fallback
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.textContent && (target.textContent.includes('SHOXRUZ') || target.textContent.includes('YAKUDZA'))) {
            console.log('Logo bosildi via global handler');
            checkAdminAccess();
        }
    });
    
    console.log('Admin access setup yakunlandi');
});
// Admin Panel Access - FIXED VERSION
let adminClickCount = 0;
let adminClickTimer = null;

function checkAdminAccess() {
    adminClickCount++;
    console.log('Logo bosildi! Bosish soni:', adminClickCount);
    
    // Reset counter after 3 seconds
    if (adminClickTimer) {
        clearTimeout(adminClickTimer);
    }
    
    adminClickTimer = setTimeout(() => {
        console.log('Timer reset bo\'ldi');
        adminClickCount = 0;
    }, 3000);
    
    // If clicked 2 times within 3 seconds, show admin login
    if (adminClickCount >= 2) {
        console.log('2 marta bosildi! Admin login ochilmoqda...');
        adminClickCount = 0;
        showAdminLogin();
    }
}

function showAdminLogin() {
    console.log('showAdminLogin funksiyasi chaqirildi');
    
    // Remove existing modal if any
    const existingModal = document.querySelector('.admin-login-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal with inline styles (no external CSS needed)
    const modal = document.createElement('div');
    modal.className = 'admin-login-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="admin-login-container" style="
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            border: 2px solid #ff6b35;
            border-radius: 15px;
            padding: 40px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        ">
            <div class="admin-login-header" style="text-align: center; margin-bottom: 30px;">
                <i class="fas fa-shield-alt" style="font-size: 3rem; color: #ff6b35; margin-bottom: 15px; display: block;"></i>
                <h3 style="color: #ffffff; font-family: 'Orbitron', monospace; font-size: 1.5rem; margin: 0 0 10px 0; text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);">ADMIN PANEL</h3>
                <p style="color: #cccccc; margin: 0; font-size: 0.9rem;">Parolni kiriting</p>
            </div>
            <div class="admin-login-form">
                <div style="position: relative; margin-bottom: 25px;">
                    <i class="fas fa-lock" style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #ff6b35; font-size: 1.1rem;"></i>
                    <input type="password" id="adminPassword" placeholder="Parolni kiriting..." autocomplete="off" style="
                        width: 100%;
                        padding: 15px 50px 15px 45px;
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 107, 53, 0.3);
                        border-radius: 10px;
                        color: #ffffff;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        box-sizing: border-box;
                    ">
                    <button type="button" class="toggle-admin-password" style="
                        position: absolute;
                        right: 15px;
                        top: 50%;
                        transform: translateY(-50%);
                        background: none;
                        border: none;
                        color: #cccccc;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: color 0.3s ease;
                    ">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                    <button class="admin-login-btn" style="
                        flex: 1;
                        padding: 12px 20px;
                        background: linear-gradient(135deg, #ff6b35, #f7931e);
                        color: #ffffff;
                        border: none;
                        border-radius: 8px;
                        font-size: 0.9rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                    ">
                        <i class="fas fa-sign-in-alt"></i>
                        Kirish
                    </button>
                    <button class="admin-cancel-btn" style="
                        flex: 1;
                        padding: 12px 20px;
                        background: rgba(255, 255, 255, 0.1);
                        color: #cccccc;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 8px;
                        font-size: 0.9rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                    ">
                        <i class="fas fa-times"></i>
                        Bekor qilish
                    </button>
                </div>
                <div style="text-align: center;">
                    <small style="color: #888888; font-size: 0.8rem;">Demo: yakudza2024</small>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    console.log('Modal DOM ga qo\'shildi');
    
    // Show modal with animation
    setTimeout(() => {
        modal.style.opacity = '1';
        const container = modal.querySelector('.admin-login-container');
        container.style.transform = 'scale(1)';
        console.log('Modal ko\'rsatildi');
    }, 100);
    
    // Focus on password input
    setTimeout(() => {
        const passwordInput = document.getElementById('adminPassword');
        if (passwordInput) {
            passwordInput.focus();
            console.log('Password input focus qilindi');
            
            // Add focus styles
            passwordInput.addEventListener('focus', () => {
                passwordInput.style.borderColor = '#ff6b35';
                passwordInput.style.boxShadow = '0 0 15px rgba(255, 107, 53, 0.3)';
                passwordInput.style.background = 'rgba(255, 255, 255, 0.15)';
            });
            
            passwordInput.addEventListener('blur', () => {
                passwordInput.style.borderColor = 'rgba(255, 107, 53, 0.3)';
                passwordInput.style.boxShadow = 'none';
                passwordInput.style.background = 'rgba(255, 255, 255, 0.1)';
            });
        }
    }, 300);
    
    // Setup event listeners
    setupModalEventListeners(modal);
}

function setupModalEventListeners(modal) {
    // Handle Enter key
    const passwordInput = document.getElementById('adminPassword');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log('Enter bosildi');
                verifyAdminPassword();
            }
        });
    }
    
    // Handle Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            console.log('Escape bosildi');
            closeAdminLogin();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Toggle password visibility
    const toggleBtn = modal.querySelector('.toggle-admin-password');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const passwordInput = document.getElementById('adminPassword');
            const toggleIcon = toggleBtn.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.className = 'fas fa-eye-slash';
            } else {
                passwordInput.type = 'password';
                toggleIcon.className = 'fas fa-eye';
            }
        });
        
        // Hover effect
        toggleBtn.addEventListener('mouseenter', () => {
            toggleBtn.style.color = '#ff6b35';
        });
        toggleBtn.addEventListener('mouseleave', () => {
            toggleBtn.style.color = '#cccccc';
        });
    }
    
    // Login button
    const loginBtn = modal.querySelector('.admin-login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', verifyAdminPassword);
        
        // Hover effects
        loginBtn.addEventListener('mouseenter', () => {
            loginBtn.style.background = 'linear-gradient(135deg, #f7931e, #ff6b35)';
            loginBtn.style.transform = 'translateY(-2px)';
            loginBtn.style.boxShadow = '0 5px 15px rgba(255, 107, 53, 0.4)';
        });
        loginBtn.addEventListener('mouseleave', () => {
            if (!loginBtn.disabled) {
                loginBtn.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
                loginBtn.style.transform = 'translateY(0)';
                loginBtn.style.boxShadow = 'none';
            }
        });
    }
    
    // Cancel button
    const cancelBtn = modal.querySelector('.admin-cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeAdminLogin);
        
        // Hover effects
        cancelBtn.addEventListener('mouseenter', () => {
            cancelBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            cancelBtn.style.color = '#ffffff';
            cancelBtn.style.transform = 'translateY(-2px)';
        });
        cancelBtn.addEventListener('mouseleave', () => {
            cancelBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            cancelBtn.style.color = '#cccccc';
            cancelBtn.style.transform = 'translateY(0)';
        });
    }
    
    // Close on modal background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAdminLogin();
        }
    });
}

function verifyAdminPassword() {
    const password = document.getElementById('adminPassword').value;
    const loginBtn = document.querySelector('.admin-login-btn');
    
    console.log('Parol tekshirilmoqda:', password ? 'Kiritilgan' : 'Bo\'sh');
    
    if (!loginBtn) return;
    
    // Show loading state
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tekshirilmoqda...';
    loginBtn.disabled = true;
    loginBtn.style.opacity = '0.7';
    loginBtn.style.cursor = 'not-allowed';
    loginBtn.style.transform = 'none';
    
    setTimeout(() => {
        if (password === 'yakudza2024') {
            console.log('Parol to\'g\'ri! Admin panel ochilmoqda...');
            
            // Success state
            loginBtn.innerHTML = '<i class="fas fa-check"></i> Muvaffaqiyatli!';
            loginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            setTimeout(() => {
                const adminWindow = window.open('admin.html', 'adminPanel', 'width=1400,height=900,scrollbars=yes,resizable=yes,location=no,menubar=no,toolbar=no');
                
                if (adminWindow) {
                    console.log('Admin panel muvaffaqiyatli ochildi!');
                    closeAdminLogin();
                    
                    // Show success notification
                    showSimpleNotification('Admin panel muvaffaqiyatli ochildi!', 'success');
                } else {
                    console.log('Admin panel ochilmadi - popup blocker');
                    showSimpleNotification('Popup blocker o\'chirilganligini tekshiring!', 'error');
                    
                    // Reset button
                    loginBtn.innerHTML = originalText;
                    loginBtn.disabled = false;
                    loginBtn.style.opacity = '1';
                    loginBtn.style.cursor = 'pointer';
                    loginBtn.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
                }
            }, 1000);
        } else if (password !== '') {
            console.log('Noto\'g\'ri parol kiritildi');
            
            // Error state
            loginBtn.innerHTML = '<i class="fas fa-times"></i> Noto\'g\'ri parol!';
            loginBtn.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
            
            // Shake animation
            const container = document.querySelector('.admin-login-container');
            if (container) {
                container.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    container.style.animation = '';
                }, 500);
            }
            
            // Clear password and focus
            setTimeout(() => {
                document.getElementById('adminPassword').value = '';
                document.getElementById('adminPassword').focus();
                
                // Reset button
                loginBtn.innerHTML = originalText;
                loginBtn.disabled = false;
                loginBtn.style.opacity = '1';
                loginBtn.style.cursor = 'pointer';
                loginBtn.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
            }, 2000);
        } else {
            // Empty password
            showSimpleNotification('Parolni kiriting!', 'warning');
            
            // Reset button
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            loginBtn.style.opacity = '1';
            loginBtn.style.cursor = 'pointer';
        }
    }, 1500);
}

function closeAdminLogin() {
    const modal = document.querySelector('.admin-login-modal');
    if (modal) {
        console.log('Modal yopilmoqda');
        modal.style.opacity = '0';
        const container = modal.querySelector('.admin-login-container');
        if (container) {
            container.style.transform = 'scale(0.8)';
        }
        
        setTimeout(() => {
            modal.remove();
            console.log('Modal o\'chirildi');
        }, 300);
    }
}

// Simple notification system
function showSimpleNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.simple-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = 'simple-notification';
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#ff6b35'
    };
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
        border: 2px solid ${colors[type]};
        border-radius: 10px;
        padding: 15px 20px;
        max-width: 400px;
        z-index: 100000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    `;
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}" style="color: ${colors[type]}; font-size: 1.2rem;"></i>
        <span style="color: #ffffff; font-size: 0.9rem;">${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: #cccccc;
            cursor: pointer;
            font-size: 1rem;
            padding: 5px;
            margin-left: 10px;
            transition: color 0.3s ease;
        ">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
}

// Add shake animation CSS
const shakeCSS = document.createElement('style');
shakeCSS.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0) scale(1); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px) scale(1); }
    20%, 40%, 60%, 80% { transform: translateX(5px) scale(1); }
}
`;
document.head.appendChild(shakeCSS);

// Update stats from admin panel
function updateStats(statType, value) {
    const statElements = {
        'kills': document.querySelectorAll('[data-target="2547892"]'),
        'dinners': document.querySelectorAll('[data-target="1547"]'),
        'winrate': document.querySelectorAll('[data-target="87"]'),
        'kd': document.querySelectorAll('[data-target="4.2"]')
    };
    
    if (statElements[statType]) {
        statElements[statType].forEach(element => {
            element.textContent = formatNumber(value);
            element.dataset.target = value;
            
            // Add update animation
            element.style.transform = 'scale(1.1)';
            element.style.color = '#ff6b35';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 300);
        });
        
        showNotification(`${statType} statistikasi yangilandi!`, 'success');
    }
}

// Update hero content from admin panel
function updateHeroContent(title, subtitle, description) {
    const heroTitle = document.querySelector('.hero-title .glitch');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        heroTitle.textContent = title;
        heroTitle.setAttribute('data-text', title);
    }
    
    if (heroSubtitle) {
        heroSubtitle.textContent = subtitle;
    }
    
    showNotification('Hero content yangilandi!', 'success');
}

// Format number for display
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.admin-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `admin-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 4000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
}

// Get notification icon
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Hide notification
function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .admin-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
        border: 1px solid rgba(255, 107, 53, 0.3);
        border-radius: 10px;
        padding: 15px 20px;
        max-width: 400px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    
    .admin-notification.show {
        transform: translateX(0);
    }
    
    .admin-notification.success {
        border-color: #4CAF50;
    }
    
    .admin-notification.error {
        border-color: #f44336;
    }
    
    .admin-notification.warning {
        border-color: #ff9800;
    }
    
    .admin-notification .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .admin-notification.success .notification-content i {
        color: #4CAF50;
    }
    
    .admin-notification.error .notification-content i {
        color: #f44336;
    }
    
    .admin-notification.warning .notification-content i {
        color: #ff9800;
    }
    
    .admin-notification.info .notification-content i {
        color: #ff6b35;
    }
    
    .admin-notification .notification-content span {
        color: #ffffff;
        font-size: 0.9rem;
    }
    
    .admin-notification .notification-close {
        background: none;
        border: none;
        color: #cccccc;
        cursor: pointer;
        font-size: 1rem;
        padding: 5px;
        transition: color 0.3s ease;
    }
    
    .admin-notification .notification-close:hover {
        color: #ff6b35;
    }
    
    @media (max-width: 768px) {
        .admin-notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Add admin login modal styles
const adminLoginStyles = document.createElement('style');
adminLoginStyles.textContent = `
    .admin-login-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 20000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .admin-login-modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .admin-login-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }
    
    .admin-login-container {
        position: relative;
        background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
        border: 1px solid rgba(255, 107, 53, 0.3);
        border-radius: 15px;
        padding: 40px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .admin-login-modal.show .admin-login-container {
        transform: scale(1);
    }
    
    .admin-login-header {
        text-align: center;
        margin-bottom: 30px;
    }
    
    .admin-login-header i {
        font-size: 3rem;
        color: #ff6b35;
        margin-bottom: 15px;
        display: block;
    }
    
    .admin-login-header h3 {
        color: #ffffff;
        font-family: 'Orbitron', monospace;
        font-size: 1.5rem;
        margin: 0 0 10px 0;
        text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
    }
    
    .admin-login-header p {
        color: #cccccc;
        margin: 0;
        font-size: 0.9rem;
    }
    
    .password-input-wrapper {
        position: relative;
        margin-bottom: 25px;
    }
    
    .password-input-wrapper i.fa-lock {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #ff6b35;
        font-size: 1.1rem;
    }
    
    .password-input-wrapper input {
        width: 100%;
        padding: 15px 50px 15px 45px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 107, 53, 0.3);
        border-radius: 10px;
        color: #ffffff;
        font-size: 1rem;
        transition: all 0.3s ease;
        box-sizing: border-box;
    }
    
    .password-input-wrapper input:focus {
        outline: none;
        border-color: #ff6b35;
        box-shadow: 0 0 15px rgba(255, 107, 53, 0.3);
        background: rgba(255, 255, 255, 0.15);
    }
    
    .password-input-wrapper input::placeholder {
        color: #888888;
    }
    
    .toggle-admin-password {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #cccccc;
        cursor: pointer;
        font-size: 1rem;
        transition: color 0.3s ease;
    }
    
    .toggle-admin-password:hover {
        color: #ff6b35;
    }
    
    .admin-login-buttons {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .admin-login-btn,
    .admin-cancel-btn {
        flex: 1;
        padding: 12px 20px;
        border: none;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    
    .admin-login-btn {
        background: linear-gradient(135deg, #ff6b35, #f7931e);
        color: #ffffff;
    }
    
    .admin-login-btn:hover {
        background: linear-gradient(135deg, #f7931e, #ff6b35);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 107, 53, 0.4);
    }
    
    .admin-login-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }
    
    .admin-cancel-btn {
        background: rgba(255, 255, 255, 0.1);
        color: #cccccc;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .admin-cancel-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        color: #ffffff;
        transform: translateY(-2px);
    }
    
    .admin-login-hint {
        text-align: center;
    }
    
    .admin-login-hint small {
        color: #888888;
        font-size: 0.8rem;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0) scale(1); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px) scale(1); }
        20%, 40%, 60%, 80% { transform: translateX(5px) scale(1); }
    }
    
    @media (max-width: 768px) {
        .admin-login-container {
            padding: 30px 25px;
            margin: 20px;
        }
        
        .admin-login-buttons {
            flex-direction: column;
        }
        
        .admin-login-header i {
            font-size: 2.5rem;
        }
        
        .admin-login-header h3 {
            font-size: 1.3rem;
        }
    }
`;
document.head.appendChild(adminLoginStyles);

// ===== MANUAL ADMIN ACCESS FUNCTIONS =====

// Global function for manual testing
window.testAdminAccess = function() {
    console.log('Manual admin access test');
    checkAdminAccess();
};

// Global function to directly open admin
window.openAdminDirect = function() {
    console.log('Direct admin panel opening');
    const adminWindow = window.open('admin.html', 'adminPanel', 'width=1400,height=900,scrollbars=yes,resizable=yes');
    if (adminWindow) {
        console.log('Admin panel ochildi');
        showSimpleNotification('Admin panel ochildi!', 'success');
    } else {
        console.log('Popup blocker');
        showSimpleNotification('Popup blocker o\'chirilganligini tekshiring!', 'error');
    }
};

// Global function to show admin login directly
window.showAdminLoginDirect = function() {
    console.log('Direct admin login modal');
    showAdminLogin();
};

// Add keyboard shortcut for admin access
document.addEventListener('keydown', (e) => {
    // Ctrl + Shift + A for admin access
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        console.log('Keyboard shortcut for admin access');
        e.preventDefault();
        showAdminLogin();
    }
});

// Add double-click anywhere on logo text
document.addEventListener('dblclick', (e) => {
    const target = e.target;
    if (target.textContent && (target.textContent.includes('SHOXRUZ') || target.textContent.includes('YAKUDZA'))) {
        console.log('Double-click on logo detected');
        showAdminLogin();
    }
});

console.log('🔐 Admin Access Methods:');
console.log('1. Logo ustiga 2 marta bosing');
console.log('2. Console: testAdminAccess()');
console.log('3. Console: showAdminLoginDirect()');
console.log('4. Console: openAdminDirect()');
console.log('5. Keyboard: Ctrl+Shift+A');
console.log('6. Logo ustiga double-click');
// ===== DEBUG AND HELP FUNCTIONS =====

// Show debug info
function showDebugInfo() {
    const debugDiv = document.createElement('div');
    debugDiv.className = 'debug-info show';
    debugDiv.innerHTML = `
        <strong>🔐 Admin Access Debug</strong><br>
        Logo elements: ${document.querySelectorAll('.nav-logo').length}<br>
        Click count: ${adminClickCount}<br>
        Functions: ${typeof checkAdminAccess}<br>
        <button onclick="this.parentElement.remove()" style="margin-top: 5px; padding: 2px 5px;">Yopish</button>
    `;
    document.body.appendChild(debugDiv);
}

// Show admin access hint
function showAdminHint() {
    const hintDiv = document.createElement('div');
    hintDiv.className = 'admin-access-hint show';
    hintDiv.innerHTML = `
        💡 Admin Panel: Logo ustiga 2 marta bosing<br>
        🔑 Parol: yakudza2024<br>
        ⌨️ Yoki: Ctrl+Shift+A
    `;
    document.body.appendChild(hintDiv);
    
    setTimeout(() => {
        hintDiv.classList.remove('show');
        setTimeout(() => hintDiv.remove(), 300);
    }, 5000);
}

// Auto-show hint after 3 seconds
setTimeout(() => {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        showAdminHint();
    }
}, 3000);

// Global debug functions
window.debugAdmin = showDebugInfo;
window.showHint = showAdminHint;

// Test all logo elements
window.testAllLogos = function() {
    console.log('Testing all logo elements...');
    const logos = document.querySelectorAll('.nav-logo, .nav-logo h2, .yakudza, .hero-title, .glitch');
    console.log(`Found ${logos.length} logo elements`);
    
    logos.forEach((logo, index) => {
        console.log(`Logo ${index + 1}:`, logo.tagName, logo.className, logo.textContent?.substring(0, 20));
        
        // Add visual indicator
        logo.style.border = '2px solid red';
        logo.style.animation = 'pulse 1s infinite';
        
        setTimeout(() => {
            logo.style.border = '';
            logo.style.animation = '';
        }, 3000);
    });
};

// Enhanced click detection
function enhanceClickDetection() {
    console.log('Enhancing click detection...');
    
    // Add click listeners to all possible logo elements
    const selectors = [
        '.nav-logo',
        '.nav-logo h2', 
        '.yakudza',
        '.hero-title',
        '.glitch',
        '.yakudza-title'
    ];
    
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                console.log(`Click detected on: ${selector}`);
                e.preventDefault();
                e.stopPropagation();
                checkAdminAccess();
            });
            
            // Add visual feedback
            element.style.cursor = 'pointer';
            element.title = 'Admin Panel uchun 2 marta bosing';
        });
    });
}

// Run enhancement after DOM load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(enhanceClickDetection, 1000);
});

console.log('🚀 Enhanced Admin Access loaded!');
console.log('Available commands:');
console.log('- testAdminAccess()');
console.log('- showAdminLoginDirect()');
console.log('- openAdminDirect()');
console.log('- debugAdmin()');
console.log('- showHint()');
console.log('- testAllLogos()');