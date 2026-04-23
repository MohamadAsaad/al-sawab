/**
 * ================================================================
 *  شركة الصواب للمعايرة والخدمات الفنية
 *  Navbar Component - مكون النافبار المستقل
 * ================================================================
 *  طريقة الاستخدام - Usage:
 *  أضف هذا السطر في أي صفحة قبل إغلاق </body>:
 *  <script src="assets/js/navbar.js"></script>
 * ================================================================
 */

(function () {
    'use strict';

    /* ─────────────────────────────────────────────────────────────────
       تحديد الصفحة الحالية - Detect active page
    ───────────────────────────────────────────────────────────────── */
    function getActivePage() {
        const file = window.location.pathname.split('/').pop() || 'index.html';
        if (!file || file === 'index.html') return 'home';
        if (file === 'about.html') return 'about';
        if (file === 'services.html') return 'services';
        if (file === 'contact.html') return 'contact';
        return '';
    }

    /* ─────────────────────────────────────────────────────────────────
       أنماط CSS - Styles
    ───────────────────────────────────────────────────────────────── */
    const CSS = `
        /* ════════════════════════════════════════════════
           SAWAB NAVBAR COMPONENT STYLES
           يعمل مستقلاً أو يرث المتغيرات من الصفحة
        ════════════════════════════════════════════════ */

        .sawab-navbar {
            /* متغيرات محلية تورث من الصفحة أو تستخدم قيماً افتراضية */
            --nb-primary:       var(--primary,       #0D2B3E);
            --nb-primary-light: var(--primary-light,  #16405B);
            --nb-gold:          var(--gold,           #C8A45D);
            --nb-gold-light:    var(--gold-light,     #D4B678);
            --nb-gold-dark:     var(--gold-dark,      #A68645);
            --nb-white:         var(--white,          #FFFFFF);
            --nb-gray-100:      var(--gray-100,       #F3F4F6);
            --nb-gray-200:      var(--gray-200,       #E5E7EB);
            --nb-ease:          cubic-bezier(0.4, 0, 0.2, 1);

            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1050;
            background: rgba(255, 255, 255, 0.97);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--nb-gray-200);
            box-shadow: 0 2px 8px rgba(13, 43, 62, 0.06);
            transition: all 0.3s var(--nb-ease);
            font-family: 'Tajawal', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        body {
            padding-top: 80px;
        }

        html {
            scroll-padding-top: 80px;
        }

        /* تأثير التمرير */
        .sawab-navbar.nb-scrolled {
            background: rgba(255, 255, 255, 0.99);
            box-shadow: 0 4px 24px rgba(13, 43, 62, 0.12);
        }

        /* خط ذهبي سفلي يظهر عند التمرير */
        .sawab-navbar::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0; left: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--nb-gold), transparent);
            opacity: 0;
            transition: opacity 0.4s var(--nb-ease);
        }
        .sawab-navbar.nb-scrolled::after { opacity: 1; }

        /* الحاوية الداخلية */
        .sawab-navbar .nb-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 80px;
            transition: height 0.3s var(--nb-ease);
        }
        .sawab-navbar.nb-scrolled .nb-container { height: 66px; }

        /* ── الشعار والاسم ── */
        .nb-brand {
            display: flex;
            align-items: center;
            gap: 0.875rem;
            text-decoration: none !important;
            flex-shrink: 0;
            position: relative;
        }

        .nb-logo-wrap {
            position: relative;
            width: 52px;
            height: 52px;
            flex-shrink: 0;
            transition: transform 0.3s var(--nb-ease);
        }
        .nb-brand:hover .nb-logo-wrap { transform: scale(1.05); }

        .nb-logo-wrap img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 12px;
            border: 2px solid var(--nb-gold);
            background: var(--nb-white);
            padding: 4px;
            box-shadow: 0 2px 8px rgba(200, 164, 93, 0.22);
            transition: box-shadow 0.3s var(--nb-ease);
        }
        .nb-brand:hover .nb-logo-wrap img {
            box-shadow: 0 6px 20px rgba(200, 164, 93, 0.45);
        }

        /* حلقة ذهبية عند التحويم */
        .nb-logo-ring {
            position: absolute;
            inset: -5px;
            border-radius: 16px;
            border: 2px solid var(--nb-gold);
            opacity: 0;
            transform: scale(1.1);
            transition: all 0.35s var(--nb-ease);
        }
        .nb-brand:hover .nb-logo-ring {
            opacity: 0.6;
            transform: scale(1);
        }

        .nb-brand-text {
            display: flex;
            flex-direction: column;
            line-height: 1;
            gap: 3px;
        }
        .nb-brand-name {
            font-size: 1.15rem;
            font-weight: 800;
            color: var(--nb-primary);
            letter-spacing: -0.01em;
            transition: color 0.2s;
        }
        .nb-brand:hover .nb-brand-name { color: var(--nb-primary-light); }

        .nb-brand-sub {
            font-size: 0.68rem;
            font-weight: 500;
            color: var(--nb-gold);
            letter-spacing: 0.01em;
        }

        /* ── الفاصل الرأسي ── */
        .nb-divider {
            width: 1px;
            height: 40px;
            background: linear-gradient(to bottom, transparent, var(--nb-gray-200), transparent);
            margin: 0 1rem;
            flex-shrink: 0;
        }

        /* ── منطقة الروابط ── */
        .nb-right {
            display: flex;
            align-items: center;
            flex: 1;
        }

        /* ── قائمة الروابط ── */
        .nb-links {
            display: flex;
            align-items: center;
            gap: 0.125rem;
            list-style: none;
            margin: 0;
            margin-inline-start: 2rem;
            padding: 0;
            flex: 1;
        }

        .nb-links li a {
            position: relative;
            display: inline-block;
            padding: 0.5rem 0.9rem;
            font-size: 0.93rem;
            font-weight: 600;
            color: var(--nb-primary);
            text-decoration: none !important;
            border-radius: 8px;
            white-space: nowrap;
            transition: all 0.22s var(--nb-ease);
        }

        /* خط ذهبي سفلي للتحويم */
        .nb-links li a::after {
            content: '';
            position: absolute;
            bottom: 4px;
            right: 0.9rem;
            left: 0.9rem;
            height: 2px;
            background: var(--nb-gold);
            border-radius: 9999px;
            transform: scaleX(0);
            transition: transform 0.28s var(--nb-ease);
        }
        .nb-links li a:hover,
        .nb-links li a.nb-active {
            color: var(--nb-gold);
            background: rgba(200, 164, 93, 0.08);
        }
        .nb-links li a:hover::after,
        .nb-links li a.nb-active::after { transform: scaleX(1); }

        /* ── زر اتصل بنا ── */
        .nb-cta {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: linear-gradient(135deg, var(--nb-gold) 0%, var(--nb-gold-dark) 100%);
            color: var(--nb-white) !important;
            font-family: 'Tajawal', sans-serif;
            font-weight: 700;
            font-size: 0.9rem;
            padding: 0.55rem 1.3rem;
            border-radius: 9999px;
            text-decoration: none !important;
            box-shadow: 0 6px 18px rgba(200, 164, 93, 0.3);
            transition: all 0.3s var(--nb-ease);
            white-space: nowrap;
            margin-right: 0.5rem;
        }
        .nb-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 28px rgba(200, 164, 93, 0.45);
            color: var(--nb-white) !important;
        }
        .nb-cta.nb-active {
            transform: translateY(-1px);
        }

        /* ── زر الهامبرجر (موبايل) ── */
        .nb-hamburger {
            display: none;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 42px;
            height: 42px;
            cursor: pointer;
            padding: 9px;
            border-radius: 10px;
            border: 1.5px solid var(--nb-gray-200);
            background: transparent;
            transition: all 0.22s var(--nb-ease);
        }
        .nb-hamburger:hover {
            background: var(--nb-gray-100);
            border-color: var(--nb-gold);
        }
        .nb-hamburger span {
            display: block;
            width: 100%;
            height: 2px;
            background: var(--nb-primary);
            border-radius: 2px;
            transition: all 0.3s var(--nb-ease);
            transform-origin: center;
        }
        .nb-hamburger.nb-open span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
            background: var(--nb-gold);
        }
        .nb-hamburger.nb-open span:nth-child(2) {
            opacity: 0;
            transform: scaleX(0);
        }
        .nb-hamburger.nb-open span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
            background: var(--nb-gold);
        }

        /* ════════════════════
           الموبايل
        ════════════════════ */
        @media (max-width: 991px) {
            .nb-hamburger { display: flex; }
            .nb-divider   { display: none; }

            .nb-right {
                display: none;
                position: absolute;
                top: 100%;
                right: 0; left: 0;
                background: var(--nb-white);
                box-shadow: 0 16px 40px rgba(13, 43, 62, 0.15);
                padding: 1rem 1.25rem 1.5rem;
                flex-direction: column;
                align-items: stretch;
                gap: 0.375rem;
                border-top: 3px solid var(--nb-gold);
                z-index: 1000;
                animation: nbSlideDown 0.25s var(--nb-ease);
            }
            @keyframes nbSlideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to   { opacity: 1; transform: translateY(0); }
            }

            .nb-right.nb-open { display: flex; }

            .nb-links {
                flex-direction: column;
                align-items: stretch;
                gap: 0.25rem;
            }
            .nb-links li { width: 100%; }
            .nb-links li a {
                display: block;
                padding: 0.75rem 1rem;
                font-size: 1rem;
                border-radius: 8px;
            }
            .nb-links li a::after { display: none; }
            .nb-links li a:hover,
            .nb-links li a.nb-active {
                background: rgba(200, 164, 93, 0.1);
            }
            .nb-cta {
                margin-right: 0;
                margin-top: 0.5rem;
                justify-content: center;
                padding: 0.75rem 1.5rem;
                font-size: 0.95rem;
            }
        }

        @media (max-width: 575px) {
            .nb-brand-name { font-size: 1rem; }
            .nb-logo-wrap  { width: 44px; height: 44px; }
            .nb-brand-sub  { font-size: 0.62rem; }
            .sawab-navbar .nb-container { padding: 0 1rem; }
        }
    `;

    /* ─────────────────────────────────────────────────────────────────
       بناء HTML  - Build navbar HTML
    ───────────────────────────────────────────────────────────────── */
    function buildHTML(active) {
        const link = (id, href, label) =>
            `<li><a href="${href}"${active === id ? ' class="nb-active"' : ''}>${label}</a></li>`;

        return `
<nav class="sawab-navbar" id="sawabNav" role="navigation" aria-label="القائمة الرئيسية">
    <div class="nb-container">

        <!-- الشعار -->
        <a href="index.html" class="nb-brand" aria-label="شركة الصواب - الصفحة الرئيسية">
            <div class="nb-logo-wrap">
                <span class="nb-logo-ring" aria-hidden="true"></span>
                <img src="Logo.png" alt="شعار شركة الصواب" loading="eager" width="52" height="52">
            </div>
            <div class="nb-brand-text">
                <span class="nb-brand-name">شركة الصواب</span>
                <span class="nb-brand-sub"> لخدمات الجودة والمعايرة </span>
            </div>
        </a>

        <div class="nb-divider" aria-hidden="true"></div>

        <!-- الروابط + زر الاتصال -->
        <div class="nb-right" id="nbRight" role="menubar">
            <ul class="nb-links" aria-label="روابط التنقل">
                ${link('home', 'index.html', 'الرئيسية')}
                ${link('services', 'services.html', 'خدماتنا')}
                ${link('about', 'about.html', 'من نحن')}
            </ul>
            <a href="contact.html" class="nb-cta${active === 'contact' ? ' nb-active' : ''}" id="navContactBtn">
                <i class="fas fa-phone-alt" aria-hidden="true"></i>
                <span>اتصل بنا</span>
            </a>
        </div>

        <!-- زر الموبايل -->
        <button class="nb-hamburger" id="nbHamburger"
                aria-controls="nbRight"
                aria-expanded="false"
                aria-label="فتح/إغلاق القائمة">
            <span></span>
            <span></span>
            <span></span>
        </button>

    </div>
</nav>`;
    }

    /* ─────────────────────────────────────────────────────────────────
       تهيئة السلوك التفاعلي - Initialize behavior
    ───────────────────────────────────────────────────────────────── */
    function init() {
        const nav = document.getElementById('sawabNav');
        const btn = document.getElementById('nbHamburger');
        const menu = document.getElementById('nbRight');

        if (!nav || !btn || !menu) return;

        /* تأثير التمرير */
        const onScroll = () => nav.classList.toggle('nb-scrolled', window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // تطبيق فوري

        /* تبديل قائمة الموبايل */
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = menu.classList.toggle('nb-open');
            btn.classList.toggle('nb-open', isOpen);
            btn.setAttribute('aria-expanded', String(isOpen));
        });

        /* إغلاق عند النقر خارج النافبار */
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target)) {
                menu.classList.remove('nb-open');
                btn.classList.remove('nb-open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });

        /* إغلاق عند اختيار رابط (موبايل) */
        menu.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                menu.classList.remove('nb-open');
                btn.classList.remove('nb-open');
                btn.setAttribute('aria-expanded', 'false');
            });
        });

        /* إغلاق بمفتاح Escape */
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                menu.classList.remove('nb-open');
                btn.classList.remove('nb-open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ─────────────────────────────────────────────────────────────────
       تحميل المكون - Mount
    ───────────────────────────────────────────────────────────────── */
    function mount() {
        /* حقن CSS */
        if (!document.getElementById('sawab-navbar-css')) {
            const style = document.createElement('style');
            style.id = 'sawab-navbar-css';
            style.textContent = CSS;
            document.head.appendChild(style);
        }

        /* حقن HTML في بداية body */
        const active = getActivePage();
        document.body.insertAdjacentHTML('afterbegin', buildHTML(active));

        /* تفعيل السلوك */
        init();
    }

    /* تشغيل عند جاهزية DOM */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }

})();
