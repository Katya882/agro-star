document.addEventListener('DOMContentLoaded', () => {
    // Dropdowns
    const dropdowns = document.querySelectorAll('.js-dropdown');
    dropdowns.forEach(dd => {
        dd.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdowns.forEach(other => { if(other !== dd) other.classList.remove('is-active'); });
            dd.classList.toggle('is-active');
        });
    });
    window.onclick = () => dropdowns.forEach(d => d.classList.remove('is-active'));

    // Menu Underline
    const underline = document.querySelector('.menu-underline');
    const links = document.querySelectorAll('.menu-link');
    const activeLink = document.querySelector('.menu-link.active');

    const moveUnderline = (el) => {
        if (!el || !underline) return;
        underline.style.width = el.offsetWidth + 'px';
        underline.style.left = el.offsetLeft + 'px';
    };

    if (activeLink) moveUnderline(activeLink);
    links.forEach(link => {
        link.addEventListener('mouseenter', () => moveUnderline(link));
        link.addEventListener('mouseleave', () => moveUnderline(document.querySelector('.menu-link.active')));
    });
    window.onresize = () => moveUnderline(document.querySelector('.menu-link.active'));
});

const swiper = new Swiper('.equipment-swiper', {
    // Основні налаштування
    slicePerView: 1,
    spaceBetween: 30,
    loop: true, // Безкінечна прокрутка
    speed: 800, // Швидкість перемикання (мс)

    // Ефект появи (Fade), щоб текст не "стрибав", а плавно змінювався
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },

    // Навігація
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Автоплей (опціонально)
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});


const compensationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.compensation__image').forEach(el => compensationObserver.observe(el));


const experienceSection = document.querySelector('.experience');
const counters = document.querySelectorAll('.experience__number');
const items = document.querySelectorAll('.experience__item');

const startCounter = (el) => {
    const target = +el.getAttribute('data-target');
    const count = +el.innerText;
    const speed = 500; // чим вище число, тим повільніше

    const inc = target / speed;

    if (count < target) {
        el.innerText = Math.ceil(count + inc);
        setTimeout(() => startCounter(el), 30);
    } else {
        el.innerText = target + '+'; // додаємо плюс в кінці
    }
};

const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Активуємо появу пунктів
            items.forEach(item => item.classList.add('is-visible'));

            // Запускаємо лічильник
            counters.forEach(counter => startCounter(counter));

            // Відключаємо спостереження після спрацювання
            experienceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

experienceObserver.observe(experienceSection);


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Збір даних
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Проста валідація
        if (data.name.length < 2) {
            alert('Будь ласка, введіть коректне ім’я');
            return;
        }

        // Імітація відправки (наприклад, через fetch)
        console.log('Відправка даних:', data);

        // Візуальний фідбек
        const btn = form.querySelector('.contact__btn');
        const originalText = btn.textContent;

        btn.disabled = true;
        btn.textContent = 'ВІДПРАВЛЯЄТЬСЯ...';

        setTimeout(() => {
            alert('Дякуємо! Ваша заявка прийнята.');
            btn.disabled = false;
            btn.textContent = originalText;
            form.reset();
        }, 1500);
    });
});

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.contact__right').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});