// Cosmic Portfolio JavaScript - Space Theme

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const nav = document.getElementById('navigation');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Video elements
    const heroVideo = document.querySelector('.hero__video');
    const videoToggle = document.getElementById('video-toggle');
    
    // Form elements
    const contactForm = document.getElementById('contact-form');
    
    // Skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Initialize cosmic effects
    initializeCosmicEffects();
    
    // Navigation toggle functionality
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
            
            // Add cosmic sound effect simulation
            playCosmicSound('navigation');
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
            document.body.style.overflow = 'auto';
            
            // Add cosmic navigation sound
            playCosmicSound('link');
        });
    });
    
    // Enhanced smooth scrolling with cosmic effects
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = nav.offsetHeight || 80;
                    const offsetTop = targetSection.offsetTop - headerHeight;
                    
                    // Add cosmic transition effect
                    createCosmicTransition();
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Close mobile menu
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Enhanced video control functionality
    if (heroVideo && videoToggle) {
        let isPlaying = true;
        
        videoToggle.addEventListener('click', function() {
            if (isPlaying) {
                heroVideo.pause();
                videoToggle.textContent = '▶️';
                isPlaying = false;
                playCosmicSound('pause');
            } else {
                heroVideo.play();
                videoToggle.textContent = '⏸️';
                isPlaying = true;
                playCosmicSound('play');
            }
            
            // Add cosmic button effect
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Handle video loading errors with cosmic fallback
        heroVideo.addEventListener('error', function() {
            console.log('Video failed to load, cosmic fallback activated');
            const fallback = document.querySelector('.hero__fallback');
            if (fallback) {
                fallback.style.zIndex = '-1';
                fallback.style.background = 'linear-gradient(135deg, #0a0a0a, #2d1b69, #0f1419)';
            }
            if (videoToggle) {
                videoToggle.style.display = 'none';
            }
        });
    }
    
    // Cosmic navigation transparency and glow effects
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Enhanced navigation effects
        if (scrollTop > 100) {
            nav.classList.remove('transparent');
            nav.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
        } else {
            nav.classList.add('transparent');
            nav.style.boxShadow = 'none';
        }
        
        // Update active navigation link
        updateActiveNavLink();
        
        // Cosmic parallax effects
        updateCosmicParallax(scrollTop);
        
        lastScrollTop = scrollTop;
    });
    
    // Enhanced active navigation link updating
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 150;
        
        navLinks.forEach(link => link.classList.remove('active'));
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                    // Add cosmic glow effect to active link
                    correspondingLink.style.textShadow = '0 0 20px #00ffff';
                }
            }
        });
    }
    
    // Cosmic Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cosmicObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Enhanced cosmic entrance animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add cosmic particle burst effect
                createParticleBurst(entry.target);
                
                // Trigger skill bar animations for skills section
                if (entry.target.classList.contains('skills')) {
                    setTimeout(() => animateCosmicSkillBars(), 500);
                }
                
                // Add staggered animation for card elements
                const cards = entry.target.querySelectorAll('.cosmic-card, .space-station, .spaceship-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, observerOptions);
    
    // Observe elements for cosmic animations
    const animatedElements = document.querySelectorAll('.cosmic-section, .cosmic-card, .space-station, .spaceship-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        cosmicObserver.observe(el);
    });
    
    // Enhanced cosmic skill bars animation
    function animateCosmicSkillBars() {
        skillBars.forEach((bar, index) => {
            const skillLevel = bar.getAttribute('data-skill');
            setTimeout(() => {
                bar.style.width = skillLevel + '%';
                
                // Add cosmic sound effect
                playCosmicSound('skill');
                
                // Animate energy particles
                const particles = bar.parentElement.querySelector('.energy-particles');
                if (particles) {
                    particles.style.animation = 'particle-flow 1.5s ease-in-out infinite';
                }
                
                // Add glow effect
                bar.style.boxShadow = '0 0 20px #00ffff, inset 0 0 20px rgba(255, 255, 255, 0.1)';
            }, index * 300);
        });
    }
    
    // Cosmic typewriter effect for hero subtitle
    function initializeCosmicTypewriter() {
        const subtitle = document.querySelector('.cosmic-subtitle');
        if (subtitle && subtitle.classList.contains('typewriter')) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < text.length) {
                    subtitle.textContent += text.charAt(i);
                    playCosmicSound('type'); // Subtle typing sound
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        subtitle.style.borderRight = 'none';
                    }, 1000);
                }
            }
            
            setTimeout(typeWriter, 1500);
        }
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Enhanced cosmic notification system
    function showCosmicNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.cosmic-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = 'cosmic-notification';
        
        let backgroundColor, borderColor;
        switch(type) {
            case 'success':
                backgroundColor = 'linear-gradient(135deg, #00ffff, #1fb8cd)';
                borderColor = '#00ffff';
                break;
            case 'error':
                backgroundColor = 'linear-gradient(135deg, #ff006e, #ff4081)';
                borderColor = '#ff006e';
                break;
            default:
                backgroundColor = 'linear-gradient(135deg, #2d1b69, #4c2a85)';
                borderColor = '#00ffff';
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${backgroundColor};
            color: white;
            padding: 20px 28px;
            border-radius: 12px;
            border: 2px solid ${borderColor};
            box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.3),
                0 0 40px ${borderColor}40,
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            max-width: 320px;
            font-family: 'Exo 2', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 1.4;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Add cosmic particle effect to notification
        addNotificationParticles(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            playCosmicSound('notification');
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }, 5000);
    }
    
    // Enhanced contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                showCosmicNotification('⚠️ All transmission fields are required!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showCosmicNotification('⚠️ Invalid quantum channel frequency!', 'error');
                return;
            }
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Transmitting...';
            submitButton.disabled = true;
            
            // Add cosmic loading effect
            submitButton.style.background = 'linear-gradient(45deg, #00ffff, #ff006e)';
            submitButton.style.animation = 'pulse-glow 1s ease-in-out infinite';
            
            setTimeout(() => {
                showCosmicNotification('🚀 Transmission successful! Mission control will respond soon.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.animation = '';
                submitButton.style.background = '';
                playCosmicSound('success');
            }, 2500);
        });
    }
    
    // Cosmic parallax effects
    function updateCosmicParallax(scrolled) {
        const heroContent = document.querySelector('.cosmic-content');
        const heroVideoEl = document.querySelector('.hero__video');
        const nebulaOverlay = document.querySelector('.nebula-overlay');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = Math.max(0, 1 - scrolled / (window.innerHeight * 0.8));
        }
        
        if (heroVideoEl && scrolled < window.innerHeight) {
            heroVideoEl.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.3}px)`;
        }
        
        if (nebulaOverlay && scrolled < window.innerHeight) {
            nebulaOverlay.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
    
    // Enhanced project card hover effects with cosmic trails
    const projectCards = document.querySelectorAll('.space-station');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add cosmic particle trail
            createCosmicTrail(this);
            playCosmicSound('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Initialize cosmic effects
    function initializeCosmicEffects() {
        // Set initial navigation transparency
        if (nav) {
            nav.classList.add('transparent');
        }
        
        // Initialize typewriter effect
        initializeCosmicTypewriter();
        
        // Create floating particles
        createFloatingParticles();
        
        // Initialize cosmic cursor trail
        initializeCosmicCursor();
        
        // Add cosmic glow to interactive elements
        addCosmicInteractivity();
        
        console.log('🚀 Cosmic Portfolio Systems Online!');
    }
    
    // Create floating particles
    function createFloatingParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position and properties
            const startX = Math.random() * window.innerWidth;
            const delay = Math.random() * 20000;
            const duration = 20000 + Math.random() * 10000;
            
            particle.style.left = startX + 'px';
            particle.style.animationDelay = delay + 'ms';
            particle.style.animationDuration = duration + 'ms';
            
            // Random color
            const colors = ['#00ffff', '#ff006e', '#ffd700', '#ffffff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 10px ${color}`;
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, duration + delay);
        }
        
        // Create particles periodically
        setInterval(createParticle, 500);
        
        // Create initial particles
        for (let i = 0; i < 10; i++) {
            setTimeout(createParticle, i * 100);
        }
    }
    
    // Create cosmic particle burst effect
    function createParticleBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #00ffff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 0 10px #00ffff;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 100;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${endX - centerX}px, ${endY - centerY}px)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }
    
    // Create cosmic transition effect
    function createCosmicTransition() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%);
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 50);
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }, 500);
    }
    
    // Create cosmic trail effect for cards
    function createCosmicTrail(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const trail = document.createElement('div');
                trail.style.cssText = `
                    position: fixed;
                    width: ${rect.width}px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #00ffff, transparent);
                    left: ${rect.left}px;
                    top: ${rect.bottom - 2}px;
                    pointer-events: none;
                    z-index: 1000;
                    opacity: 0.7;
                `;
                
                document.body.appendChild(trail);
                
                trail.animate([
                    { transform: 'scaleX(0)', opacity: 0.7 },
                    { transform: 'scaleX(1)', opacity: 1 },
                    { transform: 'scaleX(0)', opacity: 0 }
                ], {
                    duration: 600,
                    easing: 'ease-out'
                }).onfinish = () => trail.remove();
            }, i * 100);
        }
    }
    
    // Initialize cosmic cursor trail
    function initializeCosmicCursor() {
        let mouseX = 0, mouseY = 0;
        const trails = [];
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function createCursorTrail() {
            if (trails.length < 3) {
                const trail = document.createElement('div');
                trail.style.cssText = `
                    position: fixed;
                    width: 8px;
                    height: 8px;
                    background: radial-gradient(circle, #00ffff, transparent);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    left: ${mouseX - 4}px;
                    top: ${mouseY - 4}px;
                    opacity: 0.6;
                    transition: opacity 0.5s ease;
                `;
                
                document.body.appendChild(trail);
                trails.push(trail);
                
                setTimeout(() => {
                    trail.style.opacity = '0';
                    setTimeout(() => {
                        trail.remove();
                        trails.splice(trails.indexOf(trail), 1);
                    }, 500);
                }, 200);
            }
        }
        
        setInterval(createCursorTrail, 100);
    }
    
    // Add cosmic interactivity to buttons and links
    function addCosmicInteractivity() {
        const interactiveElements = document.querySelectorAll('button, .btn, .social-link, .cosmic-link, .nav__link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.filter = 'drop-shadow(0 0 20px #00ffff)';
                playCosmicSound('hover');
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.filter = '';
            });
            
            element.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
    
    // Add notification particles
    function addNotificationParticles(notification) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: #00ffff;
                    border-radius: 50%;
                    right: ${10 + i * 5}px;
                    top: 10px;
                    box-shadow: 0 0 10px #00ffff;
                    animation: float-notification 2s ease-in-out infinite;
                    animation-delay: ${i * 0.3}s;
                `;
                
                notification.appendChild(particle);
            }, i * 200);
        }
        
        // Add CSS animation for notification particles
        if (!document.querySelector('#cosmic-animations')) {
            const style = document.createElement('style');
            style.id = 'cosmic-animations';
            style.textContent = `
                @keyframes float-notification {
                    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
                    50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Simulate cosmic sound effects (visual feedback since we can't play actual sounds)
    function playCosmicSound(type) {
        // Create visual feedback for sound effects
        const soundIndicator = document.createElement('div');
        soundIndicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 20px;
            height: 20px;
            background: #00ffff;
            border-radius: 50%;
            opacity: 0.8;
            z-index: 10001;
            pointer-events: none;
            animation: sound-pulse 0.3s ease-out;
        `;
        
        document.body.appendChild(soundIndicator);
        
        setTimeout(() => {
            soundIndicator.remove();
        }, 300);
        
        // Add CSS animation if not exists
        if (!document.querySelector('#sound-animations')) {
            const style = document.createElement('style');
            style.id = 'sound-animations';
            style.textContent = `
                @keyframes sound-pulse {
                    0% { transform: scale(0); opacity: 0.8; }
                    50% { transform: scale(1.2); opacity: 1; }
                    100% { transform: scale(0); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log(`🔊 Cosmic sound: ${type}`);
    }
    
    // Keyboard navigation support with cosmic effects
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
            document.body.style.overflow = 'auto';
            
            playCosmicSound('escape');
        }
    });
    
    // Initialize skill bars animation when skills section comes into view
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCosmicSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        skillsObserver.observe(skillsSection);
    }
    
    // Enhanced click effects for project placeholders
    const projectPlaceholders = document.querySelectorAll('.project-placeholder');
    projectPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create cosmic explosion effect
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: linear-gradient(45deg, #00ffff, #ff006e);
                    border-radius: 50%;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    pointer-events: none;
                    z-index: 1000;
                    box-shadow: 0 0 15px #00ffff;
                `;
                
                document.body.appendChild(particle);
                
                const angle = (i / 12) * Math.PI * 2;
                const distance = 150;
                const endX = centerX + Math.cos(angle) * distance;
                const endY = centerY + Math.sin(angle) * distance;
                
                particle.animate([
                    { 
                        transform: 'translate(0, 0) scale(1)', 
                        opacity: 1 
                    },
                    { 
                        transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, 
                        opacity: 0 
                    }
                ], {
                    duration: 1000,
                    easing: 'ease-out'
                }).onfinish = () => particle.remove();
            }
            
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            playCosmicSound('explosion');
        });
    });
    
    // Add resize handler for cosmic effects
    window.addEventListener('resize', function() {
        // Recreate particles container if needed
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            // Clear existing particles
            particlesContainer.innerHTML = '';
        }
    });
    
    console.log('🌌 Cosmic Portfolio Systems Fully Operational! 🚀');
});