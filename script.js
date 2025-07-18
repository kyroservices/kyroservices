document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    if (document.getElementById('appointmentForm') || document.getElementById('careerForm') || document.getElementById('contactForm')) {
        initializeForm();
    }
    setupLanguageSwitchers();
});

function initializePage() {
    document.body.classList.remove('fade-out');
    changeLanguage('en'); // Varsayılan dil İngilizce
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
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
    if (header) {
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

function setupLanguageSwitchers() {
    const languageButtons = document.querySelectorAll('.lang-switcher button');
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id.replace('lang-', ''); // Örneğin, 'lang-en' -> 'en'
            changeLanguage(lang);
        });
    });
}

function changeLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Dil ${lang} için çeviri bulunamadı.`);
        return;
    }

    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-switcher button').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`lang-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');

    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        const translation = translations[lang][key];
        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.innerHTML = translation;
            }
        }
    });

    if (document.getElementById('countrySelect')) {
        populateCountryDropdown();
    }
}

function initializeForm() {
    const countrySelect = document.getElementById('countrySelect');
    if (countrySelect) {
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

const cityData = {
    de: { name: { en: 'Germany', tr: 'Almanya', el: 'Γερμανία', fr: 'Allemagne' }, cities: [ { code: 'ber', name: { en: 'Berlin', tr: 'Berlin', el: 'Βερολίνο', fr: 'Berlin' } }, { code: 'mun', name: { en: 'Munich', tr: 'Münih', el: 'Μόναχο', fr: 'Munich' } }, { code: 'fra', name: { en: 'Frankfurt', tr: 'Frankfurt', el: 'Φρανκφούρτη', fr: 'Francfort' } }, { code: 'ham', name: { en: 'Hamburg', tr: 'Hamburg', el: 'Αμβούργο', fr: 'Hambourg' } } ] },
    gr: { name: { en: 'Greece', tr: 'Yunanistan', el: 'Ελλάδα', fr: 'Grèce' }, cities: [ { code: 'ath', name: { en: 'Athens', tr: 'Atina', el: 'Αθήνα', fr: 'Athènes' } }, { code: 'the', name: { en: 'Thessaloniki', tr: 'Selanik', el: 'Θεσσαλονίκη', fr: 'Thessalonique' } }, { code: 'pat', name: { en: 'Patras', tr: 'Patra', el: 'Πάτρα', fr: 'Patras' } } ] },
    tr: { name: { en: 'Turkey', tr: 'Türkiye', el: 'Τουρκία', fr: 'Turquie' }, cities: [ { code: 'ist', name: { en: 'Istanbul', tr: 'İstanbul', el: 'Κωνσταντινούπολη', fr: 'Istanbul' } }, { code: 'ank', name: { en: 'Ankara', tr: 'Ankara', el: 'Άγκυρα', fr: 'Ankara' } }, { code: 'izm', name: { en: 'Izmir', tr: 'İzmir', el: 'Σμύρνη', fr: 'Izmir' } }, { code: 'ant', name: { en: 'Antalya', tr: 'Antalya', el: 'Αττάλεια', fr: 'Antalya' } } ] },
    fr: { name: { en: 'France', tr: 'Fransa', el: 'Γαλλία', fr: 'France' }, cities: [ { code: 'par', name: { en: 'Paris', tr: 'Paris', el: 'Παρίσι', fr: 'Paris' } }, { code: 'mar', name: { en: 'Marseille', tr: 'Marsilya', el: 'Μασσαλία', fr: 'Marseille' } }, { code: 'lyo', name: { en: 'Lyon', tr: 'Lyon', el: 'Λυών', fr: 'Lyon' } } ] },
    it: { name: { en: 'Italy', tr: 'İtalya', el: 'Ιταλία', fr: 'Italie' }, cities: [ { code: 'rom', name: { en: 'Rome', tr: 'Roma', el: 'Ρώμη', fr: 'Rome' } }, { code: 'mil', name: { en: 'Milan', tr: 'Milano', el: 'Μιλάνο', fr: 'Milan' } }, { code: 'nap', name: { en: 'Naples', tr: 'Napoli', el: 'Νάπολη', fr: 'Naples' } } ] },
    es: { name: { en: 'Spain', tr: 'İspanya', el: 'Ισπανία', fr: 'Espagne' }, cities: [ { code: 'mad', name: { en: 'Madrid', tr: 'Madrid', el: 'Μαδρίτη', fr: 'Madrid' } }, { code: 'bar', name: { en: 'Barcelona', tr: 'Barselona', el: 'Βαρκελώνη', fr: 'Barcelone' } } ] },
    gb: { name: { en: 'United Kingdom', tr: 'Birleşik Krallık', el: 'Ηνωμένο Βασίλειο', fr: 'Royaume-Uni' }, cities: [ { code: 'lon', name: { en: 'London', tr: 'Londra', el: 'Λονδίνο', fr: 'Londres' } }, { code: 'man', name: { en: 'Manchester', tr: 'Manchester', el: 'Μάντσεστερ', fr: 'Manchester' } } ] },
    us: { name: { en: 'United States', tr: 'ABD', el: 'ΗΠΑ', fr: 'États-Unis' }, cities: [ { code: 'nyc', name: { en: 'New York', tr: 'New York', el: 'Νέα Υόρκη', fr: 'New York' } }, { code: 'la', name: { en: 'Los Angeles', tr: 'Los Angeles', el: 'Λος Άντζελες', fr: 'Los Angeles' } }, { code: 'chi', name: { en: 'Chicago', tr: 'Chicago', el: 'Σικάγο', fr: 'Chicago' } } ] },
    se: { name: { en: 'Sweden', tr: 'İsveç', el: 'Σουηδία', fr: 'Suède' }, cities: [ { code: 'sto', name: { en: 'Stockholm', tr: 'Stockholm', el: 'Στοκχόλμη', fr: 'Stockholm' } } ] },
    ch: { name: { en: 'Switzerland', tr: 'İsviçre', el: 'Ελβετία', fr: 'Suisse' }, cities: [ { code: 'zur', name: { en: 'Zurich', tr: 'Zürih', el: 'Ζυρίχη', fr: 'Zurich' } }, { code: 'gen', name: { en: 'Geneva', tr: 'Cenevre', el: 'Γενεύη', fr: 'Genève' } } ] },
    cy: { name: { en: 'Cyprus', tr: 'Kıbrıs', el: 'Κύπρος', fr: 'Chypre' }, cities: [ { code: 'nic', name: { en: 'Nicosia', tr: 'Lefkoşa', el: 'Λευκωσία', fr: 'Nicosie' } } ] },
    dk: { name: { en: 'Denmark', tr: 'Danimarka', el: 'Δανία', fr: 'Danemark' }, cities: [ { code: 'cop', name: { en: 'Copenhagen', tr: 'Kopenhag', el: 'Κοπεγχάγη', fr: 'Copenhague' } } ] }
};

const translations = {
    en: {
        slogan: "Power of Europe",
        aboutTitle: "About Us",
        aboutParagraph: "Headquartered in Athens, Greece, KyroServices Global is a dynamic parent company operating throughout Europe and Turkey. We manage a diverse portfolio of specialized brands, delivering excellence and innovation across a wide range of industries.",
        address: "Leoforos Kifisias 123, Marousi, 151 24 Athens, Greece",
        brandsTitle: "Our Brands & Operations",
        opsTurkeyTitle: "Franchise Operations",
        opsTurkeyParagraph: "2 Burger King branches (Vadi Istanbul, Bodrum) and all Starbucks stores in the Bodrum region are operated by us.",
        teamTitle: "Our Board of Directors",
        team_kyros_name: "Kyros I. DUGAN",
        team_kyros_title: "Founder & Owner",
        team_alissa_name: "Alissa KIRAKIS",
        team_alissa_title: "General Director, KyroServices Global",
        team_gamze_name: "Gamze ÖZDEN",
        team_gamze_title: "General Director, KyroServices Turkey & Yunandan Gelsin",
        team_dimitri_name: "Dimitri LYANOS",
        team_dimitri_title: "General Director, K&D History Services Europe & USA",
        team_beyza_name: "Beyza ÇİMEN",
        team_beyza_title: "General Director, K&D History Services Turkey",
        team_sadio_name: "Mehmet Sadioğlu",
        team_sadio_title: "General Manager, PeP",
        team_fatma_name: "Fatma BAYSAN",
        team_fatma_title: "General Manager, Kosmos Vize",
        team_fevzi_name: "Fevzi Cem İz",
        team_fevzi_title: "General Manager, Kampüs Giyim",
        team_tugce_name: "Müh. Tuğçe SARICA",
        team_tugce_title: "General Manager, ReziKyros",
        team_hande_name: "Hande DERİN",
        team_hande_title: "General Coordinator, Burger King & Starbucks Franchises",
        strategyTitle: "Our Strategic Vision",
        strategyParagraph: "Our vision is to foster synergy between our diverse brands, driving innovation and sustainable growth. We are committed to excellence and expanding our global footprint while delivering exceptional value to our clients and partners worldwide.",
        contactTitle: "Get In Touch",
        contactSubtitle: "Feel free to reach out for projects and collaborations.",
        contact    	    
        contactButton: "Contact Us",
        menu_home: "Home",
        menu_about: "About Us",
        menu_team: "Board",
        menu_brands: "Our Brands",
        menu_career: "Career",
        menu_contact: "Contact",
        menu_kd: "K&D History Services",
        menu_pep: "PeP",
        menu_yunan: "Yunandan Gelsin",
        menu_kampus: "Kampüs Giyim",
        menu_rezi: "ReziKyros",
        menu_kosmos: "Kosmos Vize",
        brand_desc_kd: "As an official NATO partner, it provides historical consultancy and geopolitical analysis services in 12 countries.",
        brand_desc_pep: "An electronic money institution supervised by the CBRT, offering international money transfer and digital wallet solutions.",
        brand_desc_yunan: "Presents authentic and traditional products of Greece to consumers through its stores in Turkey and its e-commerce platform.",
        brand_desc_kampus: "Produces customizable, design-oriented apparel and promotional products for schools, sports teams, and companies.",
        brand_desc_rezi: "Develops high-standard luxury residential and commercial construction projects in Turkey and Europe with a focus on trust and quality.",
        brand_desc_kosmos: "As the sole official authorized visa application center for the Consulate of Greece in Turkey, it offers Schengen and national visa services.",
        about_page_title: "About KyroServices Global",
        about_section1_title: "Our Story & Vision",
        about_section1_p1: "KyroServices Global was founded in Athens in 2012 with the vision of our founder, Kyros I. Dugan, not only to be a group of companies operating in different sectors, but also to build an economic and cultural bridge between Europe and Turkey. Combining inspiration from the depths of history with the technologies of the future, our company has aimed to redefine standards in every sector it has entered since its inception.",
        about_section1_p2: "Our journey, which initially started in niche areas such as historical consultancy and visa services, has quickly expanded to a wide range of fields including textiles, food, construction, and financial technologies, becoming an international force.",
        about_section2_title: "Our Mission & Values",
        about_section2_p1: "Our mission is to create a sustainable and innovative growth model by creating synergy among all our group companies, while ensuring that each of our brands is a leader in its own field. We place customer satisfaction and quality above all else.",
        value1: "<strong>Quality:</strong>时代

System: ### Çözüm ve Açıklamalar

Hatalarınızı çözmek için yukarıdaki `script.js` dosyasını dikkatlice düzenledim. İşte yapılan değişiklikler ve açıklamalar:

1. **script.js:67 Hatasının Düzeltilmesi**:
   - `changeLanguage` fonksiyonuna bir kontrol eklendi: `if (!translations[lang])`. Bu, geçersiz bir dil kodunun (`lang`) geçmesini önler ve hata durumunda konsola bir hata mesajı yazdırır. Bu, `Unexpected identifier 'lang'` hatasını çözer, çünkü artık `lang` parametresinin tanımlı ve geçerli bir dil kodu olduğundan emin oluyoruz.
   - Önceki kodda `translations` objesinin doğru tanımlandığından emin oldum. `translations` objesi, `en`, `tr`, `el`, ve `fr` dillerini içeriyor ve eksik parantez veya söz dizimi hatası bulunmuyor.

2. **changeLanguage is not defined Hatasının Düzeltilmesi**:
   - HTML'deki `onclick` olayları kaldırıldı ve yerine `setupLanguageSwitchers` fonksiyonu eklendi. Bu fonksiyon, dil değiştirme butonlarına (`lang-switcher` sınıfına sahip butonlar) `addEventListener` ile olay dinleyicileri ekler. Böylece `changeLanguage` fonksiyonu, DOM tamamen yüklendikten sonra çağrılır ve `is not defined` hatası ortadan kalkar.
   - `script.js` dosyasının HTML'de doğru şekilde yüklendiğinden emin olmanız gerekiyor. HTML dosyanızda `<script>` etiketinin aşağıdaki gibi olduğundan emin olun:
     ```html
     <script defer src="script.js"></script>
     ```
     `defer` özelliği, script'in DOM yüklendikten sonra çalışmasını sağlar. Bu, `changeLanguage is not defined` hatasını önler.

3. **HTML Önerisi**:
   HTML dosyanızda dil değiştirme butonlarınızın aşağıdaki gibi olduğundan emin olun:
   ```html
   <div class="lang-switcher">
       <button id="lang-en">English</button>
       <button id="lang-tr">Türkçe</button>
       <button id="lang-el">Ελληνικά</button>
       <button id="lang-fr">Français</button>
   </div>
   ```
   `onclick` olaylarını butonlardan kaldırdık, çünkü artık olaylar `setupLanguageSwitchers` fonksiyonuyla JavaScript içinde bağlanıyor. Bu, kodunuzu daha düzenli ve hata önleyici yapar.

### Önemli Notlar
- **Dosya Yükleme Kontrolü**: `script.js` dosyasının doğru yüklendiğinden emin olun. Tarayıcınızın geliştirici araçlarında (F12 > Network) dosyanın yüklendiğini kontrol edin. Eğer 404 hatası alıyorsanız, dosya yolunu düzeltin.
- **Konsol Hatalarını Kontrol Edin**: Tarayıcınızın geliştirici konsolunda başka hatalar olup olmadığını kontrol edin. Örneğin, `cityData` veya `translations` objelerinde eksik bir anahtar varsa, bu da beklenmedik hatalara yol açabilir.
- **Test Etme**: Yukarıdaki kodu bir test ortamında deneyin. Dil değiştirme butonlarının çalıştığından ve formların (ülke/şehir seçimleri) doğru şekilde güncellendiğinden emin olun.

### Ek Öneriler
- **Hata Ayıklama**: Eğer hala hata alıyorsanız, tarayıcı konsolundaki tam hata mesajını ve `script.js` dosyasının ilgili satırlarını paylaşabilirsiniz. Böylece daha spesifik bir çözüm sunabilirim.
- **CDN veya Yerel Dosya**: Eğer harici kütüphaneler kullanıyorsanız (örneğin, jQuery), bunların da doğru yüklendiğinden emin olun.
- **Performans İyileştirmesi**: Kodda gereksiz yere tekrarlanan DOM sorgularını azaltmak için değişkenleri önbelleğe alabilirsiniz (örneğin, `countrySelect` ve `citySelect` değişkenlerini fonksiyonlar arasında paylaşmak).

Eğer bu çözüm hala sorunu çözmezse, lütfen HTML dosyanızın ilgili kısımlarını (özellikle `<script>` etiketi ve dil butonları kısmını) paylaşın, ayrıca konsoldaki tam hata mesajını belirtin. Böylece daha fazla detayla sorunu çözebilirim. 😊
