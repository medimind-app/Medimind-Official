// Enhanced Medimind NEET Preparation Platform - Fixed JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // MOBILE MENU FUNCTIONALITY
    // ==========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Toggle mobile menu
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.toggle('hidden');
            document.body.style.overflow = mobileMenu.classList.contains('hidden') ? 'auto' : 'hidden';
            
            // Animate hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (!mobileMenu.classList.contains('hidden')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = 'auto';
                resetMobileMenuToggle();
            });
        });
        
        // Close mobile menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = 'auto';
                resetMobileMenuToggle();
            }
        });
        
        function resetMobileMenuToggle() {
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // ==========================================
    // SMOOTH SCROLLING NAVIGATION - FIXED
    // ==========================================
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        document.body.style.overflow = 'auto';
                        resetMobileMenuToggle();
                    }
                }
            }
        });
    });
    
    // ==========================================
    // ENHANCED NAVBAR SCROLL EFFECTS
    // ==========================================
    if (navbar) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.15)';
                navbar.style.backdropFilter = 'blur(30px)';
                navbar.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
                navbar.style.border = '1px solid rgba(255, 255, 255, 0.18)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.25)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = 'none';
                navbar.style.border = '1px solid rgba(255, 255, 255, 0.18)';
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // ==========================================
    // FAQ ACCORDION FUNCTIONALITY - FIXED
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function(e) {
            e.preventDefault();
            const answer = this.nextElementSibling;
            const isOpen = answer && answer.style.display === 'block';
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                const a = q.nextElementSibling;
                if (a && a !== answer) {
                    a.style.display = 'none';
                    q.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            if (answer) {
                if (isOpen) {
                    answer.style.display = 'none';
                    this.classList.remove('active');
                } else {
                    answer.style.display = 'block';
                    this.classList.add('active');
                }
            }
        });
        
        // Make FAQ questions keyboard accessible
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
    });
    
    // ==========================================
    // LEGAL PAGES TAB FUNCTIONALITY - FIXED
    // ==========================================
    const legalTabs = document.querySelectorAll('.legal-tab');
    const legalPages = document.querySelectorAll('.legal-page');
    
    legalTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and pages
            legalTabs.forEach(t => t.classList.remove('active'));
            legalPages.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding page
            this.classList.add('active');
            const targetPage = document.getElementById(targetTab);
            if (targetPage) {
                targetPage.classList.add('active');
            }
        });
        
        // Make tabs keyboard accessible
        tab.setAttribute('tabindex', '0');
        tab.setAttribute('role', 'tab');
    });
    
    // ==========================================
    // FLOATING LABEL FORM FUNCTIONALITY
    // ==========================================
    const formGroups = document.querySelectorAll('.floating-label');
    
    formGroups.forEach(group => {
        const input = group.querySelector('.form-control');
        const label = group.querySelector('.form-label');
        
        if (input && label) {
            // Handle focus events
            input.addEventListener('focus', function() {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    group.classList.remove('focused');
                }
            });
            
            // Handle input events for real-time validation
            input.addEventListener('input', function() {
                if (this.value !== '') {
                    group.classList.add('focused');
                } else {
                    group.classList.remove('focused');
                }
                
                // Real-time validation feedback
                if (this.type === 'email' && this.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailRegex.test(this.value)) {
                        this.style.borderColor = '#28A745';
                        this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
                    } else {
                        this.style.borderColor = '#FF6B6B';
                        this.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)';
                    }
                } else {
                    this.style.borderColor = '';
                    this.style.boxShadow = '';
                }
            });
            
            // Check if input has value on load
            if (input.value !== '') {
                group.classList.add('focused');
            }
        }
    });
    
    // ==========================================
    // ENHANCED FORM SUBMISSION - FIXED
    // ==========================================
    const paymentForm = document.querySelector('.payment-form');
    const formButton = paymentForm ? paymentForm.querySelector('button[type="submit"]') : null;
    const verificationMessage = document.querySelector('.verification-message');
    
    if (paymentForm && formButton) {
        let formSubmitting = false;
        
        paymentForm.addEventListener('submit', function(e) {
            // Don't prevent default - let Formspree handle the submission
            
            // Prevent double submission
            if (formSubmitting) {
                e.preventDefault();
                return false;
            }
            
            // Validate form fields before submission
            const name = paymentForm.querySelector('#name');
            const email = paymentForm.querySelector('#email');
            const transaction = paymentForm.querySelector('#transaction');
            
            if (!name.value.trim() || !email.value.trim() || !transaction.value.trim()) {
                e.preventDefault();
                showNotification('Please fill in all required fields.', 'error');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                e.preventDefault();
                showNotification('Please enter a valid email address.', 'error');
                return false;
            }
            
            // Set submitting state
            formSubmitting = true;
            
            // Show loading state
            formButton.disabled = true;
            const originalButtonContent = formButton.innerHTML;
            formButton.innerHTML = `
                <span class="btn-text">Submitting...</span>
                <span class="btn-shine"></span>
            `;
            formButton.style.opacity = '0.7';
            
            // Handle successful submission
            setTimeout(() => {
                // Show verification message
                if (verificationMessage) {
                    verificationMessage.style.display = 'block';
                    verificationMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Celebrate success
                    createConfetti();
                    showNotification('Payment confirmation submitted successfully! Check your email for confirmation.', 'success');
                }
                
                // Reset form
                paymentForm.reset();
                formGroups.forEach(group => group.classList.remove('focused'));
                
                // Reset form button
                formButton.disabled = false;
                formButton.innerHTML = originalButtonContent;
                formButton.style.opacity = '1';
                
                formSubmitting = false;
            }, 2000);
        });
    }
    
    // ==========================================
    // PAYMENT BUTTON ENHANCEMENTS - FIXED
    // ==========================================
    const paymentButton = document.querySelector('.payment-btn');
    if (paymentButton) {
        // Ensure the button works properly
        paymentButton.addEventListener('click', function(e) {
            // Add ripple effect
            createRipple(e, this);
            
            // Track payment button click
            console.log('Payment button clicked - redirecting to Razorpay');
            showNotification('Redirecting to secure payment gateway...', 'info');
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // The href attribute will handle the actual redirect
        });
    }
    
    // ==========================================
    // SCROLL-TRIGGERED ANIMATIONS
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for grids
                if (entry.target.classList.contains('features-grid') || entry.target.classList.contains('benefits-grid')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Apply animation to elements
    const animateElements = document.querySelectorAll(
        '.feature-card, .benefit-card, .payment-form-card, .contact-info, .faq-section, .features-grid, .benefits-grid'
    );
    
    animateElements.forEach(element => {
        if (!element.closest('.features-grid, .benefits-grid')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }
        observer.observe(element);
    });
    
    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(40, 167, 69, 0.95)' : type === 'error' ? 'rgba(255, 107, 107, 0.95)' : 'rgba(46, 134, 171, 0.95)'};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            backdrop-filter: blur(20px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 300px;
            font-size: 14px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // Ripple effect
    function createRipple(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
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
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Ensure element has proper positioning
        const originalPosition = element.style.position;
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Create ripple animation if it doesn't exist
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
            // Restore original position if it was changed
            if (!originalPosition || originalPosition === 'static') {
                element.style.position = '';
            }
        }, 600);
    }
    
    // Confetti celebration
    function createConfetti() {
        const colors = ['#2E86AB', '#28A745', '#6C63FF', '#FF6B6B', '#FFD93D'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confettiContainer);
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}%;
                    top: -10px;
                    animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                `;
                confettiContainer.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.remove();
                    }
                }, 5000);
            }, i * 20);
        }
        
        // Add confetti animation if it doesn't exist
        if (!document.querySelector('#confetti-animation')) {
            const style = document.createElement('style');
            style.id = 'confetti-animation';
            style.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (confettiContainer.parentNode) {
                confettiContainer.parentNode.removeChild(confettiContainer);
            }
        }, 5000);
    }
    
    // ==========================================
    // EMAIL COPY FUNCTIONALITY
    // ==========================================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.textContent.trim();
            
            if (navigator.clipboard) {
                e.preventDefault();
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email address copied to clipboard!', 'success');
                }).catch(() => {
                    // If clipboard fails, continue with default mailto behavior
                    window.location.href = this.href;
                });
            }
        });
    });
    
    // ==========================================
    // KEYBOARD NAVIGATION SUPPORT
    // ==========================================
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
        
        // FAQ navigation with Enter key
        if (e.key === 'Enter' && e.target.classList.contains('faq-question')) {
            e.preventDefault();
            e.target.click();
        }
        
        // Legal tab navigation with Enter key
        if (e.key === 'Enter' && e.target.classList.contains('legal-tab')) {
            e.preventDefault();
            e.target.click();
        }
        
        // Legal tab navigation with arrow keys
        if (e.target.classList.contains('legal-tab')) {
            const tabs = Array.from(legalTabs);
            const currentIndex = tabs.indexOf(e.target);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                tabs[currentIndex - 1].focus();
                tabs[currentIndex - 1].click();
            } else if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
                e.preventDefault();
                tabs[currentIndex + 1].focus();
                tabs[currentIndex + 1].click();
            }
        }
    });
    
    // ==========================================
    // PERFORMANCE OPTIMIZATIONS
    // ==========================================
    
    // Throttle scroll events
    let ticking = false;
    function updateScrollEffects() {
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
    // ==========================================
    // INITIAL SETUP
    // ==========================================
    
    // Hide verification message initially
    const verificationMessage = document.querySelector('.verification-message');
    if (verificationMessage) {
        verificationMessage.style.display = 'none';
    }
    
    // Add smooth transitions to interactive elements
    const interactiveElements = document.querySelectorAll('.feature-card, .benefit-card, .faq-item, .legal-tab');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (!this.style.transform.includes('translateY')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.style.transform === 'translateY(-2px)') {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Initialize floating particles animation
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.style.animationDelay = `${index * 1}s`;
    });
    
    // ==========================================
    // FINAL INITIALIZATION
    // ==========================================
    
    // Ensure all animations are properly initialized
    setTimeout(() => {
        document.body.classList.add('loaded');
        console.log('🚀 Medimind Enhanced Platform Loaded Successfully!');
        showNotification('Welcome to Medimind! Your NEET success journey starts here.', 'success');
    }, 1000);
    
    // Add a subtle loading completion effect
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) * {
            animation-play-state: paused;
        }
        body.loaded * {
            animation-play-state: running;
        }
    `;
    document.head.appendChild(style);
    
});