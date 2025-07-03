// Homepage Specific JavaScript

// News Data
const newsData = [
    {
        id: 1,
        title: "The Future of AI in Education: Transforming Learning Experiences",
        excerpt: "Artificial Intelligence is revolutionizing how we learn and teach, creating personalized experiences for every student.",
        category: "technology",
        author: "Dr. Sarah Chen",
        date: "2024-01-15",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop"
    },
    {
        id: 2,
        title: "Remote Learning Best Practices: Lessons from Global Educators",
        excerpt: "Discover proven strategies and tools that successful educators worldwide use to engage remote learners.",
        category: "education",
        author: "Prof. Michael Rodriguez",
        date: "2024-01-12",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
    },
    {
        id: 3,
        title: "Career Transition Success Stories: From Bootcamp to Tech Leadership",
        excerpt: "Real stories of professionals who successfully transitioned into tech careers through online learning platforms.",
        category: "career",
        author: "Jessica Park",
        date: "2024-01-10",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
    },
    {
        id: 4,
        title: "Blockchain Technology in Educational Credentials: A New Era",
        excerpt: "How blockchain is creating secure, verifiable digital credentials that employers can trust.",
        category: "technology",
        author: "Alex Thompson",
        date: "2024-01-08",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop"
    },
    {
        id: 5,
        title: "Building Inclusive Learning Communities: Diversity in EdTech",
        excerpt: "Creating educational environments that welcome and support learners from all backgrounds and abilities.",
        category: "education",
        author: "Dr. Aisha Patel",
        date: "2024-01-05",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=250&fit=crop"
    },
    {
        id: 6,
        title: "The Rise of Micro-Learning: Bite-Sized Education for Busy Professionals",
        excerpt: "How short-form learning modules are helping working professionals upskill efficiently.",
        category: "career",
        author: "David Kim",
        date: "2024-01-03",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop"
    }
];

// Homepage Class
class Homepage {
    constructor() {
        console.log('[Homepage] Constructor called');
        this.currentFilter = 'all';
        this.displayedNews = 3;
        this.animationStarted = false;
        this.init();
    }

    init() {
        console.log('[Homepage] init() called');
        // Directly start animations without waiting for preloader
        this.startAnimations();
    }

    startAnimations() {
        console.log('[Homepage] startAnimations() called, animationStarted:', this.animationStarted);
        if (this.animationStarted) return;
        this.animationStarted = true;
        setTimeout(() => {
            console.log('[Homepage] Initializing hero animations...');
            this.initHeroAnimations();
            this.initNewsSection();
            this.initCTAAnimations();
            this.initInteractiveElements();
        }, 200);
    }

    // Hero Section Animations
    initHeroAnimations() {
        console.log('[Homepage] initHeroAnimations() called');
        this.initTaglineAnimation();
        this.initScrollIndicator();
    }

