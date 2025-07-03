// Communities Page JavaScript

// Mock Communities Data
const communitiesData = [
    {
        id: 1,
        name: "Web Development Hub",
        description: "Learn modern web technologies, share projects, and collaborate with fellow developers worldwide.",
        category: "technology",
        members: 2347,
        posts: 156,
        resources: 23,
        activity: "very-active",
        tags: ["JavaScript", "React", "Node.js", "CSS"],
        avatar: "fas fa-code",
        featured: true,
        created: "2023-01-15"
    },
    {
        id: 2,
        name: "AI & Machine Learning",
        description: "Explore the fascinating world of artificial intelligence and machine learning with experts and enthusiasts.",
        category: "technology",
        members: 1823,
        posts: 89,
        resources: 45,
        activity: "very-active",
        tags: ["Python", "TensorFlow", "Deep Learning", "Data Science"],
        avatar: "fas fa-brain",
        featured: true,
        created: "2023-02-20"
    },
    {
        id: 3,
        name: "Design Masters",
        description: "A creative community for designers to share inspiration, get feedback, and learn new design techniques.",
        category: "design",
        members: 1456,
        posts: 234,
        resources: 67,
        activity: "active",
        tags: ["UI/UX", "Figma", "Adobe", "Branding"],
        avatar: "fas fa-palette",
        featured: true,
        created: "2023-01-30"
    },
    {
        id: 4,
        name: "Data Science Collective",
        description: "Analyze data, build models, and discover insights with a community of data scientists and analysts.",
        category: "science",
        members: 987,
        posts: 78,
        resources: 34,
        activity: "active",
        tags: ["Python", "R", "Statistics", "Visualization"],
        avatar: "fas fa-chart-line",
        featured: false,
        created: "2023-03-10"
    },
    {
        id: 5,
        name: "Digital Marketing Pro",
        description: "Master digital marketing strategies, SEO, social media, and grow your online presence effectively.",
        category: "business",
        members: 1234,
        posts: 145,
        resources: 56,
        activity: "active",
        tags: ["SEO", "Social Media", "Analytics", "Content"],
        avatar: "fas fa-bullhorn",
        featured: false,
        created: "2023-02-05"
    },
    {
        id: 6,
        name: "Mobile App Developers",
        description: "Build amazing mobile applications for iOS and Android. Share code, get help, and showcase your apps.",
        category: "technology",
        members: 1567,
        posts: 123,
        resources: 29,
        activity: "moderate",
        tags: ["React Native", "Flutter", "iOS", "Android"],
        avatar: "fas fa-mobile-alt",
        featured: false,
        created: "2023-03-25"
    },
    {
        id: 7,
        name: "Cybersecurity Network",
        description: "Stay secure in the digital world. Learn about threats, protection strategies, and ethical hacking.",
        category: "technology",
        members: 892,
        posts: 67,
        resources: 41,
        activity: "moderate",
        tags: ["Security", "Ethical Hacking", "Network", "Privacy"],
        avatar: "fas fa-shield-alt",
        featured: false,
        created: "2023-04-01"
    },
    {
        id: 8,
        name: "Creative Writing Circle",
        description: "Share your stories, get feedback, and improve your writing skills with fellow writers and authors.",
        category: "arts",
        members: 654,
        posts: 189,
        resources: 12,
        activity: "active",
        tags: ["Fiction", "Poetry", "Screenwriting", "Publishing"],
        avatar: "fas fa-pen-fancy",
        featured: false,
        created: "2023-03-15"
    }
];

// Communities Page Class
class CommunitiesPage {
    constructor() {
        this.currentFilter = {
            search: '',
            category: 'all',
            activity: 'all',
            size: 'all',
            sort: 'members'
        };
        this.displayedCommunities = 6;
        this.viewMode = 'grid';
        this.init();
    }

    init() {
        this.initHeroAnimations();
        this.initSearchAndFilters();
        this.renderFeaturedCommunities();
        this.renderAllCommunities();
        this.initViewToggle();
        this.initLoadMore();
        this.initCommunityModal();
        this.initCreateCommunity();
    }

