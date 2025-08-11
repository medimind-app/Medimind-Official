// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initPaymentFlow();
    initFormHandling();
    initScrollAnimations();
    initButtonEffects();
    initSmoothScroll();
    initParallaxEffect();
    initMobileOptimizations();
    
    console.log('🎯 Medimind NEET 2026 - Ready to Transform Your Preparation!');
});

// Payment Flow Management
function initPaymentFlow() {
    const paymentBtn = document.getElementById('upi-payment-btn');
    const formSection = document.getElementById('payment-form-section');
    
    if (paymentBtn) {
        paymentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // UPI deep link
            const upiLink = this.getAttribute('href');
            
            // Try to open UPI app
            try {
                // For mobile devices, directly navigate to UPI link
                if (/Mobi|Android/i.test(navigator.userAgent)) {
                    window.location.href = upiLink;
                } else {
                    // For desktop, show instructions
                    showDesktopPaymentInfo();
                }
                
                // Show form section after a delay
                setTimeout(() => {
                    if (formSection) {
                        formSection.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                        formSection.style.opacity = '1';
                        formSection.style.transform = 'translateY(0)';
                    }
                }, 2000);
                
                // Show instruction message for mobile
                if (/Mobi|Android/i.test(navigator.userAgent)) {
                    showPaymentInstruction();
                }
                
            } catch (error) {
                console.error('Error opening UPI app:', error);
                showFallbackPaymentInfo();
            }
        });
    }
}

function showPaymentInstruction() {
    // Create and show instruction popup
    const instruction = document.createElement('div');
    instruction.className = 'payment-instruction';
    instruction.innerHTML = `
        <div class="instruction-content">
            <div class="instruction-icon">💳</div>
            <h4>Complete Your Payment</h4>
            <p>Your UPI app should open automatically. Complete the ₹29 payment and return here to submit your details.</p>
            <button onclick="this.parentElement.parentElement.remove()" class="btn btn--sm btn--primary">Got it!</button>
        </div>
    `;
    
    // Add styles
    instruction.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const content = instruction.querySelector('.instruction-content');
    content.style.cssText = `
        background: var(--color-surface);
        padding: var(--space-32);
        border-radius: var(--radius-lg);
        text-align: center;
        max-width: 400px;
        margin: 0 var(--space-16);
        box-shadow: var(--shadow-lg);
        animation: slideInUp 0.4s ease-out;
        color: var(--color-text);
    `;
    
    document.body.appendChild(instruction);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (instruction.parentElement) {
            instruction.remove();
        }
    }, 5000);
}

function showDesktopPaymentInfo() {
    const desktopInfo = document.createElement('div');
    desktopInfo.className = 'desktop-payment-info';
    desktopInfo.innerHTML = `
        <div class="desktop-info-content">
            <div class="desktop-icon">📱</div>
            <h4>Mobile Payment Required</h4>
            <p>UPI payments work best on mobile devices. Please:</p>
            <ul style="text-align: left; margin: var(--space-16) 0;">
                <li>Open this page on your mobile device, OR</li>
                <li>Manually pay using UPI details below:</li>
            </ul>
            <div class="upi-details" style="background: var(--color-bg-2); padding: var(--space-16); border-radius: var(--radius-base); margin: var(--space-16) 0;">
                <strong>UPI ID:</strong> medimin@ptaxis<br>
                <strong>Name:</strong> Medimind<br>
                <strong>Amount:</strong> ₹29
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="btn btn--sm btn--primary">Understood</button>
        </div>
    `;
    
    desktopInfo.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const content = desktopInfo.querySelector('.desktop-info-content');
    content.style.cssText = `
        background: var(--color-surface);
        padding: var(--space-32);
        border-radius: var(--radius-lg);
        text-align: center;
        max-width: 500px;
        margin: 0 var(--space-16);
        box-shadow: var(--shadow-lg);
        color: var(--color-text);
    `;
    
    document.body.appendChild(desktopInfo);
}

function showFallbackPaymentInfo() {
    const fallback = document.createElement('div');
    fallback.className = 'fallback-payment';
    fallback.innerHTML = `
        <div class="fallback-content">
            <div class="fallback-icon">⚠️</div>
            <h4>Manual Payment Required</h4>
            <p>Please manually send ₹29 using these details:</p>
            <div class="upi-details" style="background: var(--color-bg-3); padding: var(--space-16); border-radius: var(--radius-base); margin: var(--space-16) 0;">
                <strong>UPI ID:</strong> medimin@ptaxis<br>
                <strong>Name:</strong> Medimind<br>
                <strong>Amount:</strong> ₹29
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="btn btn--sm btn--primary">Understood</button>
        </div>
    `;
    
    fallback.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const content = fallback.querySelector('.fallback-content');
    content.style.cssText = `
        background: var(--color-surface);
        padding: var(--space-32);
        border-radius: var(--radius-lg);
        text-align: center;
        max-width: 400px;
        margin: 0 var(--space-16);
        box-shadow: var(--shadow-lg);
        color: var(--color-text);
    `;
    
    document.body.appendChild(fallback);
}

