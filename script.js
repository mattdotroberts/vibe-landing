document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Feature card hover effects and interactions
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        // Add click functionality for feature cards
        card.addEventListener('click', function() {
            const feature = this.dataset.feature;
            showFeatureModal(feature);
        });
    });

    // Typing animation for the hero mockup
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        let dots = 0;
        setInterval(() => {
            dots = (dots + 1) % 4;
            typingIndicator.textContent = 'Vibe is thinking' + '.'.repeat(dots);
        }, 500);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-visual');
        
        if (parallax) {
            const speed = scrolled * 0.1;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Intersection Observer for animations
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

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .testimonial, .pricing-card').forEach(el => {
        observer.observe(el);
    });

    // Price toggle for annual/monthly (if needed in future)
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Header background opacity on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 100, 0.95);
        if (header) {
            header.style.backgroundColor = `rgba(10, 10, 10, ${opacity})`;
        }
    });

    // Button click effects
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Feature modal functionality
function showFeatureModal(feature) {
    const features = {
        privacy: {
            title: '100% Private',
            description: 'Your creative work never leaves your device. All AI processing happens locally using advanced on-device models.',
            benefits: [
                'No data transmission to external servers',
                'Complete control over your creative content',
                'GDPR and privacy regulation compliant',
                'Offline-first architecture'
            ]
        },
        offline: {
            title: 'Works Offline',
            description: 'Create and collaborate without internet connectivity. Perfect for flights, remote locations, or unreliable connections.',
            benefits: [
                'Full functionality without internet',
                'Local AI processing',
                'Sync when connected',
                'No dependency on cloud services'
            ]
        },
        smart: {
            title: 'Intelligent Assistance',
            description: 'Advanced AI that understands context and provides meaningful insights to enhance your creative process.',
            benefits: [
                'Context-aware suggestions',
                'Creative brainstorming partner',
                'Adaptive learning from your style',
                'Multi-modal understanding'
            ]
        },
        templates: {
            title: 'Smart Templates',
            description: 'Pre-built templates for different creative workflows, customizable to your specific needs.',
            benefits: [
                'Industry-specific templates',
                'Customizable workflows',
                'Time-saving presets',
                'Best practice frameworks'
            ]
        },
        export: {
            title: 'Easy Export',
            description: 'Export your work in multiple formats and share directly with your team or clients.',
            benefits: [
                'Multiple export formats',
                'Direct sharing capabilities',
                'Batch processing',
                'Custom formatting options'
            ]
        },
        fast: {
            title: 'Lightning Fast',
            description: 'Optimized for speed with instant responses and seamless interactions.',
            benefits: [
                'Sub-second response times',
                'Optimized local processing',
                'Minimal resource usage',
                'Smooth user experience'
            ]
        }
    };

    const featureData = features[feature];
    if (featureData) {
        // Simple alert for now - could be enhanced with a proper modal
        const benefitsList = featureData.benefits.map(benefit => `• ${benefit}`).join('\n');
        alert(`${featureData.title}\n\n${featureData.description}\n\nKey Benefits:\n${benefitsList}`);
    }
}