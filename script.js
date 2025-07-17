// --- script.js ---
document.addEventListener('DOMContentLoaded', () => {
    // Dil değiştirme ve animasyon fonksiyonlarını tüm sayfalarda çalıştır
    initializePage();

    // Sadece randevu formunun olduğu sayfada çalışacak kod
    if (document.getElementById('appointmentForm')) {
        initializeForm();
    }
});

function initializePage() {
    // Varsayılan dili ayarla
    changeLanguage('en'); 
    
    // Yılı otomatik güncelle
    if (document.getElementById('year')) {
        document.getElementById('year').textContent = new Date().getFullYear();
    }
    
    // Scroll animasyonunu etkinleştir
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Menü toggle
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const overlayMenu = document.getElementById('overlay-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            overlayMenu.classList.add('open');
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            overlayMenu.classList.remove('open');
        });
    }
}

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// --- DİL VERİLERİ ---
const translations = {
    // EN, TR, EL, FR dilleri için tüm metinler...
    // Bu kısım çok uzun olduğu için bir sonraki kod bloğunda verilecek
};

// --- DİL DEĞİŞTİRME FONKSİYONU ---
function changeLanguage(lang) {
    document.documentElement.lang = lang;
    
    const langButtons = document.querySelectorAll('.lang-switcher button');
    if (langButtons.length > 0) {
        langButtons.forEach(btn => btn.classList.remove('active'));
        document.getElementById(`lang-${lang}`).classList.add('active');
    }

    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            // Placeholder için özel kontrol
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    // Form varsa ve dil değiştiyse şehirleri güncelle
    if (document.getElementById('countrySelect')) {
        updateCityDropdown();
    }
}

// --- FORM İÇİN ÖZEL FONKSİYONLAR ---
const cityData = {
    // Ülke ve şehir verileri...
    // Bu kısım da çok uzun olduğu için bir sonraki kod bloğunda verilecek
};

function initializeForm() {
    const countrySelect = document.getElementById('countrySelect');
    countrySelect.addEventListener('change', updateCityDropdown);
    // İlk yüklemede şehirleri doldur
    updateCityDropdown();
}

function updateCityDropdown() {
    const countrySelect = document.getElementById('countrySelect');
    const citySelect = document.getElementById('citySelect');
    const selectedCountry = countrySelect.value;
    const currentLang = document.documentElement.lang;

    // Şehir menüsünü temizle
    citySelect.innerHTML = '';

    if (cityData[selectedCountry]) {
        const cities = cityData[selectedCountry].cities;
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.code;
            option.textContent = city.name[currentLang];
            citySelect.appendChild(option);
        });
    }
}

