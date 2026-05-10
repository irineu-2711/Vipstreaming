// ===================================
// VIPFLIX NOVA GERAÇÃO - Analytics Completo
// ES5 compatível - funciona em TODOS os dispositivos
// Rastreia: page_view, app_selected, test_button_click, test_generated
// Coleta: IP, geolocalização, fingerprint, visitor_id, session_id
// ===================================
(function() {
    'use strict';

    var client = null;
    var sessionId = null;
    var cachedLocation = null;
    var visitorId = null;

    // ===================================
    // HASH ESTÁVEL — djb2 (determinístico, sem Date.now)
    // ===================================
    function stableHash(str) {
        var hash = 5381;
        for (var i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return 'v_' + Math.abs(hash).toString(36);
    }

    // ===================================
    // VISITOR ID — PERSISTENTE (localStorage)
    // Baseado em IP + UA + tela = mesmo dispositivo = mesmo visitor
    // ===================================
    function getOrCreateVisitorId(ip) {
        // Se já temos em memória, retornar
        if (visitorId) return visitorId;

        // Tentar ler do localStorage (persiste entre sessões)
        try { visitorId = localStorage.getItem('vfx_visitor_id'); } catch (e) {}
        if (visitorId) return visitorId;

        // Criar fingerprint estável: IP + UA + tela
        var ua = (navigator.userAgent || '').substring(0, 150);
        var scrW = window.screen ? window.screen.width : 0;
        var scrH = window.screen ? window.screen.height : 0;
        var scr = scrW + 'x' + scrH;
        var lang = navigator.language || navigator.userLanguage || '';
        var tz = '';
        try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
        var combined = (ip || 'noip') + '|' + ua + '|' + scr + '|' + lang + '|' + tz;
        visitorId = stableHash(combined);

        // Persistir
        try { localStorage.setItem('vfx_visitor_id', visitorId); } catch (e) {}
        return visitorId;
    }

    // ===================================
    // SESSION ID — único por visita (sessionStorage)
    // Mesmo visitor pode ter múltiplas sessions
    // ===================================
    function getSessionId() {
        if (sessionId) return sessionId;
        try { sessionId = sessionStorage.getItem('vfx_session'); } catch (e) {}
        if (!sessionId) {
            sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            try { sessionStorage.setItem('vfx_session', sessionId); } catch (e) {}
        }
        return sessionId;
    }

    // ===================================
    // DETECTAR DISPOSITIVO COMPLETO
    // ===================================
    function detectDevice() {
        var ua = navigator.userAgent || '';
        var info = {
            device_type: 'desktop',
            browser: 'unknown',
            os: 'unknown',
            os_version: '',
            browser_version: '',
            device_brand: '',
            device_model: '',
            is_inapp: false
        };

        // Tipo de dispositivo
        if (/Mobile|Android/i.test(ua) && !/iPad/i.test(ua)) info.device_type = 'mobile';
        else if (/iPad|tablet/i.test(ua)) info.device_type = 'tablet';

        // OS + versão
        var osMatch;
        if (/Windows NT (\d+\.?\d*)/i.test(ua)) {
            info.os = 'Windows';
            osMatch = ua.match(/Windows NT (\d+\.?\d*)/i);
            if (osMatch) {
                var winVer = { '10.0': '10/11', '6.3': '8.1', '6.2': '8', '6.1': '7' };
                info.os_version = winVer[osMatch[1]] || osMatch[1];
            }
        } else if (/Android\s*([\d.]+)?/i.test(ua)) {
            info.os = 'Android';
            osMatch = ua.match(/Android\s*([\d.]+)?/i);
            if (osMatch && osMatch[1]) info.os_version = osMatch[1];
        } else if (/(?:iPhone|iPad|iPod).*OS\s*([\d_]+)/i.test(ua)) {
            info.os = 'iOS';
            osMatch = ua.match(/OS\s*([\d_]+)/i);
            if (osMatch) info.os_version = osMatch[1].replace(/_/g, '.');
        } else if (/Mac OS X\s*([\d_.]+)?/i.test(ua)) {
            info.os = 'macOS';
            osMatch = ua.match(/Mac OS X\s*([\d_.]+)?/i);
            if (osMatch && osMatch[1]) info.os_version = osMatch[1].replace(/_/g, '.');
        } else if (/Linux/i.test(ua)) {
            info.os = 'Linux';
        } else if (/CrOS/i.test(ua)) {
            info.os = 'ChromeOS';
        }

        // Browser + versão (ordem importa — mais específico primeiro)
        var bMatch;
        if (/FBAN|FBAV|FB_IAB/i.test(ua)) {
            info.browser = 'Facebook';
            info.is_inapp = true;
        } else if (/Instagram/i.test(ua)) {
            info.browser = 'Instagram';
            info.is_inapp = true;
        } else if (/\bline\b/i.test(ua)) {
            info.browser = 'LINE';
            info.is_inapp = true;
        } else if (/Twitter|X-Twitter/i.test(ua)) {
            info.browser = 'Twitter';
            info.is_inapp = true;
        } else if (/TikTok/i.test(ua)) {
            info.browser = 'TikTok';
            info.is_inapp = true;
        } else if (/CriOS\/([\d.]+)/i.test(ua)) {
            // Chrome no iOS — user-agent usa CriOS em vez de Chrome
            info.browser = 'Chrome';
            bMatch = ua.match(/CriOS\/([\d.]+)/i);
            if (bMatch) info.browser_version = bMatch[1];
        } else if (/FxiOS\/([\d.]+)/i.test(ua)) {
            // Firefox no iOS
            info.browser = 'Firefox';
            bMatch = ua.match(/FxiOS\/([\d.]+)/i);
            if (bMatch) info.browser_version = bMatch[1];
        } else if (/EdgiOS\/([\d.]+)/i.test(ua)) {
            // Edge no iOS
            info.browser = 'Edge';
            bMatch = ua.match(/EdgiOS\/([\d.]+)/i);
            if (bMatch) info.browser_version = bMatch[1];
        } else if (/SamsungBrowser\/([\d.]+)/i.test(ua)) {
            info.browser = 'Samsung Internet';
            bMatch = ua.match(/SamsungBrowser\/([\d.]+)/i);
            if (bMatch) info.browser_version = bMatch[1];
        } else if (/OPR\/([\d.]+)|Opera\/([\d.]+)/i.test(ua)) {
            info.browser = 'Opera';
            bMatch = ua.match(/OPR\/([\d.]+)/i) || ua.match(/Opera\/([\d.]+)/i);
            if (bMatch) info.browser_version = bMatch[1];
        } else if (/Edg(?:e|A)?\/([\d.]+)/i.test(ua)) {
            info.browser = 'Edge';
            bMatch = ua.match(/Edg(?:e|A)?\/([\d.]+)/i);
            if (bMatch) info.browser_version = bMatch[1];
        } else if (/UCBrowser\/([\d.]+)/i.test(ua)) {
            info.browser = 'UC Browser';
            bMatch = ua.match(/UCBrowser\/([\d.]+)/i);
            if (bMatch) info.browser_version = bMatch[1];
        } else if (/Firefox\/([\d.]+)/i.test(ua)) {
            info.browser = 'Firefox';
            bMatch = ua.match(/Firefox\/([\d.]+)/i);
            if (bMatch) info.browser_version = bMatch[1];
        } else if (/Chrome\/([\d.]+)/i.test(ua)) {
            info.browser = 'Chrome';
            bMatch = ua.match(/Chrome\/([\d.]+)/i);
            if (bMatch) info.browser_version = bMatch[1];
        } else if (/Version\/([\d.]+).*Safari/i.test(ua)) {
            info.browser = 'Safari';
            bMatch = ua.match(/Version\/([\d.]+)/i);
            if (bMatch) info.browser_version = bMatch[1];
        } else if (/Safari/i.test(ua)) {
            info.browser = 'Safari';
        }

        // Marca/modelo do dispositivo
        if (/iPhone/i.test(ua)) {
            info.device_brand = 'Apple';
            info.device_model = 'iPhone';
        } else if (/iPad/i.test(ua)) {
            info.device_brand = 'Apple';
            info.device_model = 'iPad';
        } else if (/Samsung/i.test(ua)) {
            info.device_brand = 'Samsung';
            var smMatch = ua.match(/SM-[A-Z0-9]+/i);
            if (smMatch) info.device_model = smMatch[0];
        } else if (/Xiaomi|Redmi|POCO/i.test(ua)) {
            info.device_brand = 'Xiaomi';
            var xiMatch = ua.match(/(Redmi[^\s;)]+|POCO[^\s;)]+|Mi\s*\d+[^\s;)]*)/i);
            if (xiMatch) info.device_model = xiMatch[1];
        } else if (/Motorola|moto/i.test(ua)) {
            info.device_brand = 'Motorola';
            var motMatch = ua.match(/moto\s*[a-z0-9]+/i);
            if (motMatch) info.device_model = motMatch[0];
        } else if (/Huawei/i.test(ua)) {
            info.device_brand = 'Huawei';
        } else if (/Android/i.test(ua)) {
            // Genérico Android — tentar pegar modelo do Build/
            var buildMatch = ua.match(/;\s*([^;)]+)\s*Build/i);
            if (buildMatch) info.device_model = buildMatch[1].trim();
        }

        return info;
    }

    // ===================================
    // DETECTAR IP + GEOLOCALIZAÇÃO
    // Cache para não fazer múltiplas chamadas
    // ===================================
    function detectLocation(callback) {
        // Se já temos cache, retornar imediato
        if (cachedLocation) {
            callback(cachedLocation);
            return;
        }

        var fallback = { ip_address: null, country: null, city: null, region: null, isp: null };

        if (typeof fetch === 'undefined') {
            // Fallback sem fetch: tentar XHR
            try {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://api.ipify.org?format=json', true);
                xhr.timeout = 5000;
                xhr.onload = function() {
                    try {
                        var ipData = JSON.parse(xhr.responseText);
                        fallback.ip_address = ipData.ip;
                        cachedLocation = fallback;
                        callback(fallback);
                    } catch (e) {
                        cachedLocation = fallback;
                        callback(fallback);
                    }
                };
                xhr.onerror = function() { cachedLocation = fallback; callback(fallback); };
                xhr.ontimeout = function() { cachedLocation = fallback; callback(fallback); };
                xhr.send();
            } catch (e) {
                cachedLocation = fallback;
                callback(fallback);
            }
            return;
        }

        // API primária: ip-api.com (sem rate-limit com http, mais dados)
        fetch('https://api.ipify.org?format=json')
            .then(function(r) {
                if (!r.ok) throw new Error('IP fail');
                return r.json();
            })
            .then(function(ipData) {
                var ip = ipData.ip;
                fetch('https://ipapi.co/' + ip + '/json/')
                    .then(function(r) {
                        if (!r.ok) throw new Error('Geo fail');
                        return r.json();
                    })
                    .then(function(geo) {
                        cachedLocation = {
                            ip_address: ip,
                            country: geo.country_name || null,
                            city: geo.city || null,
                            region: geo.region || null,
                            isp: geo.org || null
                        };
                        callback(cachedLocation);
                    })
                    .catch(function() {
                        cachedLocation = { ip_address: ip, country: null, city: null, region: null, isp: null };
                        callback(cachedLocation);
                    });
            })
            .catch(function() {
                cachedLocation = fallback;
                callback(fallback);
            });
    }

    // ===================================
    // REGISTRAR EVENTO
    // ===================================
    function trackEvent(eventType, extra) {
        if (!client) {
            console.warn('[ANALYTICS] Sem client, evento perdido:', eventType);
            return;
        }

        var device = detectDevice();

        detectLocation(function(loc) {
            var scrW = window.screen ? window.screen.width : 0;
            var scrH = window.screen ? window.screen.height : 0;
            var screenRes = scrW + 'x' + scrH;
            var colorDepth = window.screen ? (window.screen.colorDepth || 24) : 24;
            var pixelRatio = window.devicePixelRatio || 1;
            var lang = navigator.language || navigator.userLanguage || 'unknown';
            var tz = '';
            try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}

            // Fingerprint estável (sem Date.now)
            var fpParts = device.browser + '_' + device.os + '_' + screenRes + '_' + colorDepth + '_' + pixelRatio + '_' + lang + '_' + tz;
            var fingerprint = stableHash(fpParts);

            // Visitor ID persistente
            var vid = getOrCreateVisitorId(loc.ip_address);

            // Referrer analisado
            var ref = document.referrer || '';
            var refSource = 'direct';
            if (ref) {
                if (/google\./i.test(ref)) refSource = 'google';
                else if (/facebook\.com|fb\.com|fbclid/i.test(ref)) refSource = 'facebook';
                else if (/instagram\.com/i.test(ref)) refSource = 'instagram';
                else if (/tiktok\.com/i.test(ref)) refSource = 'tiktok';
                else if (/twitter\.com|x\.com|t\.co/i.test(ref)) refSource = 'twitter';
                else if (/whatsapp/i.test(ref)) refSource = 'whatsapp';
                else if (/youtube\.com/i.test(ref)) refSource = 'youtube';
                else if (/bing\.com/i.test(ref)) refSource = 'bing';
                else refSource = 'other';
            }
            // Verificar UTM params na URL
            var urlParams = window.location.search || '';
            if (urlParams.indexOf('fbclid') !== -1) refSource = 'facebook_ads';
            else if (urlParams.indexOf('gclid') !== -1) refSource = 'google_ads';
            else if (urlParams.indexOf('utm_source') !== -1) {
                var srcMatch = urlParams.match(/utm_source=([^&]+)/i);
                if (srcMatch) refSource = srcMatch[1];
            }

            var eventData = {
                event_type: eventType,
                page_url: window.location.href,
                referrer: ref || null,
                ref_source: refSource,
                session_id: getSessionId(),
                visitor_id: vid,
                user_agent: navigator.userAgent,
                device_type: device.device_type,
                browser: device.browser,
                browser_version: device.browser_version || null,
                os: device.os,
                os_version: device.os_version || null,
                device_brand: device.device_brand || null,
                device_model: device.device_model || null,
                is_inapp_browser: device.is_inapp,
                screen_resolution: screenRes,
                pixel_ratio: pixelRatio,
                color_depth: colorDepth,
                language: lang,
                timezone: tz,
                browser_fingerprint: fingerprint,
                ip_address: loc.ip_address,
                country: loc.country,
                city: loc.city,
                region: loc.region || null,
                isp: loc.isp || null,
                test_generated: false
            };

            // Merge dados extras
            if (extra) {
                for (var key in extra) {
                    if (extra.hasOwnProperty(key)) {
                        eventData[key] = extra[key];
                    }
                }
            }

            console.log('[ANALYTICS] Enviando:', eventType, '| visitor:', vid);

            client.from('analytics').insert([eventData])
                .then(function(result) {
                    if (result.error) {
                        console.warn('[ANALYTICS] Erro inserção completa, tentando mínimo:', result.error.message);
                        // Fallback: só campos que a tabela certamente tem
                        var minData = {
                            event_type: eventType,
                            session_id: getSessionId(),
                            visitor_id: vid,
                            device_type: device.device_type,
                            browser: device.browser,
                            os: device.os,
                            ip_address: loc.ip_address,
                            country: loc.country,
                            city: loc.city,
                            screen_resolution: screenRes,
                            browser_fingerprint: fingerprint,
                            user_agent: navigator.userAgent,
                            page_url: window.location.href,
                            referrer: ref || null,
                            test_generated: false
                        };
                        if (extra) {
                            for (var k in extra) {
                                if (extra.hasOwnProperty(k)) minData[k] = extra[k];
                            }
                        }
                        return client.from('analytics').insert([minData]);
                    }
                    console.log('[ANALYTICS] OK:', eventType);
                })
                .then(function(result2) {
                    if (result2 && result2.error) {
                        console.warn('[ANALYTICS] Fallback também falhou:', result2.error.message);
                    } else if (result2) {
                        console.log('[ANALYTICS] OK (mínimo):', eventType);
                    }
                })
                .catch(function(e) {
                    console.warn('[ANALYTICS] Exceção:', e.message || e);
                });
        });
    }

    // API pública
    window.VipflixAnalytics = {
        trackEvent: trackEvent,

        trackAppSelected: function(appId, appName) {
            trackEvent('app_selected', { app_selected: appName || appId });
        },

        trackTestButtonClick: function() {
            trackEvent('test_button_click');
        },

        trackTestGenerated: function(nome, whatsapp, appId, appName) {
            trackEvent('test_generated', {
                app_selected: appName || appId,
                test_generated: true,
                cliente_nome: nome,
                cliente_whatsapp: whatsapp
            });
        },

        trackCustom: function(type, data) {
            trackEvent(type, data);
        },

        getSessionId: getSessionId
    };

    // Conectar ao Supabase e disparar page_view
    function connect() {
        if (window.supabaseClient) {
            client = window.supabaseClient;
            console.log('[ANALYTICS] Conectado ao Supabase');
            trackEvent('page_view');
        } else {
            console.warn('[ANALYTICS] Supabase indisponível, retry em 2s...');
            setTimeout(function() {
                if (window.supabaseClient) {
                    client = window.supabaseClient;
                    console.log('[ANALYTICS] Conectado (retry)');
                    trackEvent('page_view');
                } else {
                    console.error('[ANALYTICS] Supabase não disponível');
                }
            }, 2000);
        }
    }

    // Inicializar
    if (window.supabaseClient) {
        connect();
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(connect, 300);
        });
    } else {
        setTimeout(connect, 300);
    }

    // Capturar erros globais
    window.onerror = function(msg, src, line, col, err) {
        try {
            trackEvent('error', {
                metadata: JSON.stringify({ message: msg, source: src, line: line, col: col })
            });
        } catch (e) {}
        return false;
    };

    if (typeof window.addEventListener === 'function') {
        window.addEventListener('unhandledrejection', function(ev) {
            try {
                trackEvent('error', {
                    metadata: JSON.stringify({ type: 'unhandled_rejection', reason: String(ev.reason) })
                });
            } catch (e) {}
        });
    }

    console.log('[ANALYTICS] Módulo carregado');
})();