    // Hero Section Animations
    initHeroAnimations() {
        const heroTimeline = gsap.timeline({ delay: 0.5 });

        // Animate hero content
        heroTimeline
            .from('.hero-badge', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: "back.out(1.7)"
            })
            .from('.hero-title', {
                duration: 1.2,
                y: 80,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.7")
            .from('.hero-description', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: "power2.out"
            }, "-=0.8")
            .from('.stat-item', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                stagger: 0.2,
                ease: "back.out(1.7)"
            }, "-=0.6")
            .from('.hero-actions .btn', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=0.4");

        // Animate communities showcase
        gsap.from('.communities-showcase', {
            duration: 1.5,
            x: 100,
            opacity: 0,
            ease: "power3.out",
            delay: 1
        });

        // Animate floating community cards
        gsap.from('.floating-community-card', {
            duration: 1,
            scale: 0,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 1.5
        });

        // Scroll indicator animation
        gsap.to('.scroll-indicator', {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });

        // Hero buttons functionality
        this.initHeroButtons();
    }

    initHeroButtons() {
        const exploreBtn = document.querySelector('.hero-btn-primary');
        const createBtn = document.querySelector('.hero-btn-secondary');

        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: '#searchSection',
                    ease: "power2.inOut"
                });
            });
        }

        if (createBtn) {
            createBtn.addEventListener('click', () => {
                this.showCreateCommunityModal();
            });
        }
    }

    // Search and Filters
    initSearchAndFilters() {
        const searchInput = document.getElementById('communitySearch');
        const categoryFilter = document.getElementById('categoryFilter');
        const activityFilter = document.getElementById('activityFilter');
        const sizeFilter = document.getElementById('sizeFilter');
        const sortFilter = document.getElementById('sortFilter');

        // Search functionality with debounce
        if (searchInput) {
            searchInput.addEventListener('input', EduConnect.debounce((e) => {
                this.currentFilter.search = e.target.value.toLowerCase();
                this.filterAndRenderCommunities();
            }, 300));
        }

        // Filter change handlers
        [categoryFilter, activityFilter, sizeFilter, sortFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', (e) => {
                    const filterType = e.target.id.replace('Filter', '');
                    this.currentFilter[filterType] = e.target.value;
                    this.filterAndRenderCommunities();
                });
            }
        });

        // Search button animation
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                gsap.to(searchBtn, {
                    duration: 0.3,
                    rotation: 360,
                    ease: "power2.out"
                });
                this.filterAndRenderCommunities();
            });
        }
    }

    // Featured Communities
    renderFeaturedCommunities() {
        const featuredGrid = document.getElementById('featuredGrid');
        if (!featuredGrid) return;

        const featuredCommunities = communitiesData.filter(community => community.featured);

        featuredGrid.innerHTML = featuredCommunities.map(community => `
            <div class="featured-community-card" data-community-id="${community.id}" data-aos="fade-up">
                <div class="featured-header">
                    <div class="featured-avatar">
                        <i class="${community.avatar}"></i>
                    </div>
                    <div class="featured-info">
                        <h4>${community.name}</h4>
                        <div class="featured-meta">
                            <span>${community.members.toLocaleString()} members</span>
                            <span class="activity-indicator activity-${community.activity}">
                                <i class="fas fa-circle"></i>
                                ${this.formatActivity(community.activity)}
                            </span>
                        </div>
                    </div>
                </div>
                <p class="featured-description">${community.description}</p>
                <div class="featured-tags">
                    ${community.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="featured-footer">
                    <div class="featured-stats">
                        <div class="stat-item">
                            <span class="stat-number">${community.posts}</span>
                            <span class="stat-label">Posts</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${community.resources}</span>
                            <span class="stat-label">Resources</span>
                        </div>
                    </div>
                    <button class="join-community-btn" data-community-id="${community.id}">
                        <i class="fas fa-plus me-2"></i>Join
                    </button>
                </div>
            </div>
        `).join('');

        // Add click handlers
        this.addCommunityClickHandlers();
    }

    // All Communities
    renderAllCommunities() {
        const communitiesGrid = document.getElementById('communitiesGrid');
        if (!communitiesGrid) return;

        const filteredCommunities = this.getFilteredCommunities();
        const communitiesToShow = filteredCommunities.slice(0, this.displayedCommunities);

        communitiesGrid.innerHTML = communitiesToShow.map(community => `
            <div class="community-card-item ${this.viewMode === 'list' ? 'list-item' : ''}" data-community-id="${community.id}" data-aos="fade-up">
                <div class="featured-header">
                    <div class="featured-avatar">
                        <i class="${community.avatar}"></i>
                    </div>
                    <div class="featured-info">
                        <h4>${community.name}</h4>
                        <div class="featured-meta">
                            <span>${community.members.toLocaleString()} members</span>
                            <span class="activity-indicator activity-${community.activity}">
                                <i class="fas fa-circle"></i>
                                ${this.formatActivity(community.activity)}
                            </span>
                        </div>
                    </div>
                </div>
                <p class="featured-description">${community.description}</p>
                <div class="featured-tags">
                    ${community.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="featured-footer">
                    <div class="featured-stats">
                        <div class="stat-item">
                            <span class="stat-number">${community.posts}</span>
                            <span class="stat-label">Posts</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${community.resources}</span>
                            <span class="stat-label">Resources</span>
                        </div>
                    </div>
                    <button class="join-community-btn" data-community-id="${community.id}">
                        <i class="fas fa-plus me-2"></i>Join
                    </button>
                </div>
            </div>
        `).join('');

        // Update load more button visibility
        this.updateLoadMoreButton(filteredCommunities.length);

        // Add click handlers
        this.addCommunityClickHandlers();

        // Animate cards
        gsap.from('.community-card-item', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: communitiesGrid,
                start: "top 80%"
            }
        });
    }

    // Filter and render communities
    filterAndRenderCommunities() {
        // Animate out current communities
        gsap.to('.community-card-item', {
            duration: 0.3,
            y: -20,
            opacity: 0,
            stagger: 0.05,
            ease: "power2.in",
            onComplete: () => {
                this.displayedCommunities = 6;
                this.renderAllCommunities();
            }
        });
    }

    // Get filtered communities
    getFilteredCommunities() {
        let filtered = [...communitiesData];

        // Search filter
        if (this.currentFilter.search) {
            filtered = filtered.filter(community =>
                community.name.toLowerCase().includes(this.currentFilter.search) ||
                community.description.toLowerCase().includes(this.currentFilter.search) ||
                community.tags.some(tag => tag.toLowerCase().includes(this.currentFilter.search))
            );
        }

        // Category filter
        if (this.currentFilter.category !== 'all') {
            filtered = filtered.filter(community => community.category === this.currentFilter.category);
        }

        // Activity filter
        if (this.currentFilter.activity !== 'all') {
            filtered = filtered.filter(community => community.activity === this.currentFilter.activity);
        }

        // Size filter
        if (this.currentFilter.size !== 'all') {
            filtered = filtered.filter(community => {
                const members = community.members;
                switch (this.currentFilter.size) {
                    case 'large': return members >= 1000;
                    case 'medium': return members >= 100 && members < 1000;
                    case 'small': return members >= 10 && members < 100;
                    case 'intimate': return members < 10;
                    default: return true;
                }
            });
        }

        // Sort
        filtered.sort((a, b) => {
            switch (this.currentFilter.sort) {
                case 'members':
                    return b.members - a.members;
                case 'activity':
                    const activityOrder = { 'very-active': 4, 'active': 3, 'moderate': 2, 'new': 1 };
                    return activityOrder[b.activity] - activityOrder[a.activity];
                case 'newest':
                    return new Date(b.created) - new Date(a.created);
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        return filtered;
    }

    // View toggle
    initViewToggle() {
        const viewButtons = document.querySelectorAll('.view-btn');
        const communitiesGrid = document.getElementById('communitiesGrid');

        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                viewButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.viewMode = btn.getAttribute('data-view');
                
                if (communitiesGrid) {
                    communitiesGrid.className = this.viewMode === 'list' ? 'communities-grid list-view' : 'communities-grid';
                }

                this.renderAllCommunities();
            });
        });
    }

    // Load more functionality
    initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreCommunities');
        if (!loadMoreBtn) return;

        loadMoreBtn.addEventListener('click', () => {
            const loader = EduConnect.showLoading(loadMoreBtn);
            
            setTimeout(() => {
                this.displayedCommunities += 6;
                this.renderAllCommunities();
                EduConnect.hideLoading(loader);
            }, 1000);
        });
    }

    updateLoadMoreButton(totalCommunities) {
        const loadMoreBtn = document.getElementById('loadMoreCommunities');
        if (!loadMoreBtn) return;

        if (this.displayedCommunities >= totalCommunities) {
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

    // Community modal
    initCommunityModal() {
        const modal = document.getElementById('communityModal');
        if (!modal) return;

        modal.addEventListener('show.bs.modal', (e) => {
            const communityId = parseInt(e.relatedTarget.getAttribute('data-community-id'));
            this.loadCommunityModal(communityId);
        });
    }

    loadCommunityModal(communityId) {
        const community = communitiesData.find(c => c.id === communityId);
        if (!community) return;

        // Update modal content
        document.getElementById('modalCommunityAvatar').innerHTML = `<i class="${community.avatar}"></i>`;
        document.getElementById('modalCommunityName').textContent = community.name;
        document.getElementById('modalCommunityMeta').textContent = `${community.members.toLocaleString()} members • ${this.formatActivity(community.activity)}`;
        document.getElementById('modalCommunityTags').innerHTML = community.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        document.getElementById('modalCommunityDescription').querySelector('p').textContent = community.description;
        document.getElementById('modalMemberCount').textContent = community.members.toLocaleString();
        document.getElementById('modalPostCount').textContent = community.posts;
        document.getElementById('modalResourceCount').textContent = community.resources;

        // Load tab content
        this.loadModalTabContent(community);
    }

    loadModalTabContent(community) {
        // Mock posts data
        const postsContent = document.querySelector('#posts-tab .posts-content');
        postsContent.innerHTML = `
            <div class="post-composer mb-4">
                <div class="d-flex gap-3">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" class="rounded-circle" width="40" height="40">
                    <div class="flex-grow-1">
                        <textarea class="form-control" placeholder="Share your thoughts with the community..." rows="3"></textarea>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <div class="post-options">
                                <button class="btn btn-sm btn-outline-primary"><i class="fas fa-image"></i> Image</button>
                                <button class="btn btn-sm btn-outline-primary"><i class="fas fa-link"></i> Link</button>
                                <button class="btn btn-sm btn-outline-primary"><i class="fas fa-poll"></i> Poll</button>
                            </div>
                            <button class="btn btn-primary">Post</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="posts-list">
                <div class="post-item mb-4 p-3 border rounded">
                    <div class="d-flex gap-3 mb-3">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" class="rounded-circle" width="40" height="40">
                        <div>
                            <h6 class="mb-1">Sarah Chen</h6>
                            <small class="text-muted">2 hours ago</small>
                        </div>
                    </div>
                    <p>Just finished building my first React app with TypeScript! The learning curve was steep but totally worth it. Thanks to everyone who helped me debug those tricky type errors. 🚀</p>
                    <div class="post-actions d-flex gap-3">
                        <button class="btn btn-sm btn-outline-primary"><i class="fas fa-thumbs-up"></i> 12</button>
                        <button class="btn btn-sm btn-outline-primary"><i class="fas fa-comment"></i> 5</button>
                        <button class="btn btn-sm btn-outline-primary"><i class="fas fa-share"></i> Share</button>
                    </div>
                </div>
                <div class="post-item mb-4 p-3 border rounded">
                    <div class="d-flex gap-3 mb-3">
                        <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face" class="rounded-circle" width="40" height="40">
                        <div>
                            <h6 class="mb-1">Mike Rodriguez</h6>
                            <small class="text-muted">1 day ago</small>
                        </div>
                    </div>
                    <p>Looking for feedback on my portfolio website. I've been working on improving the performance and accessibility. Any suggestions would be greatly appreciated!</p>
                    <div class="post-actions d-flex gap-3">
                        <button class="btn btn-sm btn-outline-primary"><i class="fas fa-thumbs-up"></i> 8</button>
                        <button class="btn btn-sm btn-outline-primary"><i class="fas fa-comment"></i> 12</button>
                        <button class="btn btn-sm btn-outline-primary"><i class="fas fa-share"></i> Share</button>
                    </div>
                </div>
            </div>
        `;

        // Mock resources data
        const resourcesContent = document.querySelector('#resources-tab .resources-content');
        resourcesContent.innerHTML = `
            <div class="resources-list">
                <div class="resource-item mb-3 p-3 border rounded">
                    <div class="d-flex align-items-center gap-3">
                        <div class="resource-icon">
                            <i class="fas fa-file-pdf text-danger"></i>
                        </div>
                        <div class="flex-grow-1">
                            <h6 class="mb-1">React Best Practices Guide</h6>
                            <p class="mb-1 text-muted">Comprehensive guide covering React patterns, hooks, and performance optimization.</p>
                            <small class="text-muted">Uploaded by John Doe • 156 downloads</small>
                        </div>
                        <button class="btn btn-outline-primary btn-sm">Download</button>
                    </div>
                </div>
                <div class="resource-item mb-3 p-3 border rounded">
                    <div class="d-flex align-items-center gap-3">
                        <div class="resource-icon">
                            <i class="fas fa-play-circle text-primary"></i>
                        </div>
                        <div class="flex-grow-1">
                            <h6 class="mb-1">Advanced JavaScript Concepts</h6>
                            <p class="mb-1 text-muted">Video series covering closures, prototypes, async/await, and more.</p>
                            <small class="text-muted">Shared by Sarah Chen • 89 views</small>
                        </div>
                        <button class="btn btn-outline-primary btn-sm">Watch</button>
                    </div>
                </div>
                <div class="resource-item mb-3 p-3 border rounded">
                    <div class="d-flex align-items-center gap-3">
                        <div class="resource-icon">
                            <i class="fas fa-link text-success"></i>
                        </div>
                        <div class="flex-grow-1">
                            <h6 class="mb-1">Useful Development Tools</h6>
                            <p class="mb-1 text-muted">Curated list of tools and extensions that boost developer productivity.</p>
                            <small class="text-muted">Compiled by Alex Kim • 234 clicks</small>
                        </div>
                        <button class="btn btn-outline-primary btn-sm">Visit</button>
                    </div>
                </div>
            </div>
        `;

        // Mock events data
        const eventsContent = document.querySelector('#events-tab .events-content');
        eventsContent.innerHTML = `
            <div class="events-list">
                <div class="event-item mb-3 p-3 border rounded">
                    <div class="d-flex gap-3">
                        <div class="event-date text-center">
                            <div class="date-day">15</div>
                            <div class="date-month">JAN</div>
                        </div>
                        <div class="flex-grow-1">
                            <h6 class="mb-1">React 18 Features Workshop</h6>
                            <p class="mb-2 text-muted">Deep dive into React 18's new features including concurrent rendering, automatic batching, and Suspense improvements.</p>
                            <div class="d-flex align-items-center gap-3 text-muted">
                                <span><i class="fas fa-clock"></i> 2:00 PM - 4:00 PM</span>
                                <span><i class="fas fa-users"></i> 45 attending</span>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-sm">Join Event</button>
                    </div>
                </div>
                <div class="event-item mb-3 p-3 border rounded">
                    <div class="d-flex gap-3">
                        <div class="event-date text-center">
                            <div class="date-day">22</div>
                            <div class="date-month">JAN</div>
                        </div>
                        <div class="flex-grow-1">
                            <h6 class="mb-1">Code Review Session</h6>
                            <p class="mb-2 text-muted">Weekly code review session where community members share their projects and get feedback from peers.</p>
                            <div class="d-flex align-items-center gap-3 text-muted">
                                <span><i class="fas fa-clock"></i> 7:00 PM - 8:30 PM</span>
                                <span><i class="fas fa-users"></i> 23 attending</span>
                            </div>
                        </div>
                        <button class="btn btn-outline-primary btn-sm">Interested</button>
                    </div>
                </div>
            </div>
        `;

        // Mock members data
        const membersContent = document.querySelector('#members-tab .members-content');
        membersContent.innerHTML = `
            <div class="members-grid row">
                <div class="col-md-6 mb-3">
                    <div class="member-item d-flex align-items-center gap-3 p-2 rounded">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" class="rounded-circle" width="50" height="50">
                        <div class="flex-grow-1">
                            <h6 class="mb-1">Sarah Chen</h6>
                            <p class="mb-0 text-muted">Senior Frontend Developer</p>
                            <small class="text-muted">Joined 6 months ago</small>
                        </div>
                        <button class="btn btn-outline-primary btn-sm">Connect</button>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="member-item d-flex align-items-center gap-3 p-2 rounded">
                        <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=50&h=50&fit=crop&crop=face" class="rounded-circle" width="50" height="50">
                        <div class="flex-grow-1">
                            <h6 class="mb-1">Mike Rodriguez</h6>
                            <p class="mb-0 text-muted">Full Stack Developer</p>
                            <small class="text-muted">Joined 3 months ago</small>
                        </div>
                        <button class="btn btn-outline-primary btn-sm">Connect</button>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="member-item d-flex align-items-center gap-3 p-2 rounded">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" class="rounded-circle" width="50" height="50">
                        <div class="flex-grow-1">
                            <h6 class="mb-1">Alex Kim</h6>
                            <p class="mb-0 text-muted">UI/UX Designer</p>
                            <small class="text-muted">Joined 1 month ago</small>
                        </div>
                        <button class="btn btn-outline-primary btn-sm">Connect</button>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="member-item d-flex align-items-center gap-3 p-2 rounded">
                        <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face" class="rounded-circle" width="50" height="50">
                        <div class="flex-grow-1">
                            <h6 class="mb-1">Emma Wilson</h6>
                            <p class="mb-0 text-muted">Backend Developer</p>
                            <small class="text-muted">Joined 2 weeks ago</small>
                        </div>
                        <button class="btn btn-outline-primary btn-sm">Connect</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Create community functionality
    initCreateCommunity() {
        const createBtns = document.querySelectorAll('.cta-btn, .cta-btn-primary');
        
        createBtns.forEach(btn => {
            if (btn.textContent.includes('Create')) {
                btn.addEventListener('click', () => {
                    this.showCreateCommunityModal();
                });
            }
        });
    }

    showCreateCommunityModal() {
        // Create modal HTML
        const modalHTML = `
            <div class="modal fade" id="createCommunityModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create New Community</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="createCommunityForm">
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="mb-3">
                                            <label class="form-label">Community Name *</label>
                                            <input type="text" class="form-control" placeholder="Enter community name" required>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Description *</label>
                                            <textarea class="form-control" rows="4" placeholder="Describe your community's purpose and goals" required></textarea>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Category *</label>
                                                <select class="form-select" required>
                                                    <option value="">Select category</option>
                                                    <option value="technology">Technology</option>
                                                    <option value="design">Design</option>
                                                    <option value="business">Business</option>
                                                    <option value="science">Science</option>
                                                    <option value="arts">Arts</option>
                                                    <option value="language">Language</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Privacy *</label>
                                                <select class="form-select" required>
                                                    <option value="public">Public - Anyone can join</option>
                                                    <option value="private">Private - Approval required</option>
                                                    <option value="invite">Invite Only</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Tags</label>
                                            <input type="text" class="form-control" placeholder="Add relevant tags (comma separated)">
                                            <small class="form-text text-muted">Help others discover your community</small>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label class="form-label">Community Avatar</label>
                                            <div class="avatar-upload text-center">
                                                <div class="avatar-preview mb-3">
                                                    <div class="avatar-placeholder">
                                                        <i class="fas fa-camera"></i>
                                                        <p>Upload Image</p>
                                                    </div>
                                                </div>
                                                <input type="file" class="form-control" accept="image/*">
                                            </div>
                                        </div>
                                        <div class="community-guidelines">
                                            <h6>Community Guidelines</h6>
                                            <ul class="small text-muted">
                                                <li>Be respectful and inclusive</li>
                                                <li>Share relevant content only</li>
                                                <li>No spam or self-promotion</li>
                                                <li>Help others learn and grow</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" form="createCommunityForm" class="btn btn-primary">Create Community</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('createCommunityModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('createCommunityModal'));
        modal.show();

        // Handle form submission
        document.getElementById('createCommunityForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                modal.hide();
                EduConnect.showNotification('Community created successfully! It may take a few minutes to appear in the listings.', 'success');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Add click handlers to community cards
    addCommunityClickHandlers() {
        // Community card clicks
        document.querySelectorAll('[data-community-id]').forEach(card => {
            if (!card.classList.contains('join-community-btn')) {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.join-community-btn')) {
                        const communityId = card.getAttribute('data-community-id');
                        const modal = new bootstrap.Modal(document.getElementById('communityModal'));
                        modal.show();
                        this.loadCommunityModal(parseInt(communityId));
                    }
                });
            }
        });

        // Join button clicks
        document.querySelectorAll('.join-community-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const communityId = btn.getAttribute('data-community-id');
                this.joinCommunity(parseInt(communityId), btn);
            });
        });
    }

    // Join community functionality
    joinCommunity(communityId, button) {
        const community = communitiesData.find(c => c.id === communityId);
        if (!community) return;

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
            button.classList.remove('join-community-btn');
            button.classList.add('btn-success');
            button.disabled = true;

            EduConnect.showNotification(`Successfully joined ${community.name}!`, 'success');
        }, 600);
    }

    // Utility methods
    formatActivity(activity) {
        const activityMap = {
            'very-active': 'Very Active',
            'active': 'Active',
            'moderate': 'Moderate',
            'new': 'New'
        };
        return activityMap[activity] || activity;
    }
}

// Initialize Communities Page
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('communities-page') || window.location.pathname.includes('communities.html')) {
        new CommunitiesPage();
    }
});

// Add communities page class to body for identification
if (document.querySelector('.communities-hero')) {
    document.body.classList.add('communities-page');
}

// Export for global access
window.CommunitiesPage = CommunitiesPage;

