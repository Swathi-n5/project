// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all gallery elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const images = document.querySelectorAll('.container img');
    const titleBar = document.querySelector('.tittlebar');
    const loadingScreen = document.getElementById('loading-screen');
    
    // Initialize the gallery
    initializeGallery();
    
    function initializeGallery() {
        // Hide loading screen after page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                hideLoadingScreen();
                startAnimations();
            }, 1500);
        });
    }
    
    // Hide loading screen with animation
    function hideLoadingScreen() {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    
    // Start all animations
    function startAnimations() {
        typeWriterEffect();
        setTimeout(() => {
            animateGalleryItems();
        }, 1000);
        addHoverEffects();
        addClickAnimations();
        addScrollAnimations();
    }
    
    // Animation 1: Typewriter effect for title
    function typeWriterEffect() {
        const text = titleBar.textContent;
        titleBar.textContent = '';
        titleBar.style.opacity = '1';
        
        let i = 0;
        const typeTimer = setInterval(() => {
            if (i < text.length) {
                titleBar.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeTimer);
                titleBar.classList.add('glow-text');
            }
        }, 150);
    }
    
    // Animation 2: Staggered fade-in for gallery items
    function animateGalleryItems() {
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, index * 200);
        });
    }
    
    // Animation 3: Enhanced hover effects
    function addHoverEffects() {
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            const title = item.querySelector('h1');
            const description = item.querySelector('p');
            
            item.addEventListener('mouseenter', () => {
                // Pulse effect on title
                title.classList.add('pulse-animation');
                
                // Create particle effect
                createParticles(img);
                
                // Add floating animation
                item.classList.add('float-animation');
                
                // Image rotation effect
                img.style.transform = 'scale(1.05) rotate(2deg)';
                img.style.filter = 'brightness(1.1) contrast(1.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                // Remove animations
                title.classList.remove('pulse-animation');
                item.classList.remove('float-animation');
                
                // Reset image
                img.style.transform = 'scale(1) rotate(0deg)';
                img.style.filter = 'brightness(1) contrast(1)';
            });
        });
    }
    
    // Animation 4: Click animations with modal
    function addClickAnimations() {
        images.forEach(img => {
            img.addEventListener('click', function() {
                // Bounce effect
                this.classList.add('bounce-animation');
                
                // Show modal
                showImageModal(this.src, this.alt);
                
                // Remove bounce animation
                setTimeout(() => {
                    this.classList.remove('bounce-animation');
                }, 600);
            });
        });
    }
    
    // Animation 5: Image modal with enhanced effects
    function showImageModal(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">×</span>
                <img src="${src}" alt="${alt}" class="modal-image">
                <p class="modal-caption">${alt}</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate modal appearance
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function escapeClose(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeClose);
            }
        });
        
        function closeModal() {
            modal.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 300);
        }
    }
    
    // Animation 6: Scroll-triggered animations
    function addScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in-view');
                    
                    // Add random delay for more dynamic effect
                    const randomDelay = Math.random() * 300;
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, randomDelay);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        galleryItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Animation 7: Particle effect system
    function createParticles(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position within the image bounds
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Random color variations
            const colors = ['#ffffff', '#ffd700', '#ff69b4', '#00ffff', '#98fb98'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 1500);
        }
    }
    
    // Animation 8: Background color transition (optional)
    function animateBackground() {
        const colors = [
            'darkmagenta',
            '#8B008B',
            '#9932CC',
            '#BA55D3',
            '#DA70D6',
            '#663399'
        ];
        let currentIndex = 0;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % colors.length;
            document.body.style.backgroundColor = colors[currentIndex];
            document.body.style.transition = 'background-color 3s ease';
        }, 6000);
    }
    
    // Animation 9: Random floating animation for variety
    function addRandomFloatingEffect() {
        galleryItems.forEach((item, index) => {
            const delay = Math.random() * 2;
            const duration = 3 + Math.random() * 2;
            
            item.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }
    
    // Animation 10: Title bar interactive effects
    function addTitleInteractivity() {
        titleBar.addEventListener('click', () => {
            titleBar.style.animation = 'pulse 0.6s ease-in-out';
            
            // Scroll to gallery
            document.querySelector('.container').scrollIntoView({
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                titleBar.style.animation = '';
            }, 600);
        });
    }
    
    // Initialize additional effects
    addTitleInteractivity();
    
    // Uncomment these for additional effects:
    // animateBackground();
    // addRandomFloatingEffect();
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    function updateAnimations() {
        // Add any scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    });
    
    // Add smooth transitions for focus accessibility
    galleryItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('focus', () => {
            item.style.outline = '2px solid #FFD700';
            item.style.outlineOffset = '4px';
        });
        
        item.addEventListener('blur', () => {
            item.style.outline = 'none';
        });
    });
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

console.log('%c🎨 Animated Gallery Loaded Successfully! 🎨', 
    'color: #ff69b4; font-size: 16px; font-weight: bold;');
