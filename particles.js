// ===================================
// VIPFLIX NOVA GERAÇÃO - Partículas Animadas
// ES5 compatível - sem class, sem arrow functions
// ===================================
(function() {
    'use strict';

    var canvas = document.getElementById('particles-canvas');
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var COUNT = 40;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        for (var i = 0; i < COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2.5 + 0.8,
                vx: Math.random() * 0.4 - 0.2,
                vy: Math.random() * 0.4 - 0.2,
                alpha: Math.random() * 0.4 + 0.15
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];

            // Desenhar ponto
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(212, 168, 67, ' + p.alpha + ')';
            ctx.fill();

            // Conectar com partículas próximas
            for (var j = i + 1; j < particles.length; j++) {
                var q = particles[j];
                var dx = p.x - q.x;
                var dy = p.y - q.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(212, 168, 67, ' + (0.06 * (1 - dist / 120)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }
        }
    }

    function update() {
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        }
    }

    function animate() {
        draw();
        update();
        requestAnimationFrame(animate);
    }

    function init() {
        resize();
        createParticles();
        animate();
        window.addEventListener('resize', function() {
            resize();
            createParticles();
        });
        console.log('[PARTICLES] Inicializado');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
