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
        if (burger) burger.classList.remove('active');
        if (menu) menu.classList.remove('active');
        body.classList.remove('no-scroll');

        dropdowns.forEach(d => {
            d.classList.remove('is-active', 'open');
        });
    });

    // =============================
    // SWIPER ⭐
    // =============================
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


    // Функція для плавного рахунку
    const startCounter = (el) => {
        const target = +el.getAttribute('data-target'); // Отримуємо 15
        const speed = 100; // Чим менше число, тим швидше рахує

        const updateCount = () => {
            const count = +el.innerText.replace('+', ''); // Прибираємо +, якщо він вже є
            const increment = target / speed;

            if (count < target) {
                el.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 40); // Швидкість оновлення цифр
            } else {
                el.innerText = target + '+'; // В кінці додаємо плюсик
            }
        };

        updateCount();
    };

// Слідкуємо за появою секції на екрані
    const experienceSection = document.querySelector('.experience');
    if (experienceSection) {
        const experienceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 1. Робимо анімацію появи всього списку
                    const items = document.querySelectorAll('.experience__item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('is-visible');
                        }, index * 150); // Кожен наступний блок з'являється трохи пізніше
                    });

                    // 2. Запускаємо лічильник цифр
                    const counters = document.querySelectorAll('.experience__number');
                    counters.forEach(counter => startCounter(counter));

                    // Зупиняємо спостереження, щоб не рахувало щоразу при скролі
                    experienceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // Спрацює, коли 20% секції буде в кадрі

        experienceObserver.observe(experienceSection);
    }
});
