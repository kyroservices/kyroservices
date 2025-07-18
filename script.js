// --- script.js (Functions Only) ---
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    if (document.getElementById('appointmentForm') || document.getElementById('careerForm') || document.getElementById('contactForm')) {
        initializeForm();
    }
});

function initializePage() {
    document.body.classList.remove('fade-out');
    changeLanguage('en');
    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const overlayMenu = document.getElementById('overlay-menu');
    if (menuToggle && overlayMenu && closeMenu) {
        menuToggle.addEventListener('click', () => overlayMenu.classList.add('open'));
        closeMenu.addEventListener('click', () => overlayMenu.classList.remove('open'));
    }
    
    const header = document.querySelector('.main-header');
    if(header){
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    const navLinks = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"])');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('javascript:')) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
}

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

function changeLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-switcher button').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`lang-${lang}`);
    if(activeBtn) activeBtn.classList.add('active');

    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = translations[lang]?.[el.getAttribute('data-lang')];
        if (key) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = key;
            } else {
                el.innerHTML = key;
            }
        }
    });

    if (document.getElementById('countrySelect')) {
        populateCountryDropdown();
    }
}

function initializeForm() {
    const countrySelect = document.getElementById('countrySelect');
    if(countrySelect){
        populateCountryDropdown();
        countrySelect.addEventListener('change', updateCityDropdown);
    }
}

function populateCountryDropdown() {
    const countrySelect = document.getElementById('countrySelect');
    if (!countrySelect) return;
    const currentLang = document.documentElement.lang;
    const currentCountryValue = countrySelect.value; 
    countrySelect.innerHTML = '';
    
    Object.keys(cityData).forEach(countryCode => {
        const option = document.createElement('option');
        option.value = countryCode;
        option.textContent = cityData[countryCode].name[currentLang];
        countrySelect.appendChild(option);
    });

    if (currentCountryValue) {
        countrySelect.value = currentCountryValue;
    }
    updateCityDropdown();
}

function updateCityDropdown() {
    const countrySelect = document.getElementById('countrySelect');
    const citySelect = document.getElementById('citySelect');
    if (!countrySelect || !citySelect) return;
    const selectedCountry = countrySelect.value;
    const currentLang = document.documentElement.lang;
    
    citySelect.innerHTML = '';
    if (cityData[selectedCountry] && cityData[selectedCountry].cities) {
        cityData[selectedCountry].cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.code;
            option.textContent = city.name[currentLang];
            citySelect.appendChild(option);
        });
    }
}
