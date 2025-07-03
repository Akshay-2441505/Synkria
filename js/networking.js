// Networking Page JavaScript

// Mock Professionals Data
const professionalsData = [
    {
        id: 1,
        name: "Sarah Chen",
        title: "Senior Software Engineer",
        company: "Google",
        location: "San Francisco, CA",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=70&h=70&fit=crop&crop=face",
        bio: "Passionate about building scalable web applications and mentoring junior developers. 8+ years of experience in full-stack development.",
        industry: "technology",
        experience: "senior",
        skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
        connections: 234,
        posts: 45,
        endorsements: 89,
        featured: true,
        connectionType: "mentors",
        status: "available"
    },
    {
        id: 2,
        name: "Michael Rodriguez",
        title: "Product Manager",
        company: "Microsoft",
        location: "Seattle, WA",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=70&h=70&fit=crop&crop=face",
        bio: "Leading product strategy for cloud solutions. Experienced in agile methodologies and cross-functional team leadership.",
        industry: "technology",
        experience: "senior",
        skills: ["Product Strategy", "Agile", "Data Analysis", "Leadership"],
        connections: 456,
        posts: 67,
        endorsements: 123,
        featured: true,
        connectionType: "leaders",
        status: "busy"
    },
    {
        id: 3,
        name: "Emily Watson",
        title: "UX Design Director",
        company: "Adobe",
        location: "San Jose, CA",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=70&h=70&fit=crop&crop=face",
        bio: "Creating user-centered design solutions for creative software. Passionate about accessibility and inclusive design.",
        industry: "technology",
        experience: "senior",
        skills: ["UX Design", "Figma", "User Research", "Prototyping"],
        connections: 345,
        posts: 89,
        endorsements: 156,
        featured: true,
        connectionType: "mentors",
        status: "available"
    },
    {
        id: 4,
        name: "David Kim",
        title: "Data Scientist",
        company: "Netflix",
        location: "Los Gatos, CA",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=70&h=70&fit=crop&crop=face",
        bio: "Leveraging machine learning to improve content recommendation systems. PhD in Computer Science with focus on AI.",
        industry: "technology",
        experience: "senior",
        skills: ["Machine Learning", "Python", "TensorFlow", "Statistics"],
        connections: 189,
        posts: 34,
        endorsements: 78,
        featured: false,
        connectionType: "peers",
        status: "available"
    },
    {
        id: 5,
        name: "Jessica Park",
        title: "Marketing Director",
        company: "HubSpot",
        location: "Boston, MA",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=70&h=70&fit=crop&crop=face",
        bio: "Digital marketing strategist with expertise in growth hacking and customer acquisition. Building scalable marketing systems.",
        industry: "marketing",
        experience: "senior",
        skills: ["Digital Marketing", "Growth Hacking", "Analytics", "SEO"],
        connections: 567,
        posts: 123,
        endorsements: 234,
        featured: false,
        connectionType: "leaders",
        status: "available"
    },
    {
        id: 6,
        name: "Alex Thompson",
        title: "Cybersecurity Analyst",
        company: "CrowdStrike",
        location: "Austin, TX",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=70&h=70&fit=crop&crop=face",
        bio: "Protecting organizations from cyber threats. Specialized in threat intelligence and incident response.",
        industry: "technology",
        experience: "mid",
        skills: ["Cybersecurity", "Threat Analysis", "Incident Response", "Python"],
        connections: 123,
        posts: 56,
        endorsements: 67,
        featured: false,
        connectionType: "peers",
        status: "available"
    }
];

