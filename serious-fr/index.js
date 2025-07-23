// Landing page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // If section doesn't exist, show placeholder
                    console.log(`Section "${targetId}" not implemented yet`);
                }
            }
        });
    });
    
    // CTA Button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Add loading state
            const span = this.querySelector('span');
            const originalText = span.textContent;
            
            span.textContent = 'Loading...';
            this.disabled = true;
            this.style.opacity = '0.7';
            
            // Simulate redirect delay
            setTimeout(() => {
                // Redirect to signup page
                window.location.href = 'signup.html';
            }, 1000);
        });
    }
    
    // Social icon click handlers
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the aria-label to determine which social platform
            const platform = this.getAttribute('aria-label');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Simulate social media links (replace with actual URLs)
            const socialUrls = {
                'GitHub': 'https://github.com/serendale-ai',
                'Discord': 'https://discord.gg/serendale-ai',
                'Reddit': 'https://reddit.com/r/serendale-ai',
                'Twitter': 'https://twitter.com/serendale-ai'
            };
            
            const url = socialUrls[platform];
            if (url) {
                // In a real implementation, you would open the actual social media links
                console.log(`Would open: ${url}`);
                // window.open(url, '_blank');
            }
        });
    });
    
    // Add parallax effect to the main title
    let ticking = false;
    
    function updateTitle() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.main-title');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateTitle);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.hero-section, .navigation');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Enable keyboard navigation for accessibility
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        // Remove keyboard navigation class when using mouse
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add dynamic gradient animation to the title
    function animateGradient() {
        const title = document.querySelector('.main-title');
        if (title) {
            let angle = 0;
            
            setInterval(() => {
                angle = (angle + 1) % 360;
                const gradient = `linear-gradient(${angle}deg, #ffffff 0%, #ff3bff 50%, #ffffff 100%)`;
                title.style.background = gradient;
                title.style.webkitBackgroundClip = 'text';
                title.style.backgroundClip = 'text';
            }, 50);
        }
    }
    
    // Start gradient animation after a delay
    setTimeout(animateGradient, 2000);
    
    // Add typing effect for the description
    function typeWriter(element, text, speed = 50) {
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing effect for description paragraphs
    const descriptionPs = document.querySelectorAll('.description p');
    descriptionPs.forEach((p, index) => {
        const originalText = p.textContent;
        setTimeout(() => {
            typeWriter(p, originalText, 30);
        }, index * 1000 + 3000); // Start after 3 seconds, stagger each paragraph
    });
    
    // Add floating animation to CTA button
    function floatCTA() {
        const cta = document.querySelector('.cta-button');
        if (cta) {
            let floatDirection = 1;
            let floatAmount = 0;
            
            setInterval(() => {
                floatAmount += floatDirection * 0.5;
                if (floatAmount >= 5 || floatAmount <= -5) {
                    floatDirection *= -1;
                }
                cta.style.transform = `translateY(${floatAmount}px)`;
            }, 100);
        }
    }
    
    // Start floating animation
    setTimeout(floatCTA, 4000);
    
    console.log('🚀 Serendale.ai landing page loaded successfully!');
});