// --- DİL VE ŞEHİR VERİLERİNİ EKLE (ÇOK UZUN OLDUĞU İÇİN AYRI) ---
Object.assign(translations, {
    en: {
        // ... Ana sayfa metinleri ...
        slogan: "Power of Europe", aboutTitle: "About Us", aboutParagraph: "Headquartered in Athens, Greece, KyroServices Global is a dynamic parent company operating throughout Europe and Turkey. We manage a diverse portfolio of specialized brands, delivering excellence and innovation across a wide range of industries.", address: "Leoforos Kifisias 123, Marousi, 151 24 Athens, Greece", brandsTitle: "Our Brands & Operations", brand_history: "Kyros and Dimitri History Services🇬🇷 operates with 73 offices in 12 countries.<br>🇩🇪19 🇬🇷12 🇹🇷9 🇫🇷6 🇮🇹5 🇪🇸4 🇬🇧3 🇺🇸3 🇸🇪3 🇨🇭2 🇨🇾2 🇩🇰1<br><strong>NATO Official Partner</strong>", brand_pep: "An electronic money company offering fast, secure, and modern online payment solutions, continuously expanding its global presence.", brand_yunan: "Facilitates the sale of traditional Greek products in the Turkish market, offering a unique platform for customers to enjoy authentic Greek goods.", brand_kampus: "A fashion brand focused on providing trendy and comfortable clothing for young people, especially university students.", brand_rezi: "A real estate and construction brand focusing on high-end residential projects for investors in Turkey and international markets.", brand_kosmos: "The only Greece-authorized visa consultancy company in Turkey, specializing in Greece and Schengen visa services.", opsTurkeyTitle: "Franchise Operations", opsTurkeyParagraph: "2 Burger King branches (Vadi Istanbul, Bodrum) and all Starbucks stores in the Bodrum region are operated by us.", teamTitle: "Our Board of Directors", team_kyros_name: "Kyros I. DUGAN", team_kyros_title: "Founder & Owner", team_alissa_name: "Alissa KIRAKIS", team_alissa_title: "General Director, KyroServices Global", team_gamze_name: "Gamze ÖZDEN", team_gamze_title: "General Director, KyroServices Turkey & Yunandan Gelsin", team_dimitri_name: "Dimitri LYANOS", team_dimitri_title: "General Director, K&D History Services Europe & USA", team_beyza_name: "Beyza ÇİMEN", team_beyza_title: "General Director, K&D History Services Turkey", team_sadio_name: "Mehmet Sadioğlu", team_sadio_title: "General Manager, PeP", team_fatma_name: "Fatma BAYSAN", team_fatma_title: "General Manager, Kosmos Vize", team_fevzi_name: "Fevzi Cem İz", team_fevzi_title: "General Manager, Kampüs Giyim", team_tugce_name: "Müh. Tuğçe SARICA", team_tugce_title: "General Manager, ReziKyros", team_hande_name: "Hande DERİN", team_hande_title: "General Coordinator, Burger King & Starbucks Franchises", strategyTitle: "Our Strategic Vision", strategyParagraph: "Our vision is to foster synergy between our diverse brands, driving innovation and sustainable growth. We are committed to excellence and expanding our global footprint while delivering exceptional value to our clients and partners worldwide.", contactTitle: "Get In Touch", contactSubtitle: "Feel free to reach out for projects and collaborations.", contactButton: "Send an Email",
        // ... Detay sayfası metinleri ...
        menu_home: "Home", menu_kd: "K&D History Services", menu_pep: "PeP", menu_yunan: "Yunandan Gelsin", menu_kampus: "Kampüs Giyim", menu_rezi: "ReziKyros", menu_kosmos: "Kosmos Vize",
        kd_services_title: "Our Services", kd_service1_title: "Historical Consultancy", kd_service1_desc: "Providing strategic insights for governments and corporations based on historical data and trend analysis.", kd_service2_title: "Geopolitical Analysis", kd_service2_desc: "Offering in-depth risk analysis and forecasting for international operations and investments.", kd_service3_title: "Archive Management", kd_service3_desc: "Digitalization and management of governmental and corporate historical archives.",
        form_title: "Request an Appointment", form_name: "Name", form_surname: "Surname", form_email: "Email Address", form_phone: "Phone Number (Optional)", form_country: "Country", form_city: "City", form_submit: "Send Request",
        thank_you_title: "Thank You!", thank_you_text: "Your appointment request has been successfully received. We will contact you as soon as possible.", back_home: "Back to Home"
    },
    tr: {
        // ... Ana sayfa metinleri ...
        slogan: "Avrupa'nın Gücü", aboutTitle: "Hakkımızda", aboutParagraph: "Merkezi Atina, Yunanistan'da bulunan KyroServices Global, tüm Avrupa ve Türkiye'de faaliyet gösteren dinamik bir çatı şirkettir. Çok çeşitli sektörlerde mükemmellik ve yenilik sunarak farklı uzmanlaşmış markalardan oluşan bir portföyü yönetiyoruz.", address: "Leoforos Kifisias 123, Marousi, 151 24 Atina, Yunanistan", brandsTitle: "Markalarımız ve Operasyonlarımız", brand_history: "Kyros and Dimitri History Services🇬🇷 12 ülkede 73 ofisle faaliyet göstermektedir.<br>🇩🇪19 🇬🇷12 🇹🇷9 🇫🇷6 🇮🇹5 🇪🇸4 🇬🇧3 🇺🇸3 🇸🇪3 🇨🇭2 🇨🇾2 🇩🇰1<br><strong>Resmi NATO Partneri</strong>", brand_pep: "Hızlı, güvenli ve modern çevrimiçi ödeme çözümleri sunan ve küresel varlığını sürekli genişleten bir elektronik para şirketi.", brand_yunan: "Geleneksel Yunan ürünlerinin Türkiye pazarında satışını kolaylaştırarak, müşterilerin otantik Yunan lezzetlerinin tadını çıkarması için benzersiz bir platform sunar.", brand_kampus: "Özellikle üniversite öğrencileri başta olmak üzere gençlere yönelik trend ve konforlu giyim ürünleri sunan bir moda markası.", brand_rezi: "Türkiye ve uluslararası pazarlardaki yatırımcılar için yüksek kaliteli konut projelerine odaklanan bir gayrimenkul ve inşaat markası.", brand_kosmos: "Yunanistan ve Schengen vize hizmetlerinde uzmanlaşmış, Türkiye'deki tek Yunanistan yetkili vize danışmanlık şirketi.", opsTurkeyTitle: "Franchise Operasyonları", opsTurkeyParagraph: "2 Burger King (Vadi İstanbul, Bodrum) şubesi ve Bodrum bölgesindeki tüm Starbucks mağazaları tarafımızca işletilmektedir.", teamTitle: "Yönetim Kurulu", team_kyros_name: "Kyros I. DUGAN", team_kyros_title: "Kurucu Sahip", team_alissa_name: "Alissa KIRAKIS", team_alissa_title: "KyroServices Global Genel Direktörü", team_gamze_name: "Gamze ÖZDEN", team_gamze_title: "KyroServices Türkiye & Yunandan Gelsin Genel Direktörü", team_dimitri_name: "Dimitri LYANOS", team_dimitri_title: "K&D History Services Avrupa & ABD Genel Direktörü", team_beyza_name: "Beyza ÇİMEN", team_beyza_title: "K&D History Services Türkiye Genel Direktörü", team_sadio_name: "Mehmet Sadioğlu", team_sadio_title: "PeP Genel Müdürü", team_fatma_name: "Fatma BAYSAN", team_fatma_title: "Kosmos Vize Genel Müdürü", team_fevzi_name: "Fevzi Cem İz", team_fevzi_title: "Kampüs Giyim Genel Müdürü", team_tugce_name: "Müh. Tuğçe SARICA", team_tugce_title: "ReziKyros Genel Müdürü", team_hande_name: "Hande DERİN", team_hande_title: "Burger King & Starbucks Franchise Gn. Koordinatörü", strategyTitle: "Stratejik Vizyonumuz", strategyParagraph: "Vizyonumuz, farklı markalarımız arasında sinerji yaratarak inovasyonu ve sürdürülebilir büyümeyi teşvik etmektir. Müşterilerimize ve ortaklarımıza dünya çapında olağanüstü değer sunarken, mükemmelliğe ve küresel ayak izimizi genişletmeye kararlıyız.", contactTitle: "Bize Ulaşın", contactSubtitle: "Projeleriniz ve iş birlikleriniz için bize ulaşmaktan çekinmeyin.", contactButton: "E-Posta Gönderin",
        // ... Detay sayfası metinleri ...
        menu_home: "Ana Sayfa", menu_kd: "K&D History Services", menu_pep: "PeP", menu_yunan: "Yunandan Gelsin", menu_kampus: "Kampüs Giyim", menu_rezi: "ReziKyros", menu_kosmos: "Kosmos Vize",
        kd_services_title: "Hizmetlerimiz", kd_service1_title: "Tarihsel Danışmanlık", kd_service1_desc: "Tarihsel verilere ve trend analizlerine dayanarak hükümetler ve şirketler için stratejik öngörüler sağlama.", kd_service2_title: "Jeopolitik Analiz", kd_service2_desc: "Uluslararası operasyonlar ve yatırımlar için derinlemesine risk analizi ve tahminler sunma.", kd_service3_title: "Arşiv Yönetimi", kd_service3_desc: "Hükümet ve şirketlerin tarihsel arşivlerinin dijitalleştirilmesi ve yönetimi.",
        form_title: "Randevu Talep Edin", form_name: "Ad", form_surname: "Soyad", form_email: "E-posta Adresi", form_phone: "Telefon Numarası (İsteğe Bağlı)", form_country: "Ülke", form_city: "Şehir", form_submit: "Talebi Gönder",
        thank_you_title: "Teşekkür Ederiz!", thank_you_text: "Randevu talebiniz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.", back_home: "Ana Sayfaya Dön"
    },
    el: {
        // ... Yunanca çeviriler ...
        slogan: "Η Δύναμη της Ευρώπης", aboutTitle: "Σχετικά με εμάς", aboutParagraph: "Με έδρα την Αθήνα, Ελλάδα, η KyrosServices Global είναι μια δυναμική μητρική εταιρεία που δραστηριοποιείται σε όλη την Ευρώπη και την Τουρκία. Διαχειριζόμαστε ένα ποικίλο χαρτοφυλάκιο εξειδικευμένων εμπορικών σημάτων, προσφέροντας αριστεία και καινοτομία σε ένα ευρύ φάσμα κλάδων.", address: "Λεωφόρος Κηφισίας 123, Μαρούσι, 151 24 Αθήνα, Ελλάδα", brandsTitle: "Οι Μάρκες & οι Δραστηριότητές μας", brand_history: "Η Kyros and Dimitri History Services🇬🇷 λειτουργεί με 73 γραφεία σε 12 χώρες.<br>🇩🇪19 🇬🇷12 🇹🇷9 🇫🇷6 🇮🇹5 🇪🇸4 🇬🇧3 🇺🇸3 🇸🇪3 🇨🇭2 🇨🇾2 🇩🇰1<br><strong>Επίσημος Εταίρος του ΝΑΤΟ</strong>", brand_pep: "Μια εταιρεία ηλεκτρονικού χρήματος που προσφέρει γρήγορες, ασφαλείς και σύγχρονες λύσεις ηλεκτρονικών πληρωμών, επεκτείνοντας συνεχώς την παγκόσμια παρουσία της.", brand_yunan: "Διευκολύνει την πώληση παραδοσιακών ελληνικών προϊόντων στην τουρκική αγορά, προσφέροντας μια μοναδική πλατφόρμα για τους πελάτες να απολαύσουν αυθεντικά ελληνικά αγαθά.", brand_kampus: "Μια μάρκα μόδας που εστιάζει στην παροχή μοντέρνων και άνετων ρούχων για νέους, ειδικά φοιτητές πανεπιστημίου.", brand_rezi: "Μια μάρκα ακινήτων και κατασκευών που εστιάζει σε πολυτελή οικιστικά έργα για επενδυτές στην Τουρκία και τις διεθνείς αγορές.", brand_kosmos: "Η μόνη εξουσιοδοτημένη από την Ελλάδα εταιρεία συμβούλων για βίζες στην Τουρκία, που ειδικεύεται στις υπηρεσίες βίζας για την Ελλάδα και τη Σένγκεν.", opsTurkeyTitle: "Δραστηριότητες Franchise", opsTurkeyParagraph: "2 υποκαταστήματα Burger King (Vadi Istanbul, Bodrum) και όλα τα καταστήματα Starbucks στην περιοχή της Αλικαρνασσού λειτουργούν υπό τη διαχείρισή μας.", teamTitle: "Το Διοικητικό μας Συμβούλιο", team_kyros_name: "Kyros I. DUGAN", team_kyros_title: "Ιδρυτής & Ιδιοκτήτης", team_alissa_name: "Alissa KIRAKIS", team_alissa_title: "Γενική Διευθύντρια, KyroServices Global", team_gamze_name: "Gamze ÖZDEN", team_gamze_title: "Γενική Διευθύντρια, KyroServices Turkey & Yunandan Gelsin", team_dimitri_name: "Dimitri LYANOS", team_dimitri_title: "Γενικός Διευθυντής, K&D History Services Ευρώπης & ΗΠΑ", team_beyza_name: "Beyza ÇİMEN", team_beyza_title: "Γενική Διευθύντρια, K&D History Services Τουρκίας", team_sadio_name: "Mehmet Sadioğlu", team_sadio_title: "Γενικός Διευθυντής, PeP", team_fatma_name: "Fatma BAYSAN", team_fatma_title: "Γενική Διευθύντρια, Kosmos Vize", team_fevzi_name: "Fevzi Cem İz", team_fevzi_title: "Γενικός Διευθυντής, Kampüs Giyim", team_tugce_name: "Müh. Tuğçe SARICA", team_tugce_title: "Γενική Διευθύντρια, ReziKyros", team_hande_name: "Hande DERİN", team_hande_title: "Γενική Συντονίστρια, Burger King & Starbucks Franchises", strategyTitle: "Το Στρατηγικό μας Όραμα", strategyParagraph: "Το όραμά μας είναι να προωθήσουμε τη συνέργεια μεταξύ των διαφόρων εμπορικών σημάτων μας, οδηγώντας στην καινοτομία και τη βιώσιμη ανάπτυξη. Δεσμευόμαστε στην αριστεία και στην επέκταση του παγκόσμιου αποτυπώματός μας, προσφέροντας εξαιρετική αξία στους πελάτες και τους συνεργάτες μας παγκοσμίως.", contactTitle: "Επικοινωνήστε μαζί μας", contactSubtitle: "Μη διστάσετε να επικοινωνήσετε μαζί μας για έργα και συνεργασίες.", contactButton: "Αποστολή Email",
        menu_home: "Αρχική", menu_kd: "K&D History Services", menu_pep: "PeP", menu_yunan: "Yunandan Gelsin", menu_kampus: "Kampüs Giyim", menu_rezi: "ReziKyros", menu_kosmos: "Kosmos Vize",
        kd_services_title: "Οι Υπηρεσίες μας", kd_service1_title: "Ιστορική Συμβουλευτική", kd_service1_desc: "Παροχή στρατηγικών γνώσεων σε κυβερνήσεις και εταιρείες βάσει ιστορικών δεδομένων και ανάλυσης τάσεων.", kd_service2_title: "Γεωπολιτική Ανάλυση", kd_service2_desc: "Προσφορά εις βάθος ανάλυσης κινδύνου και προβλέψεων για διεθνείς επιχειρήσεις και επενδύσεις.", kd_service3_title: "Διαχείριση Αρχείων", kd_service3_desc: "Ψηφιοποίηση και διαχείριση κυβερνητικών και εταιρικών ιστορικών αρχείων.",
        form_title: "Αίτηση Ραντεβού", form_name: "Όνομα", form_surname: "Επώνυμο", form_email: "Διεύθυνση Email", form_phone: "Αριθμός Τηλεφώνου (Προαιρετικό)", form_country: "Χώρα", form_city: "Πόλη", form_submit: "Αποστολή Αιτήματος",
        thank_you_title: "Ευχαριστούμε!", thank_you_text: "Το αίτημά σας για ραντεβού ελήφθη με επιτυχία. Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.", back_home: "Επιστροφή στην Αρχική"
    },
    fr: {
        // ... Fransızca çeviriler ...
        slogan: "La Puissance de l'Europe", aboutTitle: "À propos de nous", aboutParagraph: "Basée à Athènes, en Grèce, KyroServices Global est une société mère dynamique opérant à travers l'Europe et la Turquie. Nous gérons un portefeuille diversifié de marques spécialisées, offrant l'excellence et l'innovation dans un large éventail d'industries.", address: "Leoforos Kifisias 123, Marousi, 151 24 Athènes, Grèce", brandsTitle: "Nos Marques & Opérations", brand_history: "Kyros and Dimitri History Services🇬🇷 opère avec 73 bureaux dans 12 pays.<br>🇩🇪19 🇬🇷12 🇹🇷9 🇫🇷6 🇮🇹5 🇪🇸4 🇬🇧3 🇺🇸3 🇸🇪3 🇨🇭2 🇨🇾2 🇩🇰1<br><strong>Partenaire Officiel de l'OTAN</strong>", brand_pep: "Une société de monnaie électronique offrant des solutions de paiement en ligne rapides, sécurisées et modernes, qui étend continuellement sa présence mondiale.", brand_yunan: "Facilite la vente de produits grecs traditionnels sur le marché turc, offrant une plateforme unique aux clients pour savourer d'authentiques produits grecs.", brand_kampus: "Une marque de mode axée sur la fourniture de vêtements tendance et confortables pour les jeunes, en particulier les étudiants universitaires.", brand_rezi: "Une marque d'immobilier et de construction axée sur des projets résidentiels haut de gamme pour les investisseurs en Turquie et sur les marchés internationaux.", brand_kosmos: "La seule société de conseil en visas autorisée par la Grèce en Turquie, spécialisée dans les services de visas pour la Grèce et l'espace Schengen.", opsTurkeyTitle: "Opérations de Franchise", opsTurkeyParagraph: "2 succursales Burger King (Vadi Istanbul, Bodrum) et tous les magasins Starbucks de la région de Bodrum sont exploités par nos soins.", teamTitle: "Notre Conseil d'Administration", team_kyros_name: "Kyros I. DUGAN", team_kyros_title: "Fondateur & Propriétaire", team_alissa_name: "Alissa KIRAKIS", team_alissa_title: "Directrice Générale, KyroServices Global", team_gamze_name: "Gamze ÖZDEN", team_gamze_title: "Directrice Générale, KyroServices Turquie & Yunandan Gelsin", team_dimitri_name: "Dimitri LYANOS", team_dimitri_title: "Directeur Général, K&D History Services Europe & USA", team_beyza_name: "Beyza ÇİMEN", team_beyza_title: "Directrice Générale, K&D History Services Turquie", team_sadio_name: "Mehmet Sadioğlu", team_sadio_title: "Directeur Général, PeP", team_fatma_name: "Fatma BAYSAN", team_fatma_title: "Directrice Générale, Kosmos Vize", team_fevzi_name: "Fevzi Cem İz", team_fevzi_title: "Directeur Général, Kampüs Giyim", team_tugce_name: "Müh. Tuğçe SARICA", team_tugce_title: "Directrice Générale, ReziKyros", team_hande_name: "Hande DERİN", team_hande_title: "Coordinatrice Générale, Franchises Burger King & Starbucks", strategyTitle: "Notre Vision Stratégique", strategyParagraph: "Notre vision est de favoriser la synergie entre nos diverses marques, en stimulant l'innovation et la croissance durable. Nous nous engageons à l'excellence et à l'expansion de notre empreinte mondiale tout en offrant une valeur exceptionnelle à nos clients et partenaires du monde entier.", contactTitle: "Contactez-nous", contactSubtitle: "N'hésitez pas à nous contacter pour des projets et des collaborations.", contactButton: "Envoyer un e-mail",
        menu_home: "Accueil", menu_kd: "K&D History Services", menu_pep: "PeP", menu_yunan: "Yunandan Gelsin", menu_kampus: "Kampüs Giyim", menu_rezi: "ReziKyros", menu_kosmos: "Kosmos Vize",
        kd_services_title: "Nos Services", kd_service1_title: "Conseil Historique", kd_service1_desc: "Fournir des perspectives stratégiques aux gouvernements et aux entreprises sur la base de données historiques et d'analyses de tendances.", kd_service2_title: "Analyse Géopolitique", kd_service2_desc: "Offrir une analyse des risques et des prévisions approfondies pour les opérations et les investissements internationaux.", kd_service3_title: "Gestion des Archives", kd_service3_desc: "Numérisation et gestion des archives historiques gouvernementales et d'entreprise.",
        form_title: "Demander un Rendez-vous", form_name: "Prénom", form_surname: "Nom", form_email: "Adresse e-mail", form_phone: "Numéro de téléphone (Optionnel)", form_country: "Pays", form_city: "Ville", form_submit: "Envoyer la Demande",
        thank_you_title: "Merci !", thank_you_text: "Votre demande de rendez-vous a été reçue avec succès. Nous vous contacterons dès que possible.", back_home: "Retour à l'accueil"
    }
});

