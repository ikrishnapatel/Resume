// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navContainer = document.querySelector('.nav-container');
const nav = document.querySelector('.top-nav');

mobileMenuBtn.addEventListener('click', () => {
    navContainer.classList.toggle('active');
    // Add scrolled class when menu is opened
    if (navContainer.classList.contains('active')) {
        nav.classList.add('scrolled');
    } else if (window.scrollY <= 200) {
        // Only remove scrolled class if we're at the top of the page
        nav.classList.remove('scrolled');
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navContainer.classList.remove('active');
        // Remove scrolled class when closing menu if at top of page
        if (window.scrollY <= 200) {
            nav.classList.remove('scrolled');
        }
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navContainer.classList.remove('active');
        // Remove scrolled class when closing menu if at top of page
        if (window.scrollY <= 200) {
            nav.classList.remove('scrolled');
        }
    });
});

// Smooth scrolling for navigation links with offset
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navHeight = document.querySelector('.top-nav').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Animated Background
function createAnimatedBackground() {
    const background = document.querySelector('.animated-background');
    const skillIcons = document.querySelectorAll('.floating-skill');

    // Set initial random positions for each skill icon
    skillIcons.forEach(icon => {
        // Set initial position
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        icon.style.left = `${startX}%`;
        icon.style.top = `${startY}%`;

        // Animate the element
        animateElement(icon);
    });
}

function animateElement(element) {
    let x = parseFloat(element.style.left);
    let y = parseFloat(element.style.top);
    let dx = (Math.random() - 0.5) * 0.1;
    let dy = (Math.random() - 0.5) * 0.1;
    let rotation = Math.random() * 360;
    let rotationSpeed = (Math.random() - 0.5) * 0.5; // Reduced rotation speed for better readability

    function update() {
        // Update position
        x += dx;
        y += dy;

        // Bounce off edges with random direction change
        if (x <= 0 || x >= 100) {
            dx *= -1;
            dx += (Math.random() - 0.5) * 0.05;
            dy += (Math.random() - 0.5) * 0.05;
        }
        if (y <= 0 || y >= 100) {
            dy *= -1;
            dx += (Math.random() - 0.5) * 0.05;
            dy += (Math.random() - 0.5) * 0.05;
        }

        // Normalize speed to prevent getting too fast or too slow
        const speed = Math.sqrt(dx * dx + dy * dy);
        if (speed > 0.15) {
            dx *= 0.15 / speed;
            dy *= 0.15 / speed;
        } else if (speed < 0.05) {
            dx *= 0.05 / speed;
            dy *= 0.05 / speed;
        }

        // Update rotation
        rotation += rotationSpeed;

        // Apply transforms
        element.style.transform = `translate(${x}%, ${y}%) rotate(${rotation}deg)`;
        element.style.left = x + '%';
        element.style.top = y + '%';

        // Random direction change occasionally
        if (Math.random() < 0.001) {
            dx += (Math.random() - 0.5) * 0.05;
            dy += (Math.random() - 0.5) * 0.05;
            rotationSpeed = (Math.random() - 0.5) * 0.5;
        }

        // Continue animation
        element.animationFrameId = requestAnimationFrame(update);
    }

    update();
}