    // Initialize tagline animation sequence
    initTaglineAnimation() {
        console.log('[Homepage] initTaglineAnimation() called');
        const words = ['Connect', 'Learn', 'Grow'];
        const animatedWord = document.getElementById('heroAnimatedWord');
        const brandShowcase = document.getElementById('brandShowcase');
        console.log('[Homepage] animatedWord:', animatedWord);
        console.log('[Homepage] brandShowcase:', brandShowcase);
        if (!animatedWord || !brandShowcase) {
            console.error('[Homepage] Elements not found:', { animatedWord, brandShowcase });
            return;
        }
        // Force the first word to appear for debugging
        animatedWord.textContent = 'Connect';
        animatedWord.style.opacity = '1';
        animatedWord.style.display = 'block';
        brandShowcase.style.opacity = '0';
        brandShowcase.style.visibility = 'hidden';
        const self = this;
        function showWord(index) {
            console.log('[Homepage] showWord called with index:', index);
            if (index >= words.length) {
                // Animation complete, show brand name
                console.log('[Homepage] Tagline animation complete, showing brand');
                gsap.to(animatedWord, {
                    duration: 1.0,
                    opacity: 0,
                    ease: "power2.out",
                    onComplete: () => {
                        animatedWord.style.display = 'none';
                        // Show brand showcase with smooth transition
                        gsap.to(brandShowcase, {
                            duration: 0.5,
                            opacity: 1,
                            visibility: 'visible',
                            ease: "power2.out",
                            onStart: () => {
                                // Force brand name and tagline visible
                                const brandName = document.getElementById('brandName');
                                const brandTagline = document.getElementById('brandTagline');
                                if (brandName) { brandName.style.opacity = '1'; brandName.style.display = 'block'; }
                                if (brandTagline) { brandTagline.style.opacity = '1'; brandTagline.style.display = 'block'; }
                                console.log('[Homepage] Brand name and tagline forced visible');
                            },
                            onComplete: () => {
                                console.log('[Homepage] Brand showcase visible, starting brand animation');
                                self.createParticles();
                                self.initBrandAnimation();
                            }
                        });
                    }
                });
                return;
            }
            animatedWord.textContent = words[index];
            animatedWord.style.opacity = '1';
            animatedWord.style.display = 'block';
            console.log('[Homepage] Showing word:', words[index]);
            // Smooth and slightly faster fade in
            gsap.to(animatedWord, {
                duration: 2.0,
                opacity: 1,
                ease: "power2.out",
                onComplete: () => {
                    // Hold the word for a shorter time
                    setTimeout(() => {
                        // Smooth and slightly faster fade out
                        gsap.to(animatedWord, {
                            duration: 2.0,
                            opacity: 0,
                            ease: "power2.in",
                            onComplete: () => {
                                // Small pause before next word
                                setTimeout(() => {
                                    showWord(index + 1);
                                }, 500);
                            }
                        });
                    }, 3000);
                }
            });
        }
        // Start the animation with a small delay
        setTimeout(() => {
            console.log('[Homepage] Starting animation sequence...');
            showWord(0);
        }, 1000);
    }

    // Create floating particles
    createParticles() {
        const particlesContainer = document.getElementById('brandParticles');
        if (!particlesContainer) {
            console.error('Particles container not found');
            return;
        }

        console.log('Creating particles...');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
            
            particlesContainer.appendChild(particle);
        }
        
