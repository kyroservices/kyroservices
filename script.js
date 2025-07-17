// --- script.js ---
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    if (document.getElementById('appointmentForm')) {
        initializeForm();
    }
});

function initializePage() {
    changeLanguage('en');
    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const overlayMenu = document.getElementById('overlay-menu');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => overlayMenu.classList.add('open'));
    }
    if (closeMenu) {
        closeMenu.addEventListener('click', () => overlayMenu.classList.remove('open'));
    }
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
        const key = el.getAttribute('data-lang');
        const translation = translations[lang]?.[key];
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
        updateCityDropdown();
    }
}

function initializeForm() {
    const countrySelect = document.getElementById('countrySelect');
    populateCountryDropdown();
    updateCityDropdown();
    countrySelect.addEventListener('change', updateCityDropdown);
}

function populateCountryDropdown() {
    const countrySelect = document.getElementById('countrySelect');
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
}

function updateCityDropdown() {
    const countrySelect = document.getElementById('countrySelect');
    const citySelect = document.getElementById('citySelect');
    const selectedCountry = countrySelect.value;
    const currentLang = document.documentElement.lang;
    
    citySelect.innerHTML = '';
    if (cityData[selectedCountry]) {
        cityData[selectedCountry].cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.code;
            option.textContent = city.name[currentLang];
            citySelect.appendChild(option);
        });
    }
}

// --- DİL VE ŞEHİR VERİLERİ ---
const translations = {
    en: {
        slogan: "Power of Europe", aboutTitle: "About Us", aboutParagraph: "Headquartered in Athens, Greece, KyroServices Global is a dynamic parent company operating throughout Europe and Turkey. We manage a diverse portfolio of specialized brands, delivering excellence and innovation across a wide range of industries.", address: "Leoforos Kifisias 123, Marousi, 151 24 Athens, Greece", brandsTitle: "Our Brands & Operations", opsTurkeyTitle: "Franchise Operations", opsTurkeyParagraph: "2 Burger King branches (Vadi Istanbul, Bodrum) and all Starbucks stores in the Bodrum region are operated by us.", teamTitle: "Our Board of Directors", team_kyros_name: "Kyros I. DUGAN", team_kyros_title: "Founder & Owner", team_alissa_name: "Alissa KIRAKIS", team_alissa_title: "General Director, KyroServices Global", team_gamze_name: "Gamze ÖZDEN", team_gamze_title: "General Director, KyroServices Turkey & Yunandan Gelsin", team_dimitri_name: "Dimitri LYANOS", team_dimitri_title: "General Director, K&D History Services Europe & USA", team_beyza_name: "Beyza ÇİMEN", team_beyza_title: "General Director, K&D History Services Turkey", team_sadio_name: "Mehmet Sadioğlu", team_sadio_title: "General Manager, PeP", team_fatma_name: "Fatma BAYSAN", team_fatma_title: "General Manager, Kosmos Vize", team_fevzi_name: "Fevzi Cem İz", team_fevzi_title: "General Manager, Kampüs Giyim", team_tugce_name: "Müh. Tuğçe SARICA", team_tugce_title: "General Manager, ReziKyros", team_hande_name: "Hande DERİN", team_hande_title: "General Coordinator, Burger King & Starbucks Franchises", strategyTitle: "Our Strategic Vision", strategyParagraph: "Our vision is to foster synergy between our diverse brands, driving innovation and sustainable growth. We are committed to excellence and expanding our global footprint while delivering exceptional value to our clients and partners worldwide.", contactTitle: "Get In Touch", contactSubtitle: "Feel free to reach out for projects and collaborations.", contactButton: "Send an Email",
        menu_home: "Home", menu_kd: "K&D History Services",
        kd_presence_title: "Global Presence", kd_presence_text: "Operating with <strong>73 offices in 12 countries</strong>, our reach is a testament to our expertise and trusted partnerships.", kd_partner_title: "NATO Partner", kd_partner_text: "We are proud to be an <strong>Official Partner of NATO</strong>, providing critical historical and geopolitical consultancy.",
        kd_expertise_title: "Our Expertise", kd_service1_title: "Historical Consultancy", kd_service1_desc: "Providing strategic insights for governments and corporations based on historical data and trend analysis.", kd_service2_title: "Geopolitical Analysis", kd_service2_desc: "Offering in-depth risk analysis and forecasting for international operations and investments.", kd_service3_title: "Archive Management", kd_service3_desc: "Digitalization and management of governmental and corporate historical archives.",
        form_title: "Request an Appointment", form_name: "Name", form_surname: "Surname", form_email: "Email Address", form_phone: "Phone Number (Optional)", form_country: "Country of Operation", form_city: "City", form_submit: "Send Request",
        thank_you_title: "Thank You!", thank_you_text: "Your appointment request has been successfully received. We will contact you as soon as possible.", back_home: "Back to Home"
    },
    tr: {
        slogan: "Avrupa'nın Gücü", aboutTitle: "Hakkımızda", aboutParagraph: "Merkezi Atina, Yunanistan'da bulunan KyroServices Global, tüm Avrupa ve Türkiye'de faaliyet gösteren dinamik bir çatı şirkettir. Çok çeşitli sektörlerde mükemmellik ve yenilik sunarak farklı uzmanlaşmış markalardan oluşan bir portföyü yönetiyoruz.", address: "Leoforos Kifisias 123, Marousi, 151 24 Atina, Yunanistan", brandsTitle: "Markalarımız ve Operasyonlarımız", opsTurkeyTitle: "Franchise Operasyonları", opsTurkeyParagraph: "2 Burger King (Vadi İstanbul, Bodrum) şubesi ve Bodrum bölgesindeki tüm Starbucks mağazaları tarafımızca işletilmektedir.", teamTitle: "Yönetim Kurulu", team_kyros_name: "Kyros I. DUGAN", team_kyros_title: "Kurucu Sahip", team_alissa_name: "Alissa KIRAKIS", team_alissa_title: "KyroServices Global Genel Direktörü", team_gamze_name: "Gamze ÖZDEN", team_gamze_title: "KyroServices Türkiye & Yunandan Gelsin Genel Direktörü", team_dimitri_name: "Dimitri LYANOS", team_dimitri_title: "K&D History Services Avrupa & ABD Genel Direktörü", team_beyza_name: "Beyza ÇİMEN", team_beyza_title: "K&D History Services Türkiye Genel Direktörü", team_sadio_name: "Mehmet Sadioğlu", team_sadio_title: "PeP Genel Müdürü", team_fatma_name: "Fatma BAYSAN", team_fatma_title: "Kosmos Vize Genel Müdürü", team_fevzi_name: "Fevzi Cem İz", team_fevzi_title: "Kampüs Giyim Genel Müdürü", team_tugce_name: "Müh. Tuğçe SARICA", team_tugce_title: "ReziKyros Genel Müdürü", team_hande_name: "Hande DERİN", team_hande_title: "Burger King & Starbucks Franchise Gn. Koordinatörü", strategyTitle: "Stratejik Vizyonumuz", strategyParagraph: "Vizyonumuz, farklı markalarımız arasında sinerji yaratarak inovasyonu ve sürdürülebilir büyümeyi teşvik etmektir. Müşterilerimize ve ortaklarımıza dünya çapında olağanüstü değer sunarken, mükemmelliğe ve küresel ayak izimizi genişletmeye kararlıyız.", contactTitle: "Bize Ulaşın", contactSubtitle: "Projeleriniz ve iş birlikleriniz için bize ulaşmaktan çekinmeyin.", contactButton: "E-Posta Gönderin",
        menu_home: "Ana Sayfa", menu_kd: "K&D History Services",
        kd_presence_title: "Global Varlık", kd_presence_text: "<strong>12 ülkede 73 ofis</strong> ile faaliyet gösteren ağımız, uzmanlığımızın ve güvenilir ortaklıklarımızın bir kanıtıdır.", kd_partner_title: "NATO Partneri", kd_partner_text: "Kritik tarihsel ve jeopolitik danışmanlık sağlayan bir <strong>Resmi NATO Partneri</strong> olmaktan gurur duyuyoruz.",
        kd_expertise_title: "Uzmanlık Alanlarımız", kd_service1_title: "Tarihsel Danışmanlık", kd_service1_desc: "Tarihsel verilere ve trend analizlerine dayanarak hükümetler ve şirketler için stratejik öngörüler sağlama.", kd_service2_title: "Jeopolitik Analiz", kd_service2_desc: "Uluslararası operasyonlar ve yatırımlar için derinlemesine risk analizi ve tahminler sunma.", kd_service3_title: "Arşiv Yönetimi", kd_service3_desc: "Hükümet ve şirketlerin tarihsel arşivlerinin dijitalleştirilmesi ve yönetimi.",
        form_title: "Randevu Talep Edin", form_name: "Ad", form_surname: "Soyad", form_email: "E-posta Adresi", form_phone: "Telefon Numarası (İsteğe Bağlı)", form_country: "Operasyon Ülkesi", form_city: "Şehir", form_submit: "Talebi Gönder",
        thank_you_title: "Teşekkür Ederiz!", thank_you_text: "Randevu talebiniz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.", back_home: "Ana Sayfaya Dön"
    },
    el: { /* ... Tüm Yunanca çeviriler buraya ... */ },
    fr: { /* ... Tüm Fransızca çeviriler buraya ... */ }
};

