// Mobile menu functionality
const mobileMenuButton = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active'); // Close mobile menu when clicking a link
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Handle contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Here you would typically send the data to a server
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate server request
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        } catch (error) {
            alert('Sorry, there was an error sending your message. Please try again.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            animateOnScroll.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Add animation to elements
document.querySelectorAll('.service-card, .expertise-item, .stat-item, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    animateOnScroll.observe(element);
});

// Cookie consent
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookies = document.querySelector('.accept-cookies');

if (cookieConsent && !localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 2000);
}

if (acceptCookies) {
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.remove('show');
    });
}

// Add scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Handle form validation and enhanced user feedback
const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
});

// Add loading state for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Gallery filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 0);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Gallery image modal
const galleryImages = document.querySelectorAll('.gallery-item');
galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        const imgSrc = image.querySelector('img').src;
        const title = image.querySelector('h3').textContent;
        const description = image.querySelector('p').textContent;
        
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${imgSrc}" alt="${title}">
                <div class="modal-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// Project Slider Functionality
const projectSlider = {
    currentSlide: 0,
    slides: document.querySelectorAll('.project-slide'),
    prevButton: document.querySelector('.prev-project'),
    nextButton: document.querySelector('.next-project'),

    init() {
        if (!this.slides.length) return;

        this.showSlide(0);
        this.setupEventListeners();
        this.setupAutoPlay();
    },

    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'grid' : 'none';
            if (i === index) {
                slide.style.opacity = '0';
                setTimeout(() => {
                    slide.style.opacity = '1';
                }, 50);
            }
        });
        this.currentSlide = index;
    },

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    },

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
    },

    setupEventListeners() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.nextSlide());
        }
    },

    setupAutoPlay() {
        setInterval(() => this.nextSlide(), 5000);
    }
};

// Enhanced Gallery Functionality
const galleryEnhanced = {
    categories: document.querySelectorAll('.category-info'),
    items: document.querySelectorAll('.gallery-item'),
    filters: document.querySelectorAll('.filter-btn'),

    init() {
        this.setupEventListeners();
        this.setupAnimations();
    },

    setupEventListeners() {
        this.categories.forEach(category => {
            category.addEventListener('click', () => {
                const filter = category.dataset.category;
                this.filterItems(filter);
                this.updateActiveCategory(category);
            });
        });

        this.filters.forEach(filter => {
            filter.addEventListener('click', () => {
                const filterValue = filter.dataset.filter;
                this.filterItems(filterValue);
                this.updateActiveFilter(filter);
            });
        });
    },

    filterItems(filter) {
        this.items.forEach(item => {
            const matches = filter === 'all' || item.dataset.category === filter;
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                item.style.display = matches ? 'block' : 'none';
                if (matches) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                }
            }, 300);
        });
    },

    updateActiveCategory(activeCategory) {
        this.categories.forEach(category => {
            category.classList.remove('active');
        });
        activeCategory.classList.add('active');
    },

    updateActiveFilter(activeFilter) {
        this.filters.forEach(filter => {
            filter.classList.remove('active');
        });
        activeFilter.classList.add('active');
    },

    setupAnimations() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.items.forEach(item => {
            observer.observe(item);
        });
    }
};

// Initialize new functionalities
document.addEventListener('DOMContentLoaded', () => {
    projectSlider.init();
    galleryEnhanced.init();
});

// Image Optimization and Lazy Loading
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            }
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

// Convert all images to lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        imageObserver.observe(img);
        
        // Add loading animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });

    // Optimize gallery images
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        // Create responsive srcset
        const originalSrc = img.src;
        const srcset = `
            ${originalSrc}?width=300 300w,
            ${originalSrc}?width=600 600w,
            ${originalSrc}?width=900 900w
        `;
        img.setAttribute('srcset', srcset);
        img.setAttribute('sizes', '(max-width: 300px) 300px, (max-width: 600px) 600px, 900px');
    });
});

// Image Error Handling
function handleImageError(img) {
    img.onerror = null; // Prevent infinite loop
    img.src = 'placeholder.jpg'; // Replace with your placeholder image
    img.classList.add('image-error');
}

// Add error handling to all images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => handleImageError(img));
});

// Progressive Image Loading for Hero Section
function loadHeroImage() {
    const hero = document.querySelector('.hero');
    const imageUrl = getComputedStyle(hero).backgroundImage.slice(4, -1).replace(/"/g, "");
    
    const img = new Image();
    img.onload = () => {
        hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${imageUrl})`;
        hero.classList.add('hero-loaded');
    };
    img.src = imageUrl;
}

// Initialize image optimizations
document.addEventListener('DOMContentLoaded', () => {
    loadHeroImage();
    initializeImageOptimizations();
});

function initializeImageOptimizations() {
    // Optimize project images
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        const wrapper = document.createElement('div');
        wrapper.className = 'image-wrapper loading';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        img.addEventListener('load', () => {
            wrapper.classList.remove('loading');
        });
    });

    // Add blur-up loading for gallery images
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const lowResSrc = img.src + '?width=50'; // Low-res version
        
        // Create low-res background
        const lowResImg = new Image();
        lowResImg.src = lowResSrc;
        lowResImg.onload = () => {
            item.style.backgroundImage = `url(${lowResSrc})`;
            item.style.backgroundSize = 'cover';
            item.style.backgroundPosition = 'center';
            item.classList.add('blur-loading');
        };

        // Load high-res image
        img.style.opacity = '0';
        img.onload = () => {
            item.classList.remove('blur-loading');
            img.style.opacity = '1';
        };
    });
}

// Add loading animation styles
const style = document.createElement('style');
style.textContent = `
    .image-wrapper.loading {
        position: relative;
        background: #f0f0f0;
    }
    .image-wrapper.loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        animation: loading 1.5s infinite;
    }
    @keyframes loading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    .blur-loading {
        filter: blur(10px);
        transition: filter 0.3s ease;
    }
    .blur-loading.loaded {
        filter: blur(0);
    }
    .hero-loaded {
        animation: heroFadeIn 1s ease;
    }
    @keyframes heroFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style); 