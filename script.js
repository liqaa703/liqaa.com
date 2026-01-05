/* =======================
   Share Link
======================= */
function shareLink() {
    const url = "https://linktr.ee/liqaa"; // عدله برابطك
    const text = "ضيافة فاخرة لمناسبتك 🌸";

    if (navigator.share) {
        navigator.share({
            title: "LIQAA لقى",
            text: text,
            url: url
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(url).then(() => {
            alert("📋 تم نسخ رابط LIQAA لقى");
        });
    }
}

/* =======================
   Language Switch
======================= */
function setLang(lang) {
    const html = document.documentElement;

    // تثبيت الاتجاه واللغة
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";

    // ترجمة المحتوى بدون تحريك
    document.querySelectorAll("[data-ar]").forEach(el => {
        el.innerHTML = lang === "ar"
            ? el.getAttribute("data-ar")
            : el.getAttribute("data-en");

        // تثبيت المحاذاة دائمًا في المنتصف
        el.style.textAlign = "center";
    });

    // تفعيل زر اللغة المختارة
    document.querySelectorAll(".lang-switch button").forEach(btn => {
        btn.classList.remove("active");
        btn.style.background = "#fff";
        btn.style.color = "#000";
    });

    const activeBtn = document.querySelector(
        `.lang-switch button[data-lang="${lang}"]`
    );

    if (activeBtn) {
        activeBtn.classList.add("active");

        if (lang === "ar") {
            activeBtn.style.background = "#b47434";
            activeBtn.style.color = "#fff";
        } else {
            activeBtn.style.background = "#b47434";
            activeBtn.style.color = "#fff";
        }
    }

    // حفظ اللغة
    localStorage.setItem("lang", lang);
}

/* =======================
   Load Saved Language
======================= */
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "ar";
    setLang(savedLang);
});
/* =======================
   WhatsApp Smart Booking
======================= */
const whatsappNumber = "9665536670934"; // رقمك بدون +

function updateWhatsAppLink(lang) {
    const messageAR = 
`السلام عليكم 🌸
أرغب بالحجز مع *LIQAA لقى*
📍 المدينة:
📅 التاريخ:
👥 عدد الضيوف:`;

    const messageEN =
`Hello 🌸
I would like to book with *LIQAA*
📍 City:
📅 Date:
👥 Guests:`;

    const message = lang === "ar" ? messageAR : messageEN;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const btn = document.getElementById("whatsapp-booking");
    btn.href = url;
    btn.innerHTML = lang === "ar" ? "💬 احجز الآن" : "💬 Book Now";
}

/* ربطه مع اللغة */
const originalSetLang = setLang;
setLang = function(lang) {
    originalSetLang(lang);
    updateWhatsAppLink(lang);
};

/* تحميل أولي */
document.addEventListener("DOMContentLoaded", () => {
    updateWhatsAppLink(localStorage.getItem("lang") || "ar");
});