Object.assign(cityData, {
    de: { name: { en: 'Germany', tr: 'Almanya', el: 'Γερμανία', fr: 'Allemagne' }, cities: [ { code: 'ber', name: { en: 'Berlin', tr: 'Berlin', el: 'Βερολίνο', fr: 'Berlin' } }, { code: 'mun', name: { en: 'Munich', tr: 'Münih', el: 'Μόναχο', fr: 'Munich' } }, { code: 'fra', name: { en: 'Frankfurt', tr: 'Frankfurt', el: 'Φρανκφούρτη', fr: 'Francfort' } } ] },
    gr: { name: { en: 'Greece', tr: 'Yunanistan', el: 'Ελλάδα', fr: 'Grèce' }, cities: [ { code: 'ath', name: { en: 'Athens', tr: 'Atina', el: 'Αθήνα', fr: 'Athènes' } }, { code: 'the', name: { en: 'Thessaloniki', tr: 'Selanik', el: 'Θεσσαλονίκη', fr: 'Thessalonique' } } ] },
    tr: { name: { en: 'Turkey', tr: 'Türkiye', el: 'Τουρκία', fr: 'Turquie' }, cities: [ { code: 'ist', name: { en: 'Istanbul', tr: 'İstanbul', el: 'Κωνσταντινούπολη', fr: 'Istanbul' } }, { code: 'ank', name: { en: 'Ankara', tr: 'Ankara', el: 'Άγκυρα', fr: 'Ankara' } }, { code: 'izm', name: { en: 'Izmir', tr: 'İzmir', el: 'Σμύρνη', fr: 'Izmir' } } ] },
    fr: { name: { en: 'France', tr: 'Fransa', el: 'Γαλλία', fr: 'France' }, cities: [ { code: 'par', name: { en: 'Paris', tr: 'Paris', el: 'Παρίσι', fr: 'Paris' } }, { code: 'mar', name: { en: 'Marseille', tr: 'Marsilya', el: 'Μασσαλία', fr: 'Marseille' } } ] },
    it: { name: { en: 'Italy', tr: 'İtalya', el: 'Ιταλία', fr: 'Italie' }, cities: [ { code: 'rom', name: { en: 'Rome', tr: 'Roma', el: 'Ρώμη', fr: 'Rome' } }, { code: 'mil', name: { en: 'Milan', tr: 'Milano', el: 'Μιλάνο', fr: 'Milan' } } ] },
    es: { name: { en: 'Spain', tr: 'İspanya', el: 'Ισπανία', fr: 'Espagne' }, cities: [ { code: 'mad', name: { en: 'Madrid', tr: 'Madrid', el: 'Μαδρίτη', fr: 'Madrid' } }, { code: 'bar', name: { en: 'Barcelona', tr: 'Barselona', el: 'Βαρκελώνη', fr: 'Barcelone' } } ] },
    gb: { name: { en: 'United Kingdom', tr: 'Birleşik Krallık', el: 'Ηνωμένο Βασίλειο', fr: 'Royaume-Uni' }, cities: [ { code: 'lon', name: { en: 'London', tr: 'Londra', el: 'Λονδίνο', fr: 'Londres' } } ] },
    us: { name: { en: 'United States', tr: 'Amerika Birleşik Devletleri', el: 'Ηνωμένες Πολιτείες', fr: 'États-Unis' }, cities: [ { code: 'nyc', name: { en: 'New York', tr: 'New York', el: 'Νέα Υόρκη', fr: 'New York' } }, { code: 'la', name: { en: 'Los Angeles', tr: 'Los Angeles', el: 'Λος Άντζελες', fr: 'Los Angeles' } } ] },
    se: { name: { en: 'Sweden', tr: 'İsveç', el: 'Σουηδία', fr: 'Suède' }, cities: [ { code: 'sto', name: { en: 'Stockholm', tr: 'Stockholm', el: 'Στοκχόλμη', fr: 'Stockholm' } } ] },
    ch: { name: { en: 'Switzerland', tr: 'İsviçre', el: 'Ελβετία', fr: 'Suisse' }, cities: [ { code: 'zur', name: { en: 'Zurich', tr: 'Zürih', el: 'Ζυρίχη', fr: 'Zurich' } }, { code: 'gen', name: { en: 'Geneva', tr: 'Cenevre', el: 'Γενεύη', fr: 'Genève' } } ] },
    cy: { name: { en: 'Cyprus', tr: 'Kıbrıs', el: 'Κύπρος', fr: 'Chypre' }, cities: [ { code: 'nic', name: { en: 'Nicosia', tr: 'Lefkoşa', el: 'Λευκωσία', fr: 'Nicosie' } } ] },
    dk: { name: { en: 'Denmark', tr: 'Danimarka', el: 'Δανία', fr: 'Danemark' }, cities: [ { code: 'cop', name: { en: 'Copenhagen', tr: 'Kopenhag', el: 'Κοπεγχάγη', fr: 'Copenhague' } } ] }
});
