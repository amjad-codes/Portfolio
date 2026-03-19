
        // ==========================================
        // 1. THEME TOGGLE (Dark/Light Mode)
        // ==========================================
        
        // Get theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        // Check if user has a saved preference
        // localStorage se saved theme check karo
        const savedTheme = localStorage.getItem('theme');
        
        // Agar saved theme hai toh apply karo
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }
        
        // Theme toggle click handler
        themeToggle.addEventListener('click', function() {
            // Toggle dark-mode class
            body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });

        // ==========================================
        // 2. MOBILE MENU TOGGLE
        // ==========================================
        
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.querySelector('.nav-menu');
        
        // Simple mobile menu toggle (basic implementation)
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle nav menu visibility on mobile
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            
            // Mobile pe flex column layout ke saath
            if (navMenu.style.display === 'flex') {
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.flexDirection = 'column';
                navMenu.style.background = 'var(--bg-secondary)';
                navMenu.style.padding = '1rem';
                navMenu.style.boxShadow = 'var(--shadow-lg)';
            }
        });

        // ==========================================
        // 3. SKILL BARS ANIMATION
        // ==========================================
        
        // Intersection Observer - element viewport mein aaya ki nahi check karta hai
        const skillBars = document.querySelectorAll('.skill-progress');
        
        // Observer options
        const observerOptions = {
            root: null, // viewport
            threshold: 0.5 // 50% visible hone par trigger
        };
        
        // Callback function jab element visible ho
        const skillObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Get skill percentage from data attribute
                    const skillLevel = entry.target.getAttribute('data-skill');
                    
                    // Set width to animate
                    entry.target.style.width = skillLevel + '%';
                    
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Har skill bar ko observe karo
        skillBars.forEach(function(bar) {
            skillObserver.observe(bar);
        });

        // ==========================================
        // 4. SCROLL ANIMATIONS (Reveal on Scroll)
        // ==========================================
        
        const revealElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .contact-card');
        
        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(function(el) {
            // Initial state
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            revealObserver.observe(el);
        });

        // ==========================================
        // 5. NAVBAR SCROLL EFFECT
        // ==========================================
        
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Scroll pe navbar shadow add karo
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        });

        // ==========================================
        // 6. BACK TO TOP BUTTON
        // ==========================================
        
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', function() {
            // 500px scroll hone par button dikhao
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Click pe top pe scroll karo
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ==========================================
        // 7. SMOOTH SCROLL FOR ANCHOR LINKS
        // ==========================================
        
        // Saare anchor links ko select karo jo # se start hote hain
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault(); // Default behavior roko
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // ==========================================
        // 8. CONTACT FORM HANDLING
        // ==========================================
        
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Form submit hone se roko
            
            // Form data get karo
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validation check
            if (name && email && message) {
                // Success message
                alert('Thank you ' + name + '! Your message has been sent successfully.');
                
                // Form reset
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });

        // ==========================================
        // 9. CONSOLE LOG FOR DEBUGGING
        // ==========================================
        
        console.log('Portfolio loaded successfully!');
        console.log('Theme:', localStorage.getItem('theme') || 'light');
        console.log('Skills count:', skillBars.length);
        console.log('Projects count:', document.querySelectorAll('.project-card').length);

