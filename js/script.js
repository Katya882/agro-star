document.addEventListener('DOMContentLoaded', () => {
    // 1. Універсальний пошук бургера та меню
    // Шукаємо або id="burger" (головна), або .burger-service (послуги)
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

        // Закриття при кліку на посилання
        const menuLinks = document.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }

    // 2. Універсальна логіка для Dropdown
    const dropdowns = document.querySelectorAll('.js-dropdown');
    dropdowns.forEach(dd => {
        // Додаємо слухач на весь блок дропдауна
        dd.addEventListener('click', (e) => {
            e.stopPropagation();

            // Закриваємо всі інші
            dropdowns.forEach(other => {
                if (other !== dd) {
                    other.classList.remove('is-active');
                    other.classList.remove('open');
                }
            });

            // Тоглимо класи (і старий is-active, і новий open для сумісності)
            dd.classList.toggle('is-active');
            dd.classList.toggle('open');
        });
    });

    // Закриття всього при кліку на порожнє місце
    window.addEventListener('click', () => {
        if (burger) burger.classList.remove('active');
        if (menu) menu.classList.remove('active');
        body.classList.remove('no-scroll');
        dropdowns.forEach(d => {
            d.classList.remove('is-active');
            d.classList.remove('open');
        });
    });
});