// Form Handling
function initFormHandling() {
    const form = document.getElementById('payment-form');
    const successMessage = document.getElementById('success-message');
    
    if (form) {
        // Add form validation
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all required fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField({ target: input })) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showFormError('Please fill in all required fields correctly.');
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('.form-submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '⏳ Submitting...';
            submitBtn.disabled = true;
            
            // Submit to Formspree
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            })
            .then(data => {
                // Show success message
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
                successMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Track successful submission
                trackEvent('payment_form_submitted', {
                    email: formData.get('email'),
                    name: formData.get('name')
                });
            })
            .catch(error => {
                console.error('Form submission error:', error);
                showFormError('There was an error submitting your form. Please try again or contact support.');
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    
    // Remove existing error
    clearFieldError(e);
    
    // Check required fields
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    // Transaction ID validation
    if (field.name === 'transaction_id' && value) {
        if (value.length < 6) {
            showFieldError(field, 'Transaction ID should be at least 6 characters');
            isValid = false;
        }
    }
    
    // Phone validation (optional but if provided should be valid)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    field.style.borderColor = 'var(--color-error)';
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    field.style.borderColor = '';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showFormError(message) {
    // Remove existing error
    const existingError = document.querySelector('.form-general-error');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-general-error';
    errorDiv.textContent = message;
    
    const form = document.getElementById('payment-form');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto remove after 8 seconds
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 8000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for staggered animations
                if (entry.target.classList.contains('feature-card')) {
                    const cards = entry.target.parentNode.children;
                    Array.from(cards).forEach((card, index) => {
                        if (card === entry.target) {
                            card.style.animationDelay = (index * 0.1) + 's';
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatableElements = document.querySelectorAll(
        '.feature-card, .faq-item, .payment-section, .section-header'
    );
    
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced Button Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .payment-btn');
    
    buttons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            // Don't add ripple to form submit buttons during submission
            if (this.disabled) return;
            
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;
            
            if (!this.style.position || this.style.position === 'static') {
                this.style.position = 'relative';
            }
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentElement) {
                    ripple.remove();
                }
            }, 600);
        });
        
        // Enhanced hover effects
        button.addEventListener('mouseenter', function() {
            if (!this.disabled && !this.classList.contains('payment-btn')) {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled && !this.classList.contains('payment-btn')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Smooth Scrolling and Progress Bar
function initSmoothScroll() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    
    document.body.appendChild(progressBar);
    
    const progressBarInner = progressBar.querySelector('.scroll-progress-bar');
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        
        progressBarInner.style.width = scrollPercent + '%';
    });
}

// Parallax Effect for Floating Icons
function initParallaxEffect() {
    const floatingIcons = document.querySelectorAll('.icon-float');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        floatingIcons.forEach((icon, index) => {
            const speed = 0.1 + (index * 0.03);
            const yPos = -(scrolled * speed);
            const rotation = scrolled * 0.01;
            
            icon.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking && window.innerWidth > 768) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Mobile Optimizations
function initMobileOptimizations() {
    // Detect touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Recalculate layout after orientation change
            window.scrollTo(0, window.scrollY + 1);
            window.scrollTo(0, window.scrollY - 1);
        }, 500);
    });
    
    // Optimize for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const reducedMotionStyle = document.createElement('style');
        reducedMotionStyle.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(reducedMotionStyle);
    }
}

// Utility Functions
function trackEvent(eventName, properties = {}) {
    // Simple event tracking - could be expanded with analytics
    console.log(`Event: ${eventName}`, properties);
    
    // Example: Could integrate with Google Analytics, Mixpanel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
}

// Enhanced Link Handling
function initLinkHandling() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        // Ensure security attributes
        if (!link.rel) {
            link.rel = 'noopener noreferrer';
        }
        
        // Add loading feedback
        link.addEventListener('click', function(e) {
            this.style.opacity = '0.8';
            
            // Reset after delay
            setTimeout(() => {
                this.style.opacity = '1';
            }, 2000);
        });
    });
}

// Initialize link handling
initLinkHandling();

// Add FAQ interaction
function initFAQInteraction() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add subtle interaction feedback
            this.style.transform = 'translateY(-1px)';
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
            }, 200);
        });
    });
}

// Initialize FAQ interaction
initFAQInteraction();

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy load any images that might be added later
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate any layout-dependent features
            const event = new Event('optimizedResize');
            window.dispatchEvent(event);
        }, 250);
    });
}

// Initialize performance optimizations
initPerformanceOptimizations();

// Ensure floating icons are visible and animated
function ensureFloatingIcons() {
    const icons = document.querySelectorAll('.icon-float');
    if (icons.length > 0) {
        console.log(`✅ ${icons.length} floating medical icons loaded and animating`);
    } else {
        console.warn('⚠️ Floating medical icons not found');
    }
}

// Check icons after DOM is loaded
setTimeout(ensureFloatingIcons, 500);

// Export functions for external use if needed
window.MedimindApp = {
    showPaymentInstruction,
    validateField,
    trackEvent,
    showDesktopPaymentInfo
};

// Console welcome message
console.log(`
🎯 Medimind NEET 2026 - Limited Access Platform
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Features Loaded:
   ✅ UPI Payment Integration (Mobile + Desktop)
   ✅ Form Validation & Formspree Submission
   ✅ Animated Medical Icons
   ✅ Smooth Animations & Parallax
   ✅ Mobile Optimization
   ✅ Accessibility Features
   ✅ Progress Tracking
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💫 Ready to help NEET 2026 aspirants succeed!
`);