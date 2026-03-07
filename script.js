/* =========================================================
   GABRIEL LANIEZ — PORTFOLIO V2 — SCRIPT AMÉLIORÉ
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────────────
    // 1. CURSEUR PERSONNALISÉ NÉON
    // ─────────────────────────────────────────────
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (dot) {
            dot.style.left = mouseX + 'px';
            dot.style.top  = mouseY + 'px';
        }
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        if (ring) {
            ring.style.left = ringX + 'px';
            ring.style.top  = ringY + 'px';
        }
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.addEventListener('mouseleave', () => {
        if (dot) dot.style.opacity = '0';
        if (ring) ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        if (dot) dot.style.opacity = '1';
        if (ring) ring.style.opacity = '1';
    });

    // ─────────────────────────────────────────────
    // 2. NAVBAR SCROLL EFFECT
    // ─────────────────────────────────────────────
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // ─────────────────────────────────────────────
    // 3. SMOOTH SCROLL
    // ─────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ─────────────────────────────────────────────
    // 4. GLITCH NAME — EFFET TEXTE SCRAMBLE
    // ─────────────────────────────────────────────
    const glitchEl = document.querySelector('.glitch-name');
    if (glitchEl) {
        const originalText = glitchEl.textContent;
        glitchEl.setAttribute('data-text', originalText);

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let scrambleInterval = null;

        function scramble() {
            let iterations = 0;
            clearInterval(scrambleInterval);
            scrambleInterval = setInterval(() => {
                glitchEl.textContent = originalText
                    .split('')
                    .map((char, i) => {
                        if (i < iterations) return originalText[i];
                        if (char === ' ') return ' ';
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                if (iterations >= originalText.length) {
                    clearInterval(scrambleInterval);
                    glitchEl.textContent = originalText;
                    glitchEl.setAttribute('data-text', originalText);
                }
                iterations += 0.5;
            }, 40);
        }

        // Scramble au chargement
        setTimeout(scramble, 300);

        // Scramble au survol
        glitchEl.closest('.name-box')?.addEventListener('mouseenter', scramble);
    }

    // ─────────────────────────────────────────────
    // 5. TYPEWRITER SUBTITLE
    // ─────────────────────────────────────────────
    function typewriterEffect(element, text, speed = 55) {
        if (!element) return;
        element.textContent = '';
        element.classList.remove('typed-done');
        element.classList.add('is-typing');

        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text[i];
                i++;
            } else {
                clearInterval(interval);
                element.classList.remove('is-typing');
                element.classList.add('typed-done');
            }
        }, speed);
    }

    const subtitleEl = document.querySelector('.subtitle');
    if (subtitleEl) {
        const subtitleText = subtitleEl.textContent.trim();
        setTimeout(() => typewriterEffect(subtitleEl, subtitleText), 700);
    }

    // ─────────────────────────────────────────────
    // 6. INTERSECTION OBSERVER — ANIMATIONS SCROLL
    // ─────────────────────────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Skill boxes avec délai échelonné
    document.querySelectorAll('.skill-box').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.07}s`;
        observer.observe(el);
    });

    // Year columns timeline
    document.querySelectorAll('.year-column').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.15}s`;
        observer.observe(el);
    });

    // Section titles
    document.querySelectorAll('.section-title').forEach(el => observer.observe(el));

    // Bio paragraphs
    document.querySelectorAll('.bio-left-align p').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.12}s`;
        observer.observe(el);
    });

    // Generic animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
        observer.observe(el);
    });

    // ─────────────────────────────────────────────
    // 7. SYSTÈME DE TRADUCTION
    // ─────────────────────────────────────────────
    const translations = {
        fr: {
            'nav-home': 'Accueil',
            'nav-timeline': 'Parcours',
            'nav-skills': 'Compétences',
            'nav-social': 'Réseaux',
            'nav-contact': 'Contact',
            'subtitle': 'Étudiant BUT Informatique première année',
            'bio-title': 'Du commencement à maintenant : <br> <span style="color: var(--neon-blue);">Une Vision Hybride.</span>',
            'bio-p1': "Tout n'a pas commencé par une ligne de code, mais par une vision. Fasciné par le numérique et la <strong>Science-Fiction</strong>, j'ai vite compris que je voulais découvrir et expérimenter ces technologies qui me fascinaient tant. Mon voyage a débuté sur des serveurs <strong>Minecraft</strong>, à modifier des fichiers du jeu pour simplement m'amuser avec mes amis. Cette curiosité ne m'a jamais quitté.",
            'bio-p2': "Aujourd'hui, cette curiosité est devenue expertise. Je commence à maîtriser les bases du Développement Web (<strong>HTML/CSS</strong>), mais ma vraie force réside dans l'utilisation des outils modernes. Je ne vois pas l'<strong>Intelligence Artificielle</strong> comme une mode, mais comme un partenaire quotidien qui décuple ma productivité. Je ne fais pas qu'essayer de résoudre des problèmes, j'automatise les solutions.",
            'bio-p3': "Je pense avoir un <strong>Profil Hybride</strong>. J'aime la logique du code, mais je vibre pour le <strong>Commerce et le Leadership</strong>. Qu'il s'agisse de planifier un projet, gérer une équipe ou vendre un produit, j'apporte ma vision.",
            'bio-p4': "Ma motivation ? <strong>L'Impact et la Performance.</strong> Que ce soit pour créer un nouveau projet, je suis guidé par mes idées et mon instinct. Je profite de l'<strong>instant présent</strong>, du jour au jour. Ce court extrait résume une partie de la complexité de ma personne — signé <span style=\"color: var(--neon-blue);\">Gabriel Laniez</span>.",
            'btn-contact': 'Me Contacter',
            'title-projects': 'Mes Réalisations',
            'btn-discover': 'Découvrir mon parcours <i class="fas fa-arrow-down" style="margin-left: 10px; animation: bounce 2s infinite;"></i>',
            'title-skills': 'Compétences Techniques',
            'timeline-title': 'Ma Vision & Parcours',
            'proj-but': 'BUT Informatique',
            'desc-iut': "IUT du Littoral Côte d'Opale.",
            'tag-studies': 'Études',
            'desc-portfolio': 'Lancement de mon site.',
            'btn-send-msg': 'M\'envoyer un message <i class="fas fa-paper-plane"></i>',
            'modal-title': 'CONTACTEZ-MOI',
            'modal-social-title': 'MES RÉSEAUX',
            'chat-placeholder': 'Écrivez votre message...',
            'chat-status': 'En ligne',
            'chat-name': 'Assistant IA',
        },
        en: {
            'nav-home': 'Home',
            'nav-timeline': 'Journey',
            'nav-skills': 'Skills',
            'nav-social': 'Networks',
            'nav-contact': 'Contact',
            'subtitle': 'First year BUT Computer Science student',
            'bio-title': 'From the beginning to now: <br> <span style="color: var(--neon-blue);">A Hybrid Vision.</span>',
            'bio-p1': "It didn't start with a line of code; it started with a vision. Fascinated by the digital and <strong>Sci-Fi</strong>, I quickly realized I wanted to discover and experiment with these technologies that fascinated me so much. My journey began on <strong>Minecraft</strong> servers, editing game files just to have fun with my friends. That curiosity never left me.",
            'bio-p2': "Today, that curiosity has evolved into expertise. I'm starting to master the basics of Web Development (<strong>HTML/CSS</strong>), but my true edge lies in leveraging modern tools. I see <strong>Artificial Intelligence</strong> not as a trend, but as a daily partner that amplifies my productivity. I don't just solve problems — I automate solutions.",
            'bio-p3': "I believe I have a <strong>Hybrid Profile</strong>. I love the logic of code, but I thrive on the energy of <strong>Sales and Leadership</strong>. Whether it's planning a project, managing a team, or pitching a product, I bring my vision.",
            'bio-p4': "My motivation? <strong>Impact and Performance.</strong> Whether creating a new project, I am guided by my ideas and instinct. I enjoy the <strong>present moment</strong>, day by day. This short extract summarizes part of my complexity — signed <span style=\"color: var(--neon-blue);\">Gabriel Laniez</span>.",
            'btn-contact': 'Contact Me',
            'title-projects': 'My Works',
            'btn-discover': 'Discover my journey <i class="fas fa-arrow-down" style="margin-left: 10px; animation: bounce 2s infinite;"></i>',
            'title-skills': 'Technical Skills',
            'timeline-title': 'My Vision & Journey',
            'proj-but': 'CS Degree (BUT)',
            'desc-iut': "IUT Littoral Côte d'Opale.",
            'tag-studies': 'Studies',
            'desc-portfolio': 'Website Launch.',
            'btn-send-msg': 'Send me a message <i class="fas fa-paper-plane"></i>',
            'modal-title': 'CONTACT ME',
            'modal-social-title': 'MY NETWORKS',
            'chat-placeholder': 'Write your message...',
            'chat-status': 'Online',
            'chat-name': 'AI Assistant',
        }
    };

    let activeLang = 'fr';

    function setLanguage(lang) {
        activeLang = lang;

        document.getElementById('btn-fr').classList.remove('active');
        document.getElementById('btn-en').classList.remove('active');
        document.getElementById('btn-' + lang).classList.add('active');

        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        // Relancer le typewriter sur le subtitle (si changement de langue)
        const subtitleEl = document.querySelector('.subtitle');
        if (subtitleEl) {
            const newText = translations[lang]['subtitle'];
            typewriterEffect(subtitleEl, newText, 45);
        }

        // Mettre à jour le placeholder du chat
        const chatInput = document.getElementById('user-input');
        if (chatInput) {
            chatInput.placeholder = translations[lang]['chat-placeholder'] || translations.fr['chat-placeholder'];
        }

        // Mettre à jour le nom et statut du chat header
        const chatNameEl = document.querySelector('.chat-header-name');
        const chatStatusEl = document.querySelector('.chat-header-status');
        if (chatNameEl) chatNameEl.textContent = translations[lang]['chat-name'];
        if (chatStatusEl) chatStatusEl.childNodes[chatStatusEl.childNodes.length - 1].textContent = ' ' + translations[lang]['chat-status'];
    }

    document.getElementById('btn-fr').addEventListener('click', () => setLanguage('fr'));
    document.getElementById('btn-en').addEventListener('click', () => setLanguage('en'));

    // ─────────────────────────────────────────────
    // 8. PARTICULES
    // ─────────────────────────────────────────────
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                   || window.innerWidth <= 768;

    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 90, density: { enable: true, value_area: 800 } },
                color: { value: '#00f3ff' },
                shape: { type: 'circle' },
                opacity: { value: 0.55, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.2, sync: false } },
                size: { value: 2.8, random: true },
                line_linked: { enable: true, distance: 150, color: '#00f3ff', opacity: 0.28, width: 1 },
                move: { enable: true, speed: 1.8, random: true, out_mode: 'out', attract: { enable: false } }
            },
            interactivity: {
                detect_on: isMobile ? 'canvas' : 'window',
                events: {
                    onhover: { enable: !isMobile, mode: 'repulse' },
                    onclick:  { enable: !isMobile, mode: 'push' }  // désactivé sur mobile
                },
                modes: {
                    repulse: { distance: 100, duration: 0.5 },
                    push:    { particles_nb: 4 }
                }
            },
            retina_detect: true
        });

        // ── NETTOYAGE AUTO des particules ──────────────────────────
        // Plafond : 180 particules max. Vérification toutes les 8s.
        const MAX_PARTICLES = 180;
        const CLEANUP_INTERVAL = 8000;

        setInterval(() => {
            if (typeof window.pJSDom === 'undefined' || !window.pJSDom.length) return;
            const pJS = window.pJSDom[0].pJS;
            if (!pJS || !pJS.particles || !pJS.particles.array) return;

            const count = pJS.particles.array.length;
            if (count > MAX_PARTICLES) {
                // Supprime l'excédent en retirant les plus anciennes (début du tableau)
                const excess = count - MAX_PARTICLES;
                pJS.particles.array.splice(0, excess);
            }
        }, CLEANUP_INTERVAL);
    }

});

// ─────────────────────────────────────────────────────────
// MODALS
// ─────────────────────────────────────────────────────────
window.toggleModal = function() {
    document.getElementById('contact-modal')?.classList.toggle('active');
};

window.toggleSocialModal = function() {
    document.getElementById('social-modal')?.classList.toggle('active');
};

document.addEventListener('click', (e) => {
    const contactModal = document.getElementById('contact-modal');
    if (contactModal && e.target === contactModal) contactModal.classList.remove('active');

    const socialModal = document.getElementById('social-modal');
    if (socialModal && e.target === socialModal) socialModal.classList.remove('active');
});

// ─────────────────────────────────────────────────────────
// SCROLL — LOOP / REBOOT
// ─────────────────────────────────────────────────────────
let isRebooting = false;
window.addEventListener('scroll', () => {
    if (isRebooting) return;
    const loopZone = document.getElementById('loop-zone');
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        if (loopZone) loopZone.classList.add('active');
        isRebooting = true;
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                if (loopZone) loopZone.classList.remove('active');
                isRebooting = false;
            }, 1200);
        }, 800);
    }
});

// ─────────────────────────────────────────────────────────
// CHATBOT — CLAUDE AI (VRAI)
// ─────────────────────────────────────────────────────────

// Contexte sur Gabriel (utilisé dans le system prompt)
const GABRIEL_CONTEXT = `Tu es l'assistant virtuel IA du portfolio de Gabriel Laniez.
Voici les informations sur Gabriel que tu dois utiliser pour répondre :

- Nom : Gabriel Laniez
- Âge : Étudiant première année de BUT Informatique
- École : IUT du Littoral Côte d'Opale
- Email : laniezgabriel59@gmail.com
- Portfolio : laniezgabriel.vercel.app

Compétences techniques :
- HTML/CSS (niveau avancé)
- JavaScript (niveau intermédiaire)
- Java (niveau intermédiaire)
- SQL / Data (niveau intermédiaire)
- C / C++ (niveau intermédiaire)
- Python (niveau débutant)
- Réseau (niveau débutant)
- IA & Prompting (niveau expert — sa vraie force)
- Gestion de projet (niveau expert)
- Langues : Français (natif), Anglais (bilingue), Espagnol (débutant)

Profil :
Gabriel a un profil hybride technique + business/leadership. Passionné de Science-Fiction et de numérique, il a commencé à coder en modifiant des fichiers de jeux Minecraft. Il voit l'IA comme un outil puissant de productivité et la maîtrise au quotidien. Il est guidé par l'impact, la performance et le moment présent.

Projets :
- Portfolio V2 (ce site) — HTML/CSS/JS
- Projets en développement (WordPress, Python)

Règles pour tes réponses :
- Réponds toujours dans la même langue que l'utilisateur (Français si question en FR, English if question in EN)
- Sois concis, friendly, et professionnel
- Si on te demande de contacter Gabriel, donne l'email : laniezgabriel59@gmail.com
- Reste dans le contexte du portfolio. Pour les sujets hors contexte, redirige poliment
- Max 2-3 phrases par réponse sauf si nécessaire`;

let chatHistory = [];

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if (!chatWindow) return;

    const isOpen = chatWindow.classList.contains('active');

    if (!isOpen) {
        chatWindow.style.display = 'flex';
        requestAnimationFrame(() => {
            chatWindow.classList.add('active');
        });
    } else {
        chatWindow.classList.remove('active');
        setTimeout(() => {
            chatWindow.style.display = 'none';
        }, 300);
    }
}

function handleEnter(e) {
    if (e.key === 'Enter') sendMessage();
}

async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const messageText = inputField?.value.trim();
    if (!messageText) return;

    addMessage(messageText, 'user-message');
    inputField.value = '';

    chatHistory.push({ role: 'user', content: messageText });

    const typingEl = showTypingIndicator();

    // Détecte si on est en local (pas sur Vercel)
    const isLocal = window.location.hostname === 'localhost'
                 || window.location.hostname === '127.0.0.1'
                 || window.location.protocol === 'file:';

    if (isLocal) {
        removeTypingIndicator(typingEl);
        const msg = activeLang === 'fr'
            ? "⚠️ Le chatbot IA fonctionne uniquement sur le site déployé (Vercel). En local, l'API n'est pas disponible. Déploie le site pour le tester !"
            : "⚠️ The AI chatbot only works on the deployed site (Vercel). The API is not available locally. Deploy the site to test it!";
        addMessage(msg, 'bot-message');
        return;
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // timeout 15s

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: chatHistory,
                systemPrompt: GABRIEL_CONTEXT
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        removeTypingIndicator(typingEl);

        if (!response.ok) {
            // Lire le body d'erreur pour diagnostiquer
            let errDetail = '';
            try { const e = await response.json(); errDetail = e.error || ''; } catch(_) {}

            // Erreur 500 = clé API probablement pas configurée
            if (response.status === 500) {
                const msg = activeLang === 'fr'
                    ? "⚙️ Clé API non configurée sur Vercel. Va dans Settings → Environment Variables et ajoute ANTHROPIC_API_KEY."
                    : "⚙️ API key not set on Vercel. Go to Settings → Environment Variables and add ANTHROPIC_API_KEY.";
                addMessage(msg, 'bot-message');
            } else {
                addMessage(
                    activeLang === 'fr'
                        ? `Erreur ${response.status}. Réessaie dans un moment !`
                        : `Error ${response.status}. Please try again in a moment!`,
                    'bot-message'
                );
            }
            return;
        }

        const data = await response.json();
        const botReply = data.reply || (activeLang === 'fr'
            ? "Je n'ai pas reçu de réponse. Réessaie !"
            : "I didn't receive a response. Please try again!");

        addMessage(botReply, 'bot-message');
        chatHistory.push({ role: 'assistant', content: botReply });

    } catch (err) {
        removeTypingIndicator(typingEl);

        let msg;
        if (err.name === 'AbortError') {
            msg = activeLang === 'fr'
                ? "⏱️ Délai dépassé. Vérifie ta connexion et réessaie."
                : "⏱️ Request timed out. Check your connection and try again.";
        } else {
            msg = activeLang === 'fr'
                ? "❌ Impossible de joindre le serveur. Assure-toi que le site est bien déployé sur Vercel."
                : "❌ Could not reach the server. Make sure the site is deployed on Vercel.";
        }
        addMessage(msg, 'bot-message');
    }
}

function addMessage(text, className) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', className);
    msgDiv.innerHTML = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return null;

    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
}

function removeTypingIndicator(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
    const existing = document.getElementById('typing-indicator');
    if (existing) existing.remove();
}

// Fermeture au clic extérieur
document.addEventListener('click', (e) => {
    const chatWindow = document.getElementById('chat-window');
    const chatBtn    = document.getElementById('chat-toggle-btn');
    if (chatWindow?.classList.contains('active')) {
        if (!chatWindow.contains(e.target) && !chatBtn?.contains(e.target)) {
            chatWindow.classList.remove('active');
            setTimeout(() => { chatWindow.style.display = 'none'; }, 300);
        }
    }
});

// Expose les fonctions globalement
window.toggleChat   = toggleChat;
window.handleEnter  = handleEnter;
window.sendMessage  = sendMessage;
