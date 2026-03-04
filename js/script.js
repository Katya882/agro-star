document.addEventListener('DOMContentLoaded', () => {

    // =============================
    // BURGER
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
    // DROPDOWNS
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
    // SWIPER (Головний)
    // =============================
    if (document.querySelector('.equipment-swiper')) {
        const equipmentSwiper = new Swiper('.equipment-swiper', {
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

    // =============================
    // ЛІЧИЛЬНИК (Experience)
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

    const modal = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('closeForm');
    const triggers = document.querySelectorAll('.js-callback-trigger');

    if (modal) {
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Важливо, щоб не спрацьовували інші кліки
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