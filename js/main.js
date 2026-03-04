// ===================================
// MAIN JAVASCRIPT
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Initialize application
function initializeApp() {
    // Initialize theme
    initializeTheme();

    // Initialize navigation
    initializeNavigation();

    // Load dynamic content
    loadSkills();
    loadProjects(); // filters initialized inside after load
    loadExperience();
    loadCertifications();

    // Initialize scroll reveal
    initializeScrollReveal();

    // Initialize form
    initializeContactForm();
}

// ===== Theme Management =====

function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme, themeIcon);

    themeToggle.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
    });
}

function updateThemeIcon(theme, icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== Navigation =====

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const navbarLinks = document.querySelectorAll('.navbar-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navbarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Load Skills =====

async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const data = await response.json();
        const container = document.getElementById('skills-container');

        data.categories.forEach((category, index) => {
            const categoryElement = createSkillCategory(category);
            categoryElement.classList.add('reveal');
            categoryElement.style.transitionDelay = `${index * 0.1}s`;
            container.appendChild(categoryElement);
        });

        // Animate skill bars when they come into view
        observeSkillBars();
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

function createSkillCategory(category) {
    const div = document.createElement('div');
    div.className = 'skill-category';

    div.innerHTML = `
    <div class="skill-category-header">
      <span class="skill-category-icon">${category.icon}</span>
      <h3 class="skill-category-title">${category.name}</h3>
    </div>
    <div class="skills-list">
      ${category.skills.map(skill => `
        <div class="skill-item">
          <div class="skill-header">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-level">${skill.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-progress" style="--skill-width: ${skill.level}%"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

    return div;
}

function observeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ===== Load Projects =====

async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        const container = document.getElementById('projects-container');

        // Sort by display order
        projects.sort((a, b) => a.displayOrder - b.displayOrder);

        projects.forEach((project, index) => {
            const projectElement = createProjectCard(project);
            projectElement.classList.add('reveal');
            projectElement.style.transitionDelay = `${index * 0.1}s`;
            container.appendChild(projectElement);
        });

        // Initialize filters AFTER projects are loaded into DOM
        initializeProjectFilters();

        // Re-trigger scroll reveal for newly added elements
        initializeScrollReveal();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function createProjectCard(project) {
    const div = document.createElement('div');
    div.className = 'card project-card';
    div.setAttribute('data-category', project.category);

    const links = [];
    if (project.githubUrl) links.push(`<a href="${project.githubUrl}" target="_blank" class="project-link"><i class="fab fa-github"></i> GitHub</a>`);
    if (project.kaggleUrl) links.push(`<a href="${project.kaggleUrl}" target="_blank" class="project-link"><i class="fab fa-kaggle"></i> Kaggle</a>`);
    if (project.demoUrl) links.push(`<a href="${project.demoUrl}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Demo</a>`);

    div.innerHTML = `
    <img src="${project.imageUrl}" alt="${project.title}" class="project-card-image" onerror="this.src='assets/images/placeholder.jpg'">
    <div class="project-card-content">
      <div class="project-card-header">
        <span class="project-category">${project.category}</span>
        ${project.featured ? '<span class="project-featured-badge">Featured</span>' : ''}
      </div>
      <h3 class="card-title">${project.title}</h3>
      <p class="card-description">${project.description}</p>
      <div class="tags-container">
        ${project.technologies.slice(0, 5).map(tech => `<span class="tag tag-primary">${tech}</span>`).join('')}
      </div>
      ${links.length > 0 ? `<div class="project-links">${links.join('')}</div>` : ''}
    </div>
  `;

    return div;
}

// ===== Project Filters =====

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Query cards at click time (they now exist in DOM)
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    card.style.opacity = '1';
                    setTimeout(() => card.classList.add('active'), 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== Load Experience =====

async function loadExperience() {
    try {
        const response = await fetch('data/cv-data.json');
        const data = await response.json();
        const container = document.getElementById('experience-container');

        // Combine experience and education
        const timeline = [
            ...data.experience.map(exp => ({ ...exp, type: 'experience' })),
            ...data.education.map(edu => ({ ...edu, type: 'education' }))
        ];

        timeline.forEach((item, index) => {
            const itemElement = createTimelineItem(item);
            itemElement.classList.add('reveal');
            itemElement.style.transitionDelay = `${index * 0.1}s`;
            container.appendChild(itemElement);
        });
    } catch (error) {
        console.error('Error loading experience:', error);
    }
}

function createTimelineItem(item) {
    const div = document.createElement('div');
    div.className = 'experience-item';

    if (item.type === 'experience') {
        div.innerHTML = `
      <div class="timeline-date">${item.startDate} - ${item.current ? 'Present' : item.endDate}</div>
      <h3 class="timeline-title">${item.title}</h3>
      <div class="timeline-company">${item.company} • ${item.location}</div>
      <p>${item.description}</p>
      ${item.achievements ? `
        <ul class="experience-achievements">
          ${item.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
        </ul>
      ` : ''}
    `;
    } else {
        div.innerHTML = `
      <div class="timeline-date">${item.startDate} - ${item.endDate}</div>
      <h3 class="timeline-title">${item.degree}</h3>
      <div class="timeline-company">${item.institution} • ${item.location}</div>
      ${item.gpa ? `<p>GPA: ${item.gpa}</p>` : ''}
      ${item.highlights ? `
        <ul class="experience-achievements">
          ${item.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
        </ul>
      ` : ''}
    `;
    }

    return div;
}

// ===== Scroll Reveal =====

function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ===== Contact Form =====

function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous errors
        clearFormErrors();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validate
        if (!validateForm(formData)) {
            return;
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            const response = await submitContactForm(formData);

            if (response.success) {
                showFormMessage('✅ Opening your email client... Please send the pre-filled email that appears. If nothing opened, email me directly at aneeqhussain@gmail.com', 'success');
                form.reset();
            } else {
                showFormMessage('Oops! Something went wrong. Please email me directly at aneeqhussain@gmail.com', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('Oops! Something went wrong. Please email me directly at aneeqhussain@gmail.com', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    });
}

function validateForm(data) {
    let isValid = true;

    if (!data.name) {
        showFieldError('name', 'Name is required');
        isValid = false;
    }

    if (!data.email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email');
        isValid = false;
    }

    if (!data.message) {
        showFieldError('message', 'Message is required');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => {
        element.textContent = '';
    });

    const messageElement = document.getElementById('form-message');
    if (messageElement) {
        messageElement.innerHTML = '';
    }
}

function showFormMessage(message, type) {
    const messageElement = document.getElementById('form-message');
    messageElement.innerHTML = `
    <div class="form-${type === 'success' ? 'success' : 'error'}">
      ${message}
    </div>
  `;
}

// ===== Smooth Scroll =====

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Load Certifications =====

async function loadCertifications() {
    try {
        const response = await fetch('data/cv-data.json');
        const data = await response.json();
        const container = document.getElementById('certifications-container');
        if (!container || !data.certifications) return;

        data.certifications.forEach(cert => {
            const div = document.createElement('div');
            div.className = 'certification-card';
            div.innerHTML = `
                <div class="cert-icon"><i class="fas fa-certificate"></i></div>
                <div class="cert-info">
                    <h4>${cert.name}</h4>
                    <p>${cert.issuer}</p>
                    <span class="cert-date">${cert.date}</span>
                </div>
                ${cert.credentialUrl ? `<a href="${cert.credentialUrl}" target="_blank" class="cert-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading certifications:', error);
    }
}
