// ===================================
// VIPFLIX NOVA GERAÇÃO - Carrossel Infinito
// ES5 compatível - Touch/Swipe + Auto-scroll
// ===================================
(function() {
    'use strict';

    var SPEED = 0.7;
    var TOUCH_MULT = 1.2;

    function initTrack(wrap) {
        var track = wrap.querySelector('.carousel-track');
        if (!track) return;

        var items = track.children;
        if (!items.length) return;

        // Salvar contagem ANTES de clonar
        var origCount = items.length;

        // Clonar itens 2x para loop infinito
        var origHTML = track.innerHTML;
        track.innerHTML = origHTML + origHTML + origHTML;

        // Recalcular após clone
        var firstItem = track.children[0];
        var style = window.getComputedStyle ? window.getComputedStyle(track) : track.currentStyle;
        var gap = parseInt(style.gap || style.columnGap || '10', 10) || 10;
        var itemW = firstItem.offsetWidth + gap;
        var setW = origCount * itemW;

        var dir = track.getAttribute('data-direction') === 'left' ? 1 : -1;
        var pos = -setW;
        var dragging = false;
        var startX = 0;
        var dragStart = 0;
        var lastX = 0;
        var vel = 0;
        var paused = false;
        var rafId = null;

        track.style.transform = 'translateX(' + pos + 'px)';

        function loop() {
            if (!dragging && !paused) {
                pos += SPEED * dir;
                if (pos <= -setW * 2) pos += setW;
                else if (pos >= 0) pos -= setW;
                track.style.transform = 'translateX(' + pos + 'px)';
            }
            rafId = requestAnimationFrame(loop);
        }
        rafId = requestAnimationFrame(loop);

        function wrapPos() {
            if (pos <= -setW * 2) { pos += setW; dragStart += setW; }
            else if (pos >= 0) { pos -= setW; dragStart -= setW; }
        }

        // Touch/mouse desabilitado — só auto-scroll
        // Permite scroll vertical normal sem interferência
        wrap.style.pointerEvents = 'none';

        // Pause quando fora da tela
        if (typeof IntersectionObserver !== 'undefined') {
            var obs = new IntersectionObserver(function(entries) {
                paused = !entries[0].isIntersecting;
            }, { threshold: 0.1 });
            obs.observe(wrap);
        }
    }

    function init() {
        var wraps = document.querySelectorAll('.carousel-wrap');
        for (var i = 0; i < wraps.length; i++) {
            initTrack(wraps[i]);
        }
        console.log('[CAROUSEL] Inicializado (' + wraps.length + ' faixas)');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
