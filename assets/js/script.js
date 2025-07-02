// Navegação Mobile
// Removido o código abaixo do topo do arquivo para evitar erro quando o navbar ainda não existe:
// const hamburger = document.querySelector('.hamburger');
// const navMenu = document.querySelector('.nav-menu');
// const navLinks = document.querySelectorAll('.nav-link');
// 
// hamburger.addEventListener('click', () => {
//     hamburger.classList.toggle('active');
//     navMenu.classList.toggle('active');
// });
// 
// navLinks.forEach(link => {
//     link.addEventListener('click', () => {
//         hamburger.classList.remove('active');
//         navMenu.classList.remove('active');
//     });
// });

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Ajuste para a navbar fixa
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mudança de cor da navbar no scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animação de scroll reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.about-content, .experience-card, .skill-item, .highlight-item, .stat-card');
    revealElements.forEach(el => {
        observer.observe(el);
    });
    
    // Animação dos badges de nível das habilidades
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.3 });
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        skillObserver.observe(item);
    });
});

// Formulário de contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular envio do formulário
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular delay de envio
        setTimeout(() => {
            // Mostrar mensagem de sucesso
            showNotification('Mensagem enviada com sucesso! Em breve entrarei em contato.', 'success');
            
            // Resetar formulário
            this.reset();
            
            // Restaurar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Fechar notificação
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Adicionar estilos CSS para animações de notificação
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Efeito de digitação no título
function typeWriter(element, text, speed = 45) {
    element.innerHTML = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Aplicar efeito de digitação quando a página carregar
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    }
    
    updateCounter();
}

// Trigger contadores quando a seção sobre estiver visível
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            });
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Efeito hover nos cards de projeto
document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efeito de partículas no hero (opcional)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: float 6s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    
    document.querySelector('.hero').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Criar partículas periodicamente
setInterval(createParticle, 300);

// Adicionar estilos para animação de partículas
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Atualizar link ativo na navegação
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Adicionar classe active para link ativo
const activeLinkStyles = document.createElement('style');
activeLinkStyles.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeLinkStyles);

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Atualizar automaticamente o ano do copyright no footer
function updateFooterYear() {
    var yearSpan = document.getElementById('footer-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
document.addEventListener('DOMContentLoaded', updateFooterYear);

// Verificação inicial do tema (antes do DOM carregar para evitar flash)
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    }
})();

// Carregar componentes reutilizáveis (navbar e footer)
document.addEventListener('DOMContentLoaded', () => {
    const isLP = window.location.pathname.includes('/lp/');
    const navbarEl = document.getElementById('navbar');
    if (navbarEl && !isLP) {
        fetch('assets/components/navbar.html')
            .then(res => res.text())
            .then(html => {
                navbarEl.innerHTML = html;
                const navActions = navbarEl.querySelector('.nav-actions');
                if (navActions && !navActions.querySelector('#theme-toggle')) {
                    const savedTheme = localStorage.getItem('theme');
                    const btn = document.createElement('button');
                    btn.id = 'theme-toggle';
                    btn.className = 'theme-toggle-btn';
                    btn.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
                    navActions.appendChild(btn);
                }
                initNavbarEvents();
                
                // Inicializar funcionalidade de tema após o botão ser criado
                initThemeToggle();
            });
    }
    // Para LPs, injetar apenas o botão de tema fixo no topo direito
    if (isLP) {
        // Aplicar tema inicial para LPs
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.documentElement.classList.add('dark-theme');
        }
        
        if (!document.getElementById('theme-toggle')) {
            const btn = document.createElement('button');
            btn.id = 'theme-toggle';
            btn.className = 'theme-toggle-btn';
            btn.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            btn.style.position = 'fixed';
            btn.style.top = '18px';
            btn.style.right = '18px';
            btn.style.zIndex = '2000';
            btn.style.background = 'rgba(255,255,255,0.95)';
            btn.style.border = '1px solid var(--primary-color)';
            btn.style.color = 'var(--primary-color)';
            btn.style.padding = '0.5rem';
            btn.style.borderRadius = '50%';
            btn.style.width = '45px';
            btn.style.height = '45px';
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
            btn.style.cursor = 'pointer';
            btn.style.transition = 'all 0.3s ease';
            btn.style.backdropFilter = 'blur(4px)';
            document.body.appendChild(btn);
            
            // Adicionar evento de clique diretamente
            btn.addEventListener('click', function() {
                const isDark = !document.body.classList.contains('dark-theme');
                if (isDark) {
                    document.body.classList.add('dark-theme');
                    document.documentElement.classList.add('dark-theme');
                    btn.innerHTML = '<i class="fas fa-sun"></i>';
                } else {
                    document.body.classList.remove('dark-theme');
                    document.documentElement.classList.remove('dark-theme');
                    btn.innerHTML = '<i class="fas fa-moon"></i>';
                }
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });
        }
        
        // Inicializar funcionalidade de tema para LPs
        setTimeout(() => {
            initThemeToggle();
        }, 100);
    }
    // Footer
    const footerEl = document.getElementById('footer');
    if (footerEl) {
        let footerPath = 'assets/components/footer.html';
        if (isLP) footerPath = '../assets/components/footer.html';
        fetch(footerPath)
            .then(res => res.text())
            .then(html => {
                footerEl.innerHTML = html;
            });
    }
});