// Mock Events Data
const eventsData = [
    {
        id: 1,
        title: "Tech Leaders Summit 2024",
        description: "Join industry leaders for insights on emerging technologies, leadership strategies, and the future of tech innovation.",
        date: "2024-02-15",
        time: "9:00 AM - 5:00 PM",
        type: "Conference",
        location: "San Francisco, CA",
        attendees: 245,
        virtual: false,
        featured: true
    },
    {
        id: 2,
        title: "AI & Machine Learning Meetup",
        description: "Monthly meetup for AI enthusiasts to share projects, discuss latest research, and network with peers.",
        date: "2024-01-28",
        time: "6:00 PM - 8:00 PM",
        type: "Meetup",
        location: "Virtual",
        attendees: 89,
        virtual: true,
        featured: true
    },
    {
        id: 3,
        title: "Women in Tech Networking",
        description: "Empowering women in technology through networking, mentorship, and career development opportunities.",
        date: "2024-02-05",
        time: "7:00 PM - 9:00 PM",
        type: "Networking",
        location: "New York, NY",
        attendees: 156,
        virtual: false,
        featured: true
    },
    {
        id: 4,
        title: "Startup Pitch Night",
        description: "Early-stage startups pitch to investors and industry experts. Great networking opportunity for entrepreneurs.",
        date: "2024-02-20",
        time: "6:30 PM - 9:30 PM",
        type: "Pitch Event",
        location: "Austin, TX",
        attendees: 78,
        virtual: false,
        featured: false
    }
];

// Networking Page Class
class NetworkingPage {
    constructor() {
        this.currentFilter = {
            search: '',
            industry: 'all',
            experience: 'all',
            location: 'all',
            connection: 'all'
        };
        this.displayedProfessionals = 6;
        this.viewMode = 'grid';
        this.init();
    }

    init() {
        this.initHeroAnimations();
        this.initSearchAndFilters();
        this.renderFeaturedProfessionals();
        this.renderEvents();
        this.renderAllProfessionals();
        this.initViewToggle();
        this.initLoadMore();
        this.initProfileModal();
        this.initNetworkingActions();
        this.initScrollAnimations();
        this.animateCtaSection();
    }

    // Hero Section Animations
    initHeroAnimations() {
        const heroTimeline = gsap.timeline({ delay: 0.5 });

        // Animate hero content with enhanced effects
        heroTimeline
            .from('.hero-badge', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            })
            .from('.hero-title', {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.1
            }, "-=0.4")
            .from('.hero-description', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6")
            .from('.hero-stats .stat-item', {
                y: 40,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
                stagger: 0.1
            }, "-=0.4")
            .from('.hero-actions .btn', {
                y: 50,
                opacity: 0,
                duration: 0.7,
                ease: "back.out(1.7)",
                stagger: 0.15
            }, "-=0.3")
            .from('.hero-visual', {
                x: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            }, "-=0.8");

        // Animate connection web with enhanced effects
        this.animateConnectionWeb();
        
        // Animate floating notifications
        this.animateFloatingNotifications();
        
        // Animate hero buttons
        this.initHeroButtons();
        
        // Animate scroll indicator
        this.animateScrollIndicator();
    }

    // Enhanced connection web animation
    animateConnectionWeb() {
        // Central profile animation
        gsap.from('.central-profile', {
            scale: 0,
            rotation: 360,
            duration: 1.5,
            ease: "back.out(1.7)",
            delay: 1
        });

        // Connected profiles animation with stagger
        gsap.from('.connected-profile', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2,
            delay: 1.5
        });

        // Connection lines animation
        gsap.from('.connection-line', {
            scaleY: 0,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
            delay: 2
        });

