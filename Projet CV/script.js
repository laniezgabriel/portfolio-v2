document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Défilement fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 2. Animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-box, .year-column, .hero-left-content').forEach(el => {
        el.style.opacity = "0"; // Préparation animation
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        el.style.transform = "translateY(20px)";
        
        // On crée une petite fonction pour l'animer quand classe 'visible' ajoutée
        el.addEventListener('transitionend', () => { el.style.transition = ""; }); 
        observer.observe(el);
    });
    
    // Hack pour l'animation simple via CSS class
    const styleSheet = document.createElement("style");
    styleSheet.innerText = ".visible { opacity: 1 !important; transform: translateY(0) !important; }";
    document.head.appendChild(styleSheet);


    // --- SYSTÈME DE TRADUCTION ---
    const translations = {
        fr: {
            'nav-home': 'Accueil',
            'nav-timeline': 'Parcours',
            'nav-skills': 'Compétences',
            'nav-social': 'Réseaux', // NOUVEAU
            'nav-contact': 'Contact',
            'subtitle': 'Étudiant BUT Informatique première année',
            'bio-title': 'Du commencement à maintenant: <br> <span style="color: var(--neon-blue);">Une Vision Hybride.</span>',
            'bio-p1': "Tout n'a pas commencé par une ligne de code, mais par une vision. Fasciné par le numériques et la <strong>Science-Fiction</strong>, j'ai vite compris que je voulais venir decouvrir et experimenter ces technologie qui me facinait tant. Mon voyage a débuté sur des serveurs <strong>Minecraft</strong>, modifier des fichiers du jeu pour simplement m'amuser avec mes amis. Cette curiosité ne m'a jamais quitté.",
            'bio-p2': "Aujourd'hui, cette curiosité est devenue expertise. Je pense commencer à savoir maîtriser les base du Développement Web (<strong>HTML/CSS</strong>), ma vraie force réside dans l'utilisation des outils modernes. Je ne vois pas l'<strong>Intelligence Artificielle</strong> comme une mode, mais comme un partenaire quotidien qui décuple ma productivité.Je ne fais pas qu'essayer de résoudre des problèmes, j'automatise les solutions.",
            'bio-p3': "Je pense avoir un <strong>Profil Hybride</strong>. J'aime la logique du code, mais je vibre pour le <strong>Commerce et le Leadership</strong>. Qu'il s'agisse de planifier un projet, gérer une équipe ou vendre un produit, j'apporte ma vision.",
            'bio-p4': "Ma motivation ? <strong>L'Impact et la Performance.</strong> Que ce soit pour créer un nouveaux projet, je suis guidé par mes idées et mon instinct. Je ne m'inquiète pas d'où je serai dans 10 ans ou même voir 5 ans, je profite plus de l'<strong>instant présent</strong> ,du jour au jour.  Je pense que ce court extrait peut résumer une partie de la complexité de ma personne et de celui auquelle j'asppir a devenir signé Gabriel Laniez",
            'btn-contact': 'Me Contacter',
            'title-projects': 'Mes Réalisations',
            'btn-discover': 'Découvrir mon parcours <i class="fas fa-arrow-down" style="margin-left: 10px; animation: bounce 2s infinite;"></i>',
            'title-skills': 'Compétences Techniques',
            'timeline-title': 'Ma Vision & Parcours',
            'proj-future': 'Projet À Venir',
            'tag-future': 'Futur',
            'desc-lead': 'Objectif : Lead Developer.',
            'desc-expert': 'Expertise IA avancée.',
            'desc-engineer': "Diplôme d'Ingénieur.",
            'desc-alt': 'Alternance Grand Compte.',
            'desc-data': 'Spécialisation Data.',
            'proj-but': 'BUT Informatique',
            'desc-iut': "IUT du Littoral Côte d'Opale.",
            'tag-studies': 'Études',
            'desc-portfolio': 'Lancement de mon site.',
            'btn-send-msg': 'M\'envoyer un message <i class="fas fa-paper-plane"></i>',
            'modal-title': 'CONTACTEZ-MOI',
            
            // NOUVEAU TITRE MODAL RESEAUX
            'modal-social-title': 'MES RÉSEAUX PRO'
        },
        en: {
            'nav-home': 'Home',
            'nav-timeline': 'Journey',
            'nav-skills': 'Skills',
            'nav-social': 'Networks', 
            'nav-contact': 'Contact',
            'subtitle': 'First year BUT Computer Science student',
            'bio-title': 'From the beginning to now: <br> <span style="color: var(--neon-blue);">A Hybrid Vision.</span>',
            'bio-p1': "It didn't start with a line of code; it started with a vision. Fascinated by the digital and the <strong>Sci-Fi movies</strong>, I quickly realized I wanted to come discover and experiment with these technologies that fascinated me so much. My journey began not in a classroom, but on <strong>Minecraft</strong> servers, edit game files to just have fun with my friends. That sparked a curiosity that never left me.",
            'bio-p2': "Today, that curiosity has evolved into expertise. I think I'm starting to know how to master the basics of Web Development (<strong>HTML/CSS</strong>), my true edge lies in how I leverage modern tools. I see <strong>Artificial Intelligence</strong> not just as a trend, but as a daily partner that amplifies my productivity and creativity. I'm not just trying to solve problems; I automate the solutions.",
            'bio-p3': "I thinks i have a <strong>Hybrid Profile</strong>. I love the logic of code, but I thrive on the energy of <strong>Sales and Leadership</strong>. Whether it's planning a project, managing a team, or pitching a product, I bring my mindset to the table.",
            'bio-p4': "My motivation? <strong>Impact and Performance.</strong> Whether to create a new project, I am guided by my ideas and my instinct. I don't worry about where I'll be in 10 years or even 5 years, I will benefit more from the <strong>present moment</strong>, from day to day.I think that this short extract can summarize part of the complexity of my person and that to which I aspire to become signed Gabriel Laniez.",
            'btn-contact': 'Contact Me',
            'title-projects': 'My Works',
            'btn-discover': 'Discover my journey <i class="fas fa-arrow-down" style="margin-left: 10px; animation: bounce 2s infinite;"></i>',
            'title-skills': 'Technical Skills',
            'timeline-title': 'My Vision & Journey',
            'proj-future': 'Future Project',
            'tag-future': 'Future',
            'desc-lead': 'Goal: Lead Developer.',
            'desc-expert': 'Advanced AI Expertise.',
            'desc-engineer': "Engineering Degree.",
            'desc-alt': 'Corporate Apprenticeship.',
            'desc-data': 'Data Specialization.',
            'proj-but': 'CS Degree (BUT)',
            'desc-iut': "IUT Littoral Côte d'Opale.",
            'tag-studies': 'Studies',
            'desc-portfolio': 'Website Launch.',
            'btn-send-msg': 'Send me a message <i class="fas fa-paper-plane"></i>',
            'modal-title': 'CONTACT ME',
            
            // NOUVEAU TITRE MODAL RESEAUX
            'modal-social-title': 'MY NETWORKS'
        }
    };

    function setLanguage(lang) {
        document.getElementById('btn-fr').classList.remove('active');
        document.getElementById('btn-en').classList.remove('active');
        document.getElementById('btn-' + lang).classList.add('active');

        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
    }

    document.getElementById('btn-fr').addEventListener('click', () => setLanguage('fr'));
    document.getElementById('btn-en').addEventListener('click', () => setLanguage('en'));

    // 4. Config Particules (IA)
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00f3ff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5 },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00f3ff", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 2 }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }
            },
            "retina_detect": true
        });
    }
});

