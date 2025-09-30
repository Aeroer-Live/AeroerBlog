/*=================================================================*/
/*                      DYNAMIC COMPONENTS SYSTEM                              
/*=================================================================*/

class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
    }

    // Load a component from file
    async loadComponent(componentName, targetSelector) {
        try {
            // Check if component is already loaded
            if (this.loadedComponents.has(componentName)) {
                return;
            }

            // Fetch component HTML
            const response = await fetch(`components/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load ${componentName}: ${response.status}`);
            }

            const html = await response.text();
            
            // Store component
            this.components.set(componentName, html);
            this.loadedComponents.add(componentName);

            // Insert into target element
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.innerHTML = html;
                
                // Trigger component loaded event
                this.onComponentLoaded(componentName, targetElement);
            } else {
                console.warn(`Target element not found: ${targetSelector}`);
            }

        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
        }
    }

    // Load multiple components
    async loadComponents(components) {
        const promises = components.map(({ name, target }) => 
            this.loadComponent(name, target)
        );
        
        try {
            await Promise.all(promises);
            this.onAllComponentsLoaded();
        } catch (error) {
            console.error('Error loading components:', error);
        }
    }

    // Get component HTML
    getComponent(componentName) {
        return this.components.get(componentName);
    }

    // Check if component is loaded
    isComponentLoaded(componentName) {
        return this.loadedComponents.has(componentName);
    }

    // Callback when component is loaded
    onComponentLoaded(componentName, element) {
        console.log(`Component ${componentName} loaded successfully`);
        
        // Initialize component-specific functionality
        switch (componentName) {
            case 'header':
                this.initHeader();
                break;
            case 'footer':
                this.initFooter();
                break;
            case 'search-popup':
                this.initSearchPopup();
                break;
        }
    }

    // Callback when all components are loaded
    onAllComponentsLoaded() {
        console.log('All components loaded successfully');
        
        // Initialize global functionality
        this.initGlobalFeatures();
    }

    // Initialize header functionality
    initHeader() {
        // Initialize modern header if not already done
        if (typeof initModernHeader === 'function') {
            initModernHeader();
        }
        
        // Initialize dark mode toggle
        this.initDarkMode();
        
        // Initialize mobile menu with delay to ensure header is loaded
        setTimeout(() => {
            this.initMobileMenu();
        }, 200);
        
        // Initialize dropdowns with a small delay to ensure DOM is ready
        setTimeout(() => {
            this.initDropdowns();
        }, 100);
    }
    
    // Initialize dropdown functionality
    initDropdowns() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        console.log('Found dropdown toggles:', dropdownToggles.length);
        
        dropdownToggles.forEach(toggle => {
            const dropdown = toggle.closest('.dropdown');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            // Click to toggle dropdown
            toggle.addEventListener('click', (e) => {
                console.log('Dropdown clicked!');
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                console.log('Dropdown active class toggled:', dropdown.classList.contains('active'));
                
                // Prevent any default link behavior
                return false;
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
            
            // Close dropdown on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    dropdown.classList.remove('active');
                }
            });
        });
    }

    // Initialize footer functionality
    initFooter() {
        // Initialize back to top button
        this.initBackToTop();
    }

    // Initialize search popup
    initSearchPopup() {
        // Initialize search button functionality first
        this.initSearchButton();
        
        // Initialize search engine with a small delay to ensure DOM is ready
        setTimeout(() => {
            if (typeof initSearchEngine === 'function') {
                console.log('Initializing search engine...');
                initSearchEngine();
            } else {
                console.log('initSearchEngine function not found');
            }
        }, 100);
    }
    
    // Initialize search button functionality
    initSearchButton() {
        const searchBtn = document.querySelector('.search-btn');
        const searchPopup = document.querySelector('.search-popup');
        const closeBtn = document.querySelector('.search-popup .btn-close');
        
        // Debug: Search button found
        if (!searchBtn) console.log('Search button not found');
        if (!searchPopup) console.log('Search popup not found');
        
        // Open search popup
        if (searchBtn && searchPopup) {
            searchBtn.addEventListener('click', () => {
                searchPopup.classList.add('visible');
                const searchInput = searchPopup.querySelector('input[type="search"]');
                if (searchInput) {
                    searchInput.focus();
                }
            });
        }
        
        // Close search popup
        if (closeBtn && searchPopup) {
            closeBtn.addEventListener('click', () => {
                searchPopup.classList.remove('visible');
                // Clear search results when popup closes
                const resultsContainer = document.querySelector('.search-results');
                if (resultsContainer) {
                    resultsContainer.remove();
                }
            });
        }
        
        // Close search popup when clicking outside
        if (searchPopup) {
            searchPopup.addEventListener('click', (e) => {
                if (e.target === searchPopup) {
                    searchPopup.classList.remove('visible');
                    // Clear search results when popup closes
                    const resultsContainer = document.querySelector('.search-results');
                    if (resultsContainer) {
                        resultsContainer.remove();
                    }
                }
            });
        }
        
        // Close search popup with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchPopup && searchPopup.classList.contains('visible')) {
                searchPopup.classList.remove('visible');
                // Clear search results when popup closes
                const resultsContainer = document.querySelector('.search-results');
                if (resultsContainer) {
                    resultsContainer.remove();
                }
            }
        });
        
        // Open search popup with Ctrl+K
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                if (searchPopup) {
                    searchPopup.classList.add('visible');
                    const searchInput = searchPopup.querySelector('input[type="search"]');
                    if (searchInput) {
                        searchInput.focus();
                    }
                }
            }
        });
    }

    // Initialize back to top button
    initBackToTop() {
        const backToTopBtn = document.getElementById('return-to-top');
        if (backToTopBtn) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.style.display = 'flex';
                } else {
                    backToTopBtn.style.display = 'none';
                }
            });

            // Smooth scroll to top
            backToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Initialize mobile menu functionality
    initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        
        // Debug: Mobile menu elements
        console.log('Mobile menu elements found:', {
            toggle: !!mobileMenuToggle,
            menu: !!mobileMenu,
            close: !!mobileMenuClose
        });
        
        // Ensure mobile menu starts in closed state
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
        document.body.classList.remove('menu-open');
        
        // Mobile menu toggle
        function toggleMobileMenu() {
            console.log('toggleMobileMenu called');
            console.log('Mobile menu before:', mobileMenu.classList.contains('active'));
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            console.log('Mobile menu after:', mobileMenu.classList.contains('active'));
        }

        // Close mobile menu
        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }

        // Event listeners
        if (mobileMenuToggle) {
            console.log('Adding mobile menu toggle event listener');
            mobileMenuToggle.addEventListener('click', (e) => {
                console.log('Mobile menu toggle clicked!');
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
            });
        } else {
            console.log('Mobile menu toggle not found - cannot add event listener');
        }

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }

        // Close mobile menu when clicking outside (temporarily disabled for debugging)
        // document.addEventListener('click', (e) => {
        //     if (mobileMenu && mobileMenu.classList.contains('active') && 
        //         !mobileMenu.contains(e.target) && 
        //         !mobileMenuToggle.contains(e.target)) {
        //         console.log('Clicking outside mobile menu - closing');
        //         setTimeout(() => {
        //             closeMobileMenu();
        //         }, 100);
        //     }
        // });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }

    // Newsletter form removed - replaced with Recent Posts

    // Initialize global features
    initGlobalFeatures() {
        // Set active page highlighting
        this.setActivePage();
    }
    
    // Initialize dark mode functionality
    initDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;
        
        // Get current theme from localStorage or default to light
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        // Apply current theme
        if (currentTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            if (darkModeToggle) {
                darkModeToggle.classList.add('active');
            }
        }
        
        // Toggle theme function
        const toggleTheme = () => {
            const isDark = body.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (darkModeToggle) {
                if (newTheme === 'dark') {
                    darkModeToggle.classList.add('active');
                } else {
                    darkModeToggle.classList.remove('active');
                }
            }
        };
        
        // Add event listener to dark mode toggle
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', toggleTheme);
        }
    }

    // Set active page highlighting
    setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .footer-links a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize component loader
const componentLoader = new ComponentLoader();

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load all components
    componentLoader.loadComponents([
        { name: 'header', target: '#header-container' },
        { name: 'footer', target: '#footer-container' },
        { name: 'search-popup', target: '#search-popup-container' }
    ]);
});

// Export for use in other scripts
window.ComponentLoader = ComponentLoader;
window.componentLoader = componentLoader;
