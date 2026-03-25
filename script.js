// ===== Sticky Header =====
const header = document.querySelector('.header');
if (header) {
    const handleScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load
    handleScroll();
}

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

if (menuToggle && navLinks) {
    const openMenu = () => {
        navLinks.classList.add('active');
        document.body.classList.add('menu-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        if (navOverlay) {
            navOverlay.classList.add('active');
            navOverlay.setAttribute('aria-hidden', 'false');
        }
        // Change icon
        const icon = menuToggle.querySelector('i');
        if (icon) { icon.className = 'fas fa-times'; }
    };

    const closeMenu = () => {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        if (navOverlay) {
            navOverlay.classList.remove('active');
            navOverlay.setAttribute('aria-hidden', 'true');
        }
        // Restore icon
        const icon = menuToggle.querySelector('i');
        if (icon) { icon.className = 'fas fa-bars'; }
    };

    menuToggle.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on overlay click
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
            menuToggle.focus();
        }
    });

    // Close on outside click (fallback)
    document.addEventListener('click', (e) => {
        if (
            navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            closeMenu();
        }
    });
}

// ===== Smooth Scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Counter Animation (about page) =====
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    if (!counters.length) return;

    const speed = 200;
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const inc = target / speed;

        const updateCount = () => {
            count += inc;
            if (count < target) {
                counter.textContent = Math.ceil(count) + '+';
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target + '+';
            }
        };
        requestAnimationFrame(updateCount);
    });
}

const counterSection = document.querySelector('.counter-section');
if (counterSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.4 });
    observer.observe(counterSection);
}

// ===== Initialize Swiper Sliders =====
if (typeof Swiper !== 'undefined') {
    if (document.querySelector('.clients-slider')) {
        new Swiper('.clients-slider', {
            loop: true,
            speed: 600,
            autoplay: {
                delay: 2200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            breakpoints: {
                320: { slidesPerView: 2, spaceBetween: 10 },
                576: { slidesPerView: 3, spaceBetween: 15 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 20 }
            }
        });
    }

    if (document.querySelector('.team-slider')) {
        const teamSwiper = new Swiper('.team-slider', {
            loop: true,
            speed: 600,
            centeredSlides: true,
            grabCursor: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            breakpoints: {
                320:  { slidesPerView: 1, spaceBetween: 14 },
                576:  { slidesPerView: 1, spaceBetween: 14 },
                768:  { slidesPerView: 2, spaceBetween: 16 },
                992:  { slidesPerView: 3, spaceBetween: 16, centeredSlides: false }
            },
            on: {
                init:   function() { handleTeamDesktop(this); },
                resize: function() { handleTeamDesktop(this); }
            }
        });

        /* على الكمبيوتر (≥992px): أوقف autoplay وامنع التحرك التلقائي */
        function handleTeamDesktop(swiper) {
            if (window.innerWidth >= 992) {
                swiper.autoplay.stop();
            } else {
                swiper.autoplay.start();
            }
        }
    }

    if (document.querySelector('.audience-slider')) {
        new Swiper('.audience-slider', {
            loop: true,
            speed: 600,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3800,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            /* بطاقة واحدة دائماً كما كان */
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 15 },
                768: { slidesPerView: 1, spaceBetween: 20 },
                992: { slidesPerView: 1, spaceBetween: 20 }
            }
        });
    }
}

// ===== AOS Initialization =====
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 700,
        once: true,
        offset: 60,
        easing: 'ease-out-cubic',
    });
}

// ===== Form Submission with SweetAlert (contact page) =====
const contactForm = document.querySelector('.contact-form');
if (contactForm && typeof Swal !== 'undefined') {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'تم الإرسال بنجاح!',
            text: 'شكراً لتواصلك معنا، سيقوم فريقنا بالرد عليك قريباً.',
            icon: 'success',
            confirmButtonColor: '#D4AF37',
            confirmButtonText: 'حسناً',
            timer: 4000,
            timerProgressBar: true,
        });
        contactForm.reset();
    });
}

// ===== Active Link Highlighting =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});