        console.log(`Created ${particleCount} particles`);
    }

    // Initialize brand animation
    initBrandAnimation() {
        const brandName = document.getElementById('brandName');
        const brandTagline = document.getElementById('brandTagline');
        
        if (!brandName || !brandTagline) {
            console.error('Brand elements not found:', { brandName, brandTagline });
            return;
        }

        console.log('Starting brand animation');

        // Reset to initial animation state
        gsap.set(brandName, {
            opacity: 0,
            scale: 0.5,
            rotation: -10
        });
        
        gsap.set(brandTagline, {
            opacity: 0,
            y: 30
        });

        // Smooth brand entrance animation
        gsap.to(brandName, {
            duration: 3.0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            ease: "back.out(1.7)",
            onComplete: () => console.log('Brand name animation complete')
        });

        gsap.to(brandTagline, {
            duration: 2.5,
            y: 0,
            opacity: 1,
            ease: "power2.out",
            delay: 1.0,
            onComplete: () => console.log('Brand tagline animation complete')
        });

        // Add continuous floating effect to brand name
        gsap.to(brandName, {
            y: -10,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: 4
        });

        // Add glow effect
        gsap.to(brandName, {
            textShadow: "0 0 50px rgba(41, 121, 255, 0.8)",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: 5
        });
    }

    // Initialize scroll indicator
    initScrollIndicator() {
        gsap.to('.scroll-indicator', {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: 3
        });
    }

    // Progress Bar Animation
    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        progressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            gsap.to(bar, {
                duration: 1.5,
                width: width,
                ease: "power2.out",
                delay: index * 0.3
            });
        });
    }

    // News Section
    initNewsSection() {
        this.renderNews();
        this.initNewsFilters();
        this.initLoadMore();
    }

    renderNews() {
        const newsGrid = document.getElementById('newsGrid');
        if (!newsGrid) return;

        const filteredNews = this.currentFilter === 'all' 
            ? newsData 
            : newsData.filter(article => article.category === this.currentFilter);

        const newsToShow = filteredNews.slice(0, this.displayedNews);

        newsGrid.innerHTML = newsToShow.map(article => `
            <article class="news-card" data-category="${article.category}" data-aos="fade-up">
                <div class="news-image">
                    <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px 12px 0 0;">
                </div>
                <div class="news-content">
                    <span class="news-category">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
                    <h3 class="news-title">${article.title}</h3>
                    <p class="news-excerpt">${article.excerpt}</p>
                    <div class="news-meta">
                        <span class="news-author">By ${article.author}</span>
                        <span class="news-date">${this.formatDate(article.date)} • ${article.readTime}</span>
                    </div>
                </div>
            </article>
        `).join('');

        // Animate news cards
        gsap.from('.news-card', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: newsGrid,
                start: "top 80%"
            }
        });

        // Add click handlers
        this.addNewsClickHandlers();
    }

    initNewsFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update filter
                this.currentFilter = button.getAttribute('data-filter');
                this.displayedNews = 3;
                
                // Animate out current news
                gsap.to('.news-card', {
                    duration: 0.3,
                    y: -20,
                    opacity: 0,
                    stagger: 0.05,
                    ease: "power2.in",
                    onComplete: () => {
                        this.renderNews();
                    }
                });
            });
        });
    }

    initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreNews');
        if (!loadMoreBtn) return;

        loadMoreBtn.addEventListener('click', () => {
            const loader = EduConnect.showLoading(loadMoreBtn);
            
            setTimeout(() => {
                this.displayedNews += 3;
                this.renderNews();
                EduConnect.hideLoading(loader);
                
                // Hide button if no more news
                const filteredNews = this.currentFilter === 'all' 
                    ? newsData 
                    : newsData.filter(article => article.category === this.currentFilter);
                
                if (this.displayedNews >= filteredNews.length) {
                    gsap.to(loadMoreBtn, {
                        duration: 0.5,
                        opacity: 0,
                        scale: 0.8,
                        ease: "power2.out",
                        onComplete: () => {
                            loadMoreBtn.style.display = 'none';
                        }
                    });
                }
            }, 1000);
        });
    }

    addNewsClickHandlers() {
        const newsCards = document.querySelectorAll('.news-card');
        
        newsCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('.news-title').textContent;
                EduConnect.showNotification(`Opening article: ${title}`, 'info');
                
                // Add click animation
                gsap.to(card, {
                    duration: 0.1,
                    scale: 0.98,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1
                });
            });
        });
    }

    // CTA Section Animations
    initCTAAnimations() {
        const ctaTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.cta-section',
                start: "top 70%"
            }
        });

        ctaTimeline
            .from('.cta-title', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: "power3.out"
            })
            .from('.cta-description', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: "power2.out"
            }, "-=0.6")
            .from('.cta-actions .btn', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=0.4")
            .from('.feature-item', {
                duration: 0.6,
                y: 20,
                opacity: 0,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.3");
    }

    // Interactive Elements
    initInteractiveElements() {
        this.initFeatureCards();
        this.initScrollToTop();
    }

    initFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            const icon = card.querySelector('.feature-icon');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    duration: 0.5,
                    rotation: 360,
                    scale: 1.1,
                    ease: "back.out(1.7)"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    duration: 0.5,
                    rotation: 0,
                    scale: 1,
                    ease: "back.out(1.7)"
                });
            });
            
            // Click handler for feature links
            const featureLink = card.querySelector('.feature-link');
            if (featureLink) {
                featureLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = featureLink.getAttribute('href');
                    
                    // Add loading animation
                    const loader = EduConnect.showLoading(card);
                    
                    setTimeout(() => {
                        EduConnect.hideLoading(loader);
                        EduConnect.showNotification(`Navigating to ${href}...`, 'info');
                        // window.location.href = href; // Uncomment for actual navigation
                    }, 1500);
                });
            }
        });
    }

    initScrollToTop() {
        // Create scroll to top button
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        `;
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide based on scroll position
        ScrollTrigger.create({
            start: "top -200",
            end: 99999,
            onUpdate: (self) => {
                if (self.direction === -1) {
                    gsap.to(scrollBtn, {
                        duration: 0.3,
                        opacity: 1,
                        scale: 1,
                        ease: "back.out(1.7)"
                    });
                } else {
                    gsap.to(scrollBtn, {
                        duration: 0.3,
                        opacity: 0,
                        scale: 0,
                        ease: "power2.in"
                    });
                }
            }
        });
        
        // Click handler
        scrollBtn.addEventListener('click', () => {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: 0,
                ease: "power2.inOut"
            });
        });
    }

    showDemoModal() {
        // Create demo modal
        const modal = document.createElement('div');
        modal.className = 'demo-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Platform Demo</h3>
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="demo-video">
                        <div class="video-placeholder">
                            <i class="fas fa-play-circle"></i>
                            <p>Demo video would play here</p>
                        </div>
                    </div>
                    <div class="demo-features">
                        <h4>What you'll see in the demo:</h4>
                        <ul>
                            <li><i class="fas fa-check"></i> Community creation and management</li>
                            <li><i class="fas fa-check"></i> Professional networking features</li>
                            <li><i class="fas fa-check"></i> Job matching and recruitment tools</li>
                            <li><i class="fas fa-check"></i> Learning progress tracking</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary">Schedule Live Demo</button>
                    <button class="btn btn-outline-primary modal-close">Close</button>
                </div>
            </div>
        `;
        
        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(modal);
        
        // Animate in
        gsap.from(modal.querySelector('.modal-content'), {
            duration: 0.5,
            scale: 0.8,
            opacity: 0,
            ease: "back.out(1.7)"
        });
        
        gsap.from(modal.querySelector('.modal-backdrop'), {
            duration: 0.3,
            opacity: 0,
            ease: "power2.out"
        });
        
        // Close handlers
        modal.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                gsap.to(modal, {
                    duration: 0.3,
                    opacity: 0,
                    ease: "power2.in",
                    onComplete: () => modal.remove()
                });
            });
        });
        
        // Schedule demo button
        modal.querySelector('.btn-primary').addEventListener('click', () => {
            EduConnect.showNotification('Demo scheduled! We\'ll contact you soon.', 'success');
            modal.remove();
        });
    }

    // Utility Methods
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Initialize Homepage when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    if (document.body.classList.contains('homepage') || window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        console.log('Creating new Homepage instance');
        new Homepage();
    }
});