// FONCTION GLOBALE MODAL
window.toggleModal = function() {
    const modal = document.getElementById('contact-modal');
    if (modal) modal.classList.toggle('active');
};
document.addEventListener('click', (e) => {
    const modal = document.getElementById('contact-modal');
    if (modal && e.target === modal) modal.classList.remove('active');
});

// --- GESTION DU MODAL RÉSEAUX ---
window.toggleSocialModal = function() {
    const modal = document.getElementById('social-modal');
    if (modal) {
        modal.classList.toggle('active');
    }
};

// Fermeture quand on clique à côté (Pour le modal social aussi)
document.addEventListener('click', (e) => {
    const socialModal = document.getElementById('social-modal');
    if (socialModal && e.target === socialModal) {
        socialModal.classList.remove('active');
    }
});

// --- SYSTÈME DE SCROLL (JUSTE LA BOUCLE / REBOOT) ---
window.addEventListener('scroll', () => {
    
    const loopZone = document.getElementById('loop-zone');
    
    // On détecte si on est vraiment TOUT en bas de la page
    // (document.body.offsetHeight - 10 permet une petite marge d'erreur)
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        
        // 1. On affiche le message "Réinitialisation..."
        if(loopZone) loopZone.classList.add('active');

        // 2. On attend un peu et on remonte
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // On cache la zone une fois remonté
            setTimeout(() => {
                if(loopZone) loopZone.classList.remove('active');
            }, 1000);
            
        }, 800); // Délai avant remontée
    }
});

// --- LOGIQUE DU CHATBOT ---

// 1. Ouvrir / Fermer le chat
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('active');
}

// 2. Gérer la touche "Entrée"
function handleEnter(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}

// 3. Envoyer le message
function sendMessage() {
    const inputField = document.getElementById('user-input');
    const messageText = inputField.value.trim();
    
    if (messageText === "") return;

    // Ajouter le message de l'utilisateur (à droite)
    addMessage(messageText, 'user-message');
    inputField.value = ""; // Vider le champ

    // Simulation de réponse (Délai de 1 seconde pour faire "réfléchir" l'IA)
    setTimeout(() => {
        let botResponse = "Je ne suis qu'une interface pour le moment, mais Gabriel travaille sur vraie IA !";
        
        // Petite logique simple pour la démo
        const lowerMsg = messageText.toLowerCase();
        if(lowerMsg.includes('bonjour') || lowerMsg.includes('salut')) {
            botResponse = "Bonjour ! Ravi de vous voir sur le portfolio de Gabriel.";
        } else if (lowerMsg.includes('contact') || lowerMsg.includes('mail')) {
            botResponse = "Vous pouvez contacter Gabriel via le formulaire en bas de page ou par mail : laniezgabriel59@gmail.com";
        } else if (lowerMsg.includes('projet') || lowerMsg.includes('réalisations')) {
            botResponse = "Gabriel a travaillé sur plusieurs projets : Bots Discord, Sites Web et bientôt de l'IA.";
        }

        addMessage(botResponse, 'bot-message');
    }, 1000);
}

// Fonction utilitaire pour ajouter une bulle HTML
function addMessage(text, className) {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', className);
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    
    // Auto-scroll vers le bas
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
// --- FERMETURE DU CHAT AU CLIC EXTÉRIEUR ---
document.addEventListener('click', (e) => {
    const chatWindow = document.getElementById('chat-window');
    const chatBtn = document.getElementById('chat-toggle-btn');

    // On vérifie si le chat est ouvert
    if (chatWindow && chatWindow.classList.contains('active')) {
        
        // Si on clique AILLEURS que sur la fenêtre ET AILLEURS que sur le bouton
        if (!chatWindow.contains(e.target) && !chatBtn.contains(e.target)) {
            chatWindow.classList.remove('active');
        }
    }
});
