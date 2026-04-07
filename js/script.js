document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    // =============================
    // 1. BURGER MENU
    // =============================
    const burger = document.getElementById('burger') || document.querySelector('.burger-service');
    const menu = document.querySelector('.menu');

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
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            }
        });
    }

    if (document.querySelector('.burner-swiper')) {
        new Swiper('.burner-swiper', {
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    }

    // =============================
    // 4. ANIMATIONS
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
    // 5. LIGHTBOX (ЄДИНА ВЕРСІЯ)
    // =============================
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCloseBtn = document.getElementById('lightboxClose');
    const lightboxTriggers = document.querySelectorAll('.js-lightbox');

    if (lightboxOverlay && lightboxImage && lightboxTriggers.length > 0) {

        lightboxTriggers.forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();

                let imageSrc = '';

                if (this.tagName.toLowerCase() === 'img') {
                    imageSrc = this.src;
                } else if (this.querySelector('img')) {
                    const activeImg = this.querySelector('img.active') || this.querySelector('img');
                    imageSrc = activeImg.src;
                }

                if (!imageSrc) return;

                lightboxImage.src = imageSrc;
                lightboxOverlay.classList.add('active');
                body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightboxOverlay.classList.remove('active');
            body.style.overflow = '';
            setTimeout(() => lightboxImage.src = "", 300);
        };

        if (lightboxCloseBtn) {
            lightboxCloseBtn.addEventListener('click', closeLightbox);
        }

        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target !== lightboxImage) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // =============================
    // 6. CALLBACK MODAL
    // =============================
    const callbackModal = document.getElementById('modalOverlay');
    const closeCallback = document.getElementById('closeForm');
    const callbackTriggers = document.querySelectorAll('.js-callback-trigger');

    if (callbackModal) {

        callbackTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                callbackModal.classList.add('active');
                body.style.overflow = 'hidden';
            });
        });

        const closeFunc = () => {
            callbackModal.classList.remove('active');
            body.style.overflow = '';
        };

        if (closeCallback) {
            closeCallback.addEventListener('click', closeFunc);
        }

        callbackModal.addEventListener('click', (e) => {
            if (e.target === callbackModal) closeFunc();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeFunc();
        });
    }

    // =============================
    // 7. EXPERIENCE
    // =============================
    const experienceSection = document.querySelector('.experience');

    if (experienceSection) {

        const startCounter = (el) => {
            const target = +el.getAttribute('data-target');
            const duration = 2000;
            const stepTime = Math.max(20, Math.floor(duration / target));
            let current = 0;

            const timer = setInterval(() => {
                current++;
                el.innerText = current;

                if (current >= target) {
                    clearInterval(timer);
                    el.innerText = target + '+';
                }
            }, stepTime);
        };

        const experienceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    document.querySelectorAll('.experience__item').forEach((item, index) => {
                        setTimeout(() => item.classList.add('is-visible'), index * 200);
                    });

                    document.querySelectorAll('.experience__number').forEach(num => startCounter(num));

                    experienceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        experienceObserver.observe(experienceSection);
    }

    // =============================
    // 8. BLUEPRINT + PHOTOS
    // =============================
    const animTrigger = document.querySelector('.js-anim-trigger');

    if (animTrigger) {

        let intervalStarted = false;

        const animObserver2 = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    const target = entry.target;

                    const viewer = target.querySelector('.blueprint-viewer');
                    if (viewer) {
                        viewer.classList.add('active');

                        if (!intervalStarted) {
                            startBlueprintLoop(target);
                            intervalStarted = true;
                        }
                    }

                    const photos = target.querySelectorAll('.js-photo');
                    photos.forEach((p, i) => {
                        setTimeout(() => p.classList.add('active'), 250 * (i + 1));
                    });

                    animObserver2.unobserve(target);
                }
            });
        }, { threshold: 0.2 });

        animObserver2.observe(animTrigger);

        function startBlueprintLoop(container) {
            const img1 = container.querySelector('.js-blueprint-1');
            const img2 = container.querySelector('.js-blueprint-2');

            if (!img1 || !img2) return;

            setInterval(() => {
                img1.classList.toggle('active');
                img2.classList.toggle('active');
            }, 6000);
        }
    }

    // =============================
    // 9. CONTACT POPUP
    // =============================
    const contactTrigger = document.querySelector('.js-contact-trigger');
    const contactPopup = document.getElementById('contactPopup');
    const contactClose = document.querySelector('.js-contact-close');

    if (contactTrigger && contactPopup) {

        const openPopup = () => {
            contactPopup.classList.add('is-open');
            contactTrigger.setAttribute('aria-expanded', 'true');
        };

        const closePopup = () => {
            contactPopup.classList.remove('is-open');
            contactTrigger.setAttribute('aria-expanded', 'false');
        };

        contactTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            contactPopup.classList.contains('is-open') ? closePopup() : openPopup();
        });

        if (contactClose) {
            contactClose.addEventListener('click', (e) => {
                e.stopPropagation();
                closePopup();
            });
        }

        document.addEventListener('click', (e) => {
            if (!contactPopup.contains(e.target) && e.target !== contactTrigger) {
                closePopup();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closePopup();
        });
    }

});