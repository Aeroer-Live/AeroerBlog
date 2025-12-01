$(window).on('load', function(){
    "use strict";
    /*=========================================================================
            Preloader
    =========================================================================*/
    $("#preloader").delay(750).fadeOut('slow');
});

/*=========================================================================
            Home Slider
=========================================================================*/
$(document).ready(function() {
    "use strict";

    /*=========================================================================
            Slick sliders
    =========================================================================*/
    $('.post-carousel-lg').slick({
      dots: true,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          }
        }
      ]
    });

    $('.post-carousel-featured').slick({
      dots: true,
      arrows: false,
      slidesToShow: 5,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: true,
            arrows: false,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            arrows: false,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
            arrows: false,
          }
        }
        ,
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          }
        }
      ]
    });

    $('.post-carousel-twoCol').slick({
      dots: false,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: false,
            arrows: false,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
          }
        }
      ]
    });
    // Custom carousel nav
    $('.carousel-topNav-prev').click(function(){ 
      $('.post-carousel-twoCol').slick('slickPrev');
    } );
    $('.carousel-topNav-next').click(function(){ 
      $('.post-carousel-twoCol').slick('slickNext');
    } );


    $('.post-carousel-widget').slick({
      dots: false,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            slidesToScroll: 1,
          }
        }
      ]
    });
    // Custom carousel nav
    $('.carousel-botNav-prev').click(function(){ 
      $('.post-carousel-widget').slick('slickPrev');
    } );
    $('.carousel-botNav-next').click(function(){ 
      $('.post-carousel-widget').slick('slickNext');
    } );

    /*=========================================================================
            Sticky header
    =========================================================================*/
    var $header = $(".header-default, .header-personal nav, .header-classic .header-bottom"),
      $clone = $header.before($header.clone().addClass("clone"));

    $(window).on("scroll", function() {
      var fromTop = $(window).scrollTop();
      $('body').toggleClass("down", (fromTop > 300));
    });

});