// Função para inicializar a funcionalidade de tema
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    function setTheme(dark) {
        if (dark) {
            document.body.classList.add('dark-theme');
            document.documentElement.classList.add('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else {
            document.body.classList.remove('dark-theme');
            document.documentElement.classList.remove('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }

    function toggleTheme() {
        const isDark = !document.body.classList.contains('dark-theme');
        setTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    if (themeToggleBtn) {
        // Remover event listener anterior se existir
        themeToggleBtn.removeEventListener('click', toggleTheme);
        // Adicionar novo event listener
        themeToggleBtn.addEventListener('click', toggleTheme);
        
        // Carregar preferência do usuário
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setTheme(true);
        } else {
            setTheme(false);
        }
    }
}

// Botão Fixo de Contato (Mobile)
const contactFixedBtn = document.getElementById('contact-fixed-btn');

// Função para controlar a visibilidade do botão fixo
function toggleContactFixedBtn() {
    if (window.innerWidth <= 768) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Mostrar botão após scrollar 50% da altura da tela
        if (scrollPosition > windowHeight * 0.5) {
            contactFixedBtn.classList.add('show');
        } else {
            contactFixedBtn.classList.remove('show');
        }
        
        // Ocultar botão quando estiver próximo da seção de contato
        const contactSection = document.getElementById('contato');
        if (contactSection) {
            const contactSectionTop = contactSection.offsetTop;
            const contactSectionBottom = contactSectionTop + contactSection.offsetHeight;
            
            if (scrollPosition + windowHeight > contactSectionTop && scrollPosition < contactSectionBottom) {
                contactFixedBtn.classList.remove('show');
            }
        }
    } else {
        // Em desktop, sempre ocultar o botão
        contactFixedBtn.classList.remove('show');
    }
}

// Event listeners para o botão fixo
if (contactFixedBtn) {
    // Controlar visibilidade no scroll
    window.addEventListener('scroll', toggleContactFixedBtn);
    
    // Controlar visibilidade no resize da janela
    window.addEventListener('resize', toggleContactFixedBtn);
    
    // Navegar para a seção de contato ao clicar
    contactFixedBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contato');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 70; // Ajuste para a navbar fixa
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
    
    // Verificar estado inicial
    toggleContactFixedBtn();
}

// Função para abrir a modal de tecnologias
function toggleSkills() {
    const modal = document.getElementById('technologies-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Previne scroll do body
        
        // Animar os elementos da modal
        setTimeout(() => {
            const skillItems = modal.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }, 300);
    }
}

// Função para fechar a modal de tecnologias
function closeTechnologiesModal() {
    const modal = document.getElementById('technologies-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restaura scroll do body
    }
}

// Fechar modal ao clicar no backdrop
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('technologies-modal');
    if (modal) {
        const backdrop = modal.querySelector('.modal-backdrop');
        backdrop.addEventListener('click', closeTechnologiesModal);
        
        // Fechar modal com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeTechnologiesModal();
            }
        });
    }
});

// Função para mostrar/ocultar o balão de contato
function toggleContactChat() {
    // Remove a mensagem surpresa, se existir
    const surprise = document.getElementById('surprise-message');
    if (surprise) surprise.remove();
    const chat = document.getElementById('contact-chat');
    if (chat.classList.contains('open')) {
        chat.classList.remove('open');
    } else {
        chat.classList.add('open');
    }
}

