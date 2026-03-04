document.addEventListener('DOMContentLoaded', () => {

    // =============================
    // 1. BURGER MENU
    // =============================
    const burger = document.getElementById('burger') || document.querySelector('.burger-service');
    const menu = document.querySelector('.menu');
    const body = document.body;

    if (burger && menu) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            burger.classList.toggle('active');
            menu.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });

        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }

    // =============================
    // 2. DROPDOWNS
    // =============================
    const dropdowns = document.querySelectorAll('.js-dropdown');

    dropdowns.forEach(dd => {
        dd.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdowns.forEach(other => {
                if (other !== dd) {
                    other.classList.remove('is-active', 'open');
                }
            });
            dd.classList.toggle('is-active');
            dd.classList.toggle('open');
        });
    });

    window.addEventListener('click', () => {
        dropdowns.forEach(d => {
            d.classList.remove('is-active', 'open');
        });
    });

    // =============================
    // 3. SWIPERS
    // =============================
    if (document.querySelector('.equipment-swiper')) {
        new Swiper('.equipment-swiper', {
            loop: true,
            speed: 800,
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            pagination: { el: '.swiper-pagination', clickable: true },
            autoplay: { delay: 3000, disableOnInteraction: false },
        });
    }

    if (document.querySelector('.burner-swiper')) {
        new Swiper('.burner-swiper', {
            loop: true,
            speed: 800,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
        });
    }

    // =============================
    // 4. ANIMATIONS (Сертифікати та Списки)
    // =============================
    const animItems = document.querySelectorAll('.js-anim-item');
    if (animItems.length > 0) {
        const animObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    animObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animItems.forEach(item => animObserver.observe(item));
    }

    // =============================
    // 5. LIGHTBOX (Сертифікати)
    // =============================
    const lightbox = document.querySelector('.js-lightbox-overlay');
    const lightboxImg = document.querySelector('.js-lightbox-img');
    const lightboxClose = document.querySelector('.js-lightbox-close');
    const lboxTriggers = document.querySelectorAll('.js-lightbox');

    if (lightbox && lboxTriggers.length > 0) {
        lboxTriggers.forEach(t => {
            t.addEventListener('click', (e) => {
                e.preventDefault();
                lightboxImg.src = t.getAttribute('href');
                lightbox.classList.add('is-open');
                body.style.overflow = 'hidden';
            });
        });

        const closeLbox = () => {
            lightbox.classList.remove('is-open');
            body.style.overflow = '';
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLbox);
        lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLbox(); });
    }

    // =============================
    // 6. CALLBACK MODAL (Повертаємо форму!)
    // =============================
    const callbackModal = document.getElementById('modalOverlay');
    const closeCallback = document.getElementById('closeForm');
    const callbackTriggers = document.querySelectorAll('.js-callback-trigger');

    if (callbackModal) {
        callbackTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                callbackModal.classList.add('active');
                body.style.overflow = 'hidden';
            });
        });

        const closeFunc = () => {
            callbackModal.classList.remove('active');
            body.style.overflow = '';
        };

        if (closeCallback) closeCallback.addEventListener('click', closeFunc);

        callbackModal.addEventListener('click', (e) => {
            if (e.target === callbackModal) closeFunc();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeFunc();
        });
    }
});