// Add homepage class to body for identification
if (document.querySelector('.hero-section')) {
    document.body.classList.add('homepage');
}

// Export for global access
window.Homepage = Homepage;

// === Interest Selection Logic ===
document.addEventListener('DOMContentLoaded', function () {
  const interestCards = document.querySelectorAll('.interest-card');
  const INTEREST_KEY = 'selectedInterests';

  // Load saved interests
  let selected = JSON.parse(localStorage.getItem(INTEREST_KEY)) || [];
  interestCards.forEach(card => {
    const interest = card.getAttribute('data-interest');
    if (selected.includes(interest)) {
      card.classList.add('selected');
    }
    card.addEventListener('click', function () {
      card.classList.toggle('selected');
      const interest = card.getAttribute('data-interest');
      if (card.classList.contains('selected')) {
        if (!selected.includes(interest)) selected.push(interest);
      } else {
        selected = selected.filter(i => i !== interest);
      }
      localStorage.setItem(INTEREST_KEY, JSON.stringify(selected));
      filterNewsByInterest(selected);
    });
  });
  // Initial filter
  filterNewsByInterest(selected);
});

function filterNewsByInterest(selectedInterests) {
  const newsGrid = document.getElementById('newsGrid');
  if (!newsGrid) return;
  // If none selected, show all
  if (!selectedInterests || selectedInterests.length === 0) {
    newsGrid.querySelectorAll('.news-card').forEach(card => {
      card.style.display = '';
    });
    return;
  }
  // Hide/show based on category
  newsGrid.querySelectorAll('.news-card').forEach(card => {
    const cat = card.getAttribute('data-category');
    if (selectedInterests.includes(cat)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