// --- HERO IMPACTANTE: Saudação de impacto com efeito fade-in por palavra ---
const frasesImpacto = [
    'Você nunca viu um portfólio assim!',
    'Pronto para ver inovação de verdade?',
    'Prepare-se para se surpreender!',
    'Bem-vindo ao universo de soluções digitais!',
    'O futuro do desenvolvimento começa aqui.',
    'Transformando ideias em experiências digitais.',
    'Soluções criativas para desafios reais.',
    'Inovação, tecnologia e paixão pelo que faço.'
];

function fadeInWordsEffect(element, text, speed = 180) {
    const words = text.split(' ');
    element.innerHTML = words.map(word => `<span class="fade-word" style="opacity:0;display:inline-block;transform:translateY(16px);">${word}</span>`).join(' ');
    const spans = element.querySelectorAll('.fade-word');
    spans.forEach((span, i) => {
        setTimeout(() => {
            span.style.transition = 'opacity 0.5s cubic-bezier(.23,1.01,.32,1), transform 0.5s cubic-bezier(.23,1.01,.32,1)';
            span.style.opacity = 1;
            span.style.transform = 'translateY(0)';
        }, i * speed);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const heroImpacto = document.getElementById('hero-impacto');
    if (heroImpacto) {
        const frase = frasesImpacto[Math.floor(Math.random() * frasesImpacto.length)];
        fadeInWordsEffect(heroImpacto, frase, 180);
    }
});

// --- MENSAGEM SURPRESA ACIMA DO BOTÃO DE CHAT ---
const mensagensPersuasivas = [
    'Seu projeto merece destaque! Fale comigo e veja como posso ajudar.',
    'Transforme sua ideia em realidade. Clique aqui e vamos conversar!',
    'Precisa de um site profissional? Eu posso resolver para você.',
    'Não perca tempo: soluções sob medida para o seu negócio, é só chamar!',
    'Quer resultados reais na internet? Entre em contato agora mesmo!',
    'Atendimento rápido e personalizado. Clique para conversar comigo!'
];

let ultimaMensagemIndex = -1;
let surpriseInterval = null;

function showSurpriseMessage() {
    // Evita duplicidade
    if (document.getElementById('surprise-message')) return;

    const btn = document.getElementById('contact-toggle');
    if (!btn) return;

    // Sorteia uma mensagem diferente da última
    let index;
    do {
        index = Math.floor(Math.random() * mensagensPersuasivas.length);
    } while (index === ultimaMensagemIndex && mensagensPersuasivas.length > 1);
    ultimaMensagemIndex = index;
    const mensagem = mensagensPersuasivas[index];

    // Cria o container de mensagem igual ao chat
    const messageContainer = document.createElement('div');
    messageContainer.className = 'chat-message';
    messageContainer.style.position = 'fixed';
    messageContainer.style.right = '48px';
    messageContainer.style.bottom = '90px';
    messageContainer.style.zIndex = '1400';
    messageContainer.style.cursor = 'pointer';
    messageContainer.style.animation = 'fadeInUp 0.4s';
    messageContainer.id = 'surprise-message';

    // Responsivo
    if (window.innerWidth <= 600) {
        messageContainer.style.right = '24px';
        messageContainer.style.bottom = '70px';
        messageContainer.style.maxWidth = '80vw';
    } else {
        messageContainer.style.maxWidth = '320px';
    }

    // Cria o balão igual ao chat
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = mensagem;
    messageContainer.appendChild(bubble);

    // Remove ao clicar
    messageContainer.addEventListener('click', () => {
        messageContainer.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => messageContainer.remove(), 300);
    });

    document.body.appendChild(messageContainer);

    // Remove automaticamente após 8 segundos
    setTimeout(() => {
        if (messageContainer.parentNode) {
            messageContainer.style.animation = 'slideOutRight 0.3s';
            setTimeout(() => messageContainer.remove(), 300);
        }
    }, 8000);
}

