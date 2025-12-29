// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Update active nav link
            updateActiveNavLink(this);

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Update active navigation link on scroll
function updateActiveNavLink(clickedLink = null) {
    const navLinks = document.querySelectorAll('.nav-link');

    if (clickedLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    } else {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Scroll event listener
window.addEventListener('scroll', () => {
    updateActiveNavLink();

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            empresa: document.getElementById('empresa').value,
            interesse: document.getElementById('interesse').value,
            mensagem: document.getElementById('mensagem').value
        };

        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        showFormMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');

        // Reset form
        contactForm.reset();

        // In a real application, you would do something like:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     showFormMessage('Mensagem enviada com sucesso!', 'success');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     showFormMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
        // });
    });
}

function showFormMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        animation: fadeInUp 0.3s ease-out;
    `;

    if (type === 'success') {
        messageDiv.style.background = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else {
        messageDiv.style.background = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    }

    // Insert message at the top of the form
    contactForm.insertBefore(messageDiv, contactForm.firstChild);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.manifesto-card, .produto-card, .story-text, .story-image, .contato-info, .contato-form'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const gridPattern = document.querySelector('.grid-pattern');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 500);
    }

    if (gridPattern && scrolled < window.innerHeight) {
        gridPattern.style.opacity = 1 - (scrolled / 700);
    }
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const value = statNumber.textContent;

            // Only animate if it's a number
            if (!isNaN(value)) {
                statNumber.textContent = '0';
                animateCounter(statNumber, parseInt(value));
            }

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => statsObserver.observe(stat));
});

// Add hover effect to produto cards
document.querySelectorAll('.produto-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

// Prevent navigation menu from closing when clicking inside
if (navMenu) {
    navMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            navMenu.classList.remove('active');
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.type === 'submit') {
            // Only add loading state to submit buttons
            const form = this.closest('form');
            if (form && form.checkValidity()) {
                this.classList.add('loading');
                this.disabled = true;

                // Remove loading state after submission
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                }, 2000);
            }
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('CodeGrid Technology - Website Loaded');
    console.log('Desenvolvido com ♥ e código');
});