// Typewriter effect with loop
function startTypewriter() {
    // Use dynamic titles from profile.json or fallback to default
    const titles = window.dynamicTitles || ["a Web Developer", "a Software Developer", "an Application Developer"];
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    const period = document.querySelector('.period');
    let isDeleting = false;
    let charIndex = 0;
    let titleIndex = 0;
    const typingSpeed = 100; // Speed of typing
    const deletingSpeed = 50; // Speed of deleting
    const pauseTime = 3000; // Time to pause before deleting/retyping

    function type() {
        // Current title text
        const currentTitle = titles[titleIndex];
        const currentText = currentTitle.substring(0, charIndex);
        typingText.textContent = currentText;

        if (!isDeleting) {
            // Typing
            if (charIndex < currentTitle.length) {
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                // Pause before starting to delete
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, pauseTime);
            }
        } else {
            // Deleting
            if (charIndex > 0) {
                charIndex--;
                setTimeout(type, deletingSpeed);
            } else {
                isDeleting = false;
                // Move to next title
                titleIndex = (titleIndex + 1) % titles.length;
                // Pause before starting to type again
                setTimeout(type, 500);
            }
        }
    }

    // Start the loop
    type();
}

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Handle navigation background on scroll
function handleNavScroll() {
    const nav = document.querySelector('.top-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Theme Switcher
function initializeThemeSwitcher() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    const themeToggle = document.querySelector('.theme-toggle');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const colorOptions = document.querySelector('.color-options');
    const colorOptionButtons = document.querySelectorAll('.color-option');
    const html = document.documentElement;

    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        html.setAttribute('data-theme', 'dark');
        darkModeToggle.classList.add('active');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle color options visibility
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        themeSwitcher.classList.toggle('active');
    });

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        const isDark = html.getAttribute('data-theme') === 'dark';
        if (isDark) {
            html.removeAttribute('data-theme');
            darkModeToggle.classList.remove('active');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'false');
        } else {
            html.setAttribute('data-theme', 'dark');
            darkModeToggle.classList.add('active');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'true');
        }
    });

    // Change theme color
    colorOptionButtons.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const color = option.dataset.color;
            document.documentElement.style.setProperty('--primary-color', color);
            themeSwitcher.classList.remove('active');
        });
    });

    // Close color options when clicking outside
    document.addEventListener('click', () => {
        themeSwitcher.classList.remove('active');
    });

    // Prevent closing when clicking inside color options
    colorOptions.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Timeline animations
const observeTimeline = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.timeline-card').forEach(card => {
        observer.observe(card);
    });
};

// Skills Section Interactivity
function initializeSkillsSection() {
    // New Tab-based Skills Cards
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCardGrids = document.querySelectorAll('.skills-card-grid');
    
    // Old category-based system (kept for backward compatibility)
    const categoryButtons = document.querySelectorAll('.skill-category-btn');
    const skillGrids = document.querySelectorAll('.skills-grid');
    const skillIcons = document.querySelectorAll('.skill-icon');
    let activeCategory = 'frontend';

    // New Tab functionality for neumorphic cards
    if (skillTabs.length > 0) {
        skillTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                
                // Update active tab
                skillTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show corresponding card grid
                skillCardGrids.forEach(grid => {
                    if (grid.dataset.category === category) {
                        grid.classList.add('active');
                    } else {
                        grid.classList.remove('active');
                    }
                });
            });
        });
    }

    // Remove any existing popups
    function removeAllPopups() {
        document.querySelectorAll('.certification-popup').forEach(popup => popup.remove());
    }

    // Function to create certification popup
    function createCertificationPopup(icon) {
        const popup = document.createElement('div');
        popup.className = 'certification-popup';

        const experience = icon.dataset.experience;
        const certification = icon.dataset.certification;
        const skillName = icon.querySelector('img').alt;

        popup.innerHTML = `
            <div class="title">${skillName}: ${experience}</div>
            ${certification ? `<div class="description">${certification}</div>` : ''}
            <button class="close-btn">
                <i class="fas fa-times"></i>
            </button>
        `;
        return popup;
    }

    // Function to show selected category
    const showCategory = (category) => {
        if (category === activeCategory) return;

        // Remove any existing popups when changing categories
        removeAllPopups();

        // Hide all grids
        skillGrids.forEach(grid => {
            grid.classList.remove('active');
        });

        // Show selected grid
        const selectedGrid = document.querySelector(`.skills-grid[data-category="${category}"]`);
        if (selectedGrid) {
            selectedGrid.classList.add('active');
        }

        // Update button states
        categoryButtons.forEach(btn => {
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        activeCategory = category;
    };

    // Initialize skill icons hover effects
    skillIcons.forEach(icon => {
        const defaultSkill = icon.querySelector('.default-skill');
        const hoverSkill = icon.querySelector('.hover-skill');
        let popup = null;

        // Mouse enter event
        icon.addEventListener('mouseenter', () => {
            // Handle skill icon hover effects
            if (defaultSkill) defaultSkill.style.opacity = '0';
            if (hoverSkill) {
                hoverSkill.style.opacity = '1';
            }

            // Show popup if not already visible
            if (!popup) {
                // Remove any existing popups first
                removeAllPopups();

                popup = createCertificationPopup(icon);
                icon.appendChild(popup);

                // Add event listener to close button
                const closeBtn = popup.querySelector('.close-btn');
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (popup) {
                        popup.remove();
                        popup = null;
                    }
                });

                // Show popup with animation
                requestAnimationFrame(() => {
                    popup.classList.add('show');
                });
            }
        });

        // Mouse leave event
        icon.addEventListener('mouseleave', () => {
            // Handle skill icon hover effects
            if (defaultSkill) defaultSkill.style.opacity = '1';
            if (hoverSkill) {
                hoverSkill.style.opacity = '0';
            }

            // Remove popup
            if (popup) {
                popup.remove();
                popup = null;
            }
        });
    });

    // Add hover event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const category = button.dataset.category;
            showCategory(category);
        });
    });

    // Show frontend skills by default
    showCategory('frontend');
}