        // Profile badges animation
        gsap.from('.profile-badge', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            delay: 2.5
        });

        // Continuous floating animation for profiles
        gsap.to('.connected-profile', {
            y: -10,
            duration: 3,
            ease: "power1.inOut",
            stagger: 0.2,
            repeat: -1,
            yoyo: true,
            delay: 3
        });

        // Continuous rotation for central profile ring
        gsap.to('.profile-ring', {
            rotation: 360,
            duration: 20,
            ease: "none",
            repeat: -1,
            delay: 3
        });
    }

    // Enhanced floating notifications animation
    animateFloatingNotifications() {
        // Initial entrance animation
        gsap.from('.floating-notification', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.3,
            delay: 2.5
        });

        // Continuous floating animation
        gsap.to('.floating-notification', {
            y: -20,
            rotation: 2,
            duration: 4,
            ease: "power1.inOut",
            stagger: 0.5,
            repeat: -1,
            yoyo: true,
            delay: 3.5
        });

        // Hover effects
        document.querySelectorAll('.floating-notification').forEach(notification => {
            notification.addEventListener('mouseenter', () => {
                gsap.to(notification, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            notification.addEventListener('mouseleave', () => {
                gsap.to(notification, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    // Enhanced scroll indicator animation
    animateScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            // Initial entrance
            gsap.from(scrollIndicator, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                delay: 3
            });

            // Continuous bouncing animation
            gsap.to(scrollIndicator, {
                y: -10,
                duration: 2,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
                delay: 4
            });
        }
    }

    initHeroButtons() {
        const discoverBtn = document.querySelector('.hero-btn-primary');
        const eventsBtn = document.querySelector('.hero-btn-secondary');

        if (discoverBtn) {
            discoverBtn.addEventListener('click', () => {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: '#searchSection',
                    ease: "power2.inOut"
                });
            });
        }

        if (eventsBtn) {
            eventsBtn.addEventListener('click', () => {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: '#eventsSection',
                    ease: "power2.inOut"
                });
            });
        }
    }

    // Search and Filters
    initSearchAndFilters() {
        // Search functionality
        const searchInput = document.getElementById('professionalSearch');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilter.search = e.target.value;
                this.filterAndRenderProfessionals();
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.filterAndRenderProfessionals();
            });
        }
        
        // Filter functionality
        const filters = ['industryFilter', 'experienceFilter', 'locationFilter', 'connectionFilter'];
        filters.forEach(filterId => {
            const filter = document.getElementById(filterId);
            if (filter) {
                filter.addEventListener('change', (e) => {
                    this.currentFilter[filterId.replace('Filter', '')] = e.target.value;
                    this.filterAndRenderProfessionals();
                });
            }
        });

        // Enhanced search section animations
        this.animateSearchSection();
    }

    // Enhanced search section animations
    animateSearchSection() {
        // Animate search box entrance
        gsap.from('.search-box', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.5
        });

        // Animate filters entrance
        gsap.from('.filter-group', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.8
        });

        // Add hover effects to search elements
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.addEventListener('mouseenter', () => {
                gsap.to(searchBox, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            searchBox.addEventListener('mouseleave', () => {
                gsap.to(searchBox, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        }
    }

    // Featured Professionals
    renderFeaturedProfessionals() {
        const featuredGrid = document.getElementById('featuredGrid');
        if (!featuredGrid) return;

        const featuredProfessionals = professionalsData.filter(p => p.featured);
        
        featuredGrid.innerHTML = featuredProfessionals.map(professional => `
            <div class="featured-professional-card" data-professional-id="${professional.id}">
                <div class="professional-header">
                    <div class="professional-avatar">
                        <img src="${professional.avatar}" alt="${professional.name}">
                    </div>
                    <div class="professional-info">
                        <h4>${professional.name}</h4>
                        <div class="professional-title">${professional.title} at ${professional.company}</div>
                        <div class="professional-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${professional.location}</span>
                        </div>
                    </div>
                </div>
                <div class="professional-bio">${professional.bio}</div>
                <div class="professional-skills">
                    ${professional.skills.slice(0, 3).map(skill => `
                        <span class="skill-tag">${skill}</span>
                    `).join('')}
                </div>
                <div class="professional-footer">
                    <div class="professional-stats">
                        <div class="stat-item">
                            <span class="stat-number">${professional.connections}</span>
                            <span class="stat-label">Connections</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${professional.posts}</span>
                            <span class="stat-label">Posts</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${professional.endorsements}</span>
                            <span class="stat-label">Endorsements</span>
                        </div>
                    </div>
                    <button class="connect-btn" onclick="networkingPage.connectWithProfessional(${professional.id}, this)">
                        <i class="fas fa-user-plus"></i>
                        Connect
                    </button>
                </div>
            </div>
        `).join('');

        // Enhanced animations for featured professionals
        this.animateFeaturedProfessionals();
    }

    // Enhanced animations for featured professionals
    animateFeaturedProfessionals() {
        // Animate cards entrance
        gsap.from('.featured-professional-card', {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2,
            delay: 0.5
        });

        // Add hover animations for cards
        document.querySelectorAll('.featured-professional-card').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -15,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            // Add staggered entrance animation for card elements
            gsap.from(card.querySelectorAll('.professional-avatar, .professional-info, .professional-bio, .professional-skills, .professional-footer'), {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1,
                delay: 0.8 + (index * 0.1)
            });
        });
    }

    // Events
    renderEvents() {
        const eventsGrid = document.getElementById('eventsGrid');
        if (!eventsGrid) return;

        eventsGrid.innerHTML = eventsData.map(event => `
            <div class="event-card" data-event-id="${event.id}">
                <div class="event-image">
                    <div class="event-type-badge">${event.type}</div>
                </div>
                <div class="event-content">
                    <div class="event-date">
                        <i class="fas fa-calendar"></i>
                        <span>${this.formatDate(event.date)} • ${event.time}</span>
                    </div>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-description">${event.description}</p>
                    <div class="event-meta">
                        <span><i class="fas fa-map-marker-alt"></i>${event.location}</span>
                        <span><i class="fas fa-users"></i>${event.attendees} attending</span>
                    </div>
                    <div class="event-footer">
                        <div class="attendees-count">
                            <i class="fas fa-user-friends"></i>
                            <span>${event.attendees} people</span>
                        </div>
                        <button class="join-event-btn" onclick="networkingPage.joinEvent(${event.id}, this)">
                            <i class="fas fa-calendar-plus"></i>
                            Join Event
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Enhanced animations for events
        this.animateEvents();
    }

    // Enhanced animations for events
    animateEvents() {
        // Animate events entrance
        gsap.from('.event-card', {
            y: 80,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.15,
            delay: 0.3
        });

        // Add hover animations for event cards
        document.querySelectorAll('.event-card').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -12,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            // Animate event content elements
            gsap.from(card.querySelectorAll('.event-date, .event-title, .event-description, .event-meta, .event-footer'), {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1,
                delay: 0.6 + (index * 0.1)
            });
        });
    }

    // All Professionals
    renderAllProfessionals() {
        const professionalsGrid = document.getElementById('professionalsGrid');
        if (!professionalsGrid) return;

        const filteredProfessionals = this.getFilteredProfessionals();
        const displayProfessionals = filteredProfessionals.slice(0, this.displayedProfessionals);
        
        professionalsGrid.innerHTML = displayProfessionals.map(professional => `
            <div class="professional-card-item" data-professional-id="${professional.id}">
                <div class="professional-header">
                    <div class="professional-avatar">
                        <img src="${professional.avatar}" alt="${professional.name}">
                    </div>
                    <div class="professional-info">
                        <h4>${professional.name}</h4>
                        <div class="professional-title">${professional.title} at ${professional.company}</div>
                        <div class="professional-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${professional.location}</span>
                        </div>
                    </div>
                </div>
                <div class="professional-bio">${professional.bio}</div>
                <div class="professional-skills">
                    ${professional.skills.slice(0, 2).map(skill => `
                        <span class="skill-tag">${skill}</span>
                    `).join('')}
                </div>
                <div class="professional-footer">
                    <div class="professional-stats">
                        <div class="stat-item">
                            <span class="stat-number">${professional.connections}</span>
                            <span class="stat-label">Connections</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${professional.posts}</span>
                            <span class="stat-label">Posts</span>
                        </div>
                    </div>
                    <button class="connect-btn" onclick="networkingPage.connectWithProfessional(${professional.id}, this)">
                        <i class="fas fa-user-plus"></i>
                        Connect
                    </button>
                </div>
            </div>
        `).join('');

        // Enhanced animations for professionals
        this.animateProfessionals();
        
        // Update load more button
        this.updateLoadMoreButton(filteredProfessionals.length);
    }

    // Enhanced animations for professionals
    animateProfessionals() {
        // Animate professionals entrance
        gsap.from('.professional-card-item', {
            y: 50,
            opacity: 0,
            duration: 0.7,
            ease: "back.out(1.7)",
            stagger: 0.1,
            delay: 0.2
        });

        // Add hover animations for professional cards
        document.querySelectorAll('.professional-card-item').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -8,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            // Animate card elements with stagger
            gsap.from(card.querySelectorAll('.professional-avatar, .professional-info, .professional-bio, .professional-skills, .professional-footer'), {
                y: 15,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.05,
                delay: 0.4 + (index * 0.05)
            });
        });
    }

    // Filter and render professionals
    filterAndRenderProfessionals() {
        // Animate out current professionals
        gsap.to('.professional-card-item', {
            duration: 0.3,
            y: -20,
            opacity: 0,
            stagger: 0.05,
            ease: "power2.in",
            onComplete: () => {
                this.displayedProfessionals = 6;
                this.renderAllProfessionals();
            }
        });
    }

    // Get filtered professionals
    getFilteredProfessionals() {
        let filtered = [...professionalsData];

        // Search filter
        if (this.currentFilter.search) {
            filtered = filtered.filter(professional =>
                professional.name.toLowerCase().includes(this.currentFilter.search) ||
                professional.title.toLowerCase().includes(this.currentFilter.search) ||
                professional.company.toLowerCase().includes(this.currentFilter.search) ||
                professional.skills.some(skill => skill.toLowerCase().includes(this.currentFilter.search))
            );
        }

        // Industry filter
        if (this.currentFilter.industry !== 'all') {
            filtered = filtered.filter(professional => professional.industry === this.currentFilter.industry);
        }

        // Experience filter
        if (this.currentFilter.experience !== 'all') {
            filtered = filtered.filter(professional => professional.experience === this.currentFilter.experience);
        }

        // Location filter
        if (this.currentFilter.location !== 'all') {
            if (this.currentFilter.location === 'remote') {
                filtered = filtered.filter(professional => professional.location.toLowerCase().includes('remote'));
            } else {
                filtered = filtered.filter(professional => 
                    professional.location.toLowerCase().includes(this.currentFilter.location.toLowerCase())
                );
            }
        }

        // Connection type filter
        if (this.currentFilter.connection !== 'all') {
            filtered = filtered.filter(professional => professional.connectionType === this.currentFilter.connection);
        }

        return filtered;
    }

    // View toggle
    initViewToggle() {
        const viewButtons = document.querySelectorAll('.view-btn');
        const professionalsGrid = document.getElementById('professionalsGrid');

        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                viewButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.viewMode = btn.getAttribute('data-view');
                
                if (professionalsGrid) {
                    professionalsGrid.className = this.viewMode === 'list' ? 'professionals-grid list-view' : 'professionals-grid';
                }

                this.renderAllProfessionals();
            });
        });
    }

    // Load more functionality
    initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreProfessionals');
        if (!loadMoreBtn) return;

        loadMoreBtn.addEventListener('click', () => {
            const loader = EduConnect.showLoading(loadMoreBtn);
            
            setTimeout(() => {
                this.displayedProfessionals += 6;
                this.renderAllProfessionals();
                EduConnect.hideLoading(loader);
            }, 1000);
        });
    }

    updateLoadMoreButton(totalProfessionals) {
        const loadMoreBtn = document.getElementById('loadMoreProfessionals');
        if (!loadMoreBtn) return;

        if (this.displayedProfessionals >= totalProfessionals) {
            gsap.to(loadMoreBtn, {
                duration: 0.5,
                opacity: 0,
                scale: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    loadMoreBtn.style.display = 'none';
                }
            });
        } else {
            loadMoreBtn.style.display = 'block';
            gsap.to(loadMoreBtn, {
                duration: 0.5,
                opacity: 1,
                scale: 1,
                ease: "power2.out"
            });
        }
    }

    // Profile modal
    initProfileModal() {
        const modal = document.getElementById('profileModal');
        if (!modal) return;

        modal.addEventListener('show.bs.modal', (e) => {
            const professionalId = parseInt(e.relatedTarget.getAttribute('data-professional-id'));
            this.loadProfileModal(professionalId);
        });
    }

    loadProfileModal(professionalId) {
        const professional = professionalsData.find(p => p.id === professionalId);
        if (!professional) return;

        // Update modal content
        document.getElementById('modalProfileAvatar').querySelector('img').src = professional.avatar;
        document.getElementById('modalProfileName').textContent = professional.name;
        document.getElementById('modalProfileTitle').textContent = `${professional.title} at ${professional.company}`;
        document.getElementById('modalProfileLocation').querySelector('span').textContent = professional.location;
        document.getElementById('modalConnectionCount').textContent = professional.connections;
        document.getElementById('modalPostCount').textContent = professional.posts;
        document.getElementById('modalEndorsementCount').textContent = professional.endorsements;

        // Load tab content
        this.loadModalTabContent(professional);
    }

    loadModalTabContent(professional) {
        // About tab
        const aboutContent = document.querySelector('#about-tab .about-content');
        aboutContent.innerHTML = `
            <div class="about-section mb-4">
                <h6>About ${professional.name}</h6>
                <p>${professional.bio}</p>
            </div>
            <div class="skills-section mb-4">
                <h6>Skills & Expertise</h6>
                <div class="skills-list">
                    ${professional.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="contact-section">
                <h6>Contact Information</h6>
                <p class="text-muted">Connect to view contact details</p>
            </div>
        `;

        // Experience tab
        const experienceContent = document.querySelector('#experience-tab .experience-content');
        experienceContent.innerHTML = `
            <div class="experience-item mb-4">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h6 class="mb-1">${professional.title}</h6>
                        <p class="text-muted mb-1">${professional.company}</p>
                        <small class="text-muted">2020 - Present</small>
                    </div>
                </div>
                <p>Leading innovative projects and mentoring team members in modern development practices.</p>
            </div>
            <div class="experience-item mb-4">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h6 class="mb-1">Senior Developer</h6>
                        <p class="text-muted mb-1">Previous Company</p>
                        <small class="text-muted">2018 - 2020</small>
                    </div>
                </div>
                <p>Developed scalable web applications and improved system performance by 40%.</p>
            </div>
        `;

        // Skills tab
        const skillsContent = document.querySelector('#skills-tab .skills-content');
        skillsContent.innerHTML = `
            <div class="skills-categories">
                <div class="skill-category mb-4">
                    <h6>Technical Skills</h6>
                    <div class="skills-grid">
                        ${professional.skills.map(skill => `
                            <div class="skill-item">
                                <span class="skill-name">${skill}</span>
                                <div class="skill-level">
                                    <div class="skill-bar" style="width: ${Math.random() * 40 + 60}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Posts tab
        const postsContent = document.querySelector('#posts-tab .posts-content');
        postsContent.innerHTML = `
            <div class="posts-list">
                <div class="post-item mb-4 p-3 border rounded">
                    <div class="d-flex gap-3 mb-3">
                        <img src="${professional.avatar}" class="rounded-circle" width="40" height="40">
                        <div>
                            <h6 class="mb-1">${professional.name}</h6>
                            <small class="text-muted">2 days ago</small>
                        </div>
                    </div>
                    <p>Excited to share insights from our latest project on scalable architecture. The key is finding the right balance between performance and maintainability.</p>
                    <div class="post-actions d-flex gap-3">
                        <button class="btn btn-sm btn-outline-primary"><i class="fas fa-thumbs-up"></i> 24</button>
                        <button class="btn btn-sm btn-outline-primary"><i class="fas fa-comment"></i> 8</button>
                        <button class="btn btn-sm btn-outline-primary"><i class="fas fa-share"></i> Share</button>
                    </div>
                </div>
                <div class="post-item mb-4 p-3 border rounded">
                    <div class="d-flex gap-3 mb-3">
                        <img src="${professional.avatar}" class="rounded-circle" width="40" height="40">
                        <div>
                            <h6 class="mb-1">${professional.name}</h6>
                            <small class="text-muted">1 week ago</small>
                        </div>
                    </div>
                    <p>Mentoring junior developers has been one of the most rewarding aspects of my career. Watching them grow and succeed is incredibly fulfilling.</p>
                    <div class="post-actions d-flex gap-3">
                        <button class="btn btn-sm btn-outline-primary"><i class="fas fa-thumbs-up"></i> 45</button>
                        <button class="btn btn-sm btn-outline-primary"><i class="fas fa-comment"></i> 12</button>
                        <button class="btn btn-sm btn-outline-primary"><i class="fas fa-share"></i> Share</button>
                    </div>
                </div>
            </div>
        `;

        // Mutual connections
        const mutualList = document.querySelector('.mutual-list');
        mutualList.innerHTML = `
            <div class="mutual-item">
                <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=35&h=35&fit=crop&crop=face" class="mutual-avatar">
                <span class="mutual-name">Mike Rodriguez</span>
            </div>
            <div class="mutual-item">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=35&h=35&fit=crop&crop=face" class="mutual-avatar">
                <span class="mutual-name">Emily Watson</span>
            </div>
            <div class="mutual-item">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=35&h=35&fit=crop&crop=face" class="mutual-avatar">
                <span class="mutual-name">David Kim</span>
            </div>
        `;
    }

    // Networking actions
    initNetworkingActions() {
        const ctaBtns = document.querySelectorAll('.cta-btn, .cta-btn-primary');
        
        ctaBtns.forEach(btn => {
            if (btn.textContent.includes('Start Networking')) {
                btn.addEventListener('click', () => {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: '#professionalsSection',
                        ease: "power2.inOut"
                    });
                });
            }
        });
    }

    // Add click handlers
    addProfessionalClickHandlers() {
        // Professional card clicks
        document.querySelectorAll('[data-professional-id]').forEach(card => {
            if (!card.classList.contains('connect-btn')) {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.connect-btn')) {
                        const professionalId = card.getAttribute('data-professional-id');
                        const modal = new bootstrap.Modal(document.getElementById('profileModal'));
                        modal.show();
                        this.loadProfileModal(parseInt(professionalId));
                    }
                });
            }
        });

        // Connect button clicks
        document.querySelectorAll('.connect-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const professionalId = btn.getAttribute('data-professional-id');
                this.connectWithProfessional(parseInt(professionalId), btn);
            });
        });
    }

    addEventClickHandlers() {
        document.querySelectorAll('.join-event-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const eventId = btn.getAttribute('data-event-id');
                this.joinEvent(parseInt(eventId), btn);
            });
        });
    }

    // Connect with professional
    connectWithProfessional(professionalId, button) {
        const professional = professionalsData.find(p => p.id === professionalId);
        if (!professional) return;

        // Animate button
        gsap.to(button, {
            duration: 0.3,
            scale: 0.95,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
        });

        // Update button state
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check me-2"></i>Connected';
            button.classList.add('btn-success');
            button.disabled = true;

            EduConnect.showNotification(`Connection request sent to ${professional.name}!`, 'success');
        }, 600);
    }

    // Join event
    joinEvent(eventId, button) {
        const event = eventsData.find(e => e.id === eventId);
        if (!event) return;

        // Animate button
        gsap.to(button, {
            duration: 0.3,
            scale: 0.95,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
        });

        // Update button state
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check me-2"></i>Joined';
            button.classList.add('btn-success');
            button.disabled = true;

            EduConnect.showNotification(`Successfully joined ${event.title}!`, 'success');
        }, 600);
    }

    // Utility methods
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Enhanced CTA section animations
    animateCtaSection() {
        const ctaSection = document.querySelector('.networking-cta-section');
        if (!ctaSection) return;

        // Animate CTA content entrance
        gsap.from('.cta-content', {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
            delay: 0.3
        });

        // Animate CTA elements with stagger
        gsap.from('.cta-content > *', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2,
            delay: 0.8
        });

        // Animate CTA buttons
        gsap.from('.cta-actions .btn', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.15,
            delay: 1.2
        });

        // Animate CTA features
        gsap.from('.cta-features .feature-item', {
            x: -30,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
            delay: 1.4
        });

        // Add floating animation to CTA shapes
        gsap.to('.networking-cta-section .shape', {
            y: -20,
            rotation: 5,
            duration: 6,
            ease: "power1.inOut",
            stagger: 0.5,
            repeat: -1,
            yoyo: true,
            delay: 2
        });
    }

    // Initialize scroll-triggered animations
    initScrollAnimations() {
        // Animate sections on scroll
        gsap.registerPlugin(ScrollTrigger);

        // Animate search section on scroll
        gsap.from('.search-section', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.search-section',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate featured section on scroll
        gsap.from('.featured-section .section-header', {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.featured-section',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate events section on scroll
        gsap.from('.events-section .section-header', {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.events-section',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate professionals section on scroll
        gsap.from('.professionals-section .section-header', {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.professionals-section',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate floating shapes on scroll
        gsap.to('.floating-shapes .shape', {
            y: -30,
            rotation: 10,
            duration: 2,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: '.networking-hero',
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    }
}

// Initialize Networking Page
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('networking-page') || window.location.pathname.includes('networking.html')) {
        new NetworkingPage();
    }
});

// Add networking page class to body for identification
if (document.querySelector('.networking-hero')) {
    document.body.classList.add('networking-page');
}

// Export for global access
window.NetworkingPage = NetworkingPage;

