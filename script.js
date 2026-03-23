// ===== Sticky Header =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    const closeMenu = () => {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    };
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


// ===== Initialize Swiper sliders (only if element exists) =====
if (typeof Swiper !== 'undefined') {
    if (document.querySelector('.clients-slider')) {
        new Swiper('.clients-slider', {
            loop: true,
            autoplay: { delay: 2000 },
            breakpoints: {
                320: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 }
            }
        });
    }

    if (document.querySelector('.team-slider')) {
        new Swiper('.team-slider', {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 }
            }
        });
    }

    if (document.querySelector('.audience-slider')) {
        new Swiper('.audience-slider', {
            loop: true,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: { slidesPerView: 1 },
                992: { slidesPerView: 1 }
            }
        });
    }
}

// ===== AOS initialization =====
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
    });
}

// ===== Form submission with SweetAlert (contact page) =====
const contactForm = document.querySelector('.contact-form');
if (contactForm && typeof Swal !== 'undefined') {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'تم الإرسال بنجاح!',
            text: 'شكراً لتواصلك معنا، سيقوم فريقنا بالرد عليك قريباً.',
            icon: 'success',
            confirmButtonColor: '#D4AF37',
            timer: 3000
        });
        contactForm.reset();
    });
}

// ===== Active link highlighting =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});