// Skills Info Message
function initializeSkillsInfoMessage() {
    const skillsSection = document.getElementById('skills');
    const infoMessage = document.querySelector('.skills-info-message');
    let messageShown = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !messageShown) {
                infoMessage.classList.add('show');
                messageShown = true;

                // Hide message after 5 seconds
                setTimeout(() => {
                    infoMessage.classList.remove('show');
                }, 5000);
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(skillsSection);
}

// Contact Form Email Sending
async function sendEmail(event) {
    event.preventDefault();

    // First validate the form
    if (!validateForm()) {
        return false;
    }

    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Prepare the template parameters
    const templateParams = {
        to_name: 'Krishna Patel',
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        reply: document.getElementById('email').value
    };

    try {
        // Send the email using EmailJS
        const result = await emailjs.send(
            'service_wshcdnb', // Service ID
            'template_c6cbeog', // Template ID - replace with your actual template ID
            templateParams
        );

        // Show success message
        showNotification('Message sent successfully!', 'success');
        document.getElementById('contactForm').reset();

    } catch (error) {
        console.error('Failed to send email:', error);
        showNotification('Failed to send message. Please try again.', 'error');
    }

    // Reset button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    return false;
}

// Form validation function
function validateForm() {
    let isValid = true;
    const form = document.getElementById('contactForm');
    const formGroups = form.querySelectorAll('.form-group');

    // Reset previous errors
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) errorMessage.textContent = '';
    });

    // Validate Name
    const name = form.querySelector('#name');
    if (!name.value.match(/^[a-zA-Z\s]{2,50}$/)) {
        showError(name, 'Please enter a valid name (2-50 characters, letters only)');
        isValid = false;
    }

    // Validate Email
    const email = form.querySelector('#email');
    if (!email.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Phone
    const phone = form.querySelector('#phone');
    if (!phone.value.match(/^\+?[1-9][0-9]{7,14}$/)) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate Message
    const message = form.querySelector('#message');
    if (message.value.length < 10) {
        showError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
    }
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    document.body.appendChild(notification);

    // Add show class after a small delay to trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Character Counter for Message
document.addEventListener('DOMContentLoaded', () => {
    const messageArea = document.querySelector('#message');
    const charCount = document.querySelector('.char-count');

    if (messageArea && charCount) {
        messageArea.addEventListener('input', () => {
            const remaining = messageArea.value.length;
            charCount.textContent = `${remaining}/500`;

            // Visual feedback as user approaches limit
            if (remaining >= 450) {
                charCount.style.color = '#ef4444';
            } else if (remaining >= 400) {
                charCount.style.color = '#f97316';
            } else {
                charCount.style.color = 'var(--secondary-text)';
            }
        });
    }
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', async () => {
    // Load dynamic data first
    await initializeDynamicData();
    
    startTypewriter();
    createAnimatedBackground();
    handleNavScroll();
    initializeThemeSwitcher();
    observeTimeline();
    initializeSkillsSection();
    initializeSkillsInfoMessage();
});

// ================================
// DYNAMIC DATA LOADING
// ================================

async function loadData(filename) {
    try {
        const response = await fetch(`./data/${filename}`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return null;
    }
}

// Load and render skills dynamically
async function loadSkills() {
    const skillsData = await loadData('skills.json');
    if (!skillsData) return;

    const categories = ['frontend', 'backend', 'cloud', 'devops'];
    
    categories.forEach(category => {
        const grid = document.querySelector(`.skills-card-grid[data-category="${category}"]`);
        if (!grid || !skillsData[category]) return;

        grid.innerHTML = skillsData[category].map(skill => `
            <div class="skill-card ${skill.certified ? 'certified' : ''}">
                ${skill.certified ? `
                    <div class="certified-badge">
                        <i class="fas fa-certificate"></i>
                        <span>Certified</span>
                    </div>
                ` : ''}
                <div class="skill-card-icon">
                    <img src="${skill.icon}" alt="${skill.name}">
                </div>
                <h3 class="skill-card-title">${skill.name}</h3>
                <div class="skill-card-exp">
                    <i class="fas fa-clock"></i>
                    <span>${skill.experience}</span>
                </div>
                ${skill.certified ? `
                    <div class="certification-info">${skill.certificationName}</div>
                ` : ''}
            </div>
        `).join('');
    });
}

// Load and render experience dynamically
async function loadExperience() {
    const expData = await loadData('experience.json');
    if (!expData || !expData.experiences) return;

    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    timeline.innerHTML = expData.experiences.map(exp => `
        <div class="timeline-card">
            <div class="timeline-header">
                <h3>${exp.title}</h3>
                <span class="timeline-date">${exp.dateRange}</span>
            </div>
            <div class="timeline-content">
                <h4>${exp.company}</h4>
                <p>${exp.description}</p>
                <ul class="timeline-details">
                    ${exp.details.map(detail => `<li>${detail}</li>`).join('')}
                    <li>Responsibilities:</li>
                    <ul class="nested-details">
                        ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </ul>
            </div>
        </div>
    `).join('');

    // Re-initialize timeline animations
    observeTimeline();
}

// Load and render projects dynamically
async function loadProjects() {
    const projData = await loadData('projects.json');
    if (!projData || !projData.projects) return;

    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    grid.innerHTML = projData.projects.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${project.technologies ? `
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            ` : ''}
            <a href="${project.link}" class="project-link" target="_blank">View Project</a>
        </div>
    `).join('');
}

// Load profile data
async function loadProfile() {
    const profile = await loadData('profile.json');
    if (!profile) return;

    // Update name
    const nameEl = document.querySelector('.home-title');
    if (nameEl) nameEl.textContent = profile.name;

    // Store titles for typewriter (will be used by startTypewriter)
    if (profile.titles) {
        window.dynamicTitles = profile.titles;
    }

    // Update contact info
    const emailLinks = document.querySelectorAll('.contact-item a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.href = `mailto:${profile.email}`;
        link.textContent = profile.email;
    });

    const phoneLinks = document.querySelectorAll('.contact-item a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.href = `tel:${profile.phone}`;
        link.textContent = profile.phone;
    });

    // Update social links
    const linkedinLinks = document.querySelectorAll('a[title="LinkedIn"]');
    linkedinLinks.forEach(link => {
        if (profile.social.linkedin) link.href = profile.social.linkedin;
    });

    const githubLinks = document.querySelectorAll('a[title="GitHub"]');
    githubLinks.forEach(link => {
        if (profile.social.github) link.href = profile.social.github;
    });
}

// Initialize all dynamic data
async function initializeDynamicData() {
    await Promise.all([
        loadProfile(),
        loadSkills(),
        loadExperience(),
        loadProjects()
    ]);
}

// Restart animations when scrolling back to home section
document.addEventListener('scroll', () => {
    const homeSection = document.getElementById('home');
    const rect = homeSection.getBoundingClientRect();
    const elements = document.querySelectorAll('.floating-skill');

    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        elements.forEach(element => {
            if (!element.animationFrameId) {
                animateElement(element);
            }
        });
    }
}); 
