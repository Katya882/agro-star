document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    // =============================
    // 1. BURGER MENU
    // =============================
    const burger = document.getElementById('burger') || document.querySelector('.burger-service');
    const menu   = document.querySelector('.menu');

    if (burger && menu) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = burger.classList.toggle('active');
            menu.classList.toggle('active', open);
            body.classList.toggle('no-scroll', open);
        });

        menu.querySelectorAll('.menu-link').forEach(link => {
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
            const isOpen = dd.classList.contains('is-active');
            dropdowns.forEach(d => d.classList.remove('is-active', 'open'));
            if (!isOpen) dd.classList.add('is-active', 'open');
        });
    });

    document.addEventListener('click', () => {
        dropdowns.forEach(d => d.classList.remove('is-active', 'open'));
    });

    // =============================
    // 3. SWIPERS
    // =============================
    if (document.querySelector('.equipment-swiper')) {
        new Swiper('.equipment-swiper', {
            loop: true,
            speed: 800,
            navigation: {
                nextEl: '.equipment-swiper .swiper-button-next',
                prevEl: '.equipment-swiper .swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
        });
    }

    // Burner page — thumbnails + main
    if (document.querySelector('.bp-swiper-thumbs')) {
        const thumbsSwiper = new Swiper('.bp-swiper-thumbs', {
            spaceBetween: 10,
            slidesPerView: 3,
            watchSlidesProgress: true,
        });

        new Swiper('.bp-swiper-main', {
            spaceBetween: 0,
            slidesPerView: 1,
            loop: true,
            speed: 600,
            navigation: {
                nextEl: '.bp-swiper-next',
                prevEl: '.bp-swiper-prev',
            },
            pagination: {
                el: '.bp-swiper-pagination',
                clickable: true,
            },
            thumbs: { swiper: thumbsSwiper },
            keyboard: { enabled: true },
            a11y: {
                prevSlideMessage: 'Попередній слайд',
                nextSlideMessage: 'Наступний слайд',
            },
        });
    }

    // =============================
    // 4. SCROLL REVEAL
    // =============================
    const animItems = document.querySelectorAll('.js-anim-item');

    if (animItems.length) {
        const animObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    animObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        animItems.forEach(el => animObserver.observe(el));
    }

    // =============================
    // 5. LIGHTBOX
    // =============================
    const lightboxOverlay  = document.getElementById('lightboxOverlay');
    const lightboxImage    = document.getElementById('lightboxImage');
    const lightboxCloseBtn = document.getElementById('lightboxClose');
    const lightboxTriggers = document.querySelectorAll('.js-lightbox');

    if (lightboxOverlay && lightboxImage && lightboxTriggers.length) {
        const openLightbox = (src) => {
            lightboxImage.src = src;
            lightboxOverlay.classList.add('active');
            body.style.overflow = 'hidden';
        };
        const closeLightbox = () => {
            lightboxOverlay.classList.remove('active');
            body.style.overflow = '';
            setTimeout(() => { lightboxImage.src = ''; }, 300);
        };

        lightboxTriggers.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const img = item.tagName === 'IMG'
                    ? item
                    : (item.querySelector('img.active') || item.querySelector('img'));
                if (img?.src) openLightbox(img.src);
            });
        });

        lightboxCloseBtn?.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target !== lightboxImage) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // =============================
    // 6. CALLBACK MODAL
    // =============================
    const callbackModal    = document.getElementById('modalOverlay');
    const closeCallback    = document.getElementById('closeForm');
    const callbackTriggers = document.querySelectorAll('.js-callback-trigger');

    if (callbackModal) {
        const openModal  = () => { callbackModal.classList.add('active');    body.style.overflow = 'hidden'; };
        const closeModal = () => { callbackModal.classList.remove('active'); body.style.overflow = ''; };

        callbackTriggers.forEach(t => {
            t.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
        });
        closeCallback?.addEventListener('click', closeModal);
        callbackModal.addEventListener('click', (e) => {
            if (e.target === callbackModal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // =============================
    // 7. EXPERIENCE COUNTER
    // =============================
    const experienceSection = document.querySelector('.experience');

    if (experienceSection) {
        const startCounter = (el) => {
            const target   = +el.getAttribute('data-target');
            const stepTime = Math.max(20, Math.floor(2000 / target));
            let current    = 0;
            const timer    = setInterval(() => {
                el.innerText = ++current;
                if (current >= target) {
                    clearInterval(timer);
                    el.innerText = target + '+';
                }
            }, stepTime);
        };

        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                document.querySelectorAll('.experience__item').forEach((item, i) => {
                    setTimeout(() => item.classList.add('is-visible'), i * 200);
                });
                document.querySelectorAll('.experience__number').forEach(startCounter);
            });
        }, { threshold: 0.3 }).observe(experienceSection);
    }

    // =============================
    // 8. BLUEPRINT ANIMATION
    // =============================
    const animTrigger = document.querySelector('.js-anim-trigger');

    if (animTrigger) {
        let started = false;

        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const t = entry.target;

                t.querySelector('.blueprint-viewer')?.classList.add('active');

                if (!started) {
                    const img1 = t.querySelector('.js-blueprint-1');
                    const img2 = t.querySelector('.js-blueprint-2');
                    if (img1 && img2) {
                        setInterval(() => {
                            img1.classList.toggle('active');
                            img2.classList.toggle('active');
                        }, 6000);
                    }
                    started = true;
                }

                t.querySelectorAll('.js-photo').forEach((p, i) => {
                    setTimeout(() => p.classList.add('active'), 250 * (i + 1));
                });
            });
        }, { threshold: 0.2 }).observe(animTrigger);
    }

    // =============================
    // 9. CONTACT POPUP (compensation phone)
    // =============================
    const contactTrigger = document.querySelector('.js-contact-trigger');
    const contactPopup   = document.getElementById('contactPopup');
    const contactClose   = document.querySelector('.js-contact-close');

    if (contactTrigger && contactPopup) {
        const openPopup  = () => { contactPopup.classList.add('is-open');    contactTrigger.setAttribute('aria-expanded', 'true'); };
        const closePopup = () => { contactPopup.classList.remove('is-open'); contactTrigger.setAttribute('aria-expanded', 'false'); };

        contactTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            contactPopup.classList.contains('is-open') ? closePopup() : openPopup();
        });
        contactClose?.addEventListener('click', (e) => { e.stopPropagation(); closePopup(); });
        document.addEventListener('click', (e) => {
            if (!contactPopup.contains(e.target) && e.target !== contactTrigger) closePopup();
        });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });
    }

    // =============================
    // 10. PHONE MODAL (transport page)
    // =============================
    const phoneTrigger = document.querySelector('.js-contact-phone-trigger');
    const phoneModal   = document.getElementById('phoneModal');
    const phoneClose   = document.getElementById('phoneModalClose');

    if (phoneTrigger && phoneModal) {
        const openPhone  = () => { phoneModal.classList.add('active');    body.style.overflow = 'hidden'; };
        const closePhone = () => { phoneModal.classList.remove('active'); body.style.overflow = ''; };

        phoneTrigger.addEventListener('click', openPhone);
        phoneClose?.addEventListener('click', closePhone);
        phoneModal.addEventListener('click', (e) => { if (e.target === phoneModal) closePhone(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePhone(); });
    }

});