// Exibe a primeira mensagem após 10 segundos e depois rotaciona a cada 30-50 segundos (aleatório)
window.addEventListener('DOMContentLoaded', () => {
    function agendarNovaMensagem() {
        // Não exibe se o chat estiver aberto
        const chat = document.getElementById('contact-chat');
        if (chat && chat.classList.contains('open')) {
            // Tenta novamente depois de um tempo
            surpriseInterval = setTimeout(agendarNovaMensagem, 10000);
            return;
        }
        showSurpriseMessage();
        // Próxima mensagem entre 30 e 50 segundos
        const proximoTempo = 30000 + Math.random() * 20000;
        surpriseInterval = setTimeout(agendarNovaMensagem, proximoTempo);
    }
    setTimeout(agendarNovaMensagem, 10000);
});

// Função para inicializar eventos da navbar após carregamento dinâmico
function initNavbarEvents() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Função para alternar entre Projetos e Experiências
function toggleView(view) {
    const experienceContainer = document.getElementById('experience-container');
    const experiencesContainer = document.getElementById('experiences-container');
    const toggleexperience = document.getElementById('toggle-experience');
    const toggleExperiences = document.getElementById('toggle-experiences');
    const sectionSubtitle = document.getElementById('section-subtitle');

    if (view === 'experience') {
        experienceContainer.style.display = 'grid';
        experiencesContainer.style.display = 'none';
        toggleexperience.classList.add('active');
        toggleExperiences.classList.remove('active');
        sectionSubtitle.textContent = 'Soluções que geraram resultados reais';
    } else if (view === 'experiences') {
        experienceContainer.style.display = 'none';
        experiencesContainer.style.display = 'grid';
        toggleexperience.classList.remove('active');
        toggleExperiences.classList.add('active');
        sectionSubtitle.textContent = 'Plataformas e tecnologias com que trabalho';
    }
}

// Inicializar com projetos por padrão
document.addEventListener('DOMContentLoaded', () => {
    const experienceSection = document.getElementById('projetos');
    if (experienceSection) {
        toggleView('experience');
    }
});

// Injeção dinâmica do chat original em todas as páginas
function injectOriginalChat() {
    // Verifica se já existe o chat
    if (document.getElementById('contact-chat') || document.getElementById('contact-toggle')) return;
    
    // Caminho relativo seguro para qualquer página
    const base = window.location.pathname.includes('/lp/') ? '../assets/components/' : './assets/components/';
    
    fetch(base + 'chat-original.html')
        .then(res => res.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            
            // Ajusta o caminho da imagem do perfil para LPs
            const avatarImg = document.querySelector('.chat-avatar-img');
            if (avatarImg && window.location.pathname.includes('/lp/')) {
                avatarImg.src = '../assets/images/profile.jpg';
            }
        })
        .catch(err => {
            // Chat não carregado
        });
}

document.addEventListener('DOMContentLoaded', injectOriginalChat);

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('experience-container');
    if (!container) return;

    fetch('get_projetos.php')
        .then(response => response.json())
        .then(projetos => {
            if (!Array.isArray(projetos)) return;
            container.innerHTML = '';
            projetos.forEach(projeto => {
                container.innerHTML += `
                <div class="experience-card">
                    <div class="experience-header">
                        <div class="experience-icon">
                            <i class="${projeto.icone}"></i>
                        </div>
                        <div class="experience-title">
                            <h3>${projeto.titulo}</h3>
                            <span class="experience-category">${projeto.categoria || ''}</span>
                            <div class="experience-badges">
                                <span class="experience-badge success">${projeto.status || ''}</span>
                            </div>
                        </div>
                    </div>
                    <div class="experience-content">
                        <p>${projeto.descricao || ''}</p>
                        <div class="experience-results">
                            <h4>O que este projeto resolve:</h4>
                            <ul class="results-list">
                                ${(projeto.resultados || []).map(item => `<li><i class='fas fa-check'></i> ${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="experience-tech">
                            ${(projeto.tecnologias || []).map(tech => `<span class='tech-tag'>${tech}</span>`).join('')}
                        </div>
                        <div class="experience-links">
                            ${projeto.link_demo ? `<a href="${projeto.link_demo}" target="_blank" rel="noopener" class="btn btn-small btn-live"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                        </div>
                    </div>
                </div>
                `;
            });
        })
        .catch(err => {
            container.innerHTML = '<p style="color:red">Erro ao carregar projetos.</p>';
        });
}); 