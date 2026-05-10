// ===================================
// VIPFLIX NOVA GERAÇÃO - App Principal (Checkout Direto)
// ES5 compatível - funciona em TODOS os dispositivos
// ===================================
(function() {
    'use strict';

    // ===================================
    // CONFIGURAÇÕES DE CHECKOUT (Autonomia do Dono)
    // ===================================
    var CHECKOUT_LINKS = {
        'AO': 'https://pay.kumbipay.com/79565400-b54d-4133-a082-8a25d70a35f4', // Angola
    };

    var selectedApp = null;

var appsConfig = {
        'netflix': { name: 'Netflix Premium (4K)', devices: ['Smart TV', 'Smartphone', 'Tablet', 'PC', 'Console'] },
        'prime-video': { name: 'Amazon Prime Video', devices: ['Smart TV', 'Smartphone', 'Tablet', 'PC', 'Console'] },
        'disney-plus': { name: 'Disney+', devices: ['Smart TV', 'Smartphone', 'Tablet', 'PC', 'Console'] },
        'hbo-max': { name: 'Max (Antigo HBO Max)', devices: ['Smart TV', 'Smartphone', 'Tablet', 'PC', 'Console'] },
        'youtube-premium': { name: 'YouTube Premium', devices: ['Smart TV', 'Smartphone', 'Tablet', 'PC'] },
        'crunchyroll': { name: 'Crunchyroll Mega Fan', devices: ['Smart TV', 'Smartphone', 'Tablet', 'PC', 'Console'] }
    };

    // ===================================
    // NAVEGAÇÃO E MODAIS
    // ===================================
    function scrollToApps() {
        var sec = document.getElementById('apps-section');
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function selectApp(appId) {
        selectedApp = appId;
        var cfg = appsConfig[appId];
        if (!cfg) return;

        console.log('[APP] Dispositivo selecionado:', cfg.name);

        var appInput = document.getElementById('app-selected');
        if (appInput) appInput.value = appId;

        var modal = document.getElementById('modal-form');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        var m = document.getElementById('modal-form');
        if (m) { m.classList.remove('active'); document.body.style.overflow = ''; }
    }

    // ===================================
    // PROCESSAR PAGAMENTO (REDIRECIONAMENTO)
    // ===================================
    function processPayment(e) {
        if (e && e.preventDefault) e.preventDefault();

        var nomeEl = document.getElementById('nome');
        var whatsEl = document.getElementById('whatsapp');
        var countryEl = document.getElementById('country');

        var nome = nomeEl ? nomeEl.value.trim() : '';
        var whatsapp = whatsEl ? whatsEl.value.trim() : '';
        var country = countryEl ? countryEl.value : '';

        if (!nome || !whatsapp || !country) {
            alert('Por favor, preencha todos os campos e selecione seu país.');
            return false;
        }

        var btn = document.getElementById('btn-submit');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';
        }

        // Tracking seguro de Lead antes de sair da página
        try {
            if (window.VipflixPixel) {
                var appName = selectedApp ? appsConfig[selectedApp].name : 'N/A';
                window.VipflixPixel.trackLead(nome, whatsapp, selectedApp, appName);
                window.VipflixPixel.trackInitiateCheckout(selectedApp, appName);
            }
        } catch (err) { console.warn('Pixel error', err); }

        // Salvar localmente caso o usuário volte
        try {
            localStorage.setItem('vfx_lead', JSON.stringify({nome: nome, whatsapp: whatsapp, country: country}));
        } catch (ex) {}

        // Busca o link com base no país selecionado
        var checkoutUrl = CHECKOUT_LINKS[country];

        if (checkoutUrl) {
            console.log('[APP] Redirecionando para:', checkoutUrl);
            window.location.href = checkoutUrl;
        } else {
            alert('Erro de configuração: Checkout não encontrado para o país selecionado.');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-rocket"></i> <span>IR PARA PAGAMENTO</span>';
            }
        }

        return false;
    }

    // ===================================
    // TABS (Interface visual)
    // ===================================
    function switchTab(btn) {
        var tabs = document.querySelectorAll('.device-tab');
        var panels = document.querySelectorAll('.device-panel');
        for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
        for (var j = 0; j < panels.length; j++) panels[j].classList.remove('active');
        btn.classList.add('active');
        var target = btn.getAttribute('data-target');
        var panel = document.getElementById(target);
        if (panel) panel.classList.add('active');
    }

    // ===================================
    // SCROLL HINT
    // ===================================
    var scrollHint = document.getElementById('ds-scroll-hint');
    if (scrollHint && 'IntersectionObserver' in window) {
        var androidCard = document.querySelector('[data-category="android"]');
        if (androidCard) {
            var obs = new IntersectionObserver(function(entries) {
                if (entries[0].isIntersecting) {
                    scrollHint.style.opacity = '0';
                    scrollHint.style.transition = 'opacity .4s';
                } else {
                    scrollHint.style.opacity = '1';
                }
            }, { threshold: 0.3 });
            obs.observe(androidCard);
        }
    }

    // ===================================
    // MELHORIA PROFISSIONAL: Auto-preenchimento
    // ===================================
    document.addEventListener('DOMContentLoaded', function() {
        try {
            var saved = localStorage.getItem('vfx_lead');
            if (saved) {
                var lead = JSON.parse(saved);
                var n = document.getElementById('nome');
                var w = document.getElementById('whatsapp');
                var c = document.getElementById('country');
                
                if (n && lead.nome) n.value = lead.nome;
                if (w && lead.whatsapp) w.value = lead.whatsapp;
                if (c && lead.country) c.value = lead.country;
                console.log('[APP] Lead recuperada da memória.');
            }
        } catch (e) {}
    });

    // ===================================
    // API PÚBLICA GLOBAL
    // ===================================
    window.VipflixApp = {
        scrollToApps: scrollToApps,
        selectApp: selectApp,
        closeModal: closeModal,
        processPayment: processPayment,
        switchTab: switchTab
    };

    console.log('[APP] VIPFLIX Checkout Direto carregado');
})();