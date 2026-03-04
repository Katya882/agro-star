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
    // 3. SWIPERS (Універсальна перевірка)
    // =============================
    // Слайдер обладнання (Головна)
    if (document.querySelector('.equipment-swiper')) {
        new Swiper('.equipment-swiper', {
            loop: true,
            speed: 800,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
    }

    // Будь-який інший слайдер (наприклад, на сторінці Про нас)
    // Якщо у тебе там інший клас, просто додай його сюди
    if (document.querySelector('.about-swiper')) {
        new Swiper('.about-swiper', {
            loop: true,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        });
    }


    // Слайдер пальників на сторінці Про Нас
    if (document.querySelector('.burner-swiper')) {
        new Swiper('.burner-swiper', {
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            // Якщо захочеш додати крапки/стрілки пізніше:
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // =============================
    // 4. АНІМАЦІЯ СПИСКІВ (Твій невидимий контент)
    // =============================
    const animItems = document.querySelectorAll('.js-anim-item');

    if (animItems.length > 0) {
        const animObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Додаємо клас, який робить елемент видимим
                    entry.target.classList.add('is-visible');
                    animObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animItems.forEach(item => animObserver.observe(item));
    }

    // =============================
    // 5. ЛІЧИЛЬНИК (Experience)
    // =============================
    const startCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const speed = 100;

        const updateCount = () => {
            const count = +el.innerText.replace('+', '');
            const increment = target / speed;

            if (count < target) {
                el.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 40);
            } else {
                el.innerText = target + '+';
            }
        };
        updateCount();
    };

    const experienceSection = document.querySelector('.experience');
    if (experienceSection) {
        const experienceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = document.querySelectorAll('.experience__item');
                    items.forEach((item, index) => {
                        setTimeout(() => { item.classList.add('is-visible'); }, index * 150);
                    });
                    const counters = document.querySelectorAll('.experience__number');
                    counters.forEach(counter => startCounter(counter));
                    experienceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        experienceObserver.observe(experienceSection);
    }

    // =============================
    // 6. MODAL (Callback)
    // =============================
    const modal = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('closeForm');
    const triggers = document.querySelectorAll('.js-callback-trigger');

    if (modal) {
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closeModal();
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }
});