// --- script.js ---
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
    if (menuToggle) {
        menuToggle.addEventListener('click', () => overlayMenu.classList.add('open'));
    }
    if (closeMenu) {
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
        updateCityDropdown();
    }
}

function initializeForm() {
    const countrySelect = document.getElementById('countrySelect');
    if(countrySelect){
        populateCountryDropdown();
        updateCityDropdown();
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
}

function updateCityDropdown() {
    const countrySelect = document.getElementById('countrySelect');
    const citySelect = document.getElementById('citySelect');
    if (!countrySelect || !citySelect) return;
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
        slogan: "Power of Europe", aboutTitle: "About Us", aboutParagraph: "Headquartered in Athens, Greece, KyroServices Global is a dynamic parent company operating throughout Europe and Turkey. We manage a diverse portfolio of specialized brands, delivering excellence and innovation across a wide range of industries.", address: "Leoforos Kifisias 123, Marousi, 151 24 Athens, Greece", brandsTitle: "Our Brands & Operations", opsTurkeyTitle: "Franchise Operations", opsTurkeyParagraph: "2 Burger King branches (Vadi Istanbul, Bodrum) and all Starbucks stores in the Bodrum region are operated by us.", teamTitle: "Our Board of Directors", team_kyros_name: "Kyros I. DUGAN", team_kyros_title: "Founder & Owner", team_alissa_name: "Alissa KIRAKIS", team_alissa_title: "General Director, KyroServices Global", team_gamze_name: "Gamze ÖZDEN", team_gamze_title: "General Director, KyroServices Turkey & Yunandan Gelsin", team_dimitri_name: "Dimitri LYANOS", team_dimitri_title: "General Director, K&D History Services Europe & USA", team_beyza_name: "Beyza ÇİMEN", team_beyza_title: "General Director, K&D History Services Turkey", team_sadio_name: "Mehmet Sadioğlu", team_sadio_title: "General Manager, PeP", team_fatma_name: "Fatma BAYSAN", team_fatma_title: "General Manager, Kosmos Vize", team_fevzi_name: "Fevzi Cem İz", team_fevzi_title: "General Manager, Kampüs Giyim", team_tugce_name: "Müh. Tuğçe SARICA", team_tugce_title: "General Manager, ReziKyros", team_hande_name: "Hande DERİN", team_hande_title: "General Coordinator, Burger King & Starbucks Franchises", strategyTitle: "Our Strategic Vision", strategyParagraph: "Our vision is to foster synergy between our diverse brands, driving innovation and sustainable growth. We are committed to excellence and expanding our global footprint while delivering exceptional value to our clients and partners worldwide.", contactTitle: "Get In Touch", contactSubtitle: "Feel free to reach out for projects and collaborations.", contactButton: "Contact Us",
        menu_home: "Home", menu_about: "About Us", menu_team: "Board", menu_brands: "Our Brands", menu_career: "Career", menu_contact: "Contact", menu_kd: "K&D History Services", menu_pep: "PeP", menu_yunan: "Yunandan Gelsin", menu_kampus: "Kampüs Giyim", menu_rezi: "ReziKyros", menu_kosmos: "Kosmos Vize",
        about_page_title: "About KyroServices Global", about_section1_title: "Our Story & Vision", about_section1_p1: "KyroServices Global was founded in Athens in 2012 with the vision of our founder, Kyros I. Dugan, not only to be a group of companies operating in different sectors, but also to build an economic and cultural bridge between Europe and Turkey. Combining inspiration from the depths of history with the technologies of the future, our company has aimed to redefine standards in every sector it has entered since its inception.", about_section1_p2: "Our journey, which initially started in niche areas such as historical consultancy and visa services, has quickly expanded to a wide range of fields including textiles, food, construction, and financial technologies, becoming an international force.", about_section2_title: "Our Mission & Values", about_section2_p1: "Our mission is to create a sustainable and innovative growth model by creating synergy among all our group companies, while ensuring that each of our brands is a leader in its own field. We place customer satisfaction and quality above all else.", value1: "<strong>Quality:</strong> We aim for the highest standards in every product and service we offer.", value2: "<strong>Trust:</strong> We build our relationships with all our stakeholders on transparency and honesty.", value3: "<strong>Innovation:</strong> We challenge the status quo and develop innovative solutions that shape our industries.", value4: "<strong>Global Perspective:</strong> We think and act on a global scale while respecting local values.",
        team_page_title: "Our Board of Directors", team_kyros_bio: "The visionary founder of KyroServices Global, steering the group with a unique perspective that blends historical depth with future-oriented strategies.", team_alissa_bio: "Manages the overall global operations and strategic direction of the group, ensuring synergy and growth across all brands.", team_gamze_bio: "Leads operations in the dynamic Turkish market and also directs the 'Yunandan Gelsin' brand, bridging two cultures.", team_dimitri_bio: "Heads the historical consultancy services across Europe and the USA, providing critical insights to governments and organizations.", team_beyza_bio: "Directs the Turkish operations of K&D History Services, adapting global expertise to the local historical context.", team_sadio_bio: "Leads the innovative financial technology brand PeP, driving its expansion in the digital payment landscape.", team_fatma_bio: "Manages Kosmos Vize, the sole official visa application center for Greece in Turkey, ensuring seamless service.", team_fevzi_bio: "Directs the Kampüs Giyim brand, focusing on providing customized apparel for educational and corporate clients.", team_tugce_bio: "Leads the ReziKyros construction brand, focusing on developing high-quality, reliable real estate projects.", team_hande_bio: "Coordinates the successful operation of the Burger King and Starbucks franchises, maintaining high standards of quality and service.",
        career_page_title: "Career at KyroServices Global", career_section1_title: "Join Our Family", career_section1_p1: "At KyroServices Global, we believe our greatest asset is our people. We foster a supportive, collaborative, and dynamic work environment where every team member is valued and has the opportunity to grow. We are a family that builds success together, celebrating both individual and collective achievements.", career_section2_title: "What We Offer", career_section2_p1: "We provide our employees with a competitive compensation package, comprehensive benefits, and continuous opportunities for professional development. We invest in our team's growth because we know that the success of our company is built on the expertise and passion of our employees.", career_section3_title: "General Application", career_section3_p1: "We are always looking for talented and passionate individuals to join our team. If you believe you have what it takes to contribute to our success, please send your resume to our Human Resources department.",
        contact_page_title: "Contact Us", contact_greece_title: "Global Headquarters (Athens)", contact_turkey_title: "Turkey Headquarters (Istanbul)", contact_form_title: "Send Us a Message",
        kd_presence_title: "Global Presence", kd_presence_text: "Operating with <strong>73 offices in 12 countries</strong>, our reach is a testament to our expertise and trusted partnerships.", kd_partner_title: "NATO Partner", kd_partner_text: "We are proud to be an <strong>Official Partner of NATO</strong>, providing critical historical and geopolitical consultancy.",
        kd_expertise_title: "Our Expertise", kd_service1_title: "Historical Consultancy", kd_service1_desc: "Providing strategic insights for governments and corporations based on historical data and trend analysis.", kd_service2_title: "Geopolitical Analysis", kd_service2_desc: "Offering in-depth risk analysis and forecasting for international operations and investments.", kd_service3_title: "Archive Management", kd_service3_desc: "Digitalization and management of governmental and corporate historical archives.",
        form_title: "Request an Appointment", form_name: "Name", form_surname: "Surname", form_email: "Email Address", form_phone: "Phone Number (Optional)", form_country: "Country of Operation", form_city: "City", form_submit: "Send Request", form_message: "Your Message",
        thank_you_title: "Thank You!", thank_you_text: "Your request has been successfully received. We will contact you as soon as possible.", back_home: "Back to Home",
        page_not_found: "Page Not Found", page_not_found_text: "The page you are looking for might have been removed or is temporarily unavailable.",
        privacy_policy: "Privacy Policy",
    },
    tr: {
        slogan: "Avrupa'nın Gücü", aboutTitle: "Hakkımızda", aboutParagraph: "Merkezi Atina, Yunanistan'da bulunan KyroServices Global, tüm Avrupa ve Türkiye'de faaliyet gösteren dinamik bir çatı şirkettir. Çok çeşitli sektörlerde mükemmellik ve yenilik sunarak farklı uzmanlaşmış markalardan oluşan bir portföyü yönetiyoruz.", address: "Leoforos Kifisias 123, Marousi, 151 24 Atina, Yunanistan", brandsTitle: "Markalarımız ve Operasyonlarımız", opsTurkeyTitle: "Franchise Operasyonları", opsTurkeyParagraph: "2 Burger King (Vadi İstanbul, Bodrum) şubesi ve Bodrum bölgesindeki tüm Starbucks mağazaları tarafımızca işletilmektedir.", teamTitle: "Yönetim Kurulu", team_kyros_name: "Kyros I. DUGAN", team_kyros_title: "Kurucu Sahip", team_alissa_name: "Alissa KIRAKIS", team_alissa_title: "KyroServices Global Genel Direktörü", team_gamze_name: "Gamze ÖZDEN", team_gamze_title: "KyroServices Türkiye & Yunandan Gelsin Genel Direktörü", team_dimitri_name: "Dimitri LYANOS", team_dimitri_title: "K&D History Services Avrupa & ABD Genel Direktörü", team_beyza_name: "Beyza ÇİMEN", team_beyza_title: "K&D History Services Türkiye Genel Direktörü", team_sadio_name: "Mehmet Sadioğlu", team_sadio_title: "PeP Genel Müdürü", team_fatma_name: "Fatma BAYSAN", team_fatma_title: "Kosmos Vize Genel Müdürü", team_fevzi_name: "Fevzi Cem İz", team_fevzi_title: "Kampüs Giyim Genel Müdürü", team_tugce_name: "Müh. Tuğçe SARICA", team_tugce_title: "ReziKyros Genel Müdürü", team_hande_name: "Hande DERİN", team_hande_title: "Burger King & Starbucks Franchise Gn. Koordinatörü", strategyTitle: "Stratejik Vizyonumuz", strategyParagraph: "Vizyonumuz, farklı markalarımız arasında sinerji yaratarak inovasyonu ve sürdürülebilir büyümeyi teşvik etmektir. Müşterilerimize ve ortaklarımıza dünya çapında olağanüstü değer sunarken, mükemmelliğe ve küresel ayak izimizi genişletmeye kararlıyız.", contactTitle: "Bize Ulaşın", contactSubtitle: "Projeleriniz ve iş birlikleriniz için bize ulaşmaktan çekinmeyin.", contactButton: "Bize Ulaşın",
        menu_home: "Ana Sayfa", menu_about: "Hakkımızda", menu_team: "Yönetim", menu_brands: "Markalarımız", menu_career: "Kariyer", menu_contact: "İletişim", menu_kd: "K&D History Services", menu_pep: "PeP", menu_yunan: "Yunandan Gelsin", menu_kampus: "Kampüs Giyim", menu_rezi: "ReziKyros", menu_kosmos: "Kosmos Vize",
        about_page_title: "KyroServices Global Hakkında", about_section1_title: "Hikayemiz ve Vizyonumuz", about_section1_p1: "KyroServices Global, kurucumuz Kyros I. Dugan'ın vizyonuyla, sadece farklı sektörlerde faaliyet gösteren bir şirketler topluluğu olmakla kalmayıp, aynı zamanda Avrupa ve Türkiye arasında ekonomik ve kültürel bir köprü kurma amacıyla 2012 yılında Atina'da kurulmuştur. Tarihin derinliklerinden aldığı ilhamı geleceğin teknolojileriyle birleştiren şirketimiz, en başından beri her girdiği sektörde standartları yeniden belirlemeyi hedeflemiştir.", about_section1_p2: "Başlangıçta tarihsel danışmanlık ve vize hizmetleri gibi niş alanlarda başlayan yolculuğumuz, kısa sürede tekstil, gıda, inşaat ve finansal teknolojiler gibi geniş bir yelpazeye yayılarak uluslararası bir güç haline gelmiştir.", about_section2_title: "Misyonumuz ve Değerlerimiz", about_section2_p1: "Misyonumuz, çatımız altındaki her bir markanın kendi alanında lider olmasını sağlarken, tüm grup şirketleri arasında bir sinerji yaratarak sürdürülebilir ve yenilikçi bir büyüme modeli oluşturmaktır. Müşteri memnuniyetini ve kaliteyi her şeyin üzerinde tutarız.", value1: "<strong>Kalite:</strong> Sunduğumuz her ürün ve hizmette en yüksek standartları hedefleriz.", value2: "<strong>Güven:</strong> Tüm paydaşlarımızla ilişkilerimizi şeffaflık ve dürüstlük üzerine kurarız.", value3: "<strong>İnovasyon:</strong> Statükoya meydan okur, sektörlerimize yön veren yenilikçi çözümler geliştiririz.", value4: "<strong>Global Bakış Açısı:</strong> Yerel değerlere saygı duyarak küresel ölçekte düşünür ve hareket ederiz.",
        team_page_title: "Yönetim Kurulu", team_kyros_bio: "KyroServices Global'in vizyoner kurucusu; grubu, tarihsel derinliği geleceğe yönelik stratejilerle harmanlayan benzersiz bir bakış açısıyla yönetmektedir.", team_alissa_bio: "Grubun genel küresel operasyonlarını ve stratejik yönünü yöneterek tüm markalar arasında sinerji ve büyümeyi sağlar.", team_gamze_bio: "Dinamik Türkiye pazarındaki operasyonları yönetir ve aynı zamanda iki kültür arasında köprü kuran 'Yunandan Gelsin' markasını yönetir.", team_dimitri_bio: "Avrupa ve ABD'deki tarihsel danışmanlık hizmetlerine liderlik ederek hükümetlere ve kuruluşlara kritik bilgiler sunar.", team_beyza_bio: "K&D History Services'in Türkiye operasyonlarını yöneterek küresel uzmanlığı yerel tarihsel bağlama uyarlar.", team_sadio_bio: "Dijital ödeme alanındaki genişlemesini sürdüren yenilikçi finansal teknoloji markası PeP'e liderlik eder.", team_fatma_bio: "Türkiye'deki tek resmi Yunanistan vize başvuru merkezi olan Kosmos Vize'yi yöneterek kusursuz hizmet sağlar.", team_fevzi_bio: "Eğitim ve kurumsal müşterilere özel giyim sağlama odaklı Kampüs Giyim markasını yönetir.", team_tugce_bio: "Yüksek kaliteli, güvenilir gayrimenkul projeleri geliştirmeye odaklanan ReziKyros inşaat markasına liderlik eder.", team_hande_name: "Hande DERİN", team_hande_title: "Burger King & Starbucks franchise'larının başarılı operasyonunu koordine ederek yüksek kalite ve hizmet standartlarını korur.",
        career_page_title: "KyroServices Global'de Kariyer", career_section1_title: "Ailemize Katılın", career_section1_p1: "KyroServices Global'de en büyük değerimiz insan kaynağımızdır. Her ekip üyemizin değer gördüğü ve büyüme fırsatı bulduğu, destekleyici, iş birliğine dayalı ve dinamik bir çalışma ortamı yaratıyoruz. Başarıyı birlikte inşa eden, hem bireysel hem de ortak başarıları kutlayan bir aileyiz.", career_section2_title: "Sunduklarımız", career_section2_p1: "Çalışanlarımıza rekabetçi bir ücretlendirme paketi, kapsamlı yan haklar ve sürekli mesleki gelişim fırsatları sunuyoruz. Ekibimizin gelişimine yatırım yapıyoruz çünkü şirketimizin başarısının, çalışanlarımızın uzmanlığı ve tutkusu üzerine kurulu olduğunu biliyoruz.", career_section3_title: "Genel Başvuru", career_section3_p1: "Ekibimize katılacak yetenekli ve tutkulu kişileri her zaman arıyoruz. Başarımıza katkıda bulunabileceğinize inanıyorsanız, lütfen özgeçmişinizi İnsan Kaynakları departmanımıza gönderin.",
        contact_page_title: "Bize Ulaşın", contact_greece_title: "Global Merkez (Atina)", contact_turkey_title: "Türkiye Genel Müdürlük (İstanbul)", contact_form_title: "Bize Mesaj Gönderin",
        kd_presence_title: "Global Varlık", kd_presence_text: "<strong>12 ülkede 73 ofis</strong> ile faaliyet gösteren ağımız, uzmanlığımızın ve güvenilir ortaklıklarımızın bir kanıtıdır.", kd_partner_title: "NATO Partneri", kd_partner_text: "Kritik tarihsel ve jeopolitik danışmanlık sağlayan bir <strong>Resmi NATO Partneri</strong> olmaktan gurur duyuyoruz.",
        kd_expertise_title: "Uzmanlık Alanlarımız", kd_service1_title: "Tarihsel Danışmanlık", kd_service1_desc: "Tarihsel verilere ve trend analizlerine dayanarak hükümetler ve şirketler için stratejik öngörüler sağlama.", kd_service2_title: "Jeopolitik Analiz", kd_service2_desc: "Uluslararası operasyonlar ve yatırımlar için derinlemesine risk analizi ve tahminler sunma.", kd_service3_title: "Arşiv Yönetimi", kd_service3_desc: "Hükümet ve şirketlerin tarihsel arşivlerinin dijitalleştirilmesi ve yönetimi.",
        form_title: "Randevu Talep Edin", form_name: "Ad", form_surname: "Soyad", form_email: "E-posta Adresi", form_phone: "Telefon Numarası (İsteğe Bağlı)", form_country: "Operasyon Ülkesi", form_city: "Şehir", form_submit: "Talebi Gönder", form_message: "Mesajınız",
        thank_you_title: "Teşekkür Ederiz!", thank_you_text: "Mesajınız başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.", back_home: "Ana Sayfaya Dön",
        page_not_found: "Sayfa Bulunamadı", page_not_found_text: "Aradığınız sayfa kaldırılmış veya geçici olarak kullanılamıyor olabilir.",
        privacy_policy: "Gizlilik Politikası",
    },
    el: { /* Yunanca Çeviriler */ },
    fr: { /* Fransızca Çeviriler */ }
};
