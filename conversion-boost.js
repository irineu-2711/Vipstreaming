// ===================================
// VIPFLIX — CONVERSION BOOST ENGINE
// Countdown, Social Proof, Exit Intent, Floating CTA
// ES5 compatível
// ===================================
(function() {
    'use strict';

    // ===================================
    // 1. COUNTDOWN TIMER — Urgência
    // Reseta a cada 24h (salvo em localStorage)
    // ===================================
    function initCountdown() {
        var KEY = 'vfx_promo_end';
        var saved = null;
        try { saved = localStorage.getItem(KEY); } catch(e) {}

        var endTime;
        if (saved && Number(saved) > Date.now()) {
            endTime = Number(saved);
        } else {
            // Gerar entre 2h e 6h a partir de agora
            var hours = 2 + Math.floor(Math.random() * 4);
            endTime = Date.now() + (hours * 3600000);
            try { localStorage.setItem(KEY, String(endTime)); } catch(e) {}
        }

        var stickyEl = document.getElementById('sticky-countdown');
        var promoEl = document.getElementById('promo-countdown');

        function tick() {
            var diff = endTime - Date.now();
            if (diff <= 0) {
                // Reset timer
                var h = 2 + Math.floor(Math.random() * 4);
                endTime = Date.now() + (h * 3600000);
                try { localStorage.setItem(KEY, String(endTime)); } catch(e) {}
                diff = endTime - Date.now();
            }

            var hrs = Math.floor(diff / 3600000);
            var mins = Math.floor((diff % 3600000) / 60000);
            var secs = Math.floor((diff % 60000) / 1000);

            var str = pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
            if (stickyEl) stickyEl.textContent = str;
            if (promoEl) promoEl.textContent = str;
        }

        function pad(n) { return n < 10 ? '0' + n : String(n); }

        tick();
        setInterval(tick, 1000);
    }

    // ===================================
    // 2. FLOATING CTA — Aparece ao rolar
    // ===================================
    function initFloatingCTA() {
        var floatingEl = document.getElementById('floating-cta');
        if (!floatingEl) return;

        var heroSection = document.getElementById('hero');
        var shown = false;

        function check() {
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
            var heroHeight = heroSection ? heroSection.offsetHeight : 400;

            if (scrollY > heroHeight * 0.7 && !shown) {
                floatingEl.classList.add('visible');
                shown = true;
            } else if (scrollY < heroHeight * 0.3 && shown) {
                floatingEl.classList.remove('visible');
                shown = false;
            }
        }

        window.addEventListener('scroll', check, { passive: true });
        check();
    }

    // ===================================
    // 3. SOCIAL PROOF — Notificações fake
    // ===================================
    function initSocialProof() {
        var container = document.getElementById('social-proof-popup');
        if (!container) return;

var nomes = [
            'Mateus', 'Ana', 'Domingos', 'Esperança', 'Mauro', 'Catarina', 'Adilson',
            'Fátima', 'Rui', 'Neusa', 'Nelson', 'Isabel', 'Hélder', 'Nair', 'Manuel',
            'Teresa', 'Paulo', 'Joana', 'Ailson', 'Cátia', 'Augusto', 'Maria', 'João',
            'Luísa', 'Pedro'
        ];
        var cidades = [
            'Luanda', 'Benguela', 'Huambo', 'Lubango', 'Cabinda', 'Lobito',
            'Viana', 'Talatona', 'Malanje', 'Namibe', 'Kilamba', 'Saurimo',
            'Kuito', 'Sumbe', 'Cazenga'
        ];
        var acoes = [
            'acabou de comprar o acesso',
            'pagou e já está a assistir',
            'ativou o plano VIP',
            'desbloqueou o acesso agora'
        ];
        var tempos = [
            'agora mesmo', 'há 1 min', 'há 2 min', 'há 3 min', 'há 5 min'
        ];

        var index = 0;

        function show() {
            var nome = nomes[Math.floor(Math.random() * nomes.length)];
            var cidade = cidades[Math.floor(Math.random() * cidades.length)];
            var acao = acoes[Math.floor(Math.random() * acoes.length)];
            var tempo = tempos[Math.floor(Math.random() * tempos.length)];

            var html = '<div class="sp-notification">' +
                '<div class="sp-icon"><i class="fas fa-check"></i></div>' +
                '<div class="sp-text">' +
                    '<strong>' + nome + '</strong> de ' + cidade + ' ' + acao +
                    '<span class="sp-time">' + tempo + '</span>' +
                '</div>' +
            '</div>';

            container.innerHTML = html;

            // Remover após 5s
            setTimeout(function() {
                container.innerHTML = '';
            }, 5000);

            index++;
        }

        // Primeira notificação após 8-15 segundos
        var firstDelay = 8000 + Math.floor(Math.random() * 7000);
        setTimeout(function() {
            show();
            // Depois a cada 20-40 segundos
            setInterval(function() {
                show();
            }, 20000 + Math.floor(Math.random() * 20000));
        }, firstDelay);
    }

    // ===================================
    // 4. EXIT INTENT — Desktop: mouse sai do topo
    //                  Mobile: scroll rápido pra cima / back button
    // ===================================
    function initExitIntent() {
        var popup = document.getElementById('exit-popup');
        if (!popup) return;

        var shown = false;
        var KEY = 'vfx_exit_shown';

        // Não mostrar se já mostrou nesta sessão
        try {
            if (sessionStorage.getItem(KEY)) return;
        } catch(e) {}

        function showPopup() {
            if (shown) return;
            shown = true;
            try { sessionStorage.setItem(KEY, '1'); } catch(e) {}
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Analytics
            try { if (window.VipflixAnalytics) window.VipflixAnalytics.trackCustom('exit_intent_shown', {}); } catch(e) {}
        }

        // Desktop: mouse leaves viewport from top
        if (window.innerWidth >= 768) {
            document.addEventListener('mouseout', function(e) {
                if (!e.relatedTarget && e.clientY < 5) {
                    // Wait 5 seconds before enabling (don't trigger immediately)
                    if (Date.now() - pageLoadTime > 5000) {
                        showPopup();
                    }
                }
            });
        }

        // Mobile: detect back button (history)
        if (window.innerWidth < 768) {
            // Após 30 segundos sem interação no mobile, mostrar
            var mobileTimer = setTimeout(function() {
                var scrollY = window.pageYOffset || document.documentElement.scrollTop;
                // Só mostrar se ainda está no topo (não rolou muito)
                if (scrollY < 300) {
                    showPopup();
                }
            }, 30000);

            // Cancelar timer se interagiu
            var interacted = false;
            document.addEventListener('click', function() {
                if (!interacted) {
                    interacted = true;
                    clearTimeout(mobileTimer);
                }
            }, { once: true });
        }

        // Close popup restores scroll
        popup.addEventListener('click', function(e) {
            if (e.target === popup || e.target.classList.contains('exit-popup-overlay')) {
                popup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Also close on ESC
        document.addEventListener('keydown', function(e) {
            if ((e.key === 'Escape' || e.keyCode === 27) && popup.classList.contains('active')) {
                popup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===================================
    // 5. VISITOR COUNTER — Fake "ao vivo"
    // ===================================
    function initVisitorCount() {
        var badge = document.querySelector('.urgency-badge');
        if (!badge) return;

        // Atualizar "testes restantes" de forma dinâmica
        var remaining = document.getElementById('remaining-tests');
        if (remaining) {
            var count = 3 + Math.floor(Math.random() * 8);
            remaining.textContent = String(count);

            // Diminuir a cada 30-60s
            setInterval(function() {
                count = Math.max(2, count - 1);
                remaining.textContent = String(count);
                // Replenish sometimes
                if (count <= 2) {
                    setTimeout(function() {
                        count = 5 + Math.floor(Math.random() * 5);
                        remaining.textContent = String(count);
                    }, 15000);
                }
            }, 30000 + Math.floor(Math.random() * 30000));
        }
    }

    // ===================================
    // BOOT
    // ===================================
    var pageLoadTime = Date.now();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    function boot() {
        initCountdown();
        initFloatingCTA();
        initSocialProof();
        initExitIntent();
        initVisitorCount();
        console.log('[BOOST] Conversion boost engine loaded');
    }
})();