$(function(){
    "use strict";

    /*=========================================================================
            Dark Mode Toggle
    =========================================================================*/
    function initDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;
        
        // Check for saved theme preference or default to 'light'
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        // Apply the current theme
        if (currentTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            if (darkModeToggle) {
                darkModeToggle.classList.add('active');
            }
        }
        
        // Toggle theme function
        function toggleTheme() {
            const isDark = body.getAttribute('data-theme') === 'dark';
            
            if (isDark) {
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                if (darkModeToggle) {
                    darkModeToggle.classList.remove('active');
                }
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if (darkModeToggle) {
                    darkModeToggle.classList.add('active');
                }
            }
        }
        
        // Add click event listener
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', toggleTheme);
        }
    }
    
    // Dark mode initialization moved to components.js

    /*=========================================================================
            Search Engine
    =========================================================================*/
    window.initSearchEngine = function() {
        console.log('initSearchEngine called');
        
        // Blog posts data
        // Determine base path based on current location
        const basePath = window.location.pathname.includes('/pages/') ? '' : 'pages/';
        
        const blogPosts = [
            {
                title: "How to use Google Drive as Web Hosting (Free)",
                url: basePath + "webhosting.html",
                excerpt: "Learn how to host your website for free using Google Drive. This comprehensive guide covers everything from setup to deployment.",
                tags: ["web hosting", "google drive", "free hosting", "website deployment"],
                category: "Web Hosting"
            },
            {
                title: "Web Host Most - Complete Review",
                url: basePath + "webhostmost.html",
                excerpt: "Detailed review of Web Host Most hosting service. Features, pricing, performance analysis and user experience.",
                tags: ["web hosting", "review", "hosting comparison", "web host most"],
                category: "Web Hosting"
            },
            {
                title: "Search Engine Optimization (SEO) - Complete Guide",
                url: basePath + "seo.html",
                excerpt: "Master SEO with this comprehensive guide. Learn keyword research, on-page optimization, technical SEO and more.",
                tags: ["seo", "search engine optimization", "keywords", "ranking", "google"],
                category: "SEO"
            },
            {
                title: "HTML Form Data Transfer to Google Sheets",
                url: basePath + "webdata.html",
                excerpt: "Learn how to collect form data and automatically transfer it to Google Sheets using HTML forms and Google Apps Script.",
                tags: ["html forms", "google sheets", "data collection", "google apps script"],
                category: "Web Development"
            },
            {
                title: "Cloudflare Website Deployment with GitHub",
                url: basePath + "cloudflare.html",
                excerpt: "Step-by-step guide to deploy your website using Cloudflare Pages and GitHub integration for free hosting.",
                tags: ["cloudflare", "github", "deployment", "free hosting", "pages"],
                category: "Web Development"
            },
            {
                title: "Building My Own Secure Note-Taking Web App — Note.Lab",
                url: basePath + "note-lab.html",
                excerpt: "A developer-focused, privacy-first note application built with Cloudflare Workers, featuring Markdown editing, syntax highlighting, and secure authentication.",
                tags: ["note.lab", "secure notes", "cloudflare workers", "developer tools", "privacy", "markdown editor", "jwt authentication", "d1 database", "r2 storage"],
                category: "Web Development"
            },
            {
                title: "My Experience with the Apple AirPods Pro 3",
                url: basePath + "airpodspro3.html",
                excerpt: "Hands-on impressions of the Apple AirPods Pro 3 covering noise cancellation, transparency, spatial audio, and seamless switching across Apple devices.",
                tags: ["airpods pro 3", "apple ecosystem", "noise cancellation", "tech lifestyle", "true wireless earbuds", "spatial audio"],
                category: "Tech Lifestyle"
            },
            {
                title: "Think Like Engineers — Building the Next Generation of Young Malaysian Innovators",
                url: basePath + "think-like-engineers.html",
                excerpt: "A learning platform designed for Malaysian children to explore programming fundamentals through fun, interactive video games. Turn screen time into learning time.",
                tags: ["think like engineers", "malaysian children education", "programming for kids", "interactive learning games", "coding education", "children programming", "educational games", "malaysian innovators"],
                category: "Education"
            }
        ];

        const searchInput = document.querySelector('.search-popup input[type="search"]');
        const searchForm = document.querySelector('.search-popup .search-form');
        const searchPopup = document.querySelector('.search-popup');
        let searchResults = [];
        
        console.log('Search elements found:', {
            searchInput: !!searchInput,
            searchForm: !!searchForm,
            searchPopup: !!searchPopup
        });

        // Create search results container
        function createSearchResultsContainer() {
            const existingResults = document.querySelector('.search-results');
            if (existingResults) {
                existingResults.remove();
            }

            const resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results';
            resultsContainer.innerHTML = `
                <div class="search-results-header">
                    <h4>Search Results</h4>
                    <span class="results-count">0 results found</span>
                </div>
                <div class="search-results-list"></div>
            `;
            
            const searchContent = document.querySelector('.search-popup .search-content');
            searchContent.appendChild(resultsContainer);
            return resultsContainer;
        }

        // Highlight search terms in text
        function highlightText(text, searchTerm) {
            if (!searchTerm) return text;
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        }

        // Perform search
        function performSearch(query) {
            if (!query || query.length < 2) {
                searchResults = [];
                return;
            }

            const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
            searchResults = blogPosts.filter(post => {
                const searchableText = [
                    post.title,
                    post.excerpt,
                    post.category,
                    ...post.tags
                ].join(' ').toLowerCase();

                return searchTerms.some(term => searchableText.includes(term));
            });

            // Sort by relevance (title matches first, then excerpt, then tags)
            searchResults.sort((a, b) => {
                const aTitle = a.title.toLowerCase().includes(query.toLowerCase());
                const bTitle = b.title.toLowerCase().includes(query.toLowerCase());
                
                if (aTitle && !bTitle) return -1;
                if (!aTitle && bTitle) return 1;
                
                return 0;
            });
        }

        // Display search results
        function displaySearchResults(query) {
            const resultsContainer = createSearchResultsContainer();
            const resultsList = resultsContainer.querySelector('.search-results-list');
            const resultsCount = resultsContainer.querySelector('.results-count');

            if (searchResults.length === 0) {
                resultsList.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>No results found for "${query}"</p>
                        <small>Try different keywords or check your spelling</small>
                    </div>
                `;
                resultsCount.textContent = '0 results found';
                return;
            }

            resultsCount.textContent = `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} found`;

            searchResults.forEach((post, index) => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <div class="result-content">
                        <div class="result-category">${post.category}</div>
                        <h5 class="result-title">
                            <a href="${post.url}">${highlightText(post.title, query)}</a>
                        </h5>
                        <p class="result-excerpt">${highlightText(post.excerpt, query)}</p>
                        <div class="result-tags">
                            ${post.tags.map(tag => 
                                `<span class="tag">${highlightText(tag, query)}</span>`
                            ).join('')}
                        </div>
                    </div>
                `;
                resultsList.appendChild(resultItem);
            });
        }

        // Handle search input
        function handleSearchInput() {
            console.log('Search input handler called');
            const query = searchInput.value.trim();
            console.log('Search query:', query);
            
            if (query.length >= 2) {
                performSearch(query);
                displaySearchResults(query);
            } else {
                const resultsContainer = document.querySelector('.search-results');
                if (resultsContainer) {
                    resultsContainer.remove();
                }
            }
        }

        // Handle search form submission
        function handleSearchSubmit(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query.length >= 2) {
                performSearch(query);
                displaySearchResults(query);
            }
        }

        // Keyboard navigation
        function handleKeyNavigation(e) {
            const results = document.querySelectorAll('.search-result-item');
            const activeResult = document.querySelector('.search-result-item.active');
            let currentIndex = -1;

            if (activeResult) {
                currentIndex = Array.from(results).indexOf(activeResult);
            }

            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentIndex < results.length - 1) {
                        if (activeResult) activeResult.classList.remove('active');
                        results[currentIndex + 1].classList.add('active');
                        results[currentIndex + 1].scrollIntoView({ block: 'nearest' });
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        if (activeResult) activeResult.classList.remove('active');
                        results[currentIndex - 1].classList.add('active');
                        results[currentIndex - 1].scrollIntoView({ block: 'nearest' });
                    }
                    break;
                case 'Enter':
                    if (activeResult) {
                        e.preventDefault();
                        const link = activeResult.querySelector('a');
                        if (link) {
                            window.location.href = link.href;
                        }
                    }
                    break;
                case 'Escape':
                    searchPopup.classList.remove('visible');
                    searchInput.value = '';
                    const resultsContainer = document.querySelector('.search-results');
                    if (resultsContainer) {
                        resultsContainer.remove();
                    }
                    break;
            }
        }

        // Event listeners
        if (searchInput) {
            console.log('Adding search input event listeners');
            searchInput.addEventListener('input', handleSearchInput);
            searchInput.addEventListener('keydown', handleKeyNavigation);
        } else {
            console.log('Search input not found - cannot add event listeners');
        }

        if (searchForm) {
            console.log('Adding search form event listener');
            searchForm.addEventListener('submit', handleSearchSubmit);
        } else {
            console.log('Search form not found - cannot add event listener');
        }

        // Search popup close functionality moved to components.js

        // Global keyboard shortcut functionality moved to components.js

        // Search popup click outside functionality moved to components.js
    };

    // Search engine initialization moved to components.js

    /*=========================================================================
            Modern Header
    =========================================================================*/
    window.initModernHeader = function() {
        const header = document.querySelector('.modern-header');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const searchBtn = document.querySelector('.search-btn');
        const searchPopup = document.querySelector('.search-popup');

        // Header scroll effect
        function handleHeaderScroll() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Mobile menu toggle
        function toggleMobileMenu() {
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        }

        // Close mobile menu
        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }

        // Event listeners
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }

        // Search button functionality moved to components.js

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Header scroll effect
        window.addEventListener('scroll', handleHeaderScroll);

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

        // Dropdown functionality
        function initDropdowns() {
            const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
            
            dropdownToggles.forEach(toggle => {
                const dropdown = toggle.closest('.dropdown');
                const menu = dropdown.querySelector('.dropdown-menu');
                
                // Click to toggle dropdown
                toggle.addEventListener('click', (e) => {
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

        // Active page highlighting
        function setActivePage() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                    link.classList.add('active');
                }
            });
        }

        // Initialize dropdowns
        initDropdowns();
        setActivePage();
    };

    // Modern header initialization moved to components.js

    /*=========================================================================
            Sticky Sidebar
    =========================================================================*/
    $('.sidebar').stickySidebar({
        topSpacing: 60,
        bottomSpacing: 30,
        containerSelector: '.main-content',
    });

    /*=========================================================================
            Vertical Menu
    =========================================================================*/
    $( ".submenu" ).before( '<i class="icon-arrow-down switch"></i>' );

    $(".vertical-menu li i.switch").on( 'click', function() {
        var $submenu = $(this).next(".submenu");
        $submenu.slideToggle(300);
        $submenu.parent().toggleClass("openmenu");
    });

    /*=========================================================================
            Canvas Menu
    =========================================================================*/
    $("button.burger-menu").on( 'click', function() {
      $(".canvas-menu").toggleClass("open");
      $(".main-overlay").toggleClass("active");
    });

    $(".canvas-menu .btn-close, .main-overlay").on( 'click', function() {
      $(".canvas-menu").removeClass("open");
      $(".main-overlay").removeClass("active");
    });

    /*=========================================================================
            Popups - Moved to components.js
    =========================================================================*/
    // Search popup functionality moved to components.js

    /*=========================================================================
            Tabs loader
    =========================================================================*/
    $('button[data-bs-toggle="tab"]').on( 'click', function() {
      $(".tab-pane").addClass("loading");
      $('.lds-dual-ring').addClass("loading");
      setTimeout(function () {
          $(".tab-pane").removeClass("loading");
          $('.lds-dual-ring').removeClass("loading");
      }, 500);
    });
    
    /*=========================================================================
            Social share toggle
    =========================================================================*/
    $('.post button.toggle-button').each( function() {
      $(this).on( 'click', function(e) {
        $(this).next('.social-share .icons').toggleClass("visible");
        $(this).toggleClass('icon-close').toggleClass('icon-share');
      });
    });

    /*=========================================================================
    Spacer with Data Attribute
    =========================================================================*/
    var list = document.getElementsByClassName('spacer');

    for (var i = 0; i < list.length; i++) {
      var size = list[i].getAttribute('data-height');
      list[i].style.height = "" + size + "px";
    }

    /*=========================================================================
    Background Image with Data Attribute
    =========================================================================*/
    var list = document.getElementsByClassName('data-bg-image');

    for (var i = 0; i < list.length; i++) {
      var bgimage = list[i].getAttribute('data-bg-image');
      list[i].style.backgroundImage  = "url('" + bgimage + "')";
    }

});