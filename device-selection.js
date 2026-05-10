// ===================================
// VIPFLIX — DEVICE SELECTION PREMIUM
// ES5 compatível
// ===================================
(function() {
    'use strict';

    // ===================================
    // APP DATABASE — all apps with full detail
    // ===================================
var categories = {
        'smart-tv': {
            title: 'Smart TV',
            subtitle: 'Escolha o streaming para sua TV',
            icon: 'fas fa-tv',
            apps: [
                {
                    id: 'netflix',
                    name: 'Netflix Premium 4K',
                    image: 'assets/apps/netflix.jpg',
                    badge: 'MAIS VENDIDO',
                    badgeType: 'gold',
                    shortDesc: 'Acesso Premium 4K na sua TV',
                    devices: ['Samsung', 'LG', 'Roku', 'Android TV'],
                    steps: [
                        'Selecione o plano Netflix e finalize o pagamento',
                        'Receba o acesso imediato no seu WhatsApp',
                        'Faça login na sua TV e assista'
                    ],
                    warning: null,
                    videoUrl: null
                },
                {
                    id: 'prime-video',
                    name: 'Amazon Prime Video',
                    image: 'assets/apps/Amazon Prime Video.png', // Ajustado para o nome real na pasta
                    badge: null,
                    badgeType: null,
                    shortDesc: 'Séries exclusivas e filmes',
                    devices: ['Samsung', 'LG', 'Roku', 'Android TV'],
                    steps: [
                        'Confirme o seu plano Prime Video',
                        'Receba a conta ativada no WhatsApp',
                        'Faça login e comece a assistir'
                    ],
                    warning: null,
                    videoUrl: null
                },
                {
                    id: 'disney-plus',
                    name: 'Disney+ / Star+',
                    image: 'assets/apps/disney-plus.webp', // Ajustado para o nome real na pasta
                    badge: 'FAMÍLIA',
                    badgeType: 'gold',
                    shortDesc: 'O melhor para a família na TV',
                    devices: ['Samsung', 'LG', 'Roku', 'Android TV'],
                    steps: [
                        'Faça o pagamento da assinatura',
                        'Receba o perfil configurado no WhatsApp',
                        'Acesse na sua TV e aproveite'
                    ],
                    warning: null,
                    videoUrl: null
                },
                {
                    id: 'hbo-max',
                    name: 'Max (Antigo HBO)',
                    image: 'assets/apps/max.webp', // Ajustado para o nome real na pasta
                    badge: null,
                    badgeType: null,
                    shortDesc: 'Champions League e grandes sucessos',
                    devices: ['Samsung', 'LG', 'Roku', 'Android TV'],
                    steps: [
                        'Garanta a sua assinatura Max',
                        'Receba os dados de acesso de forma segura',
                        'Assista na sua Smart TV'
                    ],
                    warning: null,
                    videoUrl: null
                },
                {
                    id: 'youtube-premium',
                    name: 'YouTube Premium',
                    image: 'assets/apps/youtube.png',
                    badge: 'SEM ANÚNCIOS',
                    badgeType: 'gold',
                    shortDesc: 'Vídeos e músicas sem interrupções',
                    devices: ['Samsung', 'LG', 'Android TV', 'Roku'],
                    steps: [
                        'Assine o plano conosco',
                        'Ativamos na sua conta ou enviamos uma nova',
                        'Faça login na TV e assista sem anúncios'
                    ],
                    warning: null,
                    videoUrl: null
                }
            ]
        },
        'android': {
            title: 'Android',
            subtitle: 'Apps para Celular e TV Box',
            icon: 'fab fa-android',
            apps: [
                {
                    id: 'netflix',
                    name: 'Netflix Premium 4K',
                    image: 'assets/apps/netflix.jpg',
                    badge: 'MAIS VENDIDO',
                    badgeType: 'gold',
                    shortDesc: 'Acesso Premium 4K',
                    devices: ['Smartphone', 'Tablet', 'TV Box'],
                    steps: [
                        'Baixe o app oficial na Play Store',
                        'Receba seu acesso no WhatsApp após o pagamento',
                        'Faça login e assista'
                    ],
                    warning: null,
                    videoUrl: null
                },
                {
                    id: 'prime-video',
                    name: 'Amazon Prime Video',
                    image: 'assets/apps/Amazon Prime Video.png', // Ajustado
                    badge: null,
                    badgeType: null,
                    shortDesc: 'Séries exclusivas e filmes',
                    devices: ['Smartphone', 'Tablet', 'TV Box'],
                    steps: [
                        'Baixe o app Prime Video no seu Android',
                        'Receba a conta ativada no WhatsApp',
                        'Faça login e assista'
                    ],
                    warning: null,
                    videoUrl: null
                },
                {
                    id: 'disney-plus',
                    name: 'Disney+ / Star+',
                    image: 'assets/apps/disney-plus.webp', // Ajustado
                    badge: 'FAMÍLIA',
                    badgeType: 'gold',
                    shortDesc: 'Marvel e Pixar no seu Android',
                    devices: ['Smartphone', 'Tablet', 'TV Box'],
                    steps: [
                        'Baixe o app Disney+ na Play Store',
                        'Receba o perfil configurado no WhatsApp',
                        'Acesse e aproveite'
                    ],
                    warning: null,
                    videoUrl: null
                },
                {
                    id: 'hbo-max',
                    name: 'Max (Antigo HBO)',
                    image: 'assets/apps/max.webp', // Ajustado
                    badge: null,
                    badgeType: null,
                    shortDesc: 'Champions League no celular',
                    devices: ['Smartphone', 'Tablet', 'TV Box'],
                    steps: [
                        'Baixe o app Max na Play Store',
                        'Receba os dados de acesso de forma segura',
                        'Assista onde estiver'
                    ],
                    warning: null,
                    videoUrl: null
                },
                {
                    id: 'youtube-premium',
                    name: 'YouTube Premium',
                    image: 'assets/apps/youtube.png',
                    badge: 'SEM ANÚNCIOS',
                    badgeType: 'gold',
                    shortDesc: 'Vídeos em segundo plano e sem anúncios',
                    devices: ['Smartphone', 'Tablet', 'TV Box'],
                    steps: [
                        'Assine o plano conosco',
                        'Ativamos na sua conta ou enviamos uma nova',
                        'Diga adeus aos anúncios no Android'
                    ],
                    warning: null,
                    videoUrl: null
                }
            ]
        },
        'ios': {
            title: 'iPhone / iPad',
            subtitle: 'Streaming para dispositivos Apple',
            icon: 'fab fa-apple',
            apps: [
                {
                    id: 'netflix',
                    name: 'Netflix Premium 4K',
                    image: 'assets/apps/netflix.jpg',
                    badge: 'MAIS VENDIDO',
                    badgeType: 'gold',
                    shortDesc: 'Acesso Premium 4K',
                    devices: ['iPhone', 'iPad', 'Apple TV'],
                    steps: [
                        'Baixe o app na App Store',
                        'Receba seu acesso no WhatsApp',
                        'Faça login e assista'
                    ],
                    warning: null,
                    videoUrl: null
                },
                {
                    id: 'prime-video',
                    name: 'Amazon Prime Video',
                    image: 'assets/apps/Amazon Prime Video.png', // Ajustado
                    badge: null,
                    badgeType: null,
                    shortDesc: 'Séries exclusivas e filmes',
                    devices: ['iPhone', 'iPad', 'Apple TV'],
                    steps: [
                        'Baixe o app Prime Video na App Store',
                        'Receba a conta ativada no WhatsApp',
                        'Faça login e assista'
                    ],
                    warning: null,
                    videoUrl: null
                },
                {
                    id: 'disney-plus',
                    name: 'Disney+ / Star+',
                    image: 'assets/apps/disney-plus.webp', // Ajustado
                    badge: 'FAMÍLIA',
                    badgeType: 'gold',
                    shortDesc: 'Marvel, Star Wars e Pixar no iOS',
                    devices: ['iPhone', 'iPad', 'Apple TV'],
                    steps: [
                        'Baixe o app Disney+ na App Store',
                        'Receba o perfil configurado no WhatsApp',
                        'Acesse e aproveite'
                    ],
                    warning: null,
                    videoUrl: null
                },
                {
                    id: 'hbo-max',
                    name: 'Max (Antigo HBO)',
                    image: 'assets/apps/max.webp', // Ajustado
                    badge: null,
                    badgeType: null,
                    shortDesc: 'Champions League no iPhone',
                    devices: ['iPhone', 'iPad', 'Apple TV'],
                    steps: [
                        'Baixe o app Max na App Store',
                        'Receba os dados de acesso de forma segura',
                        'Assista onde estiver'
                    ],
                    warning: null,
                    videoUrl: null
                },
                {
                    id: 'youtube-premium',
                    name: 'YouTube Premium',
                    image: 'assets/apps/youtube.png',
                    badge: 'SEM ANÚNCIOS',
                    badgeType: 'gold',
                    shortDesc: 'Assista sem interrupções e em segundo plano',
                    devices: ['iPhone', 'iPad', 'Apple TV'],
                    steps: [
                        'Baixe o app do YouTube na App Store',
                        'Receba a ativação no WhatsApp',
                        'Aproveite as funções premium no seu iOS'
                    ],
                    warning: null,
                    videoUrl: null
                }
            ]
        }
    };

    var currentCategory = null;
    var currentAppId = null;
    var confirmedAppId = null;

    // ===================================
    // OPEN CATEGORY MODAL
    // ===================================
    function openCategory(catId) {
        var cat = categories[catId];
        if (!cat) return;
        currentCategory = catId;

        // Update header
        var iconEl = document.querySelector('.ds-modal-cat-icon');
        if (iconEl) {
            var iconHtml = '';
            if (catId === 'smart-tv') {
                iconHtml = '<img src="icones/icone smart tvs.png" alt="Smart TV" class="ds-modal-cat-icon-img">';
            } else if (catId === 'android') {
                iconHtml = '<img src="icones/icone dispositivos android.png" alt="Android" class="ds-modal-cat-icon-img">';
            } else if (catId === 'ios') {
                iconHtml = '<img src="icones/icone ios.png" alt="iOS" class="ds-modal-cat-icon-img">';
            } else {
                iconHtml = '<i class="' + cat.icon + '"></i>';
            }
            iconEl.innerHTML = iconHtml;
        }

        var titleEl = document.getElementById('ds-modal-cat-title');
        if (titleEl) titleEl.textContent = cat.title;

        var subEl = document.getElementById('ds-modal-cat-sub');
        if (subEl) subEl.textContent = cat.subtitle;

        // Build app cards
        var container = document.getElementById('ds-modal-apps');
        if (!container) return;
        var html = '';

        for (var i = 0; i < cat.apps.length; i++) {
            var app = cat.apps[i];
            var badgeHtml = '';
            if (app.badge) {
                var badgeCls = app.badgeType === 'gold' ? 'ds-app-card-badge' : 'ds-app-card-badge ds-app-card-badge-alt';
                badgeHtml = '<span class="' + badgeCls + '">' + app.badge + '</span>';
            }

            html += '<div class="ds-app-card" onclick="VipflixDevice.openDetail(\'' + app.id + '\')">' +
                '<img class="ds-app-card-img" src="' + app.image + '" alt="' + app.name + '" loading="lazy">' +
                '<div class="ds-app-card-info">' +
                    '<h4>' + app.name + '</h4>' +
                    '<p>' + app.shortDesc + '</p>' +
                '</div>' +
                badgeHtml +
                '<i class="fas fa-chevron-right ds-app-card-chevron"></i>' +
            '</div>';
        }

        container.innerHTML = html;

        // Show modal
        var modal = document.getElementById('ds-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // ===================================
    // CLOSE CATEGORY MODAL
    // ===================================
    function closeModal() {
        var modal = document.getElementById('ds-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ===================================
    // OPEN APP DETAIL MODAL
    // ===================================
    function openDetail(appId) {
        var app = findApp(appId);
        if (!app) return;
        currentAppId = appId;

        // Close category modal first
        closeModal();

        // Fill detail modal
        var imgEl = document.getElementById('ds-detail-img');
        if (imgEl) { imgEl.src = app.image; imgEl.alt = app.name; }

        var nameEl = document.getElementById('ds-detail-name');
        if (nameEl) nameEl.textContent = app.name;

        // Badges (devices)
        var badgesEl = document.getElementById('ds-detail-badges');
        if (badgesEl) {
            var bhtml = '';
            for (var i = 0; i < app.devices.length; i++) {
                bhtml += '<span>' + app.devices[i] + '</span>';
            }
            badgesEl.innerHTML = bhtml;
        }

        // Compatibility list
        var compatEl = document.getElementById('ds-detail-compat');
        if (compatEl) {
            var chtml = '';
            for (var j = 0; j < app.devices.length; j++) {
                chtml += '<span><i class="fas fa-check"></i> ' + app.devices[j] + '</span>';
            }
            compatEl.innerHTML = chtml;
        }

        // Steps
        var stepsEl = document.getElementById('ds-detail-steps-list');
        if (stepsEl) {
            var shtml = '';
            for (var k = 0; k < app.steps.length; k++) {
                shtml += '<li>' + app.steps[k] + '</li>';
            }
            stepsEl.innerHTML = shtml;
        }

        // Warning
        var warnEl = document.getElementById('ds-detail-warning');
        var warnTextEl = document.getElementById('ds-detail-warning-text');
        if (warnEl && warnTextEl) {
            if (app.warning) {
                warnTextEl.textContent = app.warning;
                warnEl.style.display = 'flex';
            } else {
                warnEl.style.display = 'none';
            }
        }

        // Show detail modal
        var detailModal = document.getElementById('ds-detail-modal');
        if (detailModal) {
            detailModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Ativar áudio automaticamente quando vídeo começar
            setTimeout(function() {
                var video = videoArea.querySelector('video');
                if (video) {
                    // Debug: verificar se vídeo carregou
                    video.addEventListener('loadeddata', function() {
                        console.log('Vídeo carregado:', this.src);
                    });
                    
                    // Detectar se vídeo está com tela preta (sem dimensões)
                    video.addEventListener('loadedmetadata', function() {
                        var self = this;
                        setTimeout(function() {
                            if (self.videoWidth === 0 || self.videoHeight === 0) {
                                console.warn('Vídeo sem dimensões, tentando recarregar...');
                                self.load();
                            }
                        }, 500);
                    });
                    
                    video.addEventListener('error', function(e) {
                        console.error('Erro ao carregar vídeo:', this.src, e);
                        // Mostrar link para download/visualização direta
                        var videoUrl = this.querySelector('source') ? this.querySelector('source').src : this.src;
                        videoArea.innerHTML = '<div class="ds-video-placeholder">' +
                            '<i class="fas fa-video"></i>' +
                            '<span style="margin-bottom: 10px;">Vídeo não compatível com este navegador</span>' +
                            '<a href="' + videoUrl + '" target="_blank" style="color: #D4A843; text-decoration: underline; font-size: 0.85rem;">Clique aqui para assistir em nova aba</a>' +
                        '</div>';
                    });
                    
                    // Quando o vídeo começar a tocar, ativar o som
                    video.addEventListener('playing', function() {
                        this.muted = false;
                        console.log('Vídeo tocando com som');
                    }, { once: true });
                    
                    // Também permitir que o usuário clique para ativar som
                    video.addEventListener('click', function() {
                        this.muted = false;
                    });
                    
                    // Forçar load do vídeo
                    video.load();
                }
            }, 100);
        }
    }

    // ===================================
    // CLOSE DETAIL MODAL
    // ===================================
    function closeDetail() {
        var modal = document.getElementById('ds-detail-modal');
        if (modal) {
            modal.classList.remove('active');
            
            // Parar vídeo quando fechar modal
            var video = modal.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        }

        // Reopen category modal
        if (currentCategory) {
            openCategory(currentCategory);
        }
    }

    // ===================================
    // CONFIRM APP CHOICE
    // ===================================
    function confirmApp() {
        if (!currentAppId) return;
        var app = findApp(currentAppId);
        if (!app) return;

        confirmedAppId = currentAppId;

        // Save to session
        try {
            sessionStorage.setItem('vfx_device_choice', JSON.stringify({
                appId: currentAppId,
                appName: app.name,
                category: currentCategory,
                timestamp: Date.now()
            }));
        } catch (e) {}

        // Close all modals
        var detailModal = document.getElementById('ds-detail-modal');
        if (detailModal) detailModal.classList.remove('active');

        var catModal = document.getElementById('ds-modal');
        if (catModal) catModal.classList.remove('active');

        document.body.style.overflow = '';

        // Show confirmed banner
        var grid = document.querySelector('.ds-grid');
        if (grid) grid.style.display = 'none';

        var confirmed = document.getElementById('ds-confirmed');
        if (confirmed) confirmed.style.display = 'block';

        var confirmedName = document.getElementById('ds-confirmed-name');
        if (confirmedName) {
            var catTitle = categories[currentCategory] ? categories[currentCategory].title : '';
            confirmedName.textContent = app.name + ' — ' + catTitle;
        }

        // Set the app in the original VipflixApp system
        if (window.VipflixApp && typeof window.VipflixApp.selectApp === 'function') {
            // Don't open form modal yet — just set the selectedApp internally
        }

        // Scroll to confirmed banner
        if (confirmed) {
            confirmed.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Show mobile fixed bar
        showMobileBar();
    }

    // ===================================
    // GO TO FORM (trigger selectApp which opens the form modal)
    // ===================================
    function goToForm() {
        if (!confirmedAppId) return;

        // Call the original selectApp which opens the form modal
        if (window.VipflixApp && typeof window.VipflixApp.selectApp === 'function') {
            window.VipflixApp.selectApp(confirmedAppId);
        }

        // Hide mobile bar
        hideMobileBar();
    }

    // ===================================
    // RESET CHOICE
    // ===================================
    function resetChoice() {
        confirmedAppId = null;
        currentAppId = null;
        currentCategory = null;

        try { sessionStorage.removeItem('vfx_device_choice'); } catch (e) {}

        // Show grid, hide confirmed
        var grid = document.querySelector('.ds-grid');
        if (grid) grid.style.display = '';

        var confirmed = document.getElementById('ds-confirmed');
        if (confirmed) confirmed.style.display = 'none';

        hideMobileBar();

        // Scroll to section
        var sec = document.getElementById('apps-section');
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ===================================
    // MOBILE FIXED BAR
    // ===================================
function showMobileBar() {
        var bar = document.getElementById('ds-mobile-bar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'ds-mobile-bar';
            bar.className = 'ds-mobile-fixed-bar';
            // Mudança brutal: De 'Teste Grátis' para 'ASSINAR AGORA'
            bar.innerHTML = '<button class="ds-btn-generate" onclick="VipflixDevice.goToForm()" style="background: linear-gradient(135deg, #22c55e, #16a34a); box-shadow: 0 0 15px rgba(34,197,94,0.4);">' +
                '<i class="fas fa-shopping-cart"></i> ASSINAR AGORA</button>';
            document.body.appendChild(bar);
        }
        if (window.innerWidth < 768) {
            bar.classList.add('active');
        }
    }

    function hideMobileBar() {
        var bar = document.getElementById('ds-mobile-bar');
        if (bar) bar.classList.remove('active');
    }

    // ===================================
    // FIND APP BY ID
    // ===================================
    function findApp(appId) {
        var keys = Object.keys(categories);
        for (var i = 0; i < keys.length; i++) {
            var apps = categories[keys[i]].apps;
            for (var j = 0; j < apps.length; j++) {
                if (apps[j].id === appId) return apps[j];
            }
        }
        return null;
    }

    // ===================================
    // RESTORE SESSION (if user already chose)
    // ===================================
    function restoreSession() {
        try {
            var saved = sessionStorage.getItem('vfx_device_choice');
            if (!saved) return;
            var data = JSON.parse(saved);
            if (!data || !data.appId) return;

            // Check if less than 1 hour old
            if (Date.now() - data.timestamp > 3600000) {
                sessionStorage.removeItem('vfx_device_choice');
                return;
            }

            var app = findApp(data.appId);
            if (!app) return;

            currentCategory = data.category;
            currentAppId = data.appId;
            confirmedAppId = data.appId;

            // Show confirmed state
            var grid = document.querySelector('.ds-grid');
            if (grid) grid.style.display = 'none';

            var confirmed = document.getElementById('ds-confirmed');
            if (confirmed) confirmed.style.display = 'block';

            var confirmedName = document.getElementById('ds-confirmed-name');
            if (confirmedName) {
                var catTitle = categories[data.category] ? categories[data.category].title : '';
                confirmedName.textContent = app.name + ' — ' + catTitle;
            }
        } catch (e) {}
    }

    // ===================================
    // INIT — Intersection Observer for scroll animations INCRÍVEIS
    // ===================================
    function initAnimations() {
        if (!('IntersectionObserver' in window)) return;

        var cards = document.querySelectorAll('.ds-card');
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.opacity = '0';
            cards[i].style.transform = 'scale(0.7) rotateY(-15deg) translateY(50px)';
            cards[i].style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            cards[i].style.transitionDelay = (i * 0.15) + 's';
        }

        var observer = new IntersectionObserver(function(entries) {
            for (var j = 0; j < entries.length; j++) {
                if (entries[j].isIntersecting) {
                    var card = entries[j].target;
                    
                    // Animação de entrada dramática
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) rotateY(0deg) translateY(0)';
                    
                    // Zoom sequencial UM POR VEZ dentro do card
                    setTimeout(function(c) {
                        var compatText = c.querySelector('.ds-card-compat');
                        if (compatText) {
                            // Separar os dispositivos por vírgula
                            var text = compatText.textContent;
                            var devices = text.split(',');
                            
                            // Iniciar animação sequencial UM POR VEZ
                            animateDevicesSequentially(compatText, devices, 0);
                        }
                    }, 800, card);
                    
                    // Adicionar glow pulsante no hover
                    card.addEventListener('mouseenter', function() {
                        this.style.transform = 'scale(1.05) translateY(-8px)';
                        this.style.boxShadow = '0 20px 60px rgba(212,168,67,.3), 0 0 80px rgba(212,168,67,.2)';
                    });
                    
                    card.addEventListener('mouseleave', function() {
                        this.style.transform = 'scale(1) translateY(0)';
                        this.style.boxShadow = '';
                    });
                    
                    observer.unobserve(card);
                }
            }
        }, { threshold: 0.2 });

        for (var k = 0; k < cards.length; k++) {
            observer.observe(cards[k]);
        }
    }

    // ===================================
    // ANIMAR DISPOSITIVOS UM POR VEZ DENTRO DO CARD
    // ===================================
    function animateDevicesSequentially(container, devices, index) {
        if (index >= devices.length) {
            // Voltar ao início após 2 segundos
            setTimeout(function() {
                animateDevicesSequentially(container, devices, 0);
            }, 2000);
            return;
        }
        
        // Limpar animações anteriores
        container.innerHTML = '';
        
        // Adicionar spans sem animação
        var html = '';
        for (var i = 0; i < devices.length; i++) {
            html += '<span class="ds-compat-item">' + devices[i].trim() + '</span>';
            if (i < devices.length - 1) html += ', ';
        }
        container.innerHTML = html;
        
        // Adicionar animação apenas ao dispositivo atual
        var currentSpan = container.querySelectorAll('.ds-compat-item')[index];
        if (currentSpan) {
            currentSpan.style.animation = 'ds-text-zoom 2s ease-in-out';
        }
        
        // Próximo dispositivo após 2.5 segundos
        setTimeout(function() {
            animateDevicesSequentially(container, devices, index + 1);
        }, 2500);
    }

    // ===================================
    // PREVENIR CLIQUE DUPLO NOS BOTÕES
    // ===================================
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('ds-card-btn')) {
            e.stopPropagation();
        }
    });

    // ===================================
    // KEYBOARD — ESC closes modals
    // ===================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            var detail = document.getElementById('ds-detail-modal');
            if (detail && detail.classList.contains('active')) {
                closeDetail();
                return;
            }
            var cat = document.getElementById('ds-modal');
            if (cat && cat.classList.contains('active')) {
                closeModal();
                return;
            }
        }
    });

    // ===================================
    // BOOT
    // ===================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            restoreSession();
            initAnimations();
        });
    } else {
        restoreSession();
        initAnimations();
    }

    // ===================================
    // PUBLIC API
    // ===================================
    window.VipflixDevice = {
        openCategory: openCategory,
        closeModal: closeModal,
        openDetail: openDetail,
        closeDetail: closeDetail,
        confirmApp: confirmApp,
        goToForm: goToForm,
        resetChoice: resetChoice
    };

    console.log('[DEVICE] Premium Device Selection loaded');
})();
