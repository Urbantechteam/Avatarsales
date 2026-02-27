// ==================== HEADER SCROLL ====================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

// ==================== SCROLL ANIMATIONS ====================
const animatedEls = document.querySelectorAll(
    '.portfolio-card, .pricing-card, .proceso-card, .testimonial-card, .section-label, .section-title, .portfolio-header, .proceso-header'
);

animatedEls.forEach(el => el.classList.add('animate-on-scroll'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animatedEls.forEach(el => observer.observe(el));

// ==================== COUNTER ANIMATION ====================
function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const inner = el;

    const update = () => {
        start += step;
        if (start >= target) {
            start = target;
            inner.innerHTML = target + '<span>' + suffix + '</span>';
            return;
        }
        inner.innerHTML = Math.floor(start) + '<span>' + suffix + '</span>';
        requestAnimationFrame(update);
    };
    update();
}

const statsSection = document.querySelector('.stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        document.querySelectorAll('.stat-number').forEach(el => {
            const target = parseInt(el.dataset.target);
            const suffix = el.querySelector('span') ? el.querySelector('span').textContent : '';
            el.querySelector('span') && el.querySelector('span').remove();
            animateCounter(el, target, suffix);
        });
    }
}, { threshold: 0.3 });

if (statsSection) statsObserver.observe(statsSection);

// ==================== SMOOTH ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ==================== CHAT BUTTON ====================
const chatBtn = document.getElementById('chat-btn');
chatBtn.addEventListener('click', () => {
    // Scroll to soporte section
    const soporte = document.getElementById('soporte');
    if (soporte) {
        const offsetTop = soporte.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
});

// ==================== HERO BADGE STATS PULSE ====================
// Animate hero stats with stagger on hero enter
const heroStats = document.querySelectorAll('.hero-stat');
heroStats.forEach((stat, i) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(10px)';
    stat.style.transition = `opacity 0.6s ease ${0.9 + i * 0.15}s, transform 0.6s ease ${0.9 + i * 0.15}s`;
    setTimeout(() => {
        stat.style.opacity = '1';
        stat.style.transform = 'translateY(0)';
    }, 100);
});