// ─── pre-cleaning.js ───────────────────────────────────────────────────────
// Скрипти сторінки "Попередня очистка зерна"

(function () {
    'use strict';

    // ── Scroll reveal (IntersectionObserver) ─────────────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.pr-reveal, .pr-left, .pr-right')
        .forEach(el => observer.observe(el));

    // Stagger для stats і карток — динамічна затримка через JS
    document.querySelectorAll('.pr-stagger .pr-reveal').forEach((el, i) => {
        el.style.transitionDelay = (i * 0.07) + 's';
        observer.observe(el);
    });

    // ── Modal callback ────────────────────────────────────────────────────────
    const modalOverlay = document.getElementById('modalOverlay');
    const closeForm    = document.getElementById('closeForm');

    document.querySelectorAll('.js-callback-trigger').forEach(btn =>
        btn.addEventListener('click', e => {
            e.preventDefault();
            modalOverlay.classList.add('active');
        })
    );

    closeForm.addEventListener('click', () =>
        modalOverlay.classList.remove('active')
    );

    modalOverlay.addEventListener('click', e => {
        if (e.target === e.currentTarget) e.currentTarget.classList.remove('active');
    });

    // ── Phone modal ───────────────────────────────────────────────────────────
    const phoneModal      = document.getElementById('phoneModal');
    const phoneModalClose = document.getElementById('phoneModalClose');

    document.querySelectorAll('.js-contact-phone-trigger').forEach(btn =>
        btn.addEventListener('click', () => phoneModal.classList.add('active'))
    );

    phoneModalClose.addEventListener('click', () =>
        phoneModal.classList.remove('active')
    );

    phoneModal.addEventListener('click', e => {
        if (e.target === e.currentTarget) e.currentTarget.classList.remove('active');
    });

})();