const cityData = {
    de: { name: { en: 'Germany', tr: 'Almanya', el: 'Γερμανία', fr: 'Allemagne' }, cities: [ { code: 'ber', name: { en: 'Berlin', tr: 'Berlin', el: 'Βερολίνο', fr: 'Berlin' } }, { code: 'mun', name: { en: 'Munich', tr: 'Münih', el: 'Μόναχο', fr: 'Munich' } } ] },
    gr: { name: { en: 'Greece', tr: 'Yunanistan', el: 'Ελλάδα', fr: 'Grèce' }, cities: [ { code: 'ath', name: { en: 'Athens', tr: 'Atina', el: 'Αθήνα', fr: 'Athènes' } }, { code: 'the', name: { en: 'Thessaloniki', tr: 'Selanik', el: 'Θεσσαλονίκη', fr: 'Thessalonique' } } ] },
    tr: { name: { en: 'Turkey', tr: 'Türkiye', el: 'Τουρκία', fr: 'Turquie' }, cities: [ { code: 'ist', name: { en: 'Istanbul', tr: 'İstanbul', el: 'Κωνσταντινούπολη', fr: 'Istanbul' } }, { code: 'ank', name: { en: 'Ankara', tr: 'Ankara', el: 'Άγκυρα', fr: 'Ankara' } } ] },
    // ... Diğer tüm ülkeler ve şehirler ...
};
