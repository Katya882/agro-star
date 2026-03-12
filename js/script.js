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
    // 6. CALLBACK MODAL
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


    const experienceSection = document.querySelector('.experience');

    if (experienceSection) {
        const startCounter = (el) => {
            const target = +el.getAttribute('data-target');
            const duration = 2000;
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;

            const timer = setInterval(() => {
                current += 1;
                el.innerText = current;
                if (current === target) {
                    clearInterval(timer);
                    el.innerText = target + '+';
                }
            }, stepTime);
        };

        const experienceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // елементи списку по черзі
                    document.querySelectorAll('.experience__item').forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('is-visible');
                        }, index * 200);
                    });

                    //  лічильник цифр
                    document.querySelectorAll('.experience__number').forEach(num => startCounter(num));

                    experienceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        experienceObserver.observe(experienceSection);
    }

});

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Анімація появи при скролі ---
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // Активуємо блок креслень
                const viewer = target.querySelector('.blueprint-viewer');
                if (viewer) {
                    viewer.classList.add('active');
                    startBlueprintLoop(target); // Запускаємо цикл перемикання
                }

                // Активуємо фото по черзі
                const photos = target.querySelectorAll('.js-photo');
                photos.forEach((p, i) => {
                    setTimeout(() => p.classList.add('active'), 250 * (i + 1));
                });

                animObserver.unobserve(target);
            }
        });
    }, { threshold: 0.2 });

    const trigger = document.querySelector('.js-anim-trigger');
    if (trigger) animObserver.observe(trigger);

    // Функція плавного перемикання двох креслень (6 секунд цикл)
    function startBlueprintLoop(container) {
        const img1 = container.querySelector('.js-blueprint-1');
        const img2 = container.querySelector('.js-blueprint-2');
        if (!img1 || !img2) return;

        setInterval(() => {
            if (img1.classList.contains('active')) {
                img1.classList.remove('active');
                img2.classList.add('active');
            } else {
                img2.classList.remove('active');
                img1.classList.add('active');
            }
        }, 6000);
    }

    // --- 2. Логіка Lightbox (Збільшення при натисканні) ---
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');

    // Всі елементи, які можна збільшити (фото + блок креслень)
    const clickableItems = document.querySelectorAll('.js-lightbox');

    clickableItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // зображення всередині натиснутого блоку
            let imageSrc = '';

            if (this.tagName.toLowerCase() === 'img') {
                imageSrc = this.src;
            } else if (this.querySelector('img')) {
                // Якщо натиснули на блок, беремо перше (або активне) фото всередині
                const activeImg = this.querySelector('img.active') || this.querySelector('img');
                imageSrc = activeImg.src;
            }

            if (!imageSrc) return;

            //  overlay та вставляємо фото
            lightboxImage.src = imageSrc;
            lightboxOverlay.classList.add('active');

            // Забороняємо скрол основної сторінки
            document.body.style.overflow = 'hidden';
        });
    });

    // Функція закриття
    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Повертаємо скрол
        // Невелика затримка, щоб очистити src після анімації закриття
        setTimeout(() => lightboxImage.src = "", 400);
    }

    // Кліки для закриття: на хрестик, на фон, на саму картинку
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', function(e) {
        // Закриваємо тільки якщо клікнули на фон, а не на саму картинку
        if (e.target !== lightboxImage) {
            closeLightbox();
        }
    });

    // Закриття клавішею Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
            closeLightbox();
        }